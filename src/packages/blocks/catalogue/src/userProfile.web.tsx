import React from "react";
import TextField from "@material-ui/core/TextField";
// Customizable Area Start
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { shadows } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { bookCover, viewIcon } from "./assets";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
// Customizable Area End
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
export const configJSON = require("./config");
import "../../../components/src/Styles/Styles.css";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AppHeader from "../../../components/src/Header/index";
import HomeController, { Props } from "./HomeController.web";
import "../assets/css/notes.css";
import "../assets/css/edituser.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import StorageProvider from "../../../framework/src/StorageProvider.web";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import moment from 'moment'
import { withRouter } from "react-router-dom";
import "../assets/css/common.css";
import withTheme from "../../../components/src/Theme/withTheme";

import {
  bookLogo,
  playButton,
  Published,
  selectArrow,
  downloads,
  Notes,
  earnings,
  subscription,
  paymentHistory,
  purchasedNotes,
} from "./assets";
import SideBar from "./Sidebar.web";
import Loader from "../../../components/src/Loader.web";

const styles = {
  cardRoot: {
    maxWidth: "400px",
    margin: "20px",
  },
} as any;
class userProfile extends HomeController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  render() {
    const { classes } = this.props;
    return (
      <>
        <Loader loading={this.state.Loader} />
        <AppHeader />

        <div className="user-profile">
          <SideBar
            selectedIndex={8}
            accountInfo={this.state.accountInfo && this.state.accountInfo}
          />
          <div className="content">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link href="/Catalogue/Home" style={{ color: "#3b9dd4" }}>
                Home
              </Link>
              <Typography style={{ color: "#797b79 !important" }}>My Notes</Typography>
            </Breadcrumbs>

            <h3>Edit Profile</h3>

            <div className={`form-wrapper edit-user ${this.props.mode && "dark1"}`}>
              {this.state.accountInfo && (
                <>
                  <Formik
                    initialValues={{
                      fullName: this.state.accountInfo?.attributes?.full_name || "",
                      email: this.state.accountInfo?.attributes?.email || "",
                      state: this.state.accountInfo?.attributes?.state_n_city || "",
                      college: this.state.accountInfo?.attributes?.college || "",
                      DOB: this.state.accountInfo?.attributes?.dob || "",
                      major: this.state.accountInfo?.attributes?.major || "",
                    }}
                    validationSchema={Yup.object().shape(
                      this.state.ProfileValidationSchema
                    )}
                    onSubmit={(values: any) => {
                      // console.log("values", values);
                      this.putUpdateProfile(values)
                    }}
                    enableReinitialize
                  >
                    {({ errors, values,setFieldValue ,setFieldTouched}) => {
                      return (
                        //@ts-ignore

                        <Form className={classes.root}>
                          <div className={`form-group-wrap`}>
                            <div className="form-group">
                              <label>Full Name</label>
                              <Field
                                type="text"
                                name="fullName"
                                placeholder="Eg: Mike Smith"
                                autoComplete="off"
                                className={`form-control ${this.props.mode && "dark2"}`}
                              />
                              <span className="validation-summary">
                                <ErrorMessage name="fullName" />
                              </span>
                            </div>
                            <div className="form-group">
                              <label>Email</label>
                              <Field
                                type="email"
                                name="email"
                                placeholder="Eg: Mike@gmail.com"
                                autoComplete="off"
                                className={`form-control ${this.props.mode && "dark2"}`}
                                
                              />
                              <span className="validation-summary">
                                <ErrorMessage name="email" />
                              </span>
                            </div>
                            <div className="form-group">
                              <label>State/City</label>
                              <Field
                                type="text"
                                name="state"
                                placeholder="Eg: Texus"
                                autoComplete="off"
                               className={`form-control ${this.props.mode && "dark2"}`}

                              />
                              <span className="validation-summary">
                                <ErrorMessage name="state" />
                              </span>
                            </div>
                            <div className="form-group">
                              <label>College</label>
                              <Field
                                type="text"
                                name="college"
                                placeholder="Eg: College of Interaction Design"
                                autoComplete="off"
                                                                className={`form-control ${this.props.mode && "dark2"}`}

                              />
                              <span className="validation-summary">
                                <ErrorMessage name="college" />
                              </span>
                            </div>
                            <div className="form-group">
                              <label>Date of Birth</label>
                              <div className="custom-datepicker">
                                <Field
                                  type="date"
                                  name="DOB"
                                  value={values.DOB.slice(0,10)}
                                  placeholder="DD/MM/YYYY"
                                  autoComplete="off"
                                                                  className={`form-control ${this.props.mode && "dark2"}`}

                                  style={{"backgroundColor":`${this.props.mode ? "dark2": "#fff"}`}}
                                />                             
                               
                                <span className="validation-summary">
                                  <ErrorMessage name="DOB" />
                                </span>
                              </div>
                            </div>
                            <div className="form-group">
                              <label>Major</label>
                              <Field
                                type="text"
                                name="major"
                                placeholder="Eg: Master In Interaction Design "
                                autoComplete="off"
                                                                className={`form-control ${this.props.mode && "dark2"}`}

                              />
                              <span className="validation-summary">
                                <ErrorMessage name="major" />
                              </span>
                            </div>

                            <button className="btn btn-save" type="submit">
                              SAVE
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </>
              )}
              
            </div>
          </div>
        </div>
      </>
    );
  }
}
const userProfileTheme = withTheme(userProfile);
const userProfileRouter = withRouter(userProfileTheme);
export default withStyles(styles)(userProfileRouter);

// Customizable Area Start
// Customizable Area End
