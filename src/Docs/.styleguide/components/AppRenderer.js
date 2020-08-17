import React from "react";
import PropTypes from "prop-types";
import { Grid, Box, makeStyles, useTheme, lighten, Typography } from "@ayx/ui-core";
import MainAppBar from "./MainAppBar";
import MarkdownStyleOverrider from "./MarkdownStyleOverrider";

const useStyles = makeStyles(({ palette, spacing, direction }) => ({
  root: {
    minHeight: '100vh',
    paddingLeft: direction === "ltr" ? 200 : 'unset',
    paddingRight: direction === "ltr" ? 'unset' : 200,
    backgroundColor: lighten(palette.background.default, 0.04)
  },
  content: {
    maxWidth: 1000,
    padding: spacing(16, 8, 2, 10),
    margin: '0 auto',
    display: 'block'
  },
  version: {
    textAlign: direction === "rtl" ? "left" : "right",
    fontSize: 11,
    margin: spacing(-8, 10, 6)
  },
  sidebar: {
    // color: palette.type === "dark" ? undefined : palette.background.paper, // Needed to avoid the collisions of body1 typography colors
    // backgroundColor: palette.type === "dark" ? "#222" : "#142254",
    borderRight: `1px solid ${palette.divider}`,
    position: "fixed",
    width: 220,
    left: direction === "ltr" ? 0 : 'unset',
    right: direction === "ltr" ? 'unset' : 0,
    height: "100vh",
    overflow: "auto"
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

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item className={classes.sidebar} component="nav">
            <Box p={4}>
              <Typography variant="h1">UI-SDK</Typography>
            </Box>
            <Box marginLeft={6} className={classes.version}>{`VERSION 0.0.1`}</Box>
            <Box marginBottom={6}>{toc}</Box>
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
