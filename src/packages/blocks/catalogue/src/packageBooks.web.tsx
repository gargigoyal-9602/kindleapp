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
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Divider from "@material-ui/core/Divider";
import HomeController, { Props, S } from "./HomeController.web";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
export const configJSON = require("./config");
import SideBar from "./Sidebar.web";
import AppHeader from "../../../components/src/Header/index";
import BookListing from "../../../components/src/BookListing/index";
import { withRouter,useLocation } from "react-router-dom";
import Loader from "../../../components/src/Loader.web";
import Link from "@material-ui/core/Link";
import "../assets/css/common.css";
import withTheme from "../../../components/src/Theme/withTheme";
import Modal from "@material-ui/core/Modal";
import "../assets/css/Instore.css";

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
  IconClose
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
class packageBooks extends HomeController {
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
        <div
          className={`view-book-page catalog-home ${this.props.mode &&
            "dark3"}`}
        >
          <SideBar
            selectedIndex={11}
            className="col-2"
            accountInfo={this.state.accountInfo && this.state.accountInfo}
          />
          <div className="content">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link href="/Catalogue/Home" style={{ color: "#3b9dd4" }}>
                Home
              </Link>
              <Typography style={{ color: "#797b79 !important" }}>
                In Store
              </Typography>
              s
            </Breadcrumbs>
            <h3>In store</h3>
            {this.state.allBooks && (
              <div className={`book-list-wrapper`}>
                <ul className="row">
                  {this.state.allBooks &&
                    this.state.allBooks.map((x: any, index: any) => {
                      return (
                        (this.state.viewAll
                          ? index < this.state.allBooks.length
                          : index < 9) && (
                          <div className="col-12 col-sm-6 col-xl-4">
                            <li
                              key={x.id}
                              className={`${this.props.mode && "dark1 "}`}
                            >
                              <div
                                className="img-part"
                                onClick={() => {
                                  //@ts-ignore
                                  this.props.history.push(
                                    `/Catalogue/BookDetails/${
                                      x.attributes.id
                                    }`
                                  );
                                }}
                              >
                                <img
                                  src={x.attributes.cover_image_url}
                                  alt="book-img"
                                />
                              </div>
                              <div className="details">
                                <div className="left instore-left-part">
                                  <span
                                    onClick={() => {
                                      //@ts-ignore
                                      this.props.history.push(
                                        `/Catalogue/BookDetails/${
                                          x.attributes.id
                                        }`
                                      );
                                    }}
                                  >
                                    {`${x.attributes.name} : ${
                                      x.attributes.author
                                    }`}
                                  </span>
                                  <small>{x.attributes.author}</small>
                                </div>
                                <div className="right instore-right-part">
                                  <input
                                  className="regular-checkbox custom-checkbox"
                                   id={x.attributes.id}
                                    name={x.attributes.id}
                                    // id={x.attributes.id}
                                    type="checkbox"
                                    
                                    onChange={(e: any) => {
                                      const obj = {
                                        name: e.target.name,
                                        checked: e.target.checked,
                                      };
                                      const checkedArray = this.state
                                        .booksChecked;
                                      let newArray;
                                      if (e.target.checked) {
                                        newArray = [
                                          ...this.state.booksChecked,
                                          obj,
                                        ];
                                      } else {
                                        newArray = checkedArray.filter(
                                          (check: any) => {
                                            return (
                                              check.name != x.attributes.id
                                            );
                                          }
                                        );
                                      }
                                      this.setState({
                                        booksChecked: newArray,
                                      });
                                    }}
                                  />
                                  <label htmlFor={x.attributes.id}></label>
                                  {/* <strong className="color-gray">$45</strong>
                                  <strong className="color-black">
                                    ${x.attributes.price}
                                  </strong> */}
                                </div>
                              </div>
                            </li>
                          </div>
                        )
                      );
                    })}
                </ul>

                {!this.state.viewAll &&
                  (this.state.allBooks &&
                    this.state.allBooks.length > 9) && (
                    <button
                      className="View-all"
                      onClick={() => {
                        this.setState({
                          viewAll: true,
                        });
                      }}
                    >
                      View All
                    </button>
                  )}

                {!this.state.viewAll && (
                  <div
                    className={`store-items-block-wrapper ${this.props
                      .mode && "dark1"}`}
                  >
                    <h3>Best Seller</h3>
                    <div className="">
                      <BookListing
                        allBooks={
                          this.state.bestSeller && this.state.bestSeller
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <Modal
          open={this.state.readSetModal}
          onClose={this.handleReadSetModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="cancel-book-section d-flex justify-content-center align-items-center"
        >
          <div className="cancel-book-wrapper">
            <img
              src={IconClose}
              alt="close"
              className="close-icon"
              onClick={() => this.handleReadSetModalClose()}
            />
            <div className="inside-wrapper-box">
              <h4 className="text-center">Are You Sure?</h4>
              <p className="text-center sub-title">
                Cancel Your 4 Months Book Pass
              </p>
              <div className="book-review gradient-bg mt-20">
                <div className="img-section">
                  {/* <img src={bookPass} /> */}
                </div>
                <div className="description-section">
                  <p className="first-p">BOOK PASS</p>
                  <p>
                    <small>Read/Play all available books</small>
                  </p>
                </div>
              </div>
              <p className="sub-title text-center m-t-35 m-b-35">
                You Bougth this last month only one month <br />
                refund will be proceed and you will loose at <br /> Your
                book . still want to proceed with refund ?
              </p>
             
              <div className="btns ">
                <button
                  className="button button-primary w-100 m-b-5"
                  onClick={() => {
                    this.postaddPackageBooks();
                  }}
                >
                  Save
                </button>
                <button
                  className="button button-secondary w-100"
                  onClick={() => this.handleReadSetModalClose()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}
const packageBooksWithRouter = withRouter(packageBooks);
const packageBooksTheme = withTheme(packageBooksWithRouter);
export default withStyles(styles)(packageBooksTheme);
