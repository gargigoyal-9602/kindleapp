import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Header from "./AppHeader.web";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import {
  homeIcon,
  editIcon,
  mybooksIcon,
  myNotesIcon,
  purchasedNotes,
  myEarningsIcon,
  paymentHistoryIcon,
  myPackegesIcon,
  logoutIcon,
} from "./assets";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#F6F6F6",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    width: "100%",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    border: 0,
  },
  drawerContainer: {
    overflow: "auto",
    background: "#F6F6F6",
    height: "90vh",
    margin: 10,
    borderRadius: 16,
    fontSize: 20,
    color: "#808191",
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
  },
  breadcrumbsContainer: {
    marginTop: 20,
  },
  menuItemContainer: {
    display: "flex",
    margin: 20,
  },
  menuIcon: {
    height: 15,
    width: 15,
    marginLeft: 10,
    marginTop: 15,
  },
  menuTitle: {
    margin: 10,
  },
  userType: {
    marginLeft: 20,
  },
  logoutContainer: {
    marginTop: 170,
    display: "flex",
    margin: 20,
  },
}));

interface myProps {
  children: any;
}
const Layout = (props: myProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Header />
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <div className={classes.menuItemContainer}>
            <ListItemText primary={"John Mike"} />
            <img src={editIcon} className={classes.menuIcon} />
          </div>
          <ListItemText className={classes.userType} primary={"Student"} />
          <div className={classes.menuItemContainer}>
            <img src={homeIcon} className={classes.menuIcon} />
            <ListItemText className={classes.menuTitle} primary={"Home"} />
          </div>
          <div className={classes.menuItemContainer}>
            <img src={mybooksIcon} className={classes.menuIcon} />
            <ListItemText className={classes.menuTitle} primary={"My Books"} />
          </div>
          <div className={classes.menuItemContainer}>
            <img src={myNotesIcon} className={classes.menuIcon} />
            <ListItemText className={classes.menuTitle} primary={"My Notes"} />
          </div>
          <div className={classes.menuItemContainer}>
            <img src={purchasedNotes} className={classes.menuIcon} />
            <ListItemText
              className={classes.menuTitle}
              primary={"Purchased Notes"}
            />
          </div>
          <div className={classes.menuItemContainer}>
            <img src={myEarningsIcon} className={classes.menuIcon} />
            <ListItemText
              className={classes.menuTitle}
              primary={"My Earnings"}
            />
          </div>
          <div className={classes.menuItemContainer}>
            <img src={paymentHistoryIcon} className={classes.menuIcon} />
            <ListItemText
              className={classes.menuTitle}
              primary={"Payment History"}
            />
          </div>
          <div className={classes.menuItemContainer}>
            <img src={myPackegesIcon} className={classes.menuIcon} />
            <ListItemText
              className={classes.menuTitle}
              primary={"My Packages"}
            />
          </div>
          <div className={classes.logoutContainer}>
            <img src={logoutIcon} className={classes.menuIcon} />
            <ListItemText className={classes.menuTitle} primary={"Logout"} />
          </div>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Typography>
          <Breadcrumbs
            className={classes.breadcrumbsContainer}
            aria-label="breadcrumb"
          >
            <Link color="inherit">Home</Link>
            <Link color="inherit" href="/getting-started/installation/">
              Search Books
            </Link>
            <Link color="inherit" href="/getting-started/installation/">
              In stores
            </Link>
            <Link color="inherit" href="/getting-started/installation/">
              Book
            </Link>
            <Typography style={{ color: "#797b79 !important" }}>
              Book Details
            </Typography>
          </Breadcrumbs>
        </Typography>
        {props.children}
      </main>
    </div>
  );
};
export default Layout;
