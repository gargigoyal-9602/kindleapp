import React from "react";

// Customizable Area Start
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import VisibilityOffOutlined from "@material-ui/icons/VisibilityOffOutlined";
import CardActions from "@material-ui/core/CardActions";
import { closeIcon } from "./assets";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Button,
  TextField,
  Dialog,
  Box,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
} from "@material-ui/core";
import { createStyles, withStyles, makeStyles } from "@material-ui/core/styles";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import {
  fbIcon,
  googleIcon,
  appleIcon,
  peddlerImage,
  sliderImage,
  background,
} from "./assets";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SocialMediaLogin from "../../social-media-account-login/src/SocialMediaAccountLoginScreen.web";
//@ts-ignore
import CustomCheckBox from "../../../components/src/CustomCheckBox";

import { RouteComponentProps, withRouter } from "react-router";
import withAlertBox from "../../../components/src/withAlertBox.Web";
import withToast from "../../../components/src/withSnackBar.Web";
import withLoader from "../../../components/src/withLoader.Web";
import SocialMediaAccountLoginScreen from "../../social-media-account-login/src/SocialMediaAccountLoginScreen.web";

// Customizable Area End
import EmailAccountLoginController, {
  Props,
} from "./EmailAccountLoginControllerWeb";
import { sign } from "crypto";

