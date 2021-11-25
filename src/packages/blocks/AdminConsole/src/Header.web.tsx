import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Switch from "@material-ui/core/Switch";
import SearchIcon from "@material-ui/icons/Search";
import withTheme from "../../../components/src/Theme/withTheme";

import { webLogo, bellIcon } from "./assets";

import SideBar from "./SideBar.web";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.type === "dark" ? "#424242 !important" : "",
    display: "flex",
    justifyContent: "center",
    padding: "50px  20px",
    "@media only screen and (min-width: 1024px) and (max-width: 1024px)": {
      padding: "0px",
    },
    [theme.breakpoints.down("md")]: {
      padding: "10px",
      marginBottom: "50px",
    },
  },

  grow: {
    // flexGrow: 1,
    marginTop: 130,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      display: "block",
      // paddingLeft: "1rem",
    },
    display: "block",
    paddingLeft: "1rem",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0",
      paddingRight: "12px",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    width: "81% !important",
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      // backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    paddingRight: "40px",
    marginLeft: "auto !important",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      paddingRight: 0,
      marginLeft: "10px !important",
      marginRight: "0",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    // left: "16px",
    // top: "17px",
    zIndex: 8,
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    transition: theme.transitions.create("width"),
    padding: "20px 20px 20px 50px !important",
    borderRadius: "10px",
    backgroundColor: "#3b9dd4",
    fontSize: "15px",
    "&::placeholder": {
      color: "#fff",
      opacity: 1,
    },
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 0,
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },

  dark3: {
    "& input": {
      backgroundColor: "#2f3134 !important",
      color: "#fff !important",
    },
  },
  dark2: {
    backgroundColor: "#2f3134 !important",
    color: "#fff !important",
  },
  dark1: {
    backgroundColor: "#424242 !important",
    color: "#fff !important",
  },
  icons: {
    display: "flex",
  },
}));

const Header = (props: any) => {
  const classes = useStyles();
  const [isDrawerOpen, setDrawer] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const toggleDrawer = () => {
    setDrawer((prevState) => !prevState);
  };
  const closeDrawer = () => {
    setDrawer(false);
  };
  return (
    <div className={classes.grow}>
      <AppBar className={classes.root} position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.topRow}>
            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              onClick={() => {
                //@ts-ignore
                props.history.push("/AdminConsole");
              }}
            >
              <img src={webLogo} width="56px" height="43px" alt="Logo" />
            </Typography>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Books"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                className={`${props.mode && classes.dark3}`}
                inputProps={{ "aria-label": "search" }}
                value={searchInput}
                onChange={(e: any) => {
                  setSearchInput(e.target.value);
                }}
                onKeyUp={(e: any) => {
                  if (e.key === "Enter") {
                    props.history.push(
                      `/AdminConsole/AllBooks?search=${searchInput}`
                    );
                    setSearchInput("");
                  }
                }}
              />
            </div>
            <div className={classes.icons}>
              {/* <Switch checked={props.mode} onChange={props.setTheme} /> */}
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <img src={bellIcon} width="20px" alt="notification" />
                </Badge>
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default withTheme(withRouter(Header));
