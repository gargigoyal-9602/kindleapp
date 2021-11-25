import React from "react";
// Customizable Area Start
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { shadows } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
//import { bookCover, viewIcon } from "./assets";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
// Customizable Area End
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { withRouter, Link } from "react-router-dom";
import HeaderController, { Props, S } from "./HeaderController.web";
import Loader from "../../../components/src/Loader.web";
import StorageProvider from "../../../framework/src/StorageProvider.web";
import "./header.css";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import withTheme from "../Theme/withTheme";
const styles = {
  searchIcon: {
    // padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    left: "12px",
    top: "0%",
    alignItems: "center",
    justifyContent: "center",
    
  },
  inputRoot: {
     color: "inherit",
    "&::placeholder": {
      color: "red !important",
    },
  },

  inputInput: {
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    // transition: theme.transitions.create('width'),
    width: "100%",
    padding: "13px 50px",
    "&::placeholder": {
      color: "white !important",
    },
  },
  // notesForSale: {
  //   backgroundColor: "#F2F3F2",
  //   height: "auto",
  //   margin: "20px",
  //   borderRadius: "8px",
  // },
  cardContainer: {
    height: "auto",
    backgroundColor: "white",
    width: "auto",
    margin: "10px",
    borderRadius: "8px",
  },
  formControl: {
    minWidth: 120,
  },
} as any;

class AppHeader extends HeaderController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <AppBar
          className={`header ${this.props.mode && "dark1"}`}
          style={{}}
        >
          <nav>
            <div>
              <img
                src={require("./images/Logo_White.png")}
                className="logo-img"
                onClick={() => {
                  //@ts-ignore
                  this.props.history.push("/Catalogue/Home");
                }}
              />
            </div>

            <div className={`search-bar ${this.props.mode && "dark2"}`}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Books"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                value={this.state.searchInput && this.state.searchInput}
                onChange={(e: any) => {
                  this.setState({
                    searchInput: e.target.value,
                  });
                }}
                onKeyUp={(e: any) => {
                  if (e.key === "Enter") {
                    StorageProvider.set("search", this.state.searchInput);
                    //@ts-ignore
                    this.props.history.push("/search-books");
                  }
                }}
              />
            </div>

            <div className="show-notification">             
              <img src={require("./images/Notification.png")} />
            </div>
          </nav>
        </AppBar>
      </>
    );
  }
}

//@ts-ignore
const AppHeaderRouter = withRouter(AppHeader);
const AppHeadertheme = withTheme(AppHeaderRouter);
export default withStyles(styles)(AppHeadertheme);
