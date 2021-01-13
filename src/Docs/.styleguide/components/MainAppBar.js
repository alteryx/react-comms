import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Grid,
  Hidden,
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

const useStyles = makeStyles(({ direction }) => ({
  appBar: {
    width: "calc(100% - 240px)",
    right: direction === "ltr" ? 0 : 'unset',
    left: direction === "ltr" ? 'unset' : 0
  }
}));


const MainAppBar = ({
  togglePaletteType
}) => {


  const { palette } = useTheme();

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
            <Hidden smDown>
              <Grid item xs>
              {/* {mainAlertOpen ? (
                  <Box ml={2} my={2}>
                    <Alert
                      severity="success"
                      variant="filled"
                      onClose={handleMainAlertClose}
                      action={[
                        <Divider key="divider1" orientation="vertical" role="presentation" />,
                        <Button
                          key="migration"
                          size="small"
                          color="inherit"
                        >
                        </Button>,
                        <Divider key="divider2" orientation="vertical" role="presentation" />,
                        <IconButton
                          key="close"
                          aria-label="Close"
                          color="inherit"
                          onClick={dismissMainAlertForever}
                        >
                          <X size={10} />
                        </IconButton>
                      ]}
                    >
                      UI-Core v5 is here!
                    </Alert>
                  </Box>
                ) : null} */}
              </Grid>
            </Hidden>
            <Grid item xs md="auto">
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
