import React from "react";

// Customizable Area Start
import Radio from "@material-ui/core/Radio";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SocialMediaLogin from "../../social-media-account-login/src/SocialMediaAccountLoginScreen.web";
//@ts-ignore
import CustomCheckBox from "../../../components/src/CustomCheckBox";
// Customizable Area End
import {
  Box,
  Link,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
  IconButton,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { createStyles, withStyles } from "@material-ui/core/styles";
// Customizable Area End
import { withRouter } from "react-router-dom";

import "../../catalogue/assets/css/login.css";

import EmailAccountRegistrationController, {
  Props,
} from "./EmailAccountRegistrationWebController";
import { fbIcon, googleIcon, background, peddlerImage } from "./assets";
import SocialMediaAccountRegistrationScreen from "../../social-media-account-registration/src/SocialMediaAccountRegistrationScreen.web";

const styles = (theme: any) =>
  createStyles({
    mainDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontFamily: "'Roboto', sans-serif",
      background: "#46b3f0",
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat;",
      backgroundPosition: "center center",
      backgroundAttachment: "fixed",
      overflowX: "hidden",
      // [theme.breakpoints.down("sm")]: {

      //   // height: "100vh",
      //   // padding:"20px",
      //   // backgroundImage: `url(${background})`,
      //   // backgroundSize: "cover",
      // },
      "@media screen and (max-width : 767px)": {
        background: "#fff",
        paddingTop: "50px",
      },
      "@media only screen and (min-device-width : 320px) and (max-device-width : 830px) and (orientation : landscape)": {
        height: "170vh",
        padding: "20px",

        background: "#46b3f0",
      },
      "@media only screen and (min-device-width: 320px) and (max-device-height: 568px) and (orientation : portrait)": {
        paddingTop: "150px",
        // marginTop: "250px",
      },
      "@media only screen and (min-device-width: 320px) and (max-device-height: 568px) and (orientation : landscape)": {
        paddingTop: "250px",
        // marginTop: "250px",
      },
    },
    cards: {
      display: "flex",
      backgroundColor: "white",
      borderRadius: "20px",
      border: "1px solid #f5f6fa",
      width: "400px",
      // justifyContent: "center",
      // [theme.breakpoints.down("sm")]: {
      //   width: "300px",
      // },
      [theme.breakpoints.down("md")]: {
        width: "300px",
      },
      [theme.breakpoints.down("lg")]: {
        width: "500px",
      },
      // width: 360px;
      // border: 1px solid #f5f6fa;
      // display: flex;
      // border-radius: 20px;
      // /* justify-content: center; */
      // background-color: white;
      [theme.breakpoints.down("xs")]: {
        border: "none",
      },
    },
    cardItem: {
      height: "auto",
      margin: "1rem 0",
      padding: "1rem",
      width: "100%",
    },
    pedlerImage: {
      display: "flex",
      justifyContent: "center",
      marginTop: "5%",
    },
    singIn: {
      display: "flex",
      flexDirection: "space-between",
      // marginRight:"30px"
      // flexDirection:"row"
    },
    title: {
      color: "#383838",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.6em",
      },
    },
    inputlabel: {
      display: "block",
      margin: "5px 0",
      // marginTop: "16px",
      color: "#C3C4CC",
      // fontWeight: "bold",
      fontSize: "14px",
    },
    InputTextField: {
      background: "#f8f8f8 !important",
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
      borderColor: "#ff324c",
    },
    validationSummary: {
      paddingLeft: "10px",
      color: "#ff324c",
      fontWeight: "bold",
      fontSize: "12px",
    },
    agreeText: {
      color: "#241c17",
      fontWeight: "600",
      fontSize: "13px",
    },
    signupTitle: {
      whiteSpace: "nowrap",
      "&:hover": {
        textDecoration: "none",
        opacity: "0.7",
      },
    },
    lead: {
      color: "#241c17",
      fontWeight: "600",
      fontSize: "13px",
    },
    continueBtn: {
      marginTop: "20px",
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
    confirmInput: {
      marginTop: "20px",
      marginBottom: "20px",
    },
    root: {
      minWidth: "400px",
      borderRadius: "8px",
      boxShadow:
        " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
    backButton: {
      backgroundColor: "#cccccc33",
      display: "none",
      [theme.breakpoints.down("xs")]: {
        display: "block",
      },
    },
    socialMedia: {
      // display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    Logo: {
      display: "block",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
  } as any);

class EmailAccountRegistration extends EmailAccountRegistrationController {
  constructor(props: Props) {
    super(props);
  }
  changeRadioButton = (e?: any) => {
    this.setState({
      selectedValue: e.target.value,
    });
  };
  checkPolicy = () => {
    this.setState({
      checkedB: !this.state.checkedB,
    });
  };
  render() {
    const { navigation, classes } = this.props;

    return (
      <div className={classes.mainDiv}>
        <div className={classes.cards}>
          <div className={classes.cardItem}>
            <Box mt={3} mb={3} className={classes.Logo}>
              <img src={peddlerImage} width="80px" alt="Logo" />
            </Box>
            <div className={classes.singIn}>
              <IconButton
                style={{ height: "50px", width: "50px" }}
                className={classes.backButton}
                onClick={this.goToPage}
              >
                <KeyboardBackspaceIcon />
              </IconButton>
              <Box
                m={1}
                fontSize="h4.fontSize"
                fontWeight="fontWeightBold"
                className={classes.title}
              >
                Sign up
              </Box>
              <Box ml="auto" className={classes.socialMedia}>
                <SocialMediaAccountRegistrationScreen
                  isMobileScreen={true}
                />
              </Box>
            </div>

            <div style={{ marginTop: "5%" }}>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                }}
                validateOnBlur={false}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required("Full name is required"),
                  email: Yup.string()
                    .required("Email is required")
                    .matches(
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      "Pls Enter a valid email"
                    ),
                  password: Yup.string()
                    .matches(
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{7,20}\S$/,
                      "Your password must contains atleast 8 or more characters with a mix of letters, numbers & special characters"
                    )
                    .required("Password is required "),
                })}
                onSubmit={(values) => {
                  console.log(values);
                  if (this.state.selectedValue === "") {
                    this.setState({
                      radioButtonValidation: true,
                    });
                  } else {
                    this.createAccount(values);
                  }
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
                    {/* <Grid container spacing={1}> */}
                    <Grid item xs={12}>
                      <label className={classes.inputlabel}>
                        Full Name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        autoComplete="off"
                        className={classes.InputTextField}
                        placeholder="Name"
                      />
                      <span className={classes.validationSummary}>
                        <ErrorMessage name="name" />
                      </span>
                    </Grid>
                    {/* <p>Make your account as</p> */}
                    <label className={classes.inputlabel}>
                      Make your account as
                    </label>
                    <FormControlLabel
                      value="end"
                      control={
                        <Radio
                          color="primary"
                          value="student"
                          onChange={this.changeRadioButton}
                          checked={this.state.selectedValue == "student"}
                        />
                      }
                      label="Student"
                    />

                    <FormControlLabel
                      value="end"
                      control={
                        <Radio
                          color="primary"
                          value="publisher"
                          onChange={this.changeRadioButton}
                          checked={this.state.selectedValue == "publisher"}
                        />
                      }
                      label="Publisher"
                    />
                    {this.state.radioButtonValidation == true ? (
                      <p>Make you account is invalid</p>
                    ) : (
                      <></>
                    )}

                    <Grid item xs={12}>
                      <label className={classes.inputlabel}>
                        Email Addres
                      </label>
                      <Field
                        type="email"
                        name="email"
                        autoComplete="off"
                        className={classes.InputTextField}
                        placeholder="Email"
                        // className={`form-control ${this.props.mode &&
                        //   "dark2"}`}
                      />
                      <span className={classes.validationSummary}>
                        <ErrorMessage name="email" />
                      </span>
                    </Grid>
                    <Grid item xs={12}>
                      <label className={classes.inputlabel}>Password</label>
                      <Field
                        type="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Password"
                        className={classes.InputTextField}
                        // className={`form-control ${this.props.mode &&
                        //   "dark2"}`}
                      />
                      <span className={classes.validationSummary}>
                        <ErrorMessage name="password" />
                      </span>
                    </Grid>
                    <div>
                      <Box display="flex" alignItems="center" mt={1}>
                        <Checkbox
                          style={{ paddingLeft: "0" }}
                          checked={this.state.checkedB}
                          onChange={this.checkPolicy}
                          value={this.state.checkedB}
                          color="primary"
                        />
                        <Box
                          fontSize="0.875rem"
                          className={classes.agreeText}
                        >
                          I agree
                          <Link
                            className={classes.signupTitle}
                            style={{
                              color: "#4caeef",
                              cursor: "pointer",
                              fontSize: "13px",
                              marginLeft: "0px",
                              marginBottom: "0px",
                            }}
                          >
                            {" "}
                            Privacy Policy{" "}
                          </Link>
                          in using this App.
                        </Box>
                      </Box>
                      <div className={classes.continueBtn}>
                        <Button
                          className={classes.button}
                          type="submit"
                          fullWidth
                          variant="contained"
                        >
                          Continue
                        </Button>
                      </div>
                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <p className={classes.lead}>
                          Already have an account?{" "}
                          <Link
                            className={classes.signupTitle}
                            style={{ color: "#4caeef", cursor: "pointer" }}
                            onClick={this.goToPage}
                          >
                            Sign in
                          </Link>
                        </p>
                      </div>
                    </div>
                  </form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//@ts-ignore
const EmailAccountRegistrationRouter = withRouter(EmailAccountRegistration);
export default withStyles(styles)(EmailAccountRegistrationRouter);
