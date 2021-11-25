import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "react-router";
import {
  createStyles,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Grid,
} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import StorageProvider from "../../../framework/src/StorageProvider.web";
import {
  studentIcon,
  studentIconInActive,
  downloadIcon,
  earningsIcon,
  earningsIconInactive,
  logoutIcon,
  logOutActive,
  notesIcon,
  publisherIcon,
  publisherIconInactive,
  subscriIcon,
  UploadImage,
  UploadImageInActive,
  groupAdminIcon,
  darkActive,
  darkInActive,
  groupAdminIconInactive,
  downloadIconInactive,
  notesIconInactive,
  packageIcon,
  packageInactive,
  subscriIconInactive,
} from "./assets";
import withTheme from "../../../components/src/Theme/withTheme";

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
        marginTop: "-16px",
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
    darkFo: {
      "& span": {
        color: "white !important",
      },
    },
    dark3: {
      backgroundColor: "#1f2023 !important",
      color: "#fff !important",
    },
    dark2: {
      backgroundColor: "#2f3134 !important",
      color: "#fff !important",
    },
    dark1: {
      backgroundColor: "#424242 !important",
      color: "#fff !important",
    },
    darkFont: {
      color: "#fff !important",
    },
    darkBorder: {
      border: "1px solid #9b9da4",
    },
    darkToggleRow: {
      "& svg": {
        color: "white",
      },
      backgroundColor: "#303030 !important",
      color: "#fff !important",
      borderBottom: "1px solid #9b9da4",
    },
  })
);

type myProps = RouteComponentProps & {
  history: any;
  closeDrawer: any;
};

