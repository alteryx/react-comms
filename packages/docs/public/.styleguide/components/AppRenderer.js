import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Box, Link, makeStyles, useTheme, lighten, AyxAppWrapper } from "@alteryx/ui";
import MainAppBar from "./MainAppBar";
import MarkdownStyleOverrider from "./MarkdownStyleOverrider";
import Logo from './Logo';

const SIDE_BAR_WIDTH = 240;

const useStyles = makeStyles(({ palette, spacing, direction }) => ({
  root: {
    minHeight: '100vh',
    paddingLeft: direction === "ltr" ? SIDE_BAR_WIDTH : 'unset',
    paddingRight: direction === "ltr" ? 'unset' : SIDE_BAR_WIDTH,
    backgroundColor: lighten(palette.background.default, 0.04)
  },
  content: {
    maxWidth: 1000,
    padding: spacing(16, 8, 2, 10),
    margin: '0 auto',
    display: 'block'
  },
  logoWrapper: {
    direction: 'ltr',
    height: spacing(25)
  },
  logo: {
    position: 'absolute',
    margin: spacing(7.25, 0, 0, 3.5),
    width: spacing(9)
  },
  logoText: {
    position: 'absolute',
    margin: spacing(7.25, 0, 0, 15)
  },
  core: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 1
  },
  version: {
    fontSize: 12,
    color: palette.blueGrey[500],
    marginTop: spacing(2)
  },
  sidebar: {
    color: 'rgba(255, 255, 255, 0.9)',
    background: `linear-gradient(180deg, rgba(22,35,85,1) 0%, ${palette.brand.deepSpace} 35%)`,
    borderRight: `1px solid ${palette.divider}`,
    position: "fixed",
    width: SIDE_BAR_WIDTH,
    left: direction === "ltr" ? 0 : 'unset',
    right: direction === "ltr" ? 'unset' : 0,
    height: "100vh",
    overflow: "auto",
    paddingRight: spacing(4)
  }
}));

// Built from Styleguidist 'StyleGuideRenderer' component
const StyleGuideRenderer = ({
  version,
  children,
  toc,
  toggleDirection,
  togglePaletteType,
  handleProductNameChange,
  productThemeName
}) => {
  const classes = useStyles();
  const theme = useTheme();
  // Provide access to the theme directly on the window
  window.theme = theme;

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item className={classes.sidebar} component="nav">
          <AyxAppWrapper theme={{direction: theme.direction}} paletteType="dark">
            <Box className={classes.logoWrapper}>
              <Box className={classes.logo}>
                <Logo />
              </Box>
              <Box className={classes.logoText}>
                <Typography className={classes.core}>React Comms</Typography>
                <Link className={classes.version} href="#/Releases/Versions">{`Version ${version}`}</Link>
              </Box>
            </Box>
            <Box marginBottom={6}>{toc}</Box>
          </AyxAppWrapper>
        </Grid>
        <MainAppBar
          productThemeName={productThemeName}
          toggleDirection={toggleDirection}
          togglePaletteType={togglePaletteType}
          handleProductNameChange={handleProductNameChange}
        />
        <Grid container className={classes.content} spacing={4}>
          <Grid item xs={12} component="main">
              <MarkdownStyleOverrider>{children}</MarkdownStyleOverrider>
          </Grid>
          <Grid item xs={12} component="footer">
            {`React Comms Version ${version}`}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

StyleGuideRenderer.propTypes = {
  title: PropTypes.string.isRequired,
  version: PropTypes.string,
  homepageUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  toc: PropTypes.node.isRequired,
  handleProductNameChange: PropTypes.func.isRequired
};

export default StyleGuideRenderer;
