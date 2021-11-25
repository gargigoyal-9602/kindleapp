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

import ChangeStatusController, {
  Props,
  configJSON,
} from "./ChangeStatus.controller";

const Schema = Yup.object().shape({
  status: Yup.string().required("This field is required."),
});

class ChangeStatus extends ChangeStatusController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount(): any {
    const { location }: any = this.props;
    const { state }: any = location;
    if (location && state && state.page) {
      if (state.page === "admin") {
        this.setState({ admin: state.admin, page: state.page });
      } else if (state.page === "package") {
        this.setState({ package: state.package, page: state.page });
      } else if (state.page === "subscriptions") {
        this.setState({ subscriptions: state.subscriptions, page: state.page });
      }
    }
  }
  // Customizable Area End

  render() {
    const { classes }: any = this.props;
    const { page } = this.state;
    return (
      <Box m={3} className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} className={classes.paperBox}>
              <Box className={classes.modalHeader}>
                <Typography variant="h5" className={classes.h4}>Change Status</Typography>
                <Box
                  ml="auto"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <IconButton className={classes.removeIconBtn}
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
                  status: "",
                }}
                validationSchema={Schema}
                onSubmit={(values, actions) => {
                  this.handleAdminSave(values);
                }}
              >
                {(formikProps) => {
                  const {
                    values,
                    touched,
                    errors,
                    setFieldValue,
                    handleChange,
                  } = formikProps;
                  return (
                    <Form translate="no" noValidate autoComplete="off">
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <Typography
                                variant="body1"
                                className={classes.formLabel}
                              >
                                Status
                              </Typography>
                              <Select
                                required
                                id="status"
                                name="status"
                                fullWidth
                                variant="filled"
                                placeholder="Eg: Mike Smith"
                                onChange={handleChange}
                                value={values.status}
                                className={classes.selectField}
                                error={
                                  touched.status && Boolean(errors.status)
                                }
                              >
                                {page === "admin" &&
                                  this.state.adminStatusList.map(
                                    (listItem: any) => {
                                      return (
                                        <MenuItem
                                          key={listItem}
                                          value={listItem}
                                        >
                                          {listItem}
                                        </MenuItem>
                                      );
                                    }
                                  )}
                                {page === "package" &&
                                  this.state.packageStatusList.map(
                                    (listItem: any) => {
                                      return (
                                        <MenuItem
                                          key={listItem}
                                          value={listItem}
                                        >
                                          {listItem}
                                        </MenuItem>
                                      );
                                    }
                                  )}
                                {page === "subscriptions" &&
                                  this.state.subscriptionsStatusList.map(
                                    (listItem: any) => {
                                      return (
                                        <MenuItem
                                          key={listItem}
                                          value={listItem}
                                        >
                                          {listItem}
                                        </MenuItem>
                                      );
                                    }
                                  )}
                              </Select>
                            </Grid>
                            <Grid item xs={12}>
                              <Box mt={3}>
                                <Button
                                  type="submit"
                                  fullWidth
                                  size="large"
                                  className={classes.btn + " " + classes.primary}
                                >
                                  CONFIRM STATUS
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
const ChangeStatusAlertBox = withAlertBox(ChangeStatus);
const ChangeStatusLoader = withLoader(ChangeStatusAlertBox);
const ChangeStatusToast = withToast(ChangeStatusLoader);
// Customizable Area End
export default withStyles((theme) =>
  createStyles({
    root: {
      width: "100% !important",
      margin: "24px auto",
      padding: 10,
    },
    paperBox:
    {
      width: "100% !important",
      margin: "0 auto",
      padding: "30px 35px 40px 35px",
      backgroundColor: "#fff",
      borderRadius: "20px",
      [theme.breakpoints.down("sm")]: {
        padding: "15px",
      },
    },
    h4:
    {
      fontWeight: "bold",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("md")]: {
        fontSize: "18px",
      },
    },
    removeIconBtn:
    {
      "& img":
      {
        width: "100px",
        height: "100px",
        [theme.breakpoints.down("md")]: {
          width: "50px",
          height: "50px"
        },
      }
    },
    modalHeader:
    {
      display: "flex",
      alignItems: "center",
      width: "100% !important",
      marginBottom: "30px",
      "& div":
      {
        height: "50px"
      },
      "& button":
      {
        "&:hover":
        {
          backgroundColor: "transparent",
        }
      }
    },
    formLabel:
    {
      fontWeight: 600,
      fontSize: 13,
      color: "#a6a7af",
      marginBottom: 15,
    },
    selectField:
    {
      backgroundColor: "#F4F4F4 !important",
      border: "2px solid #F4F4F4",
      // padding: "22px 17px",
      fontWeight: 600,
      fontSize: 15,
      color: "#a6a7af",
      borderRadius: 15,
      height: "60px",
      "& .MuiSelect-selectMenu":
      {
          height: "32px",
      },
      "& .MuiSelect-select:focus":
      {
        backgroundColor: "#F4F4F4 !important",
        borderRadius: 15,
      },
      "&.MuiFilledInput-underline:before":
      {
        borderBottom: "0 !important",
      },
      "&.MuiFilledInput-underline:after":
      {
        borderBottom: "0 !important",
      },
    },
    input: {
      borderRadius: "10px !important",
      marginBottom: 15,
      backgroundColor: "transparent",
      "&.MuiFilledInput-root:hover":
      {
        backgroundColor: "transparent",
      },
      "& input":
      {
        padding: "22px 17px",
        fontWeight: 600,
        fontSize: 15,
        color: "#a6a7af",
        backgroundColor: "#F4F4F4 !important",
        border: "2px solid #F4F4F4",
        borderRadius: 15,
        "&:hover":
        {
          borderColor: "#3b9dd4",
        },
        "&:focus":
        {
          borderColor: "#3b9dd4",
        },
      },
      "& textarea":
      {
        padding: "22px 17px",
        fontWeight: 600,
        fontSize: 15,
        color: "#a6a7af",
      },
      "&::before":
      {
        borderBottom: "0 !important",
      },
      "&::after":
      {
        borderBottom: "0 !important",
      },
      "&::hover":
      {
        borderBottom: "0 !important",
        backgroundColor: "#f4f4f4",
        border: "1px solid #3b9dd4",
      },
      "&::focus":
      {
        borderBottom: "0 !important",
        backgroundColor: "#F4F4F4 !important",
        border: "1px solid #3b9dd4",
      },
      "&::placeholder":
      {
        color: "#a6a7af",
        opacity: 1,
      }
    },
    btn: {
      backgroundColor: "#fff",
      borderRadius: "14px",
      padding: "15px 25px",
      color: "rgb(0,0,0, 0.8)",
      boxShadow: "0px 8px 10px 0px rgb(0 0 0 / 20%)",
      "@media (max-width: 767px)":
      {
        padding: "10px 15px",
      }
    },
    primary: {
      color: "#fff",
      backgroundColor: "#3aaeef",
      "& .MuiButton-label":
      {
        textTransform: "initial",
        // textTransform: "uppercase",
        fontWeight: 600,
        fontSize: "15px",
        whiteSpace: "nowrap",
        "@media (max-width: 767px)":
        {
          fontSize: "13px",
        }
      },
      "&:hover":
      {
        backgroundColor: "#3b9dd4",
        boxShadow: "0px 8px 10px 0px rgb(0 0 0 / 20%)",
      },
    },
  })
)(ChangeStatusToast);
