import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";

import {
  withStyles,
  createStyles,
  Grid,
  Box,
  Paper,
  Breadcrumbs,
  Typography,
  Link,
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Select,
  Menu,
  MenuItem,
  InputLabel,
  TextField,
  IconButton,
} from "@material-ui/core";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import withAlertBox from "../../../components/src/withAlertBox.Web";
import withToast from "../../../components/src/withSnackBar.Web";
import withTheme from "../../../components/src/Theme/withTheme";
import withLoader from "../../../components/src/withLoader.Web";
import { CloseIcon } from "./assets";
// Customizable Area End

import AddPublisherController, {
  Props,
  configJSON,
} from "./AddPublisherController";
import { ClientRequest } from "http";

const Schema = Yup.object().shape({
  fullName: Yup.string().required("This field is required."),
  email: Yup.string()
    .required("This field is required.")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    ,"Pls Enter a valid email"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{7,20}\S$/,
      "Your password must contains atleast 8 or more characters with a mix of letters, numbers & special characters"
    )
    .required("This field is required"),
});

class AddPublisher extends AddPublisherController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    const { classes }: any = this.props;
    return (
      <Box m={3} className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              className={`${classes.paperBox} ${this.props.mode &&
                classes.dark1}`}
            >
              <Box className={classes.modalHeader}>
                <Typography
                  variant="h4"
                  className={`${classes.h4} ${this.props.mode &&
                    classes.darkFont}`}
                >
                  Add Publisher
                </Typography>
                <Box
                  ml="auto"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <IconButton
                    className={classes.removeIconBtn}
                    size="small"
                    onClick={() => this.props.history.goBack()}
                  >
                    <img src={CloseIcon} alt="close icon" />
                  </IconButton>
                </Box>
              </Box>
              <Formik
                enableReinitialize
                initialValues={{
                  fullName: "",
                  email: "",
                  password: "",
                }}
                validationSchema={Schema}
                onSubmit={(values, actions) => {
                  this.handlePublisherSave(values);
                }}
              >
                {(formikProps) => {
                  const {
                    values,
                    setFieldValue,
                    handleChange,
                    touched,
                    errors,
                  } = formikProps;
                  return (
                    <Form translate="no" noValidate autoComplete="off">
                      <Grid
                        container
                        spacing={3}
                        className={classes.bookUploadContainer}
                      >
                        <Grid item xs={12}>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <Typography
                                variant="body1"
                                className={classes.formLabel}
                              >
                                Full Name
                              </Typography>
                              <Field
                                component={TextField}
                                required
                                id="fullName"
                                name="fullName"
                                fullWidth
                                variant="filled"
                                placeholder="Eg: Mike Smith"
                                onChange={handleChange}
                                value={values.fullName}
                                className={`${classes.textField} ${this.props
                                  .mode && classes.darkInput}`}
                                InputProps={{
                                  className: `${classes.input} ${this.props
                                    .mode && classes.darkIn}`,
                                }}
                                error={
                                  touched.fullName &&
                                  Boolean(errors.fullName)
                                }
                                helperText={
                                  touched.fullName && errors.fullName
                                }
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Typography
                                variant="body1"
                                className={classes.formLabel}
                              >
                                Email
                              </Typography>
                              <Field
                                id="email"
                                component={TextField}
                                required
                                fullWidth
                                variant="filled"
                                name="email"
                                placeholder="Eg: mikesmith@example.com"
                                onChange={handleChange}
                                value={values.email}
                                className={`${classes.textField} ${this.props
                                  .mode && classes.darkInput}`}
                                InputProps={{
                                  className: `${classes.input} ${this.props
                                    .mode && classes.darkIn}`,
                                }}
                                error={
                                  touched.email && Boolean(errors.email)
                                }
                                helperText={touched.email && errors.email}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Typography
                                variant="body1"
                                className={classes.formLabel}
                              >
                                Password
                              </Typography>
                              <Field
                                id="password"
                                required
                                fullWidth
                                type="password"
                                variant="filled"
                                name="password"
                                placeholder="********"
                                onChange={handleChange}
                                value={values.password}
                                component={TextField}
                                className={`${classes.textField} ${this.props
                                  .mode && classes.darkInput}`}
                                InputProps={{
                                  className: `${classes.input} ${this.props
                                    .mode && classes.darkIn}`,
                                }}
                                error={
                                  touched.password &&
                                  Boolean(errors.password)
                                }
                                helperText={
                                  touched.password && errors.password
                                }
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Box mt={3}>
                                <Button
                                  type="submit"
                                  fullWidth
                                  size="large"
                                  className={
                                    classes.btn + " " + classes.primary
                                  }
                                >
                                  ADD PUBLISHER
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Form>
                  );
                }}
              </Formik>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

// Customizable Area Start
const AddPublisherAlertBox = withAlertBox(AddPublisher);
const AddPublisherLoader = withLoader(AddPublisherAlertBox);
const AddPublisherTheme = withTheme(AddPublisherLoader);
const AddPublisherToast = withToast(AddPublisherTheme);
// Customizable Area End
export default withStyles((theme) =>
  createStyles({
    root: {
      width: "100% !important",
      margin: "24px auto",
      padding: 10,
    },
    paperBox: {
      width: "100% !important",
      margin: "0 auto",
      padding: "30px 35px 40px 35px",
      backgroundColor: "#fff",
      borderRadius: "20px",
      [theme.breakpoints.down("sm")]: {
        padding: "15px",
      },
    },
    h4: {
      fontWeight: "bold",
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
    removeIconBtn: {
      "& img": {
        width: "100px",
        height: "100px",
      },
    },
    modalHeader: {
      display: "flex",
      alignItems: "center",
      width: "100% !important",
      marginBottom: "30px",
      "& div": {
        height: "50px",
      },
      "& button": {
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
    },
    formLabel: {
      fontWeight: 600,
      fontSize: 13,
      color: "#a6a7af",
      marginBottom: 15,
    },
    input: {
      borderRadius: "10px !important",
      marginBottom: 15,
      backgroundColor: "transparent",
      "&.MuiFilledInput-root:hover": {
        backgroundColor: "transparent",
      },
      "& input": {
        padding: "22px 17px",
        fontWeight: 600,
        fontSize: 15,
        color: "#a6a7af",
        backgroundColor: "#F4F4F4 !important",
        border: "2px solid #F4F4F4",
        borderRadius: 15,
        "&:hover": {
          borderColor: "#3b9dd4",
        },
        "&:focus": {
          borderColor: "#3b9dd4",
        },
      },
      "& textarea": {
        padding: "22px 17px",
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
    btn: {
      backgroundColor: "#fff",
      borderRadius: "14px",
      padding: "15px 25px",
      color: "rgb(0,0,0, 0.8)",
      boxShadow: "0px 8px 10px 0px rgb(0 0 0 / 20%)",
      "@media (max-width: 767px)": {
        padding: "10px 15px",
      },
    },
    primary: {
      color: "#fff",
      backgroundColor: "#3aaeef",
      "& .MuiButton-label": {
        textTransform: "initial",
        // textTransform: "uppercase",
        fontWeight: 600,
        fontSize: "15px",
        whiteSpace: "nowrap",
        "@media (max-width: 767px)": {
          fontSize: "13px",
        },
      },
      "&:hover": {
        backgroundColor: "#3b9dd4",
        boxShadow: "0px 8px 10px 0px rgb(0 0 0 / 20%)",
      },
    },
    dark3: {
      backgroundColor: "#1f2023 !important",
      color: "#fff !important",
    },
    dark2: {
      backgroundColor: "#2f3134 !important",
      color: "#fff !important",
    },
    dark1: {
      backgroundColor: "#424242 !important",
      color: "#fff !important",
    },
    darkFont: {
      color: "#fff !important",
    },
    darkInput: {
      "& input": {
        color: "white !important",
        backgroundColor: "#303030 !important",
        border: "1px solid #9b9da4",
        "&:hover": {
          borderColor: "#3b9dd4",
        },
        "&:focus": {
          borderColor: "#3b9dd4",
        },
      },
    },
    darkIn: {
      backgroundColor: "transparent !important",
    },
  })
)(AddPublisherToast);
