import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EmailRegistration from '../../blocks/email-account-registration/src/EmailAccountRegistrationWeb';
import EmailLogin from '../../blocks/email-account-login/src/EmailAccountLoginBlockWeb';
import Layout from '../../components/src/DashboardLayoutWeb';
import Home from '../../blocks/catalogue/src/BookDetailWeb';
class AppRoutes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={EmailLogin} />
          <Route exact path="/signup" component={EmailRegistration} />
          {/* <Layout>
                        <Route path={"/catalogue"} component={Home} />
                    </Layout> */}
        </Switch>
      </Router>
    );
  }
}
export default AppRoutes;
