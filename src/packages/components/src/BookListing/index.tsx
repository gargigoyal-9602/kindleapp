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
import "../../../blocks/catalogue/assets/css/home.css"
import "../../../blocks/catalogue/assets/css/common.css"

import withTheme from "../Theme/withTheme";

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

const BookListing = (props: any) => {
  const { classes } = props;
  const location = window.location.pathname.split('/')[2]
  return (
    <>
    <div className={`book-items-main ${location == "BookDetails" && "similarbook-page"}`}>
      {location == "BookDetails" && <h1>Similar Books</h1>}
    <div className="store-items-block ">
        {props?.allBooks &&
          props?.allBooks.map((x: any, index: any) => {
            return (
              <div className="image-cell" key={x.id}>
                <div className="price">
                  {window.location.pathname == `/Catalogue/Home` && <img
                  className="click-pointer"
                    src={require("./images/Play Button.png")}
                    onClick={() => {
                      //@ts-ignore
                      props.history.replace(`/book-read/${x.attributes.id}`);
                    }}
                  />
          }
                 {window.location.pathname == `/Catalogue/Home` && <strong>${x.attributes.price}</strong>}
                </div>
                <div
                  className="image-block"
                  
                >
                   {window.location.pathname != (`/Catalogue/Home`) && window.location.pathname.split("/")[1] != (`package-books`) && window.location.pathname != (`/view-allBooks`)  && <img className="playbutton click-pointer"
                    src={require("./images/Play Button.png")}
                    onClick={() => {
                      //@ts-ignore
                      props.history.replace(`/book-read/${x.attributes.id}`);
                    }}
                  />}
                  <img src={x.attributes.cover_image_url} onClick={() => {
                    const { history }: any = props;
                    history.push(`/Catalogue/BookDetails/${x.attributes.id}`);
                  }} />
                </div>
                <p className={`image-name ${props.mode &&
                        "darkFont"}`}>{x.attributes.name}</p>
              </div>
            );
          })}
      
      </div>
      { window.location.pathname != (`/view-allBooks`) && window.location.pathname.split("/")[1] != (`package-books`) && props.allBooks && (
          <div className={`view-books ${location == "BookDetails" && "view-books-similar" } ${props.mode && "dark-boxshadow"}`} onClick={()=>{
              props.history.push('/view-allBooks')
          }}>
            <span>
              View all <br /> books
            </span>
            <button className="btn-next" />
          </div>
        )}
    </div>
   
    </>
  );
};

const BookListingRouter = withRouter(BookListing);
const BookListingTheme = withTheme(BookListingRouter);
export default withStyles(styles)(BookListingTheme);
