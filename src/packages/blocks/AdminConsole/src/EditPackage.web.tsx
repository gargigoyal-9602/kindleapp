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
  TablePagination,
  Hidden,
} from "@material-ui/core";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import SideBarWeb from "./SideBar.web";
import withAlertBox from "../../../components/src/withAlertBox.Web";
import withToast from "../../../components/src/withSnackBar.Web";
import withTheme from "../../../components/src/Theme/withTheme";
import withLoader from "../../../components/src/withLoader.Web";
import { CloseIcon } from "./assets";
// Customizable Area End
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import EditPackageController, {
  Props,
  configJSON,
} from "./EditPackage.controller";

const Schema = Yup.object().shape({
  // title: Yup.string().required("This field is required."),
  // desc: Yup.string().required("This field is required."),
  monthlyPrice: Yup.number()
    .positive()
    .required("This field is required."),
  oneTimePrice: Yup.number()
    .positive()
    .required("This field is required."),
  packageDuration: Yup.string().required("This field is required."),
  totalBooks: Yup.string().required("This field is required."),
  // packageFeature: Yup.string().required("This field is required."),
});

class EditPackage extends EditPackageController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount(): any {
    const { location }: any = this.props;
    const { state }: any = location;
    if (location && state && state.page === "package" && state.package) {
      this.setState({ package: state.package, page: state.page });
    }
  }
  handleRoutes = (route: any) => {
    this.props.history.push({
      pathname: route,
      state: {
        page: "package",
        // package: this.state.packagesList[this.state.selectedIndex],
      },
    });
  };
  // Customizable Area End

  render() {
    const { classes }: any = this.props;
    return (
      <Box m={3} className={classes.root}>
        <Grid container spacing={4}>
          <Hidden>
            <SideBarWeb closeDrawer={() => {}} />
          </Hidden>
          <Grid item xs={12} md={12} lg={10}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link href="/AdminConsole" style={{ color: "#3b9dd4" }}>
                Home
              </Link>
              <Typography style={{ color: "#797b79 !important" }}>
                {this.props.location.state.package &&
                this.props.location.state.package.id
                  ? "Edit Package"
                  : "Create Package"}
              </Typography>
            </Breadcrumbs>
            <Box mt={3} className={classes.mainBox}>
              <Typography className={classes.h4}>
                {this.props.location.state.package &&
                this.props.location.state.package.id
                  ? "Edit Package"
                  : "Create Package"}
              </Typography>
              <Grid container>
                <Grid item xs={12} sm={8} md={10}>
                  <Formik
                    enableReinitialize
                    initialValues={{
                      title: "Book Pass",
                      desc: "Read/Play all available books",
                      monthlyPrice:
                        (this.state.package &&
                          this.state.package.attributes &&
                          this.state.package.attributes.per_month_price) ||
                        "",
                      oneTimePrice:
                        (this.state.package &&
                          this.state.package.attributes &&
                          this.state.package.attributes.one_time_price) ||
                        "",
                      packageDuration:
                        (this.state.package &&
                          this.state.package.attributes &&
                          this.state.package.attributes.duration) ||
                        "4",
                      totalBooks:
                        (this.state.package &&
                          this.state.package.attributes &&
                          this.state.package.attributes.no_of_books) ||
                        "4",
                      packageFeature: "Offline Reading: Read Anywhere, Anytime",
                    }}
                    validationSchema={Schema}
                    onSubmit={(values, actions) => {
                      this.handlePackageSave(values);
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
                        <Form translate="no" noValidate autoComplete="on">
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <Grid container spacing={1}>
                                <Grid item xs={12}>
                                  <Typography
                                    variant="body1"
                                    className={classes.formLabel}
                                  >
                                    Package Title
                                  </Typography>
                                  <Field
                                    component={TextField}
                                    required
                                    id="title"
                                    name="title"
                                    fullWidth
                                    variant="filled"
                                    readOnly
                                    disabled
                                    value={values.title}
                                    className={`${classes.textField} ${this
                                      .props.mode && classes.darkInput}`}
                                    InputProps={{
                                      className: `${classes.input} ${this.props
                                        .mode && classes.darkIn}`,
                                    }}
                                    error={
                                      touched.title && Boolean(errors.title)
                                    }
                                    helperText={touched.title && errors.title}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography
                                    variant="body1"
                                    className={classes.formLabel}
                                  >
                                    Package Description
                                  </Typography>
                                  <Field
                                    id="desc"
                                    component={TextField}
                                    required
                                    fullWidth
                                    variant="filled"
                                    name="desc"
                                    readOnly
                                    disabled
                                    value={values.desc}
                                    className={`${classes.textField} ${this
                                      .props.mode && classes.darkInput}`}
                                    InputProps={{
                                      className: `${classes.input} ${this.props
                                        .mode && classes.darkIn}`,
                                    }}
                                    error={touched.desc && Boolean(errors.desc)}
                                    helperText={touched.desc && errors.desc}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography
                                    variant="body1"
                                    className={classes.formLabel}
                                  >
                                    Monthly Price
                                  </Typography>
                                  <Field
                                    id="monthlyPrice"
                                    required
                                    fullWidth
                                    type="number"
                                    variant="filled"
                                    name="monthlyPrice"
                                    placeholder="$ 25"
                                    onChange={handleChange}
                                    value={values.monthlyPrice}
                                    component={TextField}
                                    className={`${classes.textField} ${this
                                      .props.mode && classes.darkInput}`}
                                    InputProps={{
                                      className: `${classes.input} ${this.props
                                        .mode && classes.darkIn}`,
                                    }}
                                    error={
                                      touched.monthlyPrice &&
                                      Boolean(errors.monthlyPrice)
                                    }
                                    helperText={
                                      touched.monthlyPrice &&
                                      errors.monthlyPrice
                                    }
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography
                                    variant="body1"
                                    className={classes.formLabel}
                                  >
                                    One Time Price
                                  </Typography>
                                  <Field
                                    id="oneTimePrice"
                                    required
                                    fullWidth
                                    type="number"
                                    variant="filled"
                                    placeholder="$ 50"
                                    name="oneTimePrice"
                                    onChange={handleChange}
                                    value={values.oneTimePrice}
                                    component={TextField}
                                    className={`${classes.textField} ${this
                                      .props.mode && classes.darkInput}`}
                                    InputProps={{
                                      className: `${classes.input} ${this.props
                                        .mode && classes.darkIn}`,
                                    }}
                                    error={
                                      touched.oneTimePrice &&
                                      Boolean(errors.oneTimePrice)
                                    }
                                    helperText={
                                      touched.oneTimePrice &&
                                      errors.oneTimePrice
                                    }
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography
                                    variant="body1"
                                    className={classes.formLabel}
                                  >
                                    Package Duration
                                  </Typography>
                                  <Select
                                    id="packageDuration"
                                    required
                                    fullWidth
                                    variant="filled"
                                    name="packageDuration"
                                    placeholder="$ 50"
                                    onChange={handleChange}
                                    className={`${classes.selectField} ${this
                                      .props.mode && classes.darkselectField}`}
                                    value={values.packageDuration}
                                    error={
                                      touched.packageDuration &&
                                      Boolean(errors.packageDuration)
                                    }
                                  >
                                    {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                      (listItem: any) => {
                                        return (
                                          <MenuItem
                                            key={listItem}
                                            value={listItem}
                                          >
                                            {listItem + " Months"}
                                          </MenuItem>
                                        );
                                      }
                                    )}
                                  </Select>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography
                                    variant="body1"
                                    className={classes.formLabel}
                                  >
                                    Total Books Available
                                  </Typography>
                                  <Select
                                    id="totalBooks"
                                    required
                                    fullWidth
                                    variant="filled"
                                    name="totalBooks"
                                    onChange={handleChange}
                                    value={values.totalBooks}
                                    className={`${classes.selectField} ${this
                                      .props.mode && classes.darkselectField}`}
                                    error={
                                      touched.totalBooks &&
                                      Boolean(errors.totalBooks)
                                    }
                                  >
                                    {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                      (listItem: any) => {
                                        return (
                                          <MenuItem
                                            key={listItem}
                                            value={listItem}
                                          >
                                            {listItem + " Books"}
                                          </MenuItem>
                                        );
                                      }
                                    )}
                                  </Select>
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography
                                    variant="body1"
                                    className={`${classes.formLabel} ${
                                      classes.mt
                                    }`}
                                    style={{ marginTop: "13px" }}
                                  >
                                    Package Feature
                                  </Typography>
                                  <Field
                                    id="packageFeature"
                                    component={TextField}
                                    required
                                    fullWidth
                                    readOnly
                                    disabled
                                    rowsMax={10}
                                    variant="filled"
                                    name="packageFeature"
                                    value={values.packageFeature}
                                    className={`${classes.textField} ${this
                                      .props.mode && classes.darkInput}`}
                                    InputProps={{
                                      className: `${classes.input} ${this.props
                                        .mode && classes.darkIn}`,
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <Box mt={1}>
                                    <Button
                                      type="submit"
                                      fullWidth
                                      size="large"
                                      className={
                                        classes.btn + " " + classes.primary
                                      }
                                    >
                                      {this.props.location.state.package &&
                                      this.props.location.state.package.id
                                        ? "Edit Package"
                                        : "Create Package"}
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
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

// Customizable Area Start
const EditPackageAlertBox = withAlertBox(EditPackage);
const EditPackageLoader = withLoader(EditPackageAlertBox);
const EditPackageTheme = withTheme(EditPackageLoader);
const EditPackageToast = withToast(EditPackageTheme);
// Customizable Area End
export default withStyles((theme) =>
  createStyles({
    root: {
      width: "100% !important",
    },
    homeColor: {
      color: "#3b9dd4 !important",
      fontWeight: 600,
    },
    mainBox: {
      width: "30% !important",
    },
    formLabel: {
      fontWeight: 600,
      fontSize: 13,
      color: "#a6a7af",
      marginBottom: 15,
    },
    h4: {
      fontSize: "30px",
      marginBottom: "20px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
    textField: {
      width: "100%",
    },
    selectField: {
      // width: "100%",
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
      fontWeight: 600,
      textTransform: "capitalize",
      boxShadow: "0px 8px 10px 0px rgb(0 0 0 / 20%)",
      "@media (max-width: 767px)": {
        padding: "10px 15px",
      },
    },
    primary: {
      color: "#fff",
      backgroundColor: "#3aaeef",
      "& .MuiButton-label": {
        textTransform: "capitalize",
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
    darkselectField: {
      color: "white !important",
      backgroundColor: "#303030 !important",
      border: "1px solid #9b9da4 !important",
      "& .MuiSelect-select:focus": {
        backgroundColor: "transparent !important",
      },
    },
    mt: {
      marginTop: "13px",
    },
  })
)(EditPackageToast);
