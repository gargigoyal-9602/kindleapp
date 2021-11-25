import React from "react";
import {
  createStyles,
  withStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";

//Customizable Area Start
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";

import { Formik } from "formik";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import ForgotPasswordController, { Props } from "./ForgotPasswordController";
import { closeIcon } from "./assets";
// import NewPassword from "./NewPassword";
//Customizable Area End
const styles = {
  mainDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",

    "@media (max-width: 767px)": {
      margin: "10px",
    },
  },
  card: {
    borderRadius: "8px",
    // backgroundColor:"white",
    height: "200px",
    border: "1px solid #e4e8f0",
  },
  root: {
    padding: "16px",
    minWidth: "490px",
    borderRadius: "24px",
    "@media (max-width: 767px)": {
      minWidth: "100%",
    },
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    "&:last-child": {
      paddingBottom: "16px !important",
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
  input: {
    borderRadius: "10px !important",
    marginBottom: 15,
    backgroundColor: "#f4f4f4",
    "&.MuiFilledInput-root:hover": {
      backgroundColor: "transparent",
    },
    "& input": {
      padding: "15px 17px",
      fontWeight: 600,
      fontSize: 15,
      color: "#a6a7af",
      backgroundColor: "#F4F4F4 !important",
      border: "2px solid #F4F4F4",
      borderRadius: 5,
    },
    "& textarea": {
      padding: "15px 17px",
      fontWeight: 600,
      fontSize: 15,
      color: "#a6a7af",
    },
    "&::before": {
      borderBottom: "0 !important",
    },
    "&::after": {
      borderBottom: "0 !important",
    },
    "&::hover": {
      borderBottom: "0 !important",
      backgroundColor: "#f4f4f4",
      border: "1px solid #3b9dd4",
    },
    "&::focus": {
      borderBottom: "0 !important",
      backgroundColor: "#F4F4F4 !important",
      border: "1px solid #3b9dd4",
    },
    "&::placeholder": {
      color: "#a6a7af",
      opacity: 1,
    },
  },
  InputTextFieldError: {
    border: "2px solid #ff324c",
  },
  closeImg: {
    width: "6rem",
    zIndex: 1000,
    cursor: "pointer",
    borderRadius: "50%",

    // boxShadow:
    //   "-2px -1px 6px 0px rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
    "@media (max-width: 767px)": {
      width: "4rem",
    },
  },

  resetPassword: {
    fontSize: 32,
    marginTop: 0,
    fontWeight: 600,
    fontFamily: "'Roboto', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "@media (max-width: 767px)": {
      fontSize: 25,
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
    width: "263px",
    "@media (max-width: 767px)": {
      width: "200px",
    },
  },
} as any;
class NewPassword extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);
    //Customizable Area Start
    //Customizable Area End
  }

  render() {
    const { navigation, classes } = this.props;

    return (
      <div className={classes.mainDiv}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <p className={classes.resetPassword}>
              <span>Reset Password</span>

              <img
                src={closeIcon}
                className={classes.closeImg}
                onClick={() => {
                  //@ts-ignore
                  this.props.history.push("/");
                }}
              />
            </p>

            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validateOnBlur={false}
              validationSchema={Yup.object().shape({
                // email: Yup.string()
                // .email("Invalid email address")
                // .required("Please enter an email address"),
                password: Yup.string()
                  .matches(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{7,20}\S$/,
                    "Your password must contains atleast 8 or more characters with a mix of letters, numbers & special characters"
                  )
                  .required("Password is required "),
                confirmPassword: Yup.string()
                  .required("Re-enter password to confirm")
                  .test("password-match", "Password must match", function(
                    value
                  ) {
                    return this.parent.password === value;
                  }),
              })}
              onSubmit={(values) => {
                console.log(values);
                this.goToConfirmationAfterPasswordChange(values);
                // this.props.nextStep(values);
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
                  <label htmlFor="password" className={classes.inputlabel}>
                    New Password
                  </label>
                  <TextField
                    name="password"
                    type="password"
                    size="small"
                    fullWidth
                    placeholder="******"
                    InputProps={{
                      className: classes.input,
                    }}
                    className={classes.InputTextField}
                    value={values.password}
                    helperText={
                      <span style={{ color: "red" }}>{errors.password}</span>
                    }
                    error={errors.password && touched.password ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label
                    htmlFor="confirmPassword"
                    className={classes.inputlabel}
                  >
                    Confirm Password
                  </label>
                  <TextField
                    name="confirmPassword"
                    type="password"
                    size="small"
                    fullWidth
                    placeholder="******"
                    InputProps={{
                      className: classes.input,
                    }}
                    value={values.confirmPassword}
                    className={classes.InputTextField}
                    helperText={
                      <span style={{ color: "red" }}>
                        {errors.confirmPassword}
                      </span>
                    }
                    error={
                      errors.confirmPassword && touched.confirmPassword
                        ? true
                        : false
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <CardActions style={{ justifyContent: "center" }}>
                    <Button
                      className={classes.button}
                      type="submit"
                      variant="contained"
                    >
                      RESET PASSWORD
                    </Button>
                  </CardActions>
                </form>
              )}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}
//@ts-ignore
const passRouter = withRouter(NewPassword);
export default withStyles(styles)(passRouter);

// Customizable Area Start
