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
  GridDirection,
  Tooltip,
  Hidden,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import withAlertBox from "../../../components/src/withAlertBox.Web";
import withToast from "../../../components/src/withSnackBar.Web";
import withLoader from "../../../components/src/withLoader.Web";
import withDialog from "../../../components/src/withDialog.web";
// Customizable Area End

import MyEarningsController, {
  Props,
  configJSON,
} from "./MyEarningsController";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { searchImage } from "./assets";

class MyEarnings extends MyEarningsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount = (): any => {
    if (this.props.authToken) {
      this.setState({ authToken: this.props.authToken }, () => {
        this.getMyEarnings();
      });
    }
  };
  componentDidUpdate = (prevProps: Props): any => {
    if (prevProps.authToken !== this.props.authToken) {
      this.setState({ authToken: this.props.authToken }, () => {
        this.getMyEarnings();
      });
    }
  };
  handleRoutes = (route: any) => {
    this.props.history.push(route);
  };
  // Customizable Area End

  render() {
    const { classes }: any = this.props;
    return (
      <Box m={3} className={classes.root}>
        <Grid item xs={12} sm={10}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link style={{ color: "#3b9dd4" }} href="/Publisher">
              Home
            </Link>
            <Typography style={{ color: "#797b79 !important" }}>
              My Earnings
            </Typography>
          </Breadcrumbs>
          <Box mt={3}>
            <Typography variant="h5">My Earnings</Typography>
          </Box>
          <Grid container justify="center" component="div">
            <Grid item xs={12} sm={8} md={5}>
              <Paper elevation={3}>
                <Box
                  display="flex"
                  justifyContent="space-around"
                  mt={3}
                  p={3}
                >
                  <Box>
                    <ArrowBackIcon />
                  </Box>
                  <Box className={classes.month}>
                    <Typography variant="subtitle1">
                      This Month <ArrowDropDownIcon />
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {`${this.state.prevDate.getDate()} ${this.state.prevDate.toLocaleString(
                        "default",
                        { month: "short" }
                      )} - ${this.state.todayDate.getDate()} ${this.state.todayDate.toLocaleString(
                        "default",
                        { month: "short" }
                      )} `}
                    </Typography>
                  </Box>
                  <Box>
                    <ArrowForwardIcon />
                  </Box>
                </Box>
              </Paper>
              {this.state.myEarnings && (
                <Paper
                  elevation={2}
                  style={{
                    // backgroundColor: "#f1f1f1",
                    borderRadius: "1rem",
                    padding: "1rem",
                    width: "110%",
                    marginLeft: "-1rem",
                  }}
                >
                  <Box p={3} textAlign="center">
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="baseline"
                    >
                      {this.state.myEarnings.total_amount
                        ? this.state.myEarnings.monthly_week_wise.totalearnings.map(
                            (weeklyEarning: any, i: any) => {
                              return (
                                <Box p={1} key={i}>
                                  <Tooltip
                                    title={weeklyEarning.value}
                                    placement="top"
                                  >
                                    <div
                                      style={{
                                        width: "2rem",
                                        height: `${(weeklyEarning.value /
                                          this.state.myEarnings
                                            .total_amount) *
                                          100}px`,
                                        backgroundColor: "blue",
                                        borderRadius: "0.2rem",
                                      }}
                                    />
                                  </Tooltip>
                                  <Typography variant="body2">
                                    W{i + 1}
                                  </Typography>
                                </Box>
                              );
                            }
                          )
                        : null}
                    </Box>
                    <Typography variant="subtitle2" color="textPrimary">
                      Earning this Month
                    </Typography>
                    <Typography variant="h3" color="primary">
                      {this.state.myEarnings.total_amount}$
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {this.state.myEarnings.percent_difference} % better
                      than <br /> Previos Month
                    </Typography>
                  </Box>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

// Customizable Area Start

const MyEarningsAlertBox = withAlertBox(MyEarnings);
const MyEarningsLoader = withLoader(MyEarningsAlertBox);
const MyEarningsToast = withToast(MyEarningsLoader);
const MyEarningsWithDialog = withDialog(MyEarningsToast);

// Customizable Area End
export default withStyles((theme) =>
  createStyles({
    root: {},
    uploadContainer: {
      borderRadius: "1rem",
      backgroundColor: "#f1f1f1",
      textAlign: "center",
      padding: "2rem",
      marginRight: "2rem",
      marginTop: "1rem",
    },
    StatisticsContainer: {
      borderRadius: "1rem",
      marginTop: "1rem",
    },
    StatisticsItems: {
      border: "1px solid #f1f1f1",
      padding: "1.6rem",
    },
    earningContainer: {
      borderRadius: "1rem",
      marginTop: "1rem",
    },
    earningItems: {
      border: "1px solid #f1f1f1",
      padding: "1.6rem",
    },
    earningTitle: {
      margin: "1rem",
      padding: "1rem",
      backgroundColor: "#f1f1f1",
      borderRadius: "0.5rem",
    },
    month: {
      backgroundColor: "#cccccc44",
      color: "blue",
      borderRadius: "1rem",
      padding: "0.1rem 1rem 0.2rem 1rem",
    },
  })
)(MyEarningsWithDialog);
