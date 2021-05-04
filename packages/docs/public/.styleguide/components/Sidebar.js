import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, IconButton, TextField, InputAdornment, Box, useTheme, makeStyles } from '@alteryx/ui';
import { Search, X } from '@alteryx/icons';

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
  const { children, onSearchTermChange, searchTerm } = props;
  const { palette } = useTheme()
  const classes = useStyles();

  return (
    <>
      <Box ml={4} mb={3}>
      <FormControl fullWidth>
          <TextField
            id="uic-demo-side-bar-search-term"
            placeholder="Filter"
            onChange={event => onSearchTermChange(event.target.value)}
            InputProps={{
              className: classes.input,
              type: 'search',
              startAdornment: (
                <InputAdornment position="start">
                  <Search
                    color={palette.blueGrey[300]}
                    size="small"
                  />
                </InputAdornment>
              ),
              endAdornment: 
                searchTerm ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => onSearchTermChange('')}
                    >
                      <X size={10} />
                    </IconButton>
                  </InputAdornment>
                ) : undefined
            }}
            value={searchTerm}
            variant="filled"
          />
        </FormControl>
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
