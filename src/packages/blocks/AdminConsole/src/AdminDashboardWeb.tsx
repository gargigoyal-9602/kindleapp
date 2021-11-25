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
  Menu,
  MenuItem,
  Hidden,
} from "@material-ui/core";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// Customizable Area End

import AdminDashboardController, {
  Props,
  configJSON,
} from "./AdminDashboardController";

import withAlertBox from "../../../components/src/withAlertBox.Web";
import withToast from "../../../components/src/withSnackBar.Web";
import withLoader from "../../../components/src/withLoader.Web";

import {
  blueEyes,
  threeDot,
  EditIcon,
  BlockIcon,
  DeleteIcon,
  pinkDownload,
  dollor,
  subscriptionIcon,
  UploadImage,
  publisherimage,
} from "./assets";
import SideBarWeb from "./SideBar.web";
import withTheme from "../../../components/src/Theme/withTheme";
import { NonceProvider } from "react-select";

class AdminDashboard extends AdminDashboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount = (): any => {
    if (this.props.authToken) {
      this.getPublishersList();
      this.getStudentsList();
      this.getBooksList();
      this.getStatistics();
    }
  };
  componentDidUpdate(prevProps: any) {
    if (prevProps.authToken !== this.props.authToken) {
      this.getPublishersList();
      this.getStudentsList();
      this.getBooksList();
      this.getStatistics();
    }
  }
  handleClick = (event: any, value: any) => {
    this.setState({ selectedIndex: value, anchorEl: event.currentTarget });
  };
  handleRoutes = (route: any, state: any) => {
    this.props.history.push({
      pathname: route,
      state: state,
    });
  };
  handleClose = (value: any) => {
    if (value === "edit") {
      // this.setState({ selectedIndex: null, anchorEl: null });
      this.handleRoutes("/AdminConsole/EditPublisher", {
        publisher: this.state.publishersList[this.state.selectedIndex],
      });
    } else if (value === "block") {
      this.blockPublisher();
    } else if (value === "delete") {
      this.deletePublisher();
    } else {
      this.setState({ selectedIndex: null, anchorEl: null });
    }
  };

  // Customizable Area End

  render() {
    const { classes, accountInfo }: any = this.props;
    const { statistics } = this.state;
    return (
      <Box m={3} className={classes.root}>
        <Grid container spacing={4}>
          <Hidden>
            {/* <Grid item xs={2}> */}
            <SideBarWeb closeDrawer={() => {}} />
            {/* </Grid> */}
          </Hidden>
          <Grid item xs={12} md={12} lg={10}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Typography className={classes.homeColor}>Home</Typography>
            </Breadcrumbs>
            <Box mt={3}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h5"
                    className={`${classes.commonColor} ${this.props.mode &&
                      classes.darkFont}`}
                  >
                    Upload Media
                  </Typography>
                  <Paper
                    elevation={0}
                    className={`${classes.uploadContainer} ${this.props
                      .mode && classes.dark1}`}
                  >
                    <Box m={1} p={1}>
                      <Typography
                        variant="h5"
                        className={`${classes.commonColor} ${this.props
                          .mode && classes.darkFont}`}
                      >
                        Drag and Drop Files
                      </Typography>
                    </Box>
                    <Box m={1} mb={2} p={1}>
                      <Typography
                        variant="body2"
                        className={`${classes.grayColor} ${this.props
                          .mode && classes.darkFont}`}
                      >
                        Upload book PDF files here to get started
                      </Typography>
                    </Box>
                    <Box mb={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          this.handleRoutes(
                            "/AdminConsole/UploadMedia",
                            null
                          )
                        }
                        className={`${classes.chooseBtn} ${this.props
                          .mode && classes.darkBtn}`}
                      >
                        <img
                          src={UploadImage}
                          width="18"
                          alt="icon"
                          style={{ marginRight: "8px" }}
                        />
                        Or choose
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.mb}>
                  <Typography
                    variant="h5"
                    className={`${classes.commonColor} ${this.props.mode &&
                      classes.darkFont}`}
                  >
                    Statistics
                  </Typography>
                  <Paper
                    className={`${classes.StatisticsContainer} ${this.props
                      .mode && `${classes.dark1} ${classes.darkBorder}`}`}
                  >
                    <Grid container>
                      <Grid
                        style={{ borderRadius: "1rem 0 0 0" }}
                        item
                        xs={6}
                        className={`${classes.StatisticsItems} ${this.props
                          .mode && `${classes.darkBorder}`}`}
                      >
                        <Box display="flex">
                          <Box pr={1} component="span">
                            <img
                              src={subscriptionIcon}
                              width="15px"
                              height="15px"
                            />
                          </Box>
                          <Typography
                            variant="body2"
                            className={`${classes.typoColor} ${this.props
                              .mode && classes.darkFont}`}
                          >
                            Subcriptions
                          </Typography>
                        </Box>
                        <Typography
                          variant="h4"
                          className={`${classes.typoH4} ${this.props.mode &&
                            classes.darkFont}`}
                        >
                          {statistics.subscriptions
                            ? statistics.subscriptions
                            : ""}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <Box width="100%" mr={1} pr={5}>
                            <LinearProgress
                              variant="determinate"
                              className={classes.progreesSubscrip}
                              value={50.0}
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{ borderRadius: "0 1rem 0 0" }}
                        className={`${classes.StatisticsItems} ${this.props
                          .mode && `${classes.darkBorder}`}`}
                      >
                        <Box display="flex">
                          <Box pr={1} component="span">
                            <img
                              src={blueEyes}
                              width="15px"
                              height="15px"
                            />
                          </Box>
                          <Typography
                            variant="body2"
                            className={`${classes.typoColor} ${this.props
                              .mode && classes.darkFont}`}
                          >
                            Students
                          </Typography>
                        </Box>

                        <Typography
                          variant="h4"
                          className={`${classes.typoH4} ${this.props.mode &&
                            classes.darkFont}`}
                        >
                          {statistics.students ? statistics.students : ""}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <Box width="100%" mr={1} pr={5}>
                            <LinearProgress
                              variant="determinate"
                              className={classes.progreesStudent}
                              value={50.0}
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          borderRadius: "0 0 0 1rem",
                          padding: "1.6rem 0.5rem 0.5rem 1.6rem",
                        }}
                        className={`${classes.StatisticsItems} ${this.props
                          .mode && `${classes.darkBorder}`}`}
                      >
                        <Box display="flex">
                          <Box pr={1} component="span">
                            <img
                              src={publisherimage}
                              width="15px"
                              height="15px"
                            />
                          </Box>
                          <Typography
                            variant="body2"
                            className={`${classes.typoColor} ${this.props
                              .mode && classes.darkFont}`}
                          >
                            Publishers
                          </Typography>
                        </Box>

                        <Typography
                          variant="h4"
                          className={`${classes.typoH4} ${this.props.mode &&
                            classes.darkFont}`}
                        >
                          {statistics.publishers
                            ? statistics.publishers
                            : ""}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <Box width="100%" mr={1} pr={5}>
                            <LinearProgress
                              variant="determinate"
                              value={50.0}
                              className={classes.progreesPubli}
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{ borderRadius: "0 0 1rem 0" }}
                        className={`${classes.StatisticsItems} ${this.props
                          .mode && `${classes.darkBorder}`}`}
                      >
                        <Box display="flex">
                          <Box pr={1} component="span">
                            <img
                              src={pinkDownload}
                              width="15px"
                              height="15px"
                            />
                          </Box>
                          <Typography
                            variant="body2"
                            className={`${classes.typoColor} ${this.props
                              .mode && classes.darkFont}`}
                          >
                            Total Downloads
                          </Typography>
                        </Box>
                        <Typography
                          variant="h4"
                          className={`${classes.typoH4} ${this.props.mode &&
                            classes.darkFont}`}
                        >
                          {statistics.downloads ? statistics.downloads : ""}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <Box width="100%" mr={1} pr={5}>
                            <LinearProgress
                              variant="determinate"
                              className={classes.progreesDownlo}
                              value={50.0}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.mb}>
                  <Grid item xs={12}>
                    <Box className={classes.bookHeaderRow}>
                      <span
                        className={classes.headerlink}
                        onClick={() =>
                          this.props.history.push("/AdminConsole/AllBooks")
                        }
                      >
                        View All
                      </span>
                    </Box>
                  </Grid>
                  <Box
                    mt={5}
                    className={`${classes.bookContainer} ${this.props
                      .mode && classes.dark1}`}
                  >
                    <TableContainer
                      component={Paper}
                      className={`${classes.tableContainer} ${this.props
                        .mode && `${classes.dark1} ${classes.darkBorder}`}`}
                    >
                      <Table
                        className={classes.table}
                        stickyHeader
                        aria-label="simple table"
                      >
                        <TableHead
                          style={{
                            borderRadius: "0.2rem",
                            backgroundColor: this.props.mode
                              ? "#ccc !important"
                              : "#F3F2F7 !important",
                          }}
                        >
                          <TableRow>
                            <TableCell
                              className={`${classes.Tablehead} ${this.props
                                .mode && classes.dark2}`}
                            >
                              BOOK NAME
                            </TableCell>
                            <TableCell
                              className={`${classes.Tablehead} ${this.props
                                .mode && classes.dark2}`}
                            >
                              NOTES ADDED
                            </TableCell>
                            <TableCell
                              className={`${classes.Tablehead} ${this.props
                                .mode && classes.dark2}`}
                            >
                              TOTAL USERS
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody
                          className={`${classes.tableBody} ${this.props
                            .mode && classes.dark1}`}
                        >
                          {this.state.booksList.map(
                            (row: any, i: any) =>
                              i < 4 && (
                                <TableRow key={i}>
                                  <TableCell
                                    className={classes.firstcolumn}
                                    scope="row"
                                  >
                                    {row.name}
                                  </TableCell>
                                  <TableCell className={classes.th}>
                                    {row.noted_added}
                                  </TableCell>
                                  <TableCell className={classes.th}>
                                    {row.total_user}
                                  </TableCell>
                                </TableRow>
                              )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper
                    className={`${classes.earningContainer} ${this.props
                      .mode && `${classes.dark1} ${classes.darkBorder}`}`}
                  >
                    <Grid container>
                      <Grid item xs={12} md={4}>
                        <Grid container>
                          <Grid
                            item
                            xs={6}
                            md={12}
                            style={{
                              borderRadius: "1rem 0 0 0",
                              borderBottom: `1px solid ${
                                this.props.mode ? "#9b9da4" : "#f1f1f1"
                              }`,
                            }}
                            className={classes.earningItems}
                          >
                            <Typography
                              variant="body2"
                              className={`${classes.typoColor} ${this.props
                                .mode && classes.darkFont}`}
                            >
                              Notes Published
                            </Typography>
                            <Typography
                              variant="h4"
                              className={`${classes.typoH4} ${this.props
                                .mode && classes.darkFont}`}
                            >
                              {statistics.notes_published
                                ? statistics.notes_published
                                : ""}
                            </Typography>
                            <Box display="flex" alignItems="center">
                              <Box width="100%" mr={1}>
                                <LinearProgress
                                  variant="determinate"
                                  className={classes.progreesSubscrip}
                                  value={50.0}
                                />
                              </Box>
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            md={12}
                            style={{
                              borderRadius: "0 0 0 1rem",
                              borderRight: "0px",
                              border: "none",
                            }}
                            className={classes.earningItems}
                          >
                            <Typography
                              variant="body2"
                              className={`${classes.typoColor} ${this.props
                                .mode && classes.darkFont}`}
                            >
                              Notes Purchased
                            </Typography>
                            <Typography
                              variant="h4"
                              className={`${classes.typoH4} ${this.props
                                .mode && classes.darkFont}`}
                            >
                              {statistics.notes_purchased
                                ? statistics.notes_purchased
                                : ""}
                            </Typography>
                            <Box display="flex" alignItems="center">
                              <Box width="100%" mr={1}>
                                <LinearProgress
                                  variant="determinate"
                                  className={classes.progreesDownlo}
                                  value={50.0}
                                />
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={7}
                        className={`${classes.earningTitle} ${this.props
                          .mode && classes.dark2}`}
                      >
                        <Box
                          m={3}
                          display="flex"
                          alignItems="center"
                          justifyContent="left"
                        >
                          <Box component="span">
                            <img src={dollor} />
                          </Box>
                          <Typography
                            variant="h6"
                            style={{ lineHeight: 1, marginLeft: "16px" }}
                            className={`${classes.totalEarn} ${this.props
                              .mode && classes.darkFont}`}
                          >
                            Total
                            <br /> Earning
                          </Typography>
                        </Box>
                        <Box ml={3}>
                          <Typography
                            variant="h4"
                            className={`${classes.typoH4} ${this.props
                              .mode && classes.darkFont}`}
                          >
                            ${" "}
                            {statistics.total_earnings
                              ? statistics.total_earnings
                              : "0"}
                          </Typography>
                        </Box>
                        <Box
                          ml={3}
                          mr={5}
                          display="flex"
                          alignItems="center"
                        >
                          <Box width="100%" mr={1}>
                            <LinearProgress
                              variant="determinate"
                              value={50.0}
                              className={classes.totalEarng}
                            />
                          </Box>
                        </Box>
                        <Box m={3}>
                          <Typography
                            variant="body2"
                            className={`${classes.typoColor} ${this.props
                              .mode && classes.darkFont}`}
                          >
                            {statistics.percent_difference
                              ? statistics.percent_difference >= 0
                                ? statistics.percent_difference +
                                  " more earnings than last month"
                                : statistics.percent_difference.slice(1) +
                                  " less earnings than last month"
                              : "0.0% "}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
            <Box mt={3}>
              <Box className={classes.tableHeaderRow}>
                <Typography
                  variant="h5"
                  className={`${classes.commonColor} ${this.props.mode &&
                    classes.darkFont}`}
                >
                  Publisher List
                </Typography>
                <span
                  className={classes.headerlink}
                  onClick={() =>
                    this.props.history.push("/AdminConsole/publishers")
                  }
                >
                  View All
                </span>
              </Box>
              <TableContainer
                component={Paper}
                className={`${classes.tableContainer} ${this.props.mode &&
                  `${classes.dark1} ${classes.darkBorder}`}`}
              >
                <Table
                  stickyHeader
                  className={classes.table}
                  aria-label="simple table
                "
                >
                  <TableHead
                    style={{
                      borderRadius: "0.2rem",
                      backgroundColor: this.props.mode
                        ? "#ccc !important"
                        : "#F3F2F7 !important",
                    }}
                  >
                    <TableRow>
                      <TableCell
                        className={`${classes.Tablehead} ${this.props
                          .mode && classes.dark2}`}
                      >
                        USER
                      </TableCell>
                      <TableCell
                        className={`${classes.Tablehead} ${this.props
                          .mode && classes.dark2}`}
                      >
                        BOOKS
                      </TableCell>
                      <TableCell
                        className={`${classes.Tablehead} ${this.props
                          .mode && classes.dark2}`}
                      >
                        DOWNLOADS
                      </TableCell>
                      <TableCell
                        className={`${classes.Tablehead} ${this.props
                          .mode && classes.dark2}`}
                      >
                        VIEWERS
                      </TableCell>
                      <TableCell
                        className={`${classes.Tablehead} ${this.props
                          .mode && classes.dark2}`}
                      >
                        REVIEWS
                      </TableCell>
                      <TableCell
                        className={`${classes.Tablehead} ${this.props
                          .mode && classes.dark2}`}
                      >
                        EARNINIG
                      </TableCell>
                      <TableCell
                        className={`${classes.Tablehead} ${this.props
                          .mode && classes.dark2}`}
                      >
                        STATUS
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    className={`${classes.tableBody} ${this.props.mode &&
                      classes.dark1}`}
                  >
                    {this.state.publishersList.map(
                      (row: any, i: any) =>
                        i < 3 && (
                          <TableRow key={i}>
                            <TableCell className={classes.firstcolumn}>
                              {row.name}
                              <br />
                              <span style={{ color: "#AAABB4" }}>
                                {row.email}
                              </span>
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.totalbooks + " Books"}
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.totaldownloads}
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.totalviews}
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.totalviews}
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.totalearnings}
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.status === "active" ? (
                                <Button
                                  variant="outlined"
                                  // color="primary"
                                  size="small"
                                  className={classes.active}
                                >
                                  Active
                                </Button>
                              ) : row.status === "suspended" ? (
                                <Button
                                  variant="outlined"
                                  // color="primary"
                                  size="small"
                                  className={classes.suspended}
                                >
                                  Suspended
                                </Button>
                              ) : (
                                <Button
                                  variant="outlined"
                                  // color="primary"
                                  size="small"
                                  className={classes.blocked}
                                >
                                  Blocked
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box mt={3}>
              <Box className={classes.tableHeaderRow}>
                <Typography
                  variant="h5"
                  className={`${classes.commonColor} ${this.props.mode &&
                    classes.darkFont}`}
                >
                  Student List
                </Typography>
                <span
                  className={classes.headerlink}
                  onClick={() =>
                    this.props.history.push("/AdminConsole/students")
                  }
                >
                  View All
                </span>
              </Box>
              <TableContainer
                component={Paper}
                className={`${classes.tableContainer} ${this.props.mode &&
                  `${classes.dark1} ${classes.darkBorder}`}`}
              >
                <Table
                  stickyHeader
                  className={classes.table}
                  aria-label="simple table"
                >
                  <TableHead
                    style={{
                      borderRadius: "0.2rem",
                      backgroundColor: this.props.mode
                        ? "#ccc !important"
                        : "#F3F2F7 !important",
                    }}
                  >
                    <TableRow>
                      <TableCell
                        className={`${classes.Tablehead} ${this.props
                          .mode && classes.dark2}`}
                      >
                        USER
                      </TableCell>
                      <TableCell
                        className={`${classes.Tablehead} ${this.props
                          .mode && classes.dark2}`}
                      >
                        SUBSCRIPTIONS
                      </TableCell>
                      <TableCell
                        className={`${classes.Tablehead} ${this.props
                          .mode && classes.dark2}`}
                      >
                        BOOK DOWNLOADS
                      </TableCell>

                      <TableCell
                        className={`${classes.Tablehead} ${this.props
                          .mode && classes.dark2}`}
                      >
                        NOTES WRITTEN
                      </TableCell>
                      <TableCell
                        className={`${classes.Tablehead} ${this.props
                          .mode && classes.dark2}`}
                        align="right"
                      >
                        BOOK RETURN
                      </TableCell>
                      <TableCell
                        className={`${classes.Tablehead} ${this.props
                          .mode && classes.dark2}`}
                        align="right"
                      >
                        AMOUNT REFUNDED
                      </TableCell>

                      <TableCell
                        className={`${classes.Tablehead} ${this.props
                          .mode && classes.dark2}`}
                        align="right"
                      >
                        ONBOARDED
                      </TableCell>
                      <TableCell
                        className={`${classes.Tablehead} ${this.props
                          .mode && classes.dark2}`}
                        align="right"
                      >
                        LAST ACTIVE
                      </TableCell>
                      <TableCell
                        className={`${classes.Tablehead} ${this.props
                          .mode && classes.dark2}`}
                        align="right"
                      >
                        TIME SPENT
                      </TableCell>
                      <TableCell
                        className={`${classes.Tablehead} ${this.props
                          .mode && classes.dark2}`}
                        align="right"
                      >
                        STATUS
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    className={`${classes.tableBody} ${this.props.mode &&
                      classes.dark1}`}
                  >
                    {this.state.studentList.map(
                      (row: any, i: any) =>
                        i < 3 && (
                          <TableRow key={i}>
                            <TableCell
                              className={classes.firstcolumn}
                              align="left"
                            >
                              {row.name} <br />{" "}
                              <span style={{ color: "#AAABB4" }}>
                                {row.email}
                              </span>
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.last_subscription
                                ? row.last_subscription
                                : "-"}
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.viewer_count}
                            </TableCell>

                            <TableCell className={classes.th}>
                              {row.notes_written}
                            </TableCell>

                            <TableCell className={classes.th}>
                              {row.books_return}
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.refubd_amount}
                            </TableCell>

                            <TableCell className={classes.th}>
                              {row.onboarded}
                            </TableCell>
                            <TableCell className={classes.th}>{}</TableCell>
                            <TableCell className={classes.th}>{}</TableCell>
                            <TableCell className={classes.th}>
                              {row.status === "active" ? (
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                  className={classes.active}
                                >
                                  Active
                                </Button>
                              ) : row.status === "suspended" ? (
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  size="small"
                                  className={classes.suspended}
                                >
                                  Suspended
                                </Button>
                              ) : (
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  size="small"
                                  className={classes.blocked}
                                >
                                  Blocked
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

// Customizable Area Start

const AdminDashboardAlertBox = withAlertBox(AdminDashboard);
const AdminDashboardLoader = withLoader(AdminDashboardAlertBox);
const AdminDashboardToast = withToast(AdminDashboardLoader);
const AdminDashboardTheme = withTheme(AdminDashboardToast);
// Customizable Area End
export default withStyles((theme) =>
  createStyles({
    progreesSubscrip: {
      backgroundColor: "#E5E5E5 !important",
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: "#F7997E !important",
      },
    },
    progreesStudent: {
      backgroundColor: "#E5E5E5 !important",
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: "#41AFEC !important",
      },
    },
    progreesPubli: {
      backgroundColor: "#E5E5E5 !important",
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: "#FEDF82 !important",
      },
    },
    progreesDownlo: {
      backgroundColor: "#E5E5E5 !important",
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: "#F5A4C1 !important",
      },
    },
    totalEarng: {
      backgroundColor: "#E5E5E5 !important",
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: "#84BB81 !important",
      },
    },
    typoH4: {
      fontWeight: "bolder",
      color: "#11152C",
    },
    sidebar: {
      padding: "20px 40px 20px 0px !important",
    },
    mb: {
      marginBottom: "20px",
    },
    root: {
      "&.MuiTypography-h5": {
        color: "red !important",
      },
    },
    table: {
      padding: "5px",
    },
    tableBody: {
      backgroundColor: "white !important",
      overflowY: "auto",
    },
    uploadContainer: {
      borderRadius: "1rem",
      textAlign: "center",
      padding: "2rem",
      marginRight: "2rem",
      marginTop: "1rem",
      marginBottom: "19px",
      backgroundColor: "#EEEEEE",
      "@media (max-width: 767px)": {
        width: "100%",
      },
    },
    chooseBtn: {
      textTransform: "none",
      height: "45px",
      borderRadius: "11px",
      fontWeight: 600,
    },
    grayColor: {
      color: "#868695 !important",
      fontSize: "15px !important",
    },
    typoColor: {
      color: "#868695 !important",
      fontSize: "14px !important",
    },
    StatisticsContainer: {
      borderRadius: "1rem",
      marginTop: "1rem",
      border: "2px solid #eee",
      boxShadow: "none",
      backgroundColor: "white !important",
    },
    StatisticsItems: {
      border: "1px solid #f1f1f1",
      padding: "1.6rem",
    },
    earningContainer: {
      borderRadius: "1rem",
      // marginTop: "10px",
      backgroundColor: "white !important",
      border: "2px solid #eee",
      boxShadow: "none",
    },
    earningItems: {
      // border: "1px solid #f1f1f1",
      padding: "1.6rem",
    },
    earningTitle: {
      margin: "1rem",
      padding: "1rem",
      backgroundColor: "#EEEEEE",
      borderRadius: "18px",
    },
    tableContainer: {
      // height: "260px",
      backgroundColor: "#fff",
      border: "2px solid #eeeeee",
      borderRadius: 16,
    },
    bookContainer: {
      borderRadius: "16px",
      marginTop: "0",
      [theme.breakpoints.up("sm")]: {
        marginRight: "2rem",
      },
    },
    bookContainerTable: {
      borderRadius: "16px",
      backgroundColor: "#fff",
      marginTop: "0",
      [theme.breakpoints.up("sm")]: {
        marginRight: "2rem",
      },
    },
    th: {
      fontSize: "0.775rem",
      textAlign: "center",
    },

    Tablehead: {
      fontSize: "0.775rem",
      color: "black",
      fontWeight: 600,
      backgroundColor: "#f3f2f7",
      border: 0,
      borderRadius: 0,
      textAlign: "center",
      "&:first-child": {
        borderTopLeftRadius: "10px",
        borderBottomLeftRadius: "10px",
        textAlign: "justify",
      },
      "&:last-child": {
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px",
      },
    },
    firstcolumn: {
      fontSize: "0.780rem",
      color: "#3b9dd4 !important",
      fontWeight: "bold",
    },
    blocked: {
      borderRadius: "1rem",
      backgroundColor: "#FBDCDD",
      fontSize: "12px",
      color: "#ED4643",
      fontWeight: "bold",
      border: "none",
    },
    active: {
      borderRadius: "1rem",
      backgroundColor: "#DEEFFB",
      fontSize: "12px",
      color: "#51B5EE",
      fontWeight: "bold",
      border: "none",
    },
    suspended: {
      borderRadius: "1rem",
      backgroundColor: "#FBE7D7",
      fontSize: "12px",
      color: "#F1A76E",
      fontWeight: "bold",
      border: "none",
    },
    homeColor: {
      color: "#3b9dd4 !important",
    },
    commonColor: {
      color: "black !important",
      marginBottom: "16px !important",
    },
    totalEarn: {
      color: "#808190 !important",
    },
    bookHeaderRow: {
      textAlign: "right",
      padding: "0 40px",
      marginBottom: "5px",
    },
    tableHeaderRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
      color: "#3b9dd4 !important",
      "& h5": {
        marginBottom: "0 !important",
      },
    },
    headerlink: {
      color: "#3AAEEF",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      marginBottom: "0 !important",
      textDecoration: "none",
      opacity: "0.8",
      "&:hover": {
        opacity: "1",
        textDecoration: "none",
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
    darkBorder: {
      border: "1px solid #9b9da4",
    },
    darkBtn:{
      backgroundColor:"#3AAEEF !important"
    }
  })
)(AdminDashboardTheme);
