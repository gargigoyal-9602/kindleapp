import React, { useState, useEffect } from "react";
// Customizable Area Start
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { shadows } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { bookCover, viewIcon, EditIcon } from "./assets";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import HomeIcon from "@material-ui/icons/Home";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import "../assets/css/sidebar.css";
import { withRouter, Link } from "react-router-dom";
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
import MyPackages from "./MyPackages.web";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import StorageProvider from "../../../framework/src/StorageProvider.web";
import withTheme from "../../../components/src/Theme/withTheme"
import withToast from "../../../components/src/withSnackBar.Web";
import withLoader from "../../../components/src/withLoader.Web";
import withDialog from "../../../components/src/withDialog.web";
import withAlertBox from "../../../components/src/withAlertBox.Web";

import {
  homeIcon,
  homeIconActive,
  bookLogo,
  playButton,
  Published,
  selectArrow,
  downloads,
  downloadsActive,
  Notes,
  NotesActive,
  earnings,
  earningsActive,
  subscription,
  subscriptionActive,
  paymentHistory,
  purchasedNotes,
  purchasedNotesActive,
  paymentActive,
  paymentInactive,
  bookPass,
  logOut,
  logOutActive,
  cart,cartDot,
  storeActive,
  storeInActive,
  darkActive,darkInActive
} from "./assets";


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
  textColor:{
    color: "#797b79",
    marginLeft:"-17px"
  }

} as any;

