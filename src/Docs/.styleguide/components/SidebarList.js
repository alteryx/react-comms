import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse, List, ListItem, ListItemText, ListItemIcon, Divider, Box, makeStyles } from '@ayx/ui-core';
import { Home, GridView, Layers, Settings, Layout, BookOpen, Aperture, Box as BoxIcon, GitMerge } from '@ayx/icons';
import { getHash } from 'react-styleguidist/lib/client/utils/handleHash';

const iconLookup = {
  'getting started': Home,
  'guides': BookOpen,
  'releases': GitMerge,
  'icons': GridView,
  'colors': Aperture,
  'layout': Layout,
  'core components': BoxIcon,
  'common': BoxIcon,
  'lab': BoxIcon,
  'utils': Settings
};

const useStyles = makeStyles(({ palette, spacing }) => ({
  listItemSubHeader: {
    paddingLeft: spacing(7)
  },
  listItemIcon: {
    minWidth: spacing(7)
  },
  list: {
    color: palette.type === 'dark' ? palette.primary.contrastText : 'inherit'
  }
}));

// Built from Styleguidist 'ComponentsListRenderer' component
// We build our own list renderer to add support for collapsable sections
// Ref: https://react-styleguidist.js.org/docs/cookbook.html#how-to-change-the-layout-of-a-style-guide
const SidebarList = ({ items }) => {
  const classes = useStyles();
  const [forceClose, setForceClose] = useState(false);

  items = items.filter(item => item.visibleName);
  if (!items.length) {
    return null;
  }
  const windowHash = window.location.pathname + getHash(window.location.hash);

  return (
    <List className={classes.list} disablePadding>
      {items.map(({ heading, visibleName, href, content, external }, index) => {
        
        const firstReplace = href.replace('/#', '');
        const itemToCompare = firstReplace.replace('%20', ' ');
        const isItemSelected = windowHash === itemToCompare;
        const isActivePath = windowHash.indexOf(itemToCompare) > -1;
        const isItemOpen = isActivePath && !forceClose;
        const Icon = iconLookup[visibleName && visibleName.replace('%20', ' ').toLowerCase()] || Layers;
        if (visibleName && visibleName.toLowerCase() === "divide") {
          return (
            <Box my={2} key={`itemToCompare${index}`}>
              <Divider/>
            </Box>
          );
        }
        return (
          <React.Fragment key={itemToCompare}>
            <ListItem
              button
              selected={isItemSelected}
              data-test={visibleName}
              component="a"
              href={href}
              target={external ? '_blank' : undefined}
              onClick={() => { setForceClose(isItemSelected ? !forceClose : false) } }
            >
              {heading ? (
                <ListItemIcon className={classes.listItemIcon}>
                  <Icon size={14} />
                </ListItemIcon>
              ) : null}
              <ListItemText
                className={(!content || !content.props.items.length) ? classes.listItemSubHeader : undefined}
                primary={heading ? (<b>{visibleName}</b>) : visibleName}
              />
            </ListItem>
            <Collapse in={isItemOpen}>
              {content}
            </Collapse>
          </React.Fragment>
        );
      })}
    </List>
  );
}

SidebarList.propTypes = {
  items: PropTypes.array.isRequired
};

export default SidebarList;
