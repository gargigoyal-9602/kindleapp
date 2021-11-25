import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
// Customizable Area Start
import { Hidden, Box, Grid } from "@material-ui/core";

import PublisherDashboardController, {
  Props,
  configJSON,
} from "./PublisherDashboardController";
import StorageProvider from "../../../framework/src/StorageProvider.web";

import MyEarningsWeb from "./MyEarningsWeb";
import MySummeryWeb from "./MySummeryWeb";
import MyBooksWeb from "./MyBooksWeb";
import PublisherHome from "./PublisherHome.web";
import Header from "./Header.web";
import SideBar from "./SideBar.web";
import { toast } from "react-toastify";

// Customizable Area End

class PublisherDashboard extends PublisherDashboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    const authToken = await StorageProvider.get("publisherToken");
    const accountInfo = await StorageProvider.get("accountInfo");
    try {
      if (authToken && accountInfo) {
        this.setState({ authToken, accountInfo: JSON.parse(accountInfo) });
      } else {
        this.props.history.push("/");
      }
    } catch {
      toast.error("Session Expired! Please login again.");
      this.logout();
    }
  }
  logout = async () => {
    await StorageProvider.remove("authToken");
    await StorageProvider.remove("adminToken");
    await StorageProvider.remove("publihserToken");
    this.props.history.push("/");
  };
  // Customizable Area End

  render() {
    const { match }: any = this.props;
    return (
      <>
        <Header />
        <Grid container>
          <Hidden>
            <SideBar closeDrawer={() => {}} />
          </Hidden>
          <Grid item xs={12} md={12} lg={10}>
            <Switch>
              <Route
                path={`${match.path}/MyEarnings`}
                render={(routeProps) => (
                  <MyEarningsWeb {...routeProps} {...this.state} />
                )}
              />
              <Route
                path={`${match.path}/MyBooks`}
                render={(routeProps) => (
                  <MyBooksWeb {...routeProps} {...this.state} />
                )}
              />
              <Route
                path={`${match.path}/MySummery`}
                render={(routeProps) => (
                  <MySummeryWeb {...routeProps} {...this.state} isSummery />
                )}
              />
              <Route
                path={`${match.path}/`}
                render={(routeProps) => (
                  <PublisherHome {...routeProps} {...this.state} />
                )}
              />
            </Switch>
          </Grid>
        </Grid>
      </>
    );
  }
}

// Customizable Area Start

// Customizable Area End
export default withRouter(PublisherDashboard);
