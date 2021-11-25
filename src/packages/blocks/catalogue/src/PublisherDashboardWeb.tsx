import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
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

// import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// Customizable Area End

import PublisherDashboardController, {
  Props,
  configJSON,
} from "./PublisherDashboardController";
import StorageProvider from "../../../framework/src/StorageProvider.web";

import MyEarningsWeb from "./MyEarningsWeb";
import MySummeryWeb from "./MySummeryWeb";
import MyBooksWeb from "./MyBooksWeb";

class PublisherDashboard extends PublisherDashboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    const authToken = await StorageProvider.get("publisherToken");
    if (authToken) {
      this.setState({ authToken });
    } else {
      this.props.history.push("/");
    }
  }
  // Customizable Area End

  render() {
    const { match }: any = this.props;
    return (
      <Switch>
        <Route path={`${match.path}/MyEarnings`} component={MyEarningsWeb} />
        <Route path={`${match.path}/MyBooks`} component={MyBooksWeb} />
        <Route path={`${match.path}/MySummery`} component={MySummeryWeb} />
      </Switch>
    );
  }
}

// Customizable Area Start

// Customizable Area End
export default withRouter(PublisherDashboard);
