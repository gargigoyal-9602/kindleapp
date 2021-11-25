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
} from "@material-ui/core";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// Customizable Area End

import AdminConsoleController, {
  Props,
  configJSON,
} from "./AdminConsoleController";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

class AdminConsole extends AdminConsoleController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  handleClick = (event: any) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };
  // Customizable Area End

  render() {
    const { classes }: any = this.props;
    return <Box m={3} />;
  }
}

// Customizable Area Start

// Customizable Area End
export default withStyles((theme) =>
  createStyles({
    root: {
      overflowX: "hidden",
      height: "100vh",
    },
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
      height: "260px",
    },
  })
)(AdminConsole);
