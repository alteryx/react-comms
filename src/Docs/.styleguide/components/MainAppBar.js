import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Grid,
  Select,
  Tooltip,
  IconButton,
  Divider,
  Box,
  makeStyles,
  useTheme,
} from "@ayx/ui-core";
import {
  Gitlab,
  Sunrise,
  Sunset,
  ArrowRightCircle,
  ArrowLeftCircle,
} from '@ayx/icons';

const useStyles = makeStyles(({ palette, direction }) => ({
  appBar: {
    width: "calc(100% - 220px)",
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

  // Direction Alert
  const handleToggleDirectionClick = () => {
    toggleDirection();
  }

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
        <Toolbar variant="dense" disableGutters>
          <Grid container alignItems="center">
            <Grid item xs>
            </Grid>
            
            <Grid item className={classes.headerIcons}>
              <Tooltip arrow title="Toggle Direction">
                <IconButton onClick={handleToggleDirectionClick}>
                  {direction === 'rtl' ? (
                    <ArrowRightCircle />
                  ) : (
                    <ArrowLeftCircle />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Toggle Dark Mode">
                <IconButton onClick={togglePaletteType}>
                  {palette.type === "dark" ? <Sunrise /> : <Sunset />}
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="GitLab">
                <IconButton
                  onClick={() => {
                    window.open("https://git.alteryx.com/ayx-ui-sdk/ui-sdk");
                  }}
                >
                  <Gitlab />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid>
              <Box m={3}>
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
                    {
                      value: `dx`,
                      primary: `Designer.Next`
                    }
                  ]}
                  disableClearable
                  value={productThemeName}
                  onChange={(e) => handleProductNameChange(e.target.value)}
                />
              </Box>
            </Grid>
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
