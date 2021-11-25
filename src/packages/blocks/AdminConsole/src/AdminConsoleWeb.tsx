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

import StorageProvider from "../../../framework/src/StorageProvider.web";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// Customizable Area End

import AdminConsoleController, {
  Props,
  configJSON,
} from "./AdminConsoleController";

import AdminDashboard from "./AdminDashboardWeb";
import PublishersList from "./PublishersListWeb";
import StudentsList from "./StudentsListWeb";
import UploadMedia from "./UploadMediaWeb";
import ReadAndListen from "./ReadAndListen.web";
import AddPublisher from "./AddPublisherWeb";
import EditPublisher from "./EditPublisherWeb";
import AllBooks from "./AllBooks.web";
import Header from "./Header.web";
import Subscriptions from "./Subscriptions.web";
import Notes from "./Notes.web";
import { toast } from "react-toastify";
import AdminsList from "./AdminsList.web";
import PackagesList from "./PackagesList.web";
import AddAdmin from "./AddAdmin.web";
import ChangeStatus from "./ChangeStatus.web";
import EditPackage from "./EditPackage.web";
import AllOrders from "./orders.web";

class AdminConsole extends AdminConsoleController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    const authToken = await StorageProvider.get("adminToken");
    const accountInfo = await StorageProvider.get("accountInfo");
    try {
      if (authToken && accountInfo) {
        this.setState({ authToken, accountInfo: JSON.parse(accountInfo) });
      } else {
        const { history }: any = this.props;
        history.push("/");
      }
    } catch {
      toast.error("Session Expired! Please Login again.");
      this.logout();
    }
  }
  handleRoutes(route: any, state: any) {
    this.props.history.push({
      pathname: route,
      state: state,
    });
  }
  logout = () => {
    StorageProvider.remove("authToken");
    StorageProvider.remove("adminToken");
    StorageProvider.remove("publishserToken");
    this.handleRoutes("/", null);
  };
  // Customizable Area End

  render() {
    const { match }: any = this.props;
    return (
      <>
        <Header {...this.state} logout={this.logout} />
        <Switch>
          <Route
            path={`${match.path}/Students`}
            render={(routeProps) => (
              <StudentsList
                {...routeProps}
                {...this.state}
                logout={this.logout}
              />
            )}
          />
          <Route
            path={`${match.path}/Publishers`}
            render={(routeProps) => (
              <PublishersList
                {...routeProps}
                {...this.state}
                logout={this.logout}
              />
            )}
          />
          <Route
            path={`${match.path}/Admins`}
            render={(routeProps) => (
              <AdminsList
                {...routeProps}
                {...this.state}
                logout={this.logout}
              />
            )}
          />
          <Route
            path={`${match.path}/UploadMedia`}
            render={(routeProps) => (
              <UploadMedia
                {...routeProps}
                {...this.state}
                logout={this.logout}
              />
            )}
          />
          <Route
            path={`${match.path}/ReadAndListen`}
            render={(routeProps) => (
              <ReadAndListen
                {...routeProps}
                {...this.state}
                logout={this.logout}
              />
            )}
          />
          <Route
            path={`${match.path}/AddPublisher`}
            render={(routeProps) => (
              <AddPublisher
                {...routeProps}
                {...this.state}
                logout={this.logout}
              />
            )}
          />
          <Route
            path={`${match.path}/AddAdmin`}
            render={(routeProps) => (
              <AddAdmin {...routeProps} {...this.state} logout={this.logout} />
            )}
          />
          <Route
            path={`${match.path}/Edit/:id`}
            render={(routeProps) => (
              <EditPublisher
                {...routeProps}
                {...this.state}
                logout={this.logout}
              />
            )}
          />
          <Route
            path={`${match.path}/EditPackage`}
            render={(routeProps) => (
              <EditPackage
                {...routeProps}
                {...this.state}
                logout={this.logout}
              />
            )}
          />
          <Route
            path={`${match.path}/ChangeStatus`}
            render={(routeProps) => (
              <ChangeStatus
                {...routeProps}
                {...this.state}
                logout={this.logout}
              />
            )}
          />
          <Route
            path={`${match.path}/AllBooks`}
            render={(routeProps) => (
              <AllBooks {...routeProps} {...this.state} logout={this.logout} />
            )}
          />
          <Route
            path={`${match.path}/Notes`}
            render={(routeProps) => (
              <Notes {...routeProps} {...this.state} logout={this.logout} />
            )}
          />
          <Route
            path={`${match.path}/Subscriptions`}
            render={(routeProps) => (
              <Subscriptions
                {...routeProps}
                {...this.state}
                logout={this.logout}
              />
            )}
          />
          <Route
            path={`${match.path}/Packages`}
            render={(routeProps) => (
              <PackagesList
                {...routeProps}
                {...this.state}
                logout={this.logout}
              />
            )}
          />
          <Route
            path={`${match.path}/allOrders`}
            render={(routeProps) => (
              <AllOrders {...routeProps} {...this.state} logout={this.logout} />
            )}
          />
          <Route
            path={`${match.path}`}
            render={(routeProps) => (
              <AdminDashboard
                {...routeProps}
                {...this.state}
                logout={this.logout}
              />
            )}
          />
        </Switch>
      </>
    );
  }
}

// Customizable Area Start

// Customizable Area End
export default withRouter(AdminConsole);
