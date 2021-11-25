import React from "react";
import { withRouter } from "react-router-dom";

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
  InputBase,
  Hidden,
} from "@material-ui/core";

import withAlertBox from "../../../components/src/withAlertBox.Web";
import withToast from "../../../components/src/withSnackBar.Web";
import withLoader from "../../../components/src/withLoader.Web";

import PublisherHomeController, {
  Props,
  configJSON,
} from "./PublisherHome.Controller";
import StorageProvider from "../../../framework/src/StorageProvider.web";

import MyEarningsWeb from "./MyEarningsWeb";
import MySummery from "./MySummeryWeb";
import MyBooksWeb from "./MyBooksWeb";
// Customizable Area End

class PublisherHome extends PublisherHomeController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    const { match, accountInfo }: any = this.props;
    return (
      <>
        <MySummery {...this.props} isSummery={false} />
      </>
    );
  }
}

// Customizable Area Start

// Customizable Area End
export default withRouter(PublisherHome);
