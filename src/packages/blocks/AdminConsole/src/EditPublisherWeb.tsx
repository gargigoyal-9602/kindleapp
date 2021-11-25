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
import withTheme from "../../../components/src/Theme/withTheme";
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
import withLoader from "../../../components/src/withLoader.Web";
import { CloseIcon } from "./assets";
// Customizable Area End

import EditPublisherController, {
  Props,
  configJSON,
} from "./EditPublisherController";

const Schema = Yup.object().shape({
  fullName: Yup.string().required("This field is required."),
});

class EditPublisher extends EditPublisherController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  componentDidMount(): any {
    const isPublisher =
      window.location.pathname.split("/")[3] == "EditPublisher";
    const { location }: any = this.props;
    const { state }: any = location;
    if (location && state && state.publisher) {
      this.setState({ publisher: state.publisher });
    } else {
      this.handleRoutes(
        `/AdminConsole/edit/${isPublisher ? "publishers" : "students"}`
      );
    }
  }
  handleRoutes = (route: any) => {
    this.props.history.push(route);
  };
  // Customizable Area End

  render() {
    const { classes }: any = this.props;
    const isPublisher =
      window.location.pathname.split("/")[3] == "EditPublisher";
    return (
      <Box m={3} className={classes.root}>
        <Grid
          container
          direction="row"
          justifyContent="center"
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
                  variant="h5"
                  className={`${classes.h4} ${this.props.mode &&
                    classes.darkFont}`}
                >
                  Edit {isPublisher ? "Publisher" : "Student"}
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
                    <img
                      src={CloseIcon}
                      className={classes.iconClose}
                      alt="close icon"
                    />
                  </IconButton>
                </Box>
              </Box>
              <Formik
                enableReinitialize
                initialValues={{
                  fullName: this.state.publisher.name || "",
                  email: this.state.publisher.email || "",
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
                                style={{
                                  color: "#a6a7af",
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  marginBottom: "15px",
                                }}
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
                                  touched.fullName && Boolean(errors.fullName)
                                }
                                helperText={touched.fullName && errors.fullName}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Typography
                                variant="body1"
                                style={{
                                  color: "#a6a7af",
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  marginBottom: "15px",
                                }}
                              >
                                Email
                              </Typography>
                              <Field
                                disabled={true}
                                id="email"
                                component={TextField}
                                required
                                fullWidth
                                variant="filled"
                                name="email"
                                placeholder="Eg: mikesmith@example.com"
                                onChange={handleChange}
                                value={values.email}
                                className={classes.textField}
                                InputProps={{
                                  className: classes.input,
                                }}
                                style={{ opacity: "0.6" }}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <Link
                                variant="body1"
                                className={classes.resetpasswordLink}
                                onClick={() => {
                                  this.doForgotPassword(values);
                                }}
                              >
                                Reset Password
                              </Link>
                            </Grid>
                            <Grid item xs={12}>
                              <Box
                                mt={3}
                                style={{
                                  width: "100%",
                                  paddingTop: "11px",
                                  paddingBottom: "15px",
                                  margin: "0 auto",
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Button
                                  type="submit"
                                  size="large"
                                  className={
                                    classes.btn + " " + classes.primary
                                  }
                                >
                                  Update {isPublisher ? "Publisher" : "Student"}
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
const EditPublisherAlertBox = withAlertBox(EditPublisher);
const EditPublisherLoader = withLoader(EditPublisherAlertBox);
const EditPublisherWithTHeme = withTheme(EditPublisherLoader);
const EditPublisherToast = withToast(EditPublisherWithTHeme);
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
    h4: {
      color: "black",
      fontSize: "30px",
      fontWeight: "bold",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("sm")]: {
        fontSize: "27px",
      },
    },
    modal: {
      backgroundColor: "#fff",
      borderRadius: "20px",
      "& .MuiBox-root-21": {
        width: "90% !important",
        "@media (max-width: 1024px)": {
          margin: "0 auto",
          padding: "10px",
        },
      },
      "& .MuiBox-root-22": {
        width: "auto !important",
      },
      "& .MuiIconButton-root:hover": {
        backgroundColor: "transparent !important",
      },
    },
    iconClose: {
      width: "90px",
      "@media (max-width: 767px)": {
        width: "70px",
      },
    },

    textField: {
      width: "100%",
      "& .MuiFormHelperText-root.Mui-error": {
        marginTop: "-8px",
      },
    },
    resetpasswordLink: {
      textDecoration: "none !important",
      cursor: "pointer",
      color: "#3aaeef",
      fontWeight: "bold",
      fontSize: "14px",
      marginBottom: "15px",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
    },
    selectField: {
      backgroundColor: "#F4F4F4 !important",
      border: "2px solid #F4F4F4",
      // padding: "22px 17px",
      fontWeight: 600,
      fontSize: 15,
      color: "#a6a7af",
      borderRadius: 15,
      height: "60px",
      "& .MuiSelect-selectMenu": {
        height: "32px",
      },
      "& .MuiSelect-select:focus": {
        backgroundColor: "#F4F4F4 !important",
        borderRadius: 15,
      },
      "&.MuiFilledInput-underline:before": {
        borderBottom: "0 !important",
      },
      "&.MuiFilledInput-underline:after": {
        borderBottom: "0 !important",
      },
    },

    input: {
      borderRadius: "10px !important",
      marginBottom: 15,
      backgroundColor: "#f4f4f4",
      "&.MuiFilledInput-root:hover": {
        backgroundColor: "transparent",
      },

      "&.Mui-disabled": {
        backgroundColor: "#F4F4F4 !important",
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
          "&.Mui-disabled": {
            border: "2px solid transparent",
          },
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
      textTransform: "uppercase",
      boxShadow: "0px 8px 10px 0px rgb(0 0 0 / 20%)",
      "@media (max-width: 767px)": {
        padding: "10px 15px",
      },
    },
    primary: {
      color: "#fff",
      backgroundColor: "#3aaeef",
      "& .MuiButton-label": {
        textTransform: "uppercase",
        fontWeight: 400,
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
  })
)(EditPublisherToast);
