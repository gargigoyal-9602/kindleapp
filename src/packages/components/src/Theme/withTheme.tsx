// @ts-nocheck
import React, { Component } from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeContext, ThemeOptions } from "./ThemeContext";
import customTheme, { darkThemeOptions, lightThemeOptions } from "./theme.js";

export type themeBoxProps = {
  mode: any;
};

function withTheme(OriginalComponent) {
  return (props) => {
    const theme = React.useContext(ThemeContext);
    const palletType = theme.mode ? darkThemeOptions : lightThemeOptions;
    const darkTheme = responsiveFontSizes(
      createMuiTheme({
        ...palletType,
        ...customTheme,
      })
    );
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <OriginalComponent {...props} {...theme} />
      </ThemeProvider>
    );
  };
}
export default withTheme;
