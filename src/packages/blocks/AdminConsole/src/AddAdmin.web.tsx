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
import withLoader from "../../../components/src/withLoader.Web";
import { CloseIcon } from "./assets";
// Customizable Area End

import AddAdminController, { Props, configJSON } from "./AddAdmin.controller";

const Schema = Yup.object().shape({
  fullName: Yup.string().required("This field is required."),
  email: Yup.string().required("This field is required."),
  password: Yup.string().required("This field is required."),
});

class AddAdmin extends AddAdminController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount(): any {
    const { location }: any = this.props;
    const { state }: any = location;
    if (location && state && state.admin) {
      this.setState({ admin: state.admin });
    }
  }
  // Customizable Area End

  render() {
    const { classes }: any = this.props;
    return (
      <Box m={3} className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3}>
              <Box p={3} m={3}>
                <Box display="flex">
                  <Typography variant="h4">
                    {!this.props.location.state.admin
                      ? "Add Admin"
                      : "Edit Admin"}
                  </Typography>
                  <Box
                    ml="auto"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <IconButton
                      size="small"
                      onClick={() => this.props.history.goBack()}
                    >
                      <img src={CloseIcon} width="50px" alt="close icon" />
                    </IconButton>
                  </Box>
                </Box>
                <Formik
                  enableReinitialize
                  initialValues={{
                    fullName: this.state.admin.name,
                    email: this.state.admin.email,
                    password: "",
                  }}
                  validationSchema={Schema}
                  onSubmit={(values, actions) => {
                    this.handleAdminSave(values);
                  }}
                >
                  {(formikProps) => {
                    const { values, setFieldValue, handleChange } = formikProps;
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
                                <Typography variant="body1">
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
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="body1">Email</Typography>
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
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="body1">
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
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Box mt={3}>
                                  <Button
                                    type="submit"
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                  >
                                    Add ADMIN
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
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

// Customizable Area Start
const AddAdminAlertBox = withAlertBox(AddAdmin);
const AddAdminLoader = withLoader(AddAdminAlertBox);
const AddAdminToast = withToast(AddAdminLoader);
// Customizable Area End
export default withStyles((theme) =>
  createStyles({
    root: {},
  })
)(AddAdminToast);
