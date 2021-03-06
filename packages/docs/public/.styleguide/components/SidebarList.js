import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse, List, ListItem, ListItemText, ListItemIcon, Divider, Box, useTheme, makeStyles, fade } from '@alteryx/ui';
import { Home, Layers, Box as BoxIcon, GitMerge, Settings } from '@alteryx/icons';
import { getHash } from 'react-styleguidist/lib/client/utils/handleHash';
import clsx from 'clsx';

const iconLookup = {
  'getting started': Home,
  'releases': GitMerge,
  'designer api': BoxIcon,
  'utils': Settings,
};

const useStyles = makeStyles(({ spacing, typography, palette, direction }) => ({
  listItemSubHeader: {
    paddingLeft: spacing(9)
  },
  listItemTextSelected: {
    color: palette.common.white,
    fontWeight: typography.fontWeightBold
  },
  listItem: {
    height: 40,
    paddingLeft: spacing(5.5),
    color: palette.blueGrey[300],
    borderLeft: '2px solid transparent', // For keyboard focus
    borderTopRightRadius: direction === 'rtl' ? 0 : 20,
    borderBottomRightRadius: direction === 'rtl' ? 0 : 20,
    borderTopLeftRadius: direction === 'rtl' ? 20 : 0,
    borderBottomLeftRadius: direction === 'rtl' ? 20 : 0,
    '&:hover, &$focusVisible': {
      background: 'transparent',
      color: palette.common.white,
      background: fade(palette.primary.main, 0.1)
    }
  },
  listItemSelected: {
    backgroundColor: palette.action.hover,
    '&$focusVisible': {
      background: palette.action.selected
    }
  },
  focusVisible: {
    borderColor: palette.success.main
  },
  listItemIcon: {
    minWidth: spacing(7),
  }
}));

// Built from Styleguidist 'ComponentsListRenderer' component
// We build our own list renderer to add support for collapsable sections
// Ref: https://react-styleguidist.js.org/docs/cookbook.html#how-to-change-the-layout-of-a-style-guide
const SidebarList = ({ items }) => {
  const classes = useStyles();
  const { palette } = useTheme();
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
              classes={{ root: classes.listItem, selected: classes.listItemSelected, focusVisible: classes.focusVisible }}
              selected={isItemSelected}
              data-test={visibleName}
              component="a"
              href={href}
              target={external ? '_blank' : undefined}
              onClick={() => { setForceClose(isItemSelected ? !forceClose : false) } }
            >
                {heading ? (
                  <ListItemIcon className={classes.listItemIcon}>
                    <Icon size="medium" color={isItemSelected ? palette.common.white : undefined} />
                  </ListItemIcon>
                ) : null}
                <ListItemText
                  disableTypography
                  className={clsx(
                    {
                      [classes.listItemSubHeader]: !content || !content.props.items.length, 
                      [classes.listItemTextSelected]: isItemSelected
                    }
                  )}
                  primary={visibleName}
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
