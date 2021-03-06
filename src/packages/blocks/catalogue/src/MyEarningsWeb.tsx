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

import MyEarningsController, {
  Props,
  configJSON,
} from "./MyEarningsController";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

import { searchImage } from "./assets";

class MyEarnings extends MyEarningsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount = (): any => {
    // this.getMyEarnings();
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
                  <ListItem button selected={true}>
                    {/* <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon> */}
                    <ListItemText
                      primary="My Earnings"
                      onClick={() => this.handleRoutes("/Publisher/MyEarnings")}
                    />
                  </ListItem>
                  <ListItem button>
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
            <Breadcrumbs separator="???" aria-label="breadcrumb">
              <Link color="inherit" href="/Publisher">
                Home
              </Link>
              <Typography style={{ color: "#797b79 !important" }}>
                My Earnings
              </Typography>
            </Breadcrumbs>
            <Box mt={3}>
              <Typography variant="h5">My Earnings</Typography>
            </Box>
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
)(MyEarnings);
