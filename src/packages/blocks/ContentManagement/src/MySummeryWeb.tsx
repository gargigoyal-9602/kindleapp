import React, { useState } from "react";
// Customizable Area Start

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
  Divider,
  List,
  ListItem,
  ListItemText,
  Hidden,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {
  Chart,
  registerables,
  ChartTypeRegistry,
  ChartConfiguration,
  ChartType,
  ChartData,
} from "chart.js";
Chart.register(...registerables);
import withAlertBox from "../../../components/src/withAlertBox.Web";
import withToast from "../../../components/src/withSnackBar.Web";
import withLoader from "../../../components/src/withLoader.Web";
import withDialog from "../../../components/src/withDialog.web";
// Customizable Area End

import MySummeryController, {
  Props,
  configJSON,
  S,
} from "./MySummeryController";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import { viewerIcon, downloadIcon, dollerIcon, sampleReadIcon } from "./assets";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
interface dateProps {
  date: any;
  setDate: any;
  customDateSales: any;
}
const DateRangePicker = ({ date, setDate, customDateSales }: dateProps) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen((prevState) => !prevState);
    customDateSales();
  };

  return (
    <Dialog
      open={open}
      // onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Select Dates</DialogTitle>
      <DialogContent>
        <DateRange
          editableDateInputs={true}
          onChange={(item: any) => setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
          direction="vertical"
          minDate={new Date(new Date().setDate(new Date().getDate() - 400))}
          maxDate={new Date()}
          scroll={{ enabled: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Submit
        </Button>
        <Button onClick={()=>setOpen(false)} color="primary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

class MySummery extends MySummeryController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount = (): any => {
    this.createChart();
    if (this.props.authToken) {
      this.setState({ authToken: this.props.authToken }, () => {
        this.monthlySales();
        this.getPublishers();
        // this.customDateSales();
        // this.totalSales();
      });
    }
  };
  componentDidUpdate = (prevProps: Props, prevState: S): any => {
    if (prevProps.authToken !== this.props.authToken) {
      return this.setState({ authToken: this.props.authToken }, () => {
        this.monthlySales();
        this.getPublishers();
        // this.customDateSales();
        // this.totalSales();
      });
    } else if (prevState.selectedIndex !== this.state.selectedIndex) {
      if (this.state.selectedIndex === "This Month") {
        this.monthlySales();
      } else if (this.state.selectedIndex === "Total Sales") {
        this.totalSales();
      }
    } else if (prevState.customDateSales !== this.state.customDateSales) {
      this.lineChart.data.datasets[0].data = this.state.customDateSales.custom_date.totalbooks.map(
        (book: any) => book.value
      );
      this.lineChart.data.datasets[1].data = this.state.customDateSales.custom_date.totaldownloads.map(
        (book: any) => book.value
      );
      this.lineChart.data.datasets[2].data = this.state.customDateSales.custom_date.totalearnings.map(
        (book: any) => book.value
      );
      this.lineChart.data.datasets[3].data = this.state.customDateSales.custom_date.totalviews.map(
        (book: any) => book.value
      );
      this.lineChart.data.labels = this.state.customDateSales.custom_date.totalbooks.map(
        (book: any) => book.date
      );
      this.lineChart.update();
    } else if (prevState.monthlySales !== this.state.monthlySales) {
      this.lineChart.data.datasets[0].data = this.state.monthlySales.custom_date.totalbooks.map(
        (book: any) => book.value
      );
      this.lineChart.data.datasets[1].data = this.state.monthlySales.custom_date.totaldownloads.map(
        (book: any) => book.value
      );
      this.lineChart.data.datasets[2].data = this.state.monthlySales.custom_date.totalearnings.map(
        (book: any) => book.value
      );
      this.lineChart.data.datasets[3].data = this.state.monthlySales.custom_date.totalviews.map(
        (book: any) => book.value
      );
      this.lineChart.data.labels = this.state.monthlySales.custom_date.totalbooks.map(
        (book: any) => book.date
      );
      this.lineChart.update();
    } else if (prevState.totalSales !== this.state.totalSales) {
      this.toggleActiveButton("This Month");
    }
  };
  setDate = (date: any): any => {
    this.setState({ date: date });
  };
  handleClick = (event: any) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };
  toggleActiveButton = (value: any) => {
    if (value === "This Month") {
      this.lineChart.data.datasets[2].data = this.state.totalSales.last_month.totalearnings.map(
        (book: any) => book.value
      );
      this.lineChart.data.labels = this.state.totalSales.last_month.totalearnings.map(
        (book: any) => book.date
      );
    } else if (value === "1 Year") {
      this.lineChart.data.datasets[2].data = this.state.totalSales.last_year.totalearnings.map(
        (book: any) => book.value
      );
      this.lineChart.data.labels = this.state.totalSales.custom_date.totalearnings.map(
        (book: any) => book.date
      );
    } else {
      this.lineChart.data.datasets[2].data = this.state.totalSales.last_month.totalearnings.map(
        (book: any) => book.value
      );
      this.lineChart.data.labels = this.state.totalSales.last_month.totalearnings.map(
        (book: any) => book.date
      );
    }
    this.lineChart.data.datasets[0].data = [];
    this.lineChart.data.datasets[1].data = [];
    this.lineChart.data.datasets[3].data = [];
    this.lineChart.update();
  };
  handleClose = (value: any) => {
    if (value === "This Month") {
      this.setState({ selectedIndex: value, anchorEl: null });
    } else if (value === "Total Sales") {
      this.setState({ selectedIndex: value, anchorEl: null });
    } else if (value === "Custom Date") {
      this.setState({ selectedIndex: value, anchorEl: null });
    } else {
      this.setState({ anchorEl: null });
    }
  };
  handleRoutes = (route: any) => {
    this.props.history.push(route);
  };
  createChart() {
    const labels: any = []; // ["January", "February", "March", "April", "May", "June"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Total Books",
          backgroundColor: "red",
          data: [],
          borderWidth: 1,
        },
        {
          label: "Total Downloads",
          backgroundColor: "blue",
          data: [],
          borderWidth: 1,
        },
        {
          label: "Total Earnings",
          backgroundColor: "green",
          data: [],
          borderWidth: 1,
        },
        {
          label: "Total Views",
          backgroundColor: "yellow",
          data: [],
          borderWidth: 1,
        },
      ],
    };
    const lineConfig: ChartConfiguration<
      keyof ChartTypeRegistry,
      number[],
      string
    > = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            display: false,
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
      },
    };
    this.lineChart = new Chart(
      document.getElementById("lineChart") as HTMLCanvasElement,
      lineConfig
    );
  }
  // Customizable Area End

  render() {
    const { classes, accountInfo, isSummery }: any = this.props;
    return (
      <Box m={3}>
        {isSummery ? (
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link style={{ color: "#3b9dd4" }} href="/Publisher">
              Home
            </Link>
            <Typography style={{ color: "#797b79 !important" }}>
              My Summary
            </Typography>
          </Breadcrumbs>
        ) : (
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Typography style={{ color: "#3b9dd4 !important" }}>
              Home
            </Typography>
          </Breadcrumbs>
        )}
        <Box mt={3} mb={3}>
          <Typography variant="h5">
            {isSummery
              ? "My Summery"
              : accountInfo &&
                accountInfo.attributes &&
                `Welcome ${accountInfo.attributes.full_name},`}
          </Typography>
        </Box>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Grid container justify="center">
              <Grid item xs={12} md={4}>
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
                    <Typography
                      variant="subtitle1"
                      onClick={this.handleClick}
                    >
                      {this.state.selectedIndex} <ArrowDropDownIcon />
                    </Typography>
                    {this.state.selectedIndex === "This Month" && (
                      <Typography variant="body1" color="textSecondary">
                        {`${this.state.prevDate.getDate()} ${this.state.prevDate.toLocaleString(
                          "default",
                          { month: "short" }
                        )} - ${this.state.todayDate.getDate()} ${this.state.todayDate.toLocaleString(
                          "default",
                          { month: "short" }
                        )}`}
                      </Typography>
                    )}
                    {this.state.selectedIndex === "Custom Date" && (
                      <Typography variant="body1" color="textSecondary">
                        {`${this.state.date[0].startDate.getDate()} ${this.state.date[0].startDate.toLocaleString(
                          "default",
                          { month: "short" }
                        )} - ${this.state.date[0].endDate.getDate()} ${this.state.date[0].endDate.toLocaleString(
                          "default",
                          { month: "short" }
                        )}`}
                      </Typography>
                    )}

                    <Menu
                      id="selectActionButton"
                      keepMounted
                      open={Boolean(this.state.anchorEl)}
                      onClose={this.handleClose}
                      anchorEl={this.state.anchorEl}
                    >
                      <MenuItem
                        onClick={() => this.handleClose("This Month")}
                      >
                        This Month
                      </MenuItem>
                      <MenuItem
                        onClick={() => this.handleClose("Total Sales")}
                      >
                        Total Sales
                      </MenuItem>
                      <MenuItem
                        onClick={() => this.handleClose("Custom Date")}
                      >
                        Custom Date
                      </MenuItem>
                    </Menu>
                  </Box>
                  <Box>
                    <ArrowForwardIcon />
                  </Box>
                </Box>
                {this.state.selectedIndex === "Total Sales" && (
                  <Box
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Button
                      variant="outlined"
                      color={
                        this.state.activeButton === "This Month"
                          ? "primary"
                          : "default"
                      }
                      onClick={() => {
                        this.setState({ activeButton: "This Month" });
                        this.toggleActiveButton("This Month");
                      }}
                    >
                      1 Month
                    </Button>
                    <Button
                      variant="outlined"
                      color={
                        this.state.activeButton === "1 Year"
                          ? "primary"
                          : "default"
                      }
                      onClick={() => {
                        this.setState({ activeButton: "1 Year" });
                        this.toggleActiveButton("1 Year");
                      }}
                    >
                      1 Year
                    </Button>
                    <Button
                      variant="outlined"
                      color={
                        this.state.activeButton === "All"
                          ? "primary"
                          : "default"
                      }
                      onClick={() => {
                        this.setState({ activeButton: "All" });
                        this.toggleActiveButton("All");
                      }}
                    >
                      All
                    </Button>
                  </Box>
                )}
                {this.state.selectedIndex === "Custom Date" && (
                  <DateRangePicker
                    date={this.state.date}
                    setDate={this.setDate}
                    customDateSales={this.customDateSales}
                  />
                )}
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item xs={12} md={6}>
                <Box p={3} pt={0}>
                  <canvas id="lineChart" />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={2}>
            <Grid container className={classes.StatisticsContainer}>
              <Grid item xs={12} sm={3} className={classes.StatisticsItems}>
                <Box display="flex">
                  <Box pr={1} component="span">
                    <img src={viewerIcon} width="15px" height="15px" />
                  </Box>
                  <Typography variant="body2">Viewers</Typography>
                </Box>
                <Typography variant="h4">
                  {this.state.publishers.totalviews}
                </Typography>
                <Box width="100%" mr={1}>
                  <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={50.0}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={3} className={classes.StatisticsItems}>
                <Box display="flex">
                  <Box pr={1} component="span">
                    <img src={downloadIcon} width="15px" height="15px" />
                  </Box>
                  <Typography variant="body2">Downloads</Typography>
                </Box>
                <Typography variant="h4">
                  {this.state.publishers.totaldownloads}
                </Typography>
                <Box width="100%" mr={1}>
                  <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={50.0}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={3} className={classes.StatisticsItems}>
                <Box display="flex">
                  <Box pr={1} component="span">
                    <img src={dollerIcon} width="15px" height="15px" />
                  </Box>
                  <Typography variant="body2">Earnings</Typography>
                </Box>
                <Typography variant="h4">
                  {this.state.publishers.totalearnings}
                </Typography>
                <Box width="100%" mr={1}>
                  <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={50.0}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={3} className={classes.StatisticsItems}>
                <Box display="flex">
                  <Box pr={1} component="span">
                    <img src={sampleReadIcon} width="15px" height="15px" />
                  </Box>
                  <Typography variant="body2">Total Books</Typography>
                </Box>
                <Typography variant="h4">
                  {this.state.publishers.totalbooks}
                </Typography>
                <Box width="100%" mr={1}>
                  <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={50.0}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Box>
    );
  }
}

// Customizable Area Start

const MySummeryAlertBox = withAlertBox(MySummery);
const MySummeryLoader = withLoader(MySummeryAlertBox);
const MySummeryToast = withToast(MySummeryLoader);
const MySummeryWithDialog = withDialog(MySummeryToast);
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
      // backgroundColor: "#f1f1f1",
      padding: "0.5rem",
    },
    StatisticsItems: {
      // border: "1px solid #f1f1f1",
      padding: "1.6rem",
    },
    month: {
      backgroundColor: "#cccccc44",
      color: "blue",
      borderRadius: "1rem",
      padding: "0.1rem 1rem 0.2rem 1rem",
    },
  })
)(MySummeryWithDialog);
