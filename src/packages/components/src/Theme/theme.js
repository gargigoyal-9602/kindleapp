import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

export const lightThemeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#3AAEEF",
      contrastText: "#fff",
    },
    // secondary: {
    //   main: "#1565d8",
    //   contrastText: "#fff",
    // },
    background: {
      default: "#fff",
      paper: "#f6f6f6",
    },
    text: {
      primary: "#183b56",
      secondary: "#5a7184",
    },
    error: {
      main: "#ef3e22",
    },
  },
};

export const darkThemeOptions = {
  palette: {
    type: "dark",
    // primary: {
    //   main: "#1565d8",
    //   contrastText: "#fff",
    // },
    // secondary: {
    //   main: "#1565d8",
    //   contrastText: "#fff",
    // },
    // background: {
    //   default: "#fff",
    //   paper: "#fff",
    // },
    // text: {
    //   primary: "#183b56",
    //   secondary: "#5a7184",
    // },
    // error: {
    //   main: "#ef3e22",
    // },
  },
};

const customTheme = {
  // typography: {
  //   fontFamily: ["Roboto", "sans-serif"].join(","),
  //   // textTransform: 'none',
  //   h1: {
  //     fontWeight: "bold",
  //     fontSize: "32px",
  //     lineHeight: 1.25,
  //     letterSpacing: "0.27px",
  //   },
  //   h2: {
  //     fontWeight: "bold",
  //     fontSize: "24px",
  //     lineHeight: 1.33,
  //     letterSpacing: "0.2px",
  //   },
  //   h3: {
  //     fontWeight: "bold",
  //     fontSize: "20px",
  //     lineHeight: 1.2,
  //     // letterSpacing: "0.2px",
  //   },
  //   h4: {
  //     fontWeight: "normal",
  //     fontSize: "18px",
  //     lineHeight: 1.78,
  //     letterSpacing: "normal",
  //   },
  //   h5: {
  //     fontWeight: "normal",
  //     fontSize: "16px",
  //     lineHeight: 1.38,
  //     letterSpacing: "0.2px",
  //   },
  //   overrides: {
  //     MuiFormHelperText: {
  //       root: {
  //         fontFamily: "Roboto",
  //         fontSize: "12px",
  //         fontWeight: 500,
  //         fontStretch: "normal",
  //         fontStyle: "normal",
  //         lineHeight: 1.25,
  //         letterSpacing: "normal",
  //         color: "#000000",
  //       },
  //     },
  //     MuiTab: {
  //       root: {
  //         textTransform: "none",
  //         fontFamily: "Roboto",
  //         fontSize: "20px",
  //         fontWeight: "bold",
  //         fontStretch: "normal",
  //         fontStyle: "normal",
  //         lineHeight: 1.33,
  //         letterSpacing: "normal",
  //         color: "#183b56",
  //         textAlign: "center",
  //       },
  //     },
  //     MuiButtonBase: {
  //       root: {
  //         height: "40px",
  //         borderRadius: "2px",
  //         padding: "8px 20px",
  //         fontFamily: "Open Sans",
  //         fontSize: "140px",
  //         fontWeight: "bold",
  //         fontStretch: "normal",
  //         fontStyle: "normal",
  //         lineHeight: 1.25,
  //         letterSpacing: "normal",
  //         textTransform: "none",
  //         textAlign: "center",
  //         color: "#ffffff",
  //       },
  //       endIcon: {
  //         marginLeft: "12px",
  //       },
  //       text: {
  //         fontFamily: "Open Sans",
  //         fontSize: "140px",
  //         fontWeight: "bold",
  //         fontStretch: "normal",
  //         fontStyle: "normal",
  //         lineHeight: 1.25,
  //         letterSpacing: "normal",
  //         textTransform: "none",
  //         textAlign: "center",
  //         color: "#ffffff",
  //       },
  //     },
  //   },
  // },
};

export default customTheme;
