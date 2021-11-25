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
} from "@material-ui/core";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// Customizable Area End

import MySummeryController, { Props, configJSON } from "./MySummeryController";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

import { viewerIcon, downloadIcon, dollerIcon, sampleReadIcon } from "./assets";

class MySummery extends MySummeryController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount = (): any => {
    // this.getMySummery();
  };
  handleRoutes = (route: any) => {
    this.props.history.push(route);
  };
  // Customizable Area End

  render() {
    const { classes }: any = this.props;
    return (
      <Box m={3} className={classes.root}>
        <Grid container spacing={4}>
          <Grid item xs={2}>
            <div
              style={{
                height: "100vh",
                backgroundColor: "#f1f1f1",
                borderRadius: "0.3rem",
              }}
            >
              <Box m={1} textAlign="center">
                <Typography variant="h6">
                  John Mike <br /> Publisher
                </Typography>
                <Divider />
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem button>
                    <ListItemText
                      primary="My Books"
                      onClick={() => this.handleRoutes("/Publisher/MyBooks")}
                    />
                  </ListItem>
                  <ListItem button>
                    {/* <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon> */}
                    <ListItemText
                      primary="My Earnings"
                      onClick={() => this.handleRoutes("/Publisher/MyEarnings")}
                    />
                  </ListItem>
                  <ListItem button selected={true}>
                    <ListItemText
                      primary="My Summery"
                      onClick={() => this.handleRoutes("/Publisher/MySummery")}
                    />
                  </ListItem>
                </List>
              </Box>
            </div>
          </Grid>
          <Grid item xs={10}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Link color="inherit" href="/Publisher">
                Home
              </Link>
              <Typography style={{ color: "#797b79 !important" }}>
                My Summery
              </Typography>
            </Breadcrumbs>
            <Box mt={3} mb={3}>
              <Typography variant="h5">My Summery</Typography>
            </Box>
            <Grid item xs={10} md={8}>
              <Grid container className={classes.StatisticsContainer}>
                <Grid item xs={12} sm={3} className={classes.StatisticsItems}>
                  <Box display="flex">
                    <Box pr={1} component="span">
                      <img src={viewerIcon} width="15px" height="15px" />
                    </Box>
                    <Typography variant="body2">Viewers</Typography>
                  </Box>
                  <Typography variant="h4">98K</Typography>
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
                  <Typography variant="h4">1m</Typography>
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
                  <Typography variant="h4">27$</Typography>
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
                    <Typography variant="body2">Sample Read</Typography>
                  </Box>
                  <Typography variant="h4">122k</Typography>
                  <Box width="100%" mr={1}>
                    <LinearProgress
                      variant="determinate"
                      color="secondary"
                      value={50.0}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

// Customizable Area Start

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
      backgroundColor: "#f1f1f1",
      padding: "0.5rem",
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
    tableContainer: {
      height: "60vh",
    },
    th: {
      fontSize: "0.775rem",
    },
    blocked: {
      borderRadius: "1rem",
      backgroundColor: "#f5440017",
      fontSize: "12px",
    },
    active: {
      borderRadius: "1rem",
      backgroundColor: "#c0caff8c",
      fontSize: "12px",
      color: "#0127ff",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: "#f1f1f1",
      marginLeft: 0,
      width: "auto",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "80%",
      },

      border: "1px solid black",
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
  })
)(MySummery);