function SideBar(props: any, { closeDrawer, history }: myProps) {
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
        <div
          className={`${classes.toggleBarRow} ${props.mode &&
            classes.darkToggleRow}`}
        >
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
        <Grid
          item
          xs={2}
          className={classes.gridCol}
        >
          <Paper
            elevation={0}
            className={`${classes.list} ${props.mode && classes.dark1}`}
            role="presentation"
            onClick={closeDrawer}
            onKeyDown={closeDrawer}
          >
            <Box className={classes.mainNav} textAlign="center">
              <Typography
                variant="h6"
                style={{ color: `${props.mode ? "white" : "inherit"}` }}
              >
                <strong>{name}</strong>
                <br /> Admin
                <Divider />
              </Typography>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem
                  button
                  className={`${classes.listItem} ${props.mode &&
                    classes.darkFo}`}
                  selected={location.pathname === "/AdminConsole/UploadMedia"}
                  onClick={() =>
                    handleRoutes("/AdminConsole/UploadMedia", null)
                  }
                >
                  <Box pr={1}>
                    <img
                      src={
                        props.mode ||
                        location.pathname === "/AdminConsole/UploadMedia"
                          ? UploadImage
                          : UploadImageInActive
                      }
                      width="18"
                      alt="icon"
                    />
                  </Box>
                  <ListItemText primary="Upload Media" />
                </ListItem>
                <ListItem
                  button
                  className={`${classes.listItem} ${props.mode &&
                    classes.darkFo}`}
                  selected={location.pathname === "/AdminConsole/students"}
                  onClick={() => handleRoutes("/AdminConsole/students", null)}
                >
                  <Box pr={1}>
                    <img
                      src={
                        props.mode ||
                        location.pathname === "/AdminConsole/students"
                          ? studentIcon
                          : studentIconInActive
                      }
                      width="18"
                      alt="icon"
                    />
                  </Box>
                  <ListItemText primary="Students" />
                </ListItem>
                <ListItem
                  button
                  className={`${classes.listItem} ${props.mode &&
                    classes.darkFo}`}
                  selected={location.pathname === "/AdminConsole/publishers"}
                  onClick={() =>
                    handleRoutes("/AdminConsole/publishers", null)
                  }
                >
                  <Box pr={1}>
                    <img
                      src={
                        props.mode ||
                        location.pathname === "/AdminConsole/publishers"
                          ? publisherIcon
                          : publisherIconInactive
                      }
                      width="18"
                      alt="icon"
                    />
                  </Box>
                  <ListItemText primary="Publishers" />
                </ListItem>
                <ListItem
                  button
                  className={`${classes.listItem} ${props.mode &&
                    classes.darkFo}`}
                  selected={location.pathname === "/AdminConsole/Admins"}
                  onClick={() => handleRoutes("/AdminConsole/Admins", null)}
                >
                  <Box pr={1}>
                    <img
                      src={
                        props.mode ||
                        location.pathname === "/AdminConsole/Admins"
                          ? groupAdminIcon
                          : groupAdminIconInactive
                      }
                      width="18"
                      alt="icon"
                    />
                  </Box>
                  <ListItemText primary="Admins" />
                </ListItem>
                <ListItem
                  button
                  className={`${classes.listItem} ${props.mode &&
                    classes.darkFo}`}
                  selected={location.pathname === "/AdminConsole/AllBooks"}
                  onClick={() => handleRoutes("/AdminConsole/AllBooks", null)}
                >
                  <Box pr={1}>
                    <img
                      src={
                        props.mode ||
                        location.pathname === "/AdminConsole/AllBooks"
                          ? downloadIcon
                          : downloadIconInactive
                      }
                      width="18"
                      alt="icon"
                    />
                  </Box>
                  <ListItemText primary="All Books" />
                </ListItem>
                <ListItem
                  button
                  className={`${classes.listItem} ${props.mode &&
                    classes.darkFo}`}
                  selected={location.pathname === "/AdminConsole/Notes"}
                  onClick={() => handleRoutes("/AdminConsole/Notes", null)}
                >
                  <Box pr={1}>
                    <img
                      src={
                        props.mode ||
                        location.pathname === "/AdminConsole/Notes"
                          ? notesIcon
                          : notesIconInactive
                      }
                      width="20"
                      alt="icon"
                    />
                  </Box>
                  <ListItemText primary="Notes" />
                </ListItem>
                <ListItem
                  button
                  className={`${classes.listItem} ${props.mode &&
                    classes.darkFo}`}
                  selected={
                    location.pathname === "/AdminConsole/Subscriptions"
                  }
                  onClick={() =>
                    handleRoutes("/AdminConsole/Subscriptions", null)
                  }
                >
                  <Box pr={1}>
                    <img
                      src={
                        props.mode ||
                        location.pathname === "/AdminConsole/Subscriptions"
                          ? subscriIcon
                          : subscriIconInactive
                      }
                      width="18"
                      alt="icon"
                    />
                  </Box>
                  <ListItemText primary="Subscriptions" />
                </ListItem>
                <ListItem
                  button
                  className={`${classes.listItem} ${props.mode &&
                    classes.darkFo}`}
                  selected={location.pathname === "/AdminConsole/Packages"}
                  onClick={() => handleRoutes("/AdminConsole/Packages", null)}
                >
                  <Box pr={1}>
                    <img
                      src={
                        props.mode ||
                        location.pathname === "/AdminConsole/Packages"
                          ? packageIcon
                          : packageInactive
                      }
                      width="18"
                      alt="icon"
                    />
                  </Box>
                  <ListItemText primary="Packages" />
                </ListItem>
                <ListItem
                  button
                  className={`${classes.listItem} ${props.mode &&
                    classes.darkFo}`}
                  selected={location.pathname === "/AdminConsole/allOrders"}
                  onClick={() =>
                    handleRoutes("/AdminConsole/allOrders", null)
                  }
                >
                  <Box pr={1}>
                    <img
                      src={
                        props.mode ||
                        location.pathname === "/AdminConsole/allOrders"
                          ? earningsIcon
                          : earningsIconInactive
                      }
                      width="18"
                      alt="icon"
                    />
                  </Box>
                  <ListItemText primary="Orders" />
                </ListItem>
                <ListItem
                  button
                  className={`${classes.listItem} ${props.mode &&
                    classes.darkFo}`}
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
                  <ListItemText
                    primary="Dark Mode"
                    // className={`${classes.textColor}`}
                  />
                </ListItem>

                <ListItem
                  button
                  className={`${classes.listItem} ${props.mode &&
                    classes.darkFo}`}
                  onClick={logout}
                >
                  <Box pr={1}>
                    <img
                      src={props.mode ? logOutActive : logoutIcon}
                      width="18"
                      alt="icon"
                    />
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

const sidebarTheme = withTheme(SideBar);
export default withRouter(sidebarTheme);