const styles = (theme: any) =>
  createStyles({
    mainDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // background: "white",
      padding: "50px",
      backgroundImage: `url(${background})`,
      backgroundSize: "100% 100%",
      height: "100vh",
      backgroundRepeat: "no-repeat;",
      backgroundPosition: "center center",
      backgroundAttachment: "fixed",
      fontFamily: "'Roboto', sans-serif",

      "@media (max-width: 767px)": {
        
        padding: "10px",
      },
      "@media only screen and (min-device-width : 320px) and (max-device-width : 830px) and (orientation : landscape)": {
        height: "150vh",
      },
      // "@media only screen and (max-width : 768px) and (orientation : portrait)":
      // {
      //   height: "100vh",
      // },
      /* iPhone 5 ----------- */
      "@media only screen and (min-device-width: 568px) and (max-device-height: 320px) and (orientation : landscape)": {
        height: "200vh",
      },
      // "@media (max-width: 767px)": {
      //   miHeight: "100vh",
      //   height: "100vh",
      //   padding: "10px",
      // },
      // [theme.breakpoints.down("sm")]: {

      // },
    },
    muiDialogPaper:
    {
      "& .MuiDialog-paper":
      {
        borderRadius: "20px !important",
        border: "1px solid #ccc",
      },
     
    },
    muiDialogCard:
    {
      width: "350px",
      "@media (max-width: 767px)": {
        width: "100%",
        padding: "10px",
      },
    },
    leftBox: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100%",
      // '&.frmRow': {

      // }
    },
    cards: {
      display: "flex",
      backgroundColor: "white",
      border: "1px solid #f5f6fa",
      borderRadius: "0.3rem",
      justifyContent: "center",
      padding: "30px 0",
      position: "relative",
      [theme.breakpoints.up("sm")]: {
        width: "86vw",
        border: "none",
        paddinRight: "0",
      },
      [theme.breakpoints.up("xs")]: {
        // width: "100%",
        border: "none",
        paddinRight: "0",
      },

      // [theme.breakpoints.up("sm")]: {
      //    width: "75vw",
      // },
      [theme.breakpoints.up("md")]: {
        width: "63vw",
      },
      [theme.breakpoints.up("lg")]: {
        width: "49vw",
      },
      [theme.breakpoints.up("xl")]: {
        width: "35vw",
      },
      [theme.breakpoints.up("xxl")]: {
        width: "40vw",
      },
    },
    boxBorder: {
      content: "",
      top: "12%",
      right: "0",
      opacity: 0.5,
      position: "absolute",
      width: "1px",
      height: "72%",
      background: "rgb(218,218,218)",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    cardItem: {
      height: "auto",
      width: "50%",
      position: "relative",
      // margin: "1rem 0",
      // padding: "1rem",
      padding: "0 30px !important",
      [theme.breakpoints.down("xs")]: {
        display: "none",
        width: "100%",
      },
      "&:nth-child(2)": {
        [theme.breakpoints.down("lg")]: {
          // padding: "0 20px !important",
        },
      },
    },
    pedlerImage: {
      display: "flex",
      justifyContent: "center",
      marginTop: "5%",
    },  
    singIn: {
      display: "flex",
      // justifyContent: "space-between",
      alignItems: "center",
      // marginRight:"30px"
      // flexDirection:"row"
    },
    title: {
      color: "#383838",
      fontFamily: "'Roboto', sans-serif",
      whiteSpace: "nowrap",
      fontWeight: "bold",
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
    signupTitle: {
      whiteSpace: "nowrap",
      "&:hover": {
        textDecoration: "none",
        opacity: "0.7",
      },
    },
    button: {
      backgroundColor: "#4caeef",
      color: "white",
      "&:hover": {
        backgroundColor: "#4caeef",
        color: "white",
      },
      fontWeight: "bold",
      borderRadius: "10px",
      height: "48px",
    },
    button1: {
      border: "1px solid #999292",
      backgroundColor: "white",
      padding: "9px 25px",
      borderRadius: "15px",
      color: "#4caeef",
      boxShadow:
        "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
      "&:hover": {
        backgroundColor: "#4caeef",
        color: "white",
      },
      "&:focus": {
        backgroundColor: "#4caeef",
        color: "white",
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: "20px",
      },
    },
    btnGroup: {
      display: "block",
      marginTop: "1.5rem",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    input: {
      marginTop: "20px",
      marginBottom: "20px",
    },
    root: {
      minWidth: "400px",
      borderRadius: "8px",
      boxShadow:
        " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
    backdrop: {
      zIndex: 1,
      color: "#fff",
    },
    circle: {
      padding: "1rem",
      // background: "white",
      borderRadius: "50%",
      // marginTop: "15px",
      width: " 25px",
      height: "25px",
      display: "flex" /* or inline-flex */,
      alignItems: "center",
      justifyContent: "center",
      // boxShadow:
      //   "-2px -1px 6px 0px rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
    },
    Logo: {
      display: "block",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    desktopLogo: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    inputlabel: {
      display: "block",
      marginBottom: "10px",
      marginTop: "16px",
      color: "#C3C4CC",
      fontWeight: "bold",
      fontSize: "14px",
      fontFamily: "'Roboto', sans-serif",
    },
    InputTextField: {
      fontFamily: "'Roboto', sans-serif",
      background: "#f4f4f4 !important",
      padding: "15px",
      borderRadius: "5px",
      marginBottom: "5px",
      outline: "0",
      width: "100%",
      border: "2px solid transparent",
      fontSize: "14px !important",
      fontWeight: "bold !important",
      color: "#241c17",
      opacity: "0.8",
      "&::placeholder": {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#8B8B96",
      },
    },
    InputTextFieldError: {
      border: "2px solid #ff324c",
    },
    createOneText: {
      display: "flex !important",
      justifyContent: "center !important",
      color: "#5b5b5b",
      fontSize: "15px",
      fontWeight: "bold",
      whiteSpace: "nowrap",
    },
    peddelerText: {
      fontSize: ".9rem",
      color: "#8f8b8beb",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    validationSummary: {
      paddingLeft: "10px",
      color: "#ff324c",
      fontWeight: "bold",
      fontSize: "12px",
    },
    wecomeText: {
      color: "#241c17",
      opacity: "0.9",
      fontSize: "28px",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("md")]: {
        fontSize: "22px",
      },
    },
    sliderImage: {
      height: "220px",
      width: "250px",
      objectFit: "contain",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        height: "150px",
      },
    },
  } as any);

class EmailAccountLoginBlock extends EmailAccountLoginController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  handleClickOpen = () => {
    this.setState({
      setOpen: true,
    });
  };
  handleClose = () => {
    this.setState({
      setOpen: false,
    });
  };
  toggleLoginScreen = () => {
    this.setState((prevState) => ({ isLoginScreen: !prevState.isLoginScreen }));
  };

  render() {
    const { navigation, classes } = this.props;
    return (
      // Required for all blocks
      <div className={classes.mainDiv}>
        <div className={classes.cards}>
          <div
            className={classes.cardItem}
            style={{
              display: `${!this.state.isLoginScreen ? "block" : "none"}`,
            }}
          >
            <Box textAlign="center" className={classes.leftBox}>
              <Box p={1} mb={3} className={classes.desktopLogo}>
                <img src={peddlerImage} height="80px" width="80px" />
              </Box>
              <img src={sliderImage} className={classes.sliderImage} />
              <div className={classes.frmRow}>
                <Box
                  m={1}
                  fontSize="h5.fontSize"
                  fontWeight="fontWeightBold"
                  className={classes.wecomeText}
                >
                  Welcome to Peddler
                </Box>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className={classes.peddelerText}
                >
                  study how you want, where you want
                </Typography>
              </div>
              <Box className={classes.btnGroup}>
                {/* <Box m={1}>
                  <Button fullWidth className={classes.button}>
                    <Box
                      p={1}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <img src={googleIcon} width="20px" alt="icons" />
                    </Box>
                    Sign up With Google
                  </Button>
                </Box>
                <Box m={1}>
                  <Button fullWidth className={classes.button}>
                    <Box
                      p={1}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <img src={fbIcon} height="20px" alt="icons" />
                    </Box>
                    Sign up With FaceBook
                  </Button>
                </Box>
                <Box m={1}>
                  <Button fullWidth className={classes.button}>
                    <Box
                      p={1}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <img src={appleIcon} width="20px" alt="icons" />
                    </Box>
                    Sign up With Apple
                  </Button>
                </Box>
                 */}
                <SocialMediaAccountLoginScreen isMobileScreen={true} />

                <Box m={1}>
                  <Button
                    fullWidth
                    className={classes.button1}
                    onClick={this.toggleLoginScreen}
                  >
                    Sign In With Email
                  </Button>
                </Box>

                <Box m={1} mt={3} mb={0}>
                  <p
                    className={classes.createOneText}
                    style={{
                      marginBottom: "0px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Don't have an account? {"    "}
                    <Link
                      className={classes.signupTitle}
                      style={{
                        color: "#4caeef",
                        cursor: "pointer",
                        marginLeft: "0px",
                        marginBottom: "0px",
                        whiteSpace: "nowrap",
                      }}
                      href="/EmailAccountRegistration"
                    >
                      &nbsp;Create One
                    </Link>
                  </p>
                </Box>
              </Box>
            </Box>
            <Box className={classes.boxBorder} />
          </div>
          <div
            className={classes.cardItem}
            style={{
              borderLeft: `${!this.state.isLoginScreen ? "1px solid #fff" : "none"
                }`,
              display: `${this.state.isLoginScreen ? "block" : ""}`,
            }}
          >
            <Box mt={3} mb={3} className={classes.Logo}>
              <img src={peddlerImage} width="80px" alt="Logo" />
            </Box>
            <div className={classes.singIn}>
              {this.state.isLoginScreen && (
                <IconButton
                  style={{
                    backgroundColor: "#cccccc33",
                    height: "50px",
                    width: "50px",
                  }}
                  onClick={this.toggleLoginScreen}
                >
                  <KeyboardBackspaceIcon />
                </IconButton>
              )}
              <Box
                p={1}
                fontSize="h4.fontSize"
                fontWeight="fontWeightBold"
                className={classes.title}
              >
                Sign In
              </Box>
              {!this.state.isLoginScreen && (
                <Box ml="auto">
                  <SocialMediaAccountLoginScreen isMobileScreen={false} />
                </Box>
              )}
            </div>

            <div style={{ marginTop: "20%" }}>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validateOnBlur={false}
                validationSchema={Yup.object().shape({
                  email: Yup.string().required("Email is required"),
                  password: Yup.string().required("Password is required "),
                })}
                onSubmit={(values) => {
                  this.doEmailLogIn(values);
                }}
                render={({
                  values,
                  errors,
                  touched,
                  handleChange,
                  isValid,
                  handleBlur,
                  setFieldTouched,
                  isSubmitting,
                  handleSubmit,
                }) => (
                  <form className="commonFrm" onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <label className={classes.inputlabel}>
                          Username or email
                        </label>

                        <Field
                          type="text"
                          name="email"
                          placeholder="Eg: Mike Smith"
                          //autoComplete="off"
                          className={classes.InputTextField}
                        // className={`form-control ${this.props.mode &&
                        //   "dark2"}`}
                        />
                        <span className={classes.validationSummary}>
                          <ErrorMessage name="email" />
                        </span>
                      </Grid>
                      <Grid item xs={12}>
                        <label className={classes.inputlabel}>
                          Password
                        </label>

                        <Field
                          type="password"
                          name="password"
                          //autoComplete="off"
                          className={classes.InputTextField}
                          placeholder="********"
                        // className={`form-control ${this.props.mode &&
                        //   "dark2"}`}
                        />
                        <span className={classes.validationSummary}>
                          <ErrorMessage name="password" />
                        </span>
                      </Grid>
                    </Grid>

                    <div>
                      <div className={classes.forgotPassword}>
                        <p
                          style={{
                            color: "#4caeef",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            fontWeight: 600,
                            fontSize: "15px",
                          }}
                          onClick={this.handleClickOpen}
                        >
                          Forgot password?
                        </p>
                      </div>
                      <div className={classes.forgotPassword}>
                        <Button
                          className={classes.button}
                          type="submit"
                          fullWidth
                          variant="contained"
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              />
            </div>

            <div style={{ marginTop: "20px" }}>
              <p
                //onClick={this.goToEmailAccountRegistration}
                className={classes.createOneText}
              >
                Don't have an account?
                <Link
                  className={classes.signupTitle}
                  style={{
                    color: "#4caeef",
                    cursor: "pointer",
                    marginLeft: "6px",
                    fontWeight: 600,
                    fontSize: "15px",
                    whiteSpace: "nowrap",
                  }}
                  href="/EmailAccountRegistration"
                >
                  &nbsp;Create One
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* forgot password modal */}
        <Dialog className={classes.muiDialogPaper}
          // onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.setOpen}
        >
          <Box p={3} className={classes.muiDialogCard} >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box m={1}
                className={classes.title}
                fontSize="h6.fontSize"
                fontWeight="fontWeightBold">
                Forgot password
              </Box>
              <div className={classes.circle}>
                <IconButton onClick={this.handleClose}>
                  <img
                    src={closeIcon}
                    style={{
                      height: "15px",
                      width: "15px",
                      zIndex: 1000,
                      cursor: "pointer",
                    }}
                  />
                </IconButton>
              </div>
            </Box>
            <Box m={1} mt={3}>
              <Formik
                initialValues={{
                  email: "",
                }}
                validateOnBlur={false}
                validationSchema={Yup.object().shape({
                  email: Yup.string().required("Email is required"),
                })}
                onSubmit={(values) => {
                  this.doForgotPassword(values);
                }}
                render={({
                  values,
                  errors,
                  touched,
                  handleChange,
                  isValid,
                  handleBlur,
                  setFieldTouched,
                  isSubmitting,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className={classes.inputlabel}> Email</label>
                    <Field
                      name="email"
                      type="email"
                      size="small"
                      placeholder="Eg: Mike@gmail.com"
                      className={classes.InputTextField}
                      fullWidth
                      // label="Email"
                      value={values.email}
                      variant="outlined"
                      helperText={
                        <span style={{ color: "red" }}>{errors.email}</span>
                      }
                      error={errors.email && touched.email ? true : false}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <CardActions style={{ justifyContent: "center" }}>
                      <Button
                        className={classes.button}
                        type="submit"
                        variant="contained"
                      >
                        CONFIRM EMAIL
                      </Button>
                    </CardActions>
                  </form>
                )}
              />
            </Box>
          </Box>
        </Dialog>
      </div>
    );
  }
}
const EmailAccountLoginWithRouter = withRouter(EmailAccountLoginBlock);
const EmailAccountLoginWithToast = withToast(EmailAccountLoginWithRouter);
const EmailAccountLoginWithLoader = withLoader(EmailAccountLoginWithToast);
const EmailAccountLoginWithAlertBox = withAlertBox(EmailAccountLoginWithLoader);
export default withStyles(styles)(EmailAccountLoginWithAlertBox);
// Customizable Area Start

// Customizable Area End
