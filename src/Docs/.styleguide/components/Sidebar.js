import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputAdornment, Box, useTheme, makeStyles } from '@ayx/ui-core';
import { Search } from '@ayx/icons';

const useStyles = makeStyles(({palette}) => ({
  input: {
    color: palette.primary.contrastText,
    background: 'rgba(255, 255, 255, 0.1)',
    '& input::placeholder': {
      color: palette.blueGrey[400]
    },
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.15)',
    }
  }
}))

// Built from Styleguidist 'TableOfContentsRenderer' component
const Sidebar = (props) => {
  const { children, onSearchTermChange } = props;
  const { palette } = useTheme()
  const classes = useStyles();

  return (
    <>
      <Box m={3}>
        <Input
          className={classes.input}
          fullWidth
          placeholder="Filter"
          onChange={event => onSearchTermChange(event.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <Search size={12} color={palette.text.secondary} />
            </InputAdornment>
          }
        />
      </Box>
      {children}
    </>
  );
}


Sidebar.propTypes = {
  children: PropTypes.node,
  searchTerm: PropTypes.string.isRequired,
  onSearchTermChange: PropTypes.func.isRequired
};

export default Sidebar;
