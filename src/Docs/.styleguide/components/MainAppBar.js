import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Grid,
  Hidden,
  Select,
  Tooltip,
  IconButton,
  Divider,
  Box,
  makeStyles,
  useTheme
} from "@ayx/ui-core";
import {
  Gitlab,
  Sunrise,
  Sunset,

} from '@ayx/icons';

const useStyles = makeStyles(({ direction, spacing }) => ({
  appBar: {
    width: "calc(100% - 240px)",
    right: direction === "ltr" ? 0 : 'unset',
    left: direction === "ltr" ? 'unset' : 0
  }
}));


const MainAppBar = ({
  productThemeName,
  handleProductNameChange,
  toggleDirection,
  togglePaletteType
}) => {


  const { palette, direction } = useTheme();

  const classes = useStyles();

  return (
    <>
      <AppBar
        elevation={0}
        color="inherit"
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar disableGutters>
          <Grid container alignItems="center">
            <Grid item sm md="auto">
              <Box mx={2} my={2.5}>
                <Tooltip arrow title="Toggle Dark Mode">
                  <IconButton onClick={togglePaletteType}>
                    {palette.type === "dark" ? <Sunrise size="large" /> : <Sunset size="large" />}
                  </IconButton>
                </Tooltip>
                <Tooltip arrow title="GitLab">
                  <IconButton
                    onClick={() => {
                      window.open("https://git.alteryx.com/ayx-ui-sdk/ui-sdk");
                    }}
                  >
                    <Gitlab size="large" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
            <Hidden xsDown>
              <Grid item>
                <Box mr={2}>
                  <Select
                    messages={{
                      noOptions: "No Results",
                      placeholder: "Product Theme"
                    }}
                    options={[
                      {
                        value: `default`,
                        primary: `Default Product Theme`
                      },
                      {
                        value: `aep`,
                        primary: `Server.Next`
                      },
                      {
                        value: `d1`,
                        primary: `Designer`
                      },
                    ]}
                    disableClearable
                    value={productThemeName}
                    onChange={(e) => handleProductNameChange(e.target.value)}
                  />
                </Box>
              </Grid>
            </Hidden>
          </Grid>
        </Toolbar>
        <Divider />
      </AppBar>
    </>
  );
};

MainAppBar.propTypes = {
    handleProductNameChange: PropTypes.func.isRequired
  };

export default MainAppBar;
