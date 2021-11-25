import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "react-router";
import {
  withStyles,
  createStyles,
  Grid,
  Box,
  Paper,
  Typography,
  Link,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Hidden,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";


import StorageProvider from "../../../framework/src/StorageProvider.web";
import withTheme from "../../../components/src/Theme/withTheme";
import {
  logoutIcon,
  darkActive,
  darkInActive,
  earningsIcon,
  earningsIconInactive,
  downloadIcon1,
  downloadIconInactive,
  logOutActive,
} from "./assets";
const useStyles = makeStyles((theme) =>
  createStyles({
    // mailbox: {
    //   top: "200px",
    // },
    list: {
      width: "100%",
      height: "auto",
      borderRadius: "11px",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        backgroundColor: "#f2f3f2",
        display: "flex",
        justifyContent: "flex-start",
        padding: "10px",
        marginBottom: "50px",
        position: "fixed",
        left: "-2px",
        zIndex: "10",
        marginTop: "-1px",
        borderRadius: "0",
        overflow: "auto",
        maxHeight: "calc(100vh - 100px)",
      },
      "& h6": {
        fontSize: "15px",
        textAlign: "left",
        color: "#183b56",
        padding: "10px 15px",
      },
      "& strong": {
        fontSize: "17px",
      },
      "& hr": {
        margin: "20px 0 0px 0",
      },
    },
    sideBar: {
      display: "flex",
    },
    mainNav: {
      width: "100%",
    },
    textColor: {
      color: "#797b79",
    },
    fullList: {
      width: "auto",
    },
    listItem: {
      color: "black",
      padding: "5px 15px",
      marginBottom: "5px",
      "& span": {
        fontSize: "0.9rem",
        fontWeight: 500,
        color: "#797b79",
      },
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04) !important",
      },
      "&.Mui-selected": {
        backgroundColor: "#4caeef !important",
        borderRadius: "15px !important",
        color: "white",
        padding: "10px 15px 10px 25px",
        width: "auto",
        margin: "0 15px",
        "& span": {
          color: "#fff",
          fontSize: "1rem",
          fontWeight: 500,
        },
      },
    },
    toggleBarRow: {
      "& svg": {
        color: "#000",
      },
      backgroundColor: "#f2f3f2",
      borderBottom: "1px solid #ccc",
      width: "100%",
      display: "flex",
      zIndex: 9,
      margin: "0",
      position: "absolute",
      top: "82px",
      left: 0,
      padding: "3px 10px",
      height: "30px",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    gridCol: {
      padding: "16px",
    },
  })
);


type myProps = RouteComponentProps & {
  history: any;
  closeDrawer: any;
  mode: any;
  setTheme: any;
};

function SideBar(props: any, { history, closeDrawer, setTheme }: myProps) {
  const classes = useStyles();
  const [name, setName] = useState(null);
  const [isDrawerOpen, setDrawer] = useState(false);
  const toggleDrawer = () => {
    setDrawer((prevState: boolean) => !prevState);
  };
  const closeDrawerfunc = () => {
    setDrawer(false);
  };

  const handleRoutes = (route: any, state: any) => {
    props.history.push({
      pathname: route,
      state: state,
    });
  };

  useEffect(() => {
    const updateProfile = async () => {
      const profile = await StorageProvider.get("accountInfo");
      const user = await JSON.parse(profile);
      if (user && user.attributes) {
        setName(user.attributes.full_name);
      }
      return null;
    };
    updateProfile();
  }, []);

  const logout = async () => {
    await StorageProvider.remove("authToken");
    await StorageProvider.remove("adminToken");
    await StorageProvider.remove("publisherToken");
    handleRoutes("/", null);
  };
  return (
    <>
      <Hidden lgUp>
        <div className={classes.toggleBarRow}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon onClick={toggleDrawer} />
          </IconButton>
        </div>
      </Hidden>
      <Hidden {...(isDrawerOpen ? { lgUp: true } : { mdDown: true })}>
        <Grid item xs={2} className={classes.gridCol}>
          <Paper
            elevation={0}
            className={classes.list}
            role="presentation"
            onClick={closeDrawer}
            onKeyDown={closeDrawer}
          >
            <Box className={classes.mainNav} textAlign="center">
              <Typography variant="h6">
                <strong>{name}</strong>
                <br /> Admin
                <Divider />
              </Typography>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem
                  button
                  className={classes.listItem}
                  selected={location.pathname === "/publisher/MyBooks"}
                  onClick={() => handleRoutes("/publisher/MyBooks", null)}
                >
                  <Box pr={1}>
                    <img
                      src={
                        props.mode ||
                        location.pathname === "/publisher/MyBooks"
                          ? downloadIcon1
                          : downloadIconInactive
                      }
                      width="18"
                      alt="icon"
                    />
                  </Box>
                  <ListItemText primary="My Books" />
                </ListItem>
                <ListItem
                  button
                  className={classes.listItem}
                  selected={location.pathname === "/publisher/MyEarnings"}
                  onClick={() => handleRoutes("/publisher/MyEarnings", null)}
                >
                  <Box pr={1}>
                    <img
                      src={
                        props.mode || location.pathname === "/publisher/MyEarnings"
                          ? earningsIcon
                          : earningsIconInactive
                      }
                      width="18"
                      alt="icon"
                    />
                  </Box>
                  <ListItemText primary="My Earnings" />
                </ListItem>

                <ListItem
                  button
                  className={classes.listItem}
                  selected={location.pathname === "/publisher/MySummery"}
                  onClick={() => handleRoutes("/publisher/MySummery", null)}
                >
                  <Box pr={1}>
                    <img
                      src={
                        props.mode || location.pathname === "/publisher/MySummery"
                          ? earningsIcon
                          : earningsIconInactive
                      }
                      width="18"
                      alt="icon"
                    />
                  </Box>
                  <ListItemText primary="My Summary" />
                </ListItem>

                <ListItem
                  button
                  className={classes.listItem}
                  onClick={() => {
                    props.setTheme();
                  }}
                >
                  <Box pr={1}>
                    <img
                      src={props.mode ? darkActive : darkInActive}
                      style={{ height: "20px", width: "22px" }}
                    />
                  </Box>
                  <ListItemText primary="Dark Mode" />
                </ListItem>

                <ListItem
                  button
                  className={classes.listItem}
                  onClick={logout}
                >
                  <Box pr={1}>
                    <img src={props.mode ?logOutActive:logoutIcon} width="18" alt="icon" />
                  </Box>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </Box>
          </Paper>
        </Grid>
      </Hidden>
    </>
  );
}

export default withTheme(withRouter(SideBar));
