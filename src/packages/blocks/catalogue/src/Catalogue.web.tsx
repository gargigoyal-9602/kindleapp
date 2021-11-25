import React from "react";
// Customizable Area Start
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { shadows } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { bookCover, viewIcon } from "./assets";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { withRouter, Link } from "react-router-dom";
//import { connect } from "react-redux";
import {
  BrowserRouter,
  Router,
  Route,
  NavLink,
  Switch,
  HashRouter,
} from "react-router-dom";
// Customizable Area End
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CatalogueController, { Props } from "./CatalogueController";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
export const configJSON = require("./config");
import "../../../components/src/Styles/Styles.css";
import Home from "./Home.web";
import MyBook from "./MyBooks.web";

import {
  bookLogo,
  playButton,
  Published,
  selectArrow,
  downloads,
  Notes,
  earnings,
  subscription,
  paymentHistory,
  purchasedNotes,
} from "./assets";
const images = [
  {
    id: 1,
    img: playButton,
  },
  {
    id: 2,
    img: playButton,
  },
  {
    id: 3,
    img: playButton,
  },
  {
    id: 4,
    img: playButton,
  },
  {
    id: 5,
    img: playButton,
  },
];
const styles = {
  searchIcon: {
    // padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    left: "3%",
    alignItems: "center",
    justifyContent: "center",
  },

  search: {
    position: "relative",
    background: "#5196DD",
    // border:"1px solid red",
    // backgroundCo #4CAEEF
    color: "white",
    //   backgroundColor:"rgb(68, 156, 214)",
    //   marginLeft:"0",
    width: "100%",
    borderRadius: "8px",
    marginTop: "2%",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    // transition: theme.transitions.create('width'),
    width: "100%",
    padding: "13px 50px",
  },
  notesForSale: {
    backgroundColor: "#F2F3F2",
    height: "auto",
    margin: "20px",
    borderRadius: "8px",
  },
  cardContainer: {
    height: "auto",
    backgroundColor: "white",
    width: "auto",
    margin: "10px",
    borderRadius: "8px",
  },
  formControl: {
    // margin: "23px",

    minWidth: 120,
  },
} as any;
class Catalogue extends CatalogueController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  handleListItemClick = (event: any, index: any, str?: any) => {
    this.setState({
      selectedIndex: index,
      activeStatus: str,
    });
  };

  // Customizable Area Start
  // Customizable Area End
  render() {
    const { classes } = this.props;
    return (
      //Merge Engine DefaultContainer
      <BrowserRouter>
        <div>
          {/* <BrowserRouter> */}
          <AppBar style={{ backgroundColor: "#4caeef" }}>
            <Grid container spacing={0}>
              <Grid item xs={2}>
                <div style={{ padding: "10px" }}>
                  <img
                    src={bookLogo}
                    style={{ height: "50px", width: "50px" }}
                  />
                </div>
              </Grid>
              <Grid item xs={2}>
                {/* <div className={classes.dropDownIcon}>
                            <img src={Published} style={{ height: "10px", width: "10px",marginBottom:"-32px" }} />

                            </div> */}

                <FormControl className={classes.formControl}>
                  <InputLabel
                    id="demo-simple-select-label"
                    style={{ margin: "23px" }}
                  >
                    Age
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value="Browse"
                  >
                    {/* style={{background:"#5196DD",color:"white"}} */}
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              </Grid>
              <Grid item xs={1} />
              <Grid
                item
                xs={1}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <NotificationsNoneIcon />
                </div>
              </Grid>
            </Grid>
          </AppBar>

          <div style={{ marginTop: "6%" }}>
            <Grid container spacing={0}>
              <Grid item xs={2}>
                <div
                  style={{
                    backgroundColor: "#F2F3F2",
                    height: "100vh",
                    borderRadius: "8px",
                    marginLeft: "4px",
                  }}
                >
                  <List component="nav" aria-label="main mailbox folders">
                    <NavLink
                      exact
                      to="/Catalogue/Home"
                      style={{ textDecoration: "none" }}
                    >
                      <ListItem
                        button
                        selected={this.state.selectedIndex == 0}
                        onClick={(event) => this.handleListItemClick(event, 0)}
                      >
                        <ListItemIcon>
                          {/* <InboxIcon /> */}
                          <HomeOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItem>
                    </NavLink>
                    <NavLink
                      to="/Catalogue/MyBooks"
                      style={{ textDecoration: "none" }}
                    >
                      <ListItem
                        button
                        selected={this.state.selectedIndex === 1}
                        onClick={(event) => this.handleListItemClick(event, 1)}
                      >
                        <ListItemIcon>
                          <img
                            src={downloads}
                            style={{ height: "20px", width: "25px" }}
                          />

                          {/* <DraftsIcon /> */}
                        </ListItemIcon>
                        <ListItemText primary="My Books" />
                      </ListItem>
                    </NavLink>

                    <ListItem
                      button
                      selected={this.state.selectedIndex === 2}
                      onClick={(event) => this.handleListItemClick(event, 2)}
                    >
                      <ListItemIcon>
                        <img
                          src={Notes}
                          style={{ height: "20px", width: "25px" }}
                        />

                        {/* <DraftsIcon /> */}
                      </ListItemIcon>
                      <ListItemText primary="My Notes" />
                    </ListItem>
                    <ListItem
                      button
                      selected={this.state.selectedIndex === 3}
                      onClick={(event) => this.handleListItemClick(event, 3)}
                    >
                      <ListItemIcon>
                        {/* <DraftsIcon /> */}
                        <img
                          src={purchasedNotes}
                          style={{ height: "20px", width: "25px" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Purchased Notes" />
                    </ListItem>
                    <ListItem
                      button
                      selected={this.state.selectedIndex === 4}
                      onClick={(event) => this.handleListItemClick(event, 4)}
                    >
                      <ListItemIcon>
                        <img
                          src={earnings}
                          style={{ height: "20px", width: "25px" }}
                        />

                        {/* <DraftsIcon /> */}
                      </ListItemIcon>
                      <ListItemText primary="My Earnings" />
                    </ListItem>
                    <ListItem
                      button
                      selected={this.state.selectedIndex === 5}
                      onClick={(event) => this.handleListItemClick(event, 5)}
                    >
                      <ListItemIcon>
                        {/* <DraftsIcon /> */}
                        <img
                          src={purchasedNotes}
                          style={{ height: "20px", width: "25px" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Payment History" />
                    </ListItem>
                    <ListItem
                      button
                      selected={this.state.selectedIndex === 6}
                      onClick={(event) => this.handleListItemClick(event, 6)}
                    >
                      <ListItemIcon>
                        <img
                          src={subscription}
                          style={{ height: "20px", width: "25px" }}
                        />
                        {/* subscription,paymentHistory,purchasedNotes} from './assets' */}
                        {/* <DraftsIcon /> */}
                      </ListItemIcon>
                      <ListItemText primary="My Packages" />
                    </ListItem>
                  </List>
                </div>
              </Grid>
              <Grid item xs={9}>
                <Switch>
                  <Route exact path="/Catalogue/Home" component={Home} />
                  <Route exact path="/Catalogue/MyBooks" component={MyBook} />
                </Switch>

                {/* <Route exact path="/Home/AccountProfile" component={AccountProfileWeb} /> */}
                {/* <Route exact path="/AccountProfile" component={AccountProfileWeb} /> */}
                {/* <Route
                  exact
                  path="/"
                  component={EmailAccountRegistration}
                /> */}
              </Grid>
            </Grid>
          </div>
          {/* </BrowserRouter> */}
        </div>
      </BrowserRouter>

      //Merge Engine End DefaultContainer
    );
  }
}
//@ts-ignore
export default withStyles(styles)(Catalogue);
// withStyles(styles)(Catalogue);
//withRouter(connect()(withStyles(styles)(Catalogue)));
//connect()(withRouter(Catalogue))(withRouter(withStyles(styles)(Catalogue)));

// Customizable Area Start
// Customizable Area End
