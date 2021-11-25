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
// Customizable Area End
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import HomeController, { Props, S } from "./HomeController.web";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
export const configJSON = require("./config");
import SideBar from "./Sidebar.web";
import AppHeader from "../../../components/src/Header/index";
import BookListing from "../../../components/src/BookListing/index";
import { withRouter, Link } from "react-router-dom";
import Loader from "../../../components/src/Loader.web";
import "../assets/css/home.css";
import withToast from "../../../components/src/withSnackBar.Web";
import withLoader from "../../../components/src/withLoader.Web";
import withDialog from "../../../components/src/withDialog.web";
import withAlertBox from "../../../components/src/withAlertBox.Web";
import withTheme from "../../../components/src/Theme/withTheme"
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
//import styles from '../assets/css/index'

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
    // margin: "23px",

    minWidth: 120,
  },
} as any;


class Home extends HomeController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Loader loading={this.state.Loader} />
        <AppHeader />
        <div className={`catalog-home ${this.props.mode && "dark3"}`} >
          
          <SideBar
            selectedIndex={0}
            accountInfo={this.state.accountInfo && this.state.accountInfo}
            className="col-2"
          />
          <div className="content">
            <p className="color-gray">Home</p>
            <p className="color-gray mb-0" style={{textTransform:"capitalize"}}>Welcome {this.state.accountInfo && this.state.accountInfo?.attributes?.full_name},</p>
            <h3>In Store</h3>

            <BookListing
              allBooks={this.state.allBooks && this.state.allBooks}
            />
             {this.state.allBooks && 
             <div className={`notesForSale ${this.props.mode && "dark1 dark2"}`}>
                <div className="listing-block">
                  <div className="title">
                    <h3>Notes for sale</h3>
                  </div>
                  <div className="custom-scroll">
            {this.state.AllNotesForPurchased ? (
                    <ul>
                      {this.state.AllNotesForPurchased &&
                        this.state.AllNotesForPurchased.map((x: any, index: any) => {
                          return (
                            // (this.state.notesViewMore
                            //   ? index < 6
                            //   : index < this.state.allBooks.length)
                             
                              <li key={x.id}>
                                <div>
                                  <img src={Published} />
                                  <div className="v1">
                                    <p> {x.attributes.name}</p>
                                    <small>{x.attributes.notes.length} Notes Available</small>
                                  </div>
                                </div>
                                <img src={selectArrow} alt="select arrow" onClick={()=>{
                                  //ts-ignore
                                  this.props.history.push(`/buyNotesPreview/${x.id}`)
                                }} />
                              </li>
                            
                          );
                        })}
                    </ul>
                 ): "No Notes Available For sale !!"
                } 
                  </div>
                  
                  {this.state.AllNotesForPurchased &&
                        this.state.AllNotesForPurchased.length <6 && <button
                    className="btn btn-viewall"
                    onClick={() => {
                      //ts-ignore
                      this.props.history.push("/buyNotes")
                    }}
                  >
                    View All
                  </button>
  }
                </div>
              </div>
  }
          </div>
        </div>
      </>

      //Merge Engine End DefaultContainer
    );
  }
}
//@ts-ignore
const HomeAlertBox = withAlertBox(Home);
const HomeLoader = withLoader(HomeAlertBox);
const HomeToast = withToast(HomeLoader);
const HomeWithDialog = withDialog(HomeToast);
const HomeWithRouter = withRouter(HomeWithDialog);
const HomeWithRoutertheme = withTheme(HomeWithRouter);
export default withStyles(styles)(HomeWithRoutertheme);

// Customizable Area Start
// Customizable Area End