const SideBar = (props: any) => {
  const { classes } = props;
  const [toggle, setToggle] = useState(true);
  const selectedIndex = props.selectedIndex;
  const handleListItemClick = (event: any, index: any, str?: any) => {
    setToggle(true);
  };
  

  return (
    
    <>

      <div className="sidebar">
        {/* <Grid container spacing={0}> */}
        {/* <Grid item xs={2}> */}
        <div
          className={`toggle-button-wrap ${props.mode && "dark1"}`}
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <MenuRoundedIcon />
          {/* <button className="toggle-button" /> */}
        </div>
        <div
          className={`${toggle ? "mobile-view-sidebar" : ""} ${props.mode && "dark1"}`}
          
          style={{
            backgroundColor: "#F2F3F2",
            borderRadius: "8px",
            marginLeft: "4px",
          }}
        >
          <div className="inner-sidebar">
            <div className="profile">
              <div className="name">
                <strong>{props?.accountInfo?.attributes?.full_name}</strong>
                <span>{props?.accountInfo?.attributes?.user_type}</span>
              </div>
              <button
                className="btn btn-edit"
                onClick={() => {
                  //@ts-ignore
                  props.history.push(`/user-profile`);
                }}
              >
                <img src={EditIcon} alt="edit" /> <sup style={{paddingLeft:"3px", position:"relative", top:"3px",fontSize :"16px"}}>Edit</sup>
              </button>
            </div>

            <List component="nav" aria-label="main mailbox folders">
              <NavLink
                
                to="/Catalogue/Home"
                style={{color: 'inherit', textDecoration: "none" }}
              >
                <ListItem
                  button
                  selected={selectedIndex == 0}
                  onClick={(event) => handleListItemClick(event, 0)}
                  className="sidebar-links"
                  
                >
                  <ListItemIcon
                    className={selectedIndex == 0 ? "active-sidebar" : ""}
                  >
                     <img
                      src={props.mode || selectedIndex == 0 ? homeIconActive : homeIcon}
                      style={{ height: "18px", width: "22px", paddingLeft:"5px" }}
                      className="navLinksCustom"
                    />      
                  </ListItemIcon>
                  <ListItemText
                    primary="Home"
                    className={selectedIndex == 0 ? "active-sidebar" : `${classes.textColor}`}
                   
                  />
                </ListItem>
              </NavLink>
              <NavLink
                to="/Catalogue/MyBooks"
                style={{  color: 'inherit',textDecoration: "none" }}
              >
                <ListItem
                  button
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, 1)}
                  className="sidebar-links"
                >
                  <ListItemIcon>
                    <img
                      src={props.mode || selectedIndex == 1 ? downloadsActive : downloads}
                      style={{ height: "20px", width: "25px" }}
                      className="navLinksCustom"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="My Books"
                    className={selectedIndex == 1 ? "active-sidebar" : `${classes.textColor}`}
                  />
                </ListItem>
              </NavLink>

              <NavLink
                to="/Catalogue/MyNotes"
                style={{ color: 'inherit',textDecoration: "none", minWidth:"40px"}}
              >
                <ListItem
                  button
                  selected={selectedIndex === 2}
                  onClick={(event) => handleListItemClick(event, 2)}
                  className="sidebar-links"
                >
                  <ListItemIcon>
                    <img
                      src={props.mode || selectedIndex == 2 ? NotesActive : Notes}
                      style={{ height: "20px", width: "25px" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="My Notes"
                    className={selectedIndex == 2 ? "active-sidebar" : `${classes.textColor}`}
                  />
                </ListItem>
              </NavLink>

               <NavLink
                to="/purchasedNotes"
                style={{ color: 'inherit',textDecoration: "none" }}
              >
              <ListItem
                button
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
                className="sidebar-links"
              >
                <ListItemIcon>
                  <img
                    src={
                      props.mode || selectedIndex == 3 ? purchasedNotesActive : purchasedNotes
                    }
                    style={{ height: "20px", width: "25px" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Purchased Notes"
                  className={selectedIndex == 3 ? "active-sidebar" : `${classes.textColor}`}
                />
              </ListItem>
              </NavLink>
               <NavLink
                to="/Catalogue/MyEarnings"
                style={{color: 'inherit', textDecoration: "none" }}
              >
              <ListItem
                button
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
                className="sidebar-links"
              >
                <ListItemIcon>
                  <img
                    src={props.mode || selectedIndex === 4 ? earningsActive : earnings}
                    style={{ height: "20px", width: "25px" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="My Earnings"
                  className={selectedIndex == 4 ? "active-sidebar" : `${classes.textColor}`}
                />
              </ListItem>
              </NavLink>
              <ListItem
                button
                selected={selectedIndex === 5}
                onClick={(event) => handleListItemClick(event, 5)}
                className="sidebar-links"
              >
                <ListItemIcon>
                  <img
                    src={ props.mode || selectedIndex === 5 ? paymentActive : paymentInactive}
                    style={{ height: "20px", width: "25px" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Payment History"
                  className={selectedIndex == 5 ? "active-sidebar" : `${classes.textColor}`}
                />
              </ListItem>
              {props?.accountInfo?.attributes?.have_package && <NavLink to="/MyPackages"
                style={{ color: 'inherit',textDecoration: "none" }}>
              <ListItem
                button
                selected={selectedIndex === 6}
                onClick={(event) => handleListItemClick(event, 6)}
                className="sidebar-links"
              >
                <ListItemIcon>
                  <img
                    src={
                      props.mode || selectedIndex === 6 ? subscriptionActive : subscription
                    }
                    style={{ height: "20px", width: "25px" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="My Packages"
                  className={selectedIndex == 6 ? "active-sidebar" : `${classes.textColor}`}
                />
              </ListItem>

              </NavLink>}
              <NavLink
                to="/view-allBooks"
                style={{ color: 'inherit',textDecoration: "none" }}
              >
                <ListItem
                  button
                  selected={selectedIndex === 7}
                  onClick={(event) => handleListItemClick(event, 7)}
                  className="sidebar-links"
                >
                  <ListItemIcon>
                    <img
                      src={props.mode || selectedIndex == 7 ? storeActive : storeInActive}
                      style={{ height: "20px", width: "25px" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="In Store"
                    className={selectedIndex == 7 ? "active-sidebar" : `${classes.textColor}`}
                  />
                </ListItem>
              </NavLink>
              <NavLink to="/cart"
                style={{color: 'inherit', textDecoration: "none" }}>
              <ListItem button
                selected={selectedIndex === 8}
                onClick={(event) => handleListItemClick(event, 8)}
                className="sidebar-links">
                <ListItemIcon>
                  <img src={cartDot} className="cart-img"/>
                </ListItemIcon>
                <ListItemText
                  primary="Go To Cart" className={selectedIndex === 8? "darkFo" :"cart-txt"}/>
              </ListItem>
              </NavLink>
              
            </List>
            <div className="buy-package">
            <p className="font-weight-500">Buy Packages</p>
            <div className="buy-now-book-section gradient-bg">
            <div className="book-review ">
                  <div className="img-section">
                    <img src={bookPass} />
                  </div>
                  <div className="description-section">
                    <p className="first-p">BOOK PASS</p>
                    <p>
                      <small>Read/Play all available books</small>
                    </p>
                  </div>
                 
                </div>
                <button className="white-btn" onClick={()=>{
                  //@ts-ignore
        props.history.push("/BuyPackages")
                }}>Buy Now</button>
            </div>
            </div>

         
          </div>
          <div className="bottom-links">
          {/* <NavLink className="mt-20" to=""  onClick={()=>props.setTheme
          }> */}
            <ListItem
              button
            onClick={()=>{
              console.log(props.mode,"mode")
              props.setTheme()
            }}>
              <ListItemIcon>
                <img
                  src={props.mode? darkActive: darkInActive}
                  style={{ height: "20px", width: "22px" }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Dark Mode"
                className={`${classes.textColor}`}
              />
            </ListItem>
          {/* </NavLink> */}
       
          <NavLink className="" to="" style={{ color: 'inherit',textDecoration: "none" }} onClick={()=>{
StorageProvider.remove("authToken")
StorageProvider.remove("accountInfo")
StorageProvider.remove("orderId");
//@ts-ignore
        props.history.push("/")
          }}>
            <ListItem
              button
            >
              <ListItemIcon>
                <img
                  src={props.mode? logOutActive: logOut}
                  style={{ height: "20px", width: "22px" }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                className={`${classes.textColor}`}
              />
            </ListItem>
          </NavLink>
          </div>
       
        </div>
        
      </div>
    </>
  );
};

//@ts-ignore
const SideBarAlertBox = withAlertBox(SideBar);
const SideBarLoader = withLoader(SideBarAlertBox);
const SideBarToast = withToast(SideBarLoader);
const SideBarWithDialog = withDialog(SideBarToast);
const SideBarWithRouter = withRouter(SideBarWithDialog);
const SideBartheme = withTheme(SideBarWithRouter);
export default withStyles(styles)(SideBartheme);

// Customizable Area Start
// Customizable Area End
