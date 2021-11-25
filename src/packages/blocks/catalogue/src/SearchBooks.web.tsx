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
export const configJSON = require("./config");
import "../../../components/src/Styles/Styles.css";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AppHeader from "../../../components/src/Header/index";
import HomeController, { Props } from "./HomeController.web";
import { withRouter } from "react-router-dom";
import "../assets/css/common.css";
import withTheme from "../../../components/src/Theme/withTheme";
import "../assets/css/home.css";
import Modal from "@material-ui/core/Modal";
import "../assets/css/searchbook.css";
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
  bookCover,
  cartIcon,
  IconClose
} from "./assets";
import SideBar from "./Sidebar.web";
import Loader from "../../../components/src/Loader.web";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SimpleMenu from "./bookMenu.web";
const styles = {
  cardRoot: {
    maxWidth: "400px",
    margin: "20px",
  },
} as any;
class SearchBooks extends HomeController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  render() {
    const { classes } = this.props;
    return (
      <>
        <Loader loading={this.state.Loader} />
        <AppHeader />

        <div className={`search-book-ui`}>
          <SideBar
            selectedIndex={12}
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
                Search Books
              </Typography>
              s
            </Breadcrumbs>
            <h3>My Books</h3>
            <p className="color-gray viewallMyBooks">
              <span>
                {(this.state.searchedMyBooks &&
                  this.state.searchedMyBooks.length) ||
                  0}{" "}
                Books Available
              </span>
              {this.state.searchedMyBooks && this.state.searchedMyBooks.length>3 && <span
                style={{
                  color: "rgb(59, 157, 212)",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                onClick={() => {
                  this.props.history.push("/Catalogue/MyBooks");
                }}
              >
                View All
              </span>
              }
            </p>
            {this.state.searchedBooks && (
              <div className="my-book">
                <div className="row w-100">
                  {this.state.searchedMyBooks.map((x: any, index: any) => {
                    return (
                      index < 3 && (
                        <div className="col-12 col-sm-6 col-xl-4">
                          <div className="card" key={index}>
                            <div
                              className={`list ${this.props.mode &&
                                "dark1"}`}
                            >
                              <div className="img-part">
                                <img
                                  src={x.attributes.cover_image_url}
                                  alt="book-img"
                                  onClick={() => {
                                    //@ts-ignore
                                    this.props.history.push(
                                      `/Catalogue/BookDetails/${
                                        x.attributes.id
                                      }`
                                    );
                                  }}
                                />
                              </div>
                              <div className="text">
                                <strong>{x.attributes.name}</strong>
                                <small className="color-gray">
                                  {x.attributes.book_type}
                                </small>

                                <div className="details">
                                  <div>
                                    <span>{x.attributes.author}</span>
                                    <small className="color-blue">
                                      {x.attributes.note_count} Notes
                                      available
                                    </small>
                                  </div>
                                  <img
                                    src={playButton}
                                    alt="playbutton"
                                    className="playbutton"
                                    onClick={() => {
                                      //@ts-ignore
                                      this.props.history.replace(
                                        `/book-read/${x.attributes.id}`
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div
                              className="more"
                              onClick={() => {
                                this.setState({
                                  returnBookId: [
                                    x.id,
                                    x.attributes.order_id,
                                    x.attributes.cover_image_url,
                                  ],
                                });
                              }}
                            >
                              <SimpleMenu
                                handleReadSetModalClose={
                                  this.handleReadSetModalClose
                                }
                                mode={this.props.mode}
                              />
                              {/* <button className="btn" /> */}
                            </div>
                          </div>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            )}
            {this.state.searchedBooks && (
              <div
                className={`book-list-wrapper search-book ${this.props
                  .mode && "dark1"}`}
              >
                <h2>In Store</h2>
                <ul>
                  {this.state.searchedBooks &&
                    this.state.searchedBooks.length > 0 &&
                    this.state.searchedBooks.map((x: any, index: any) => {
                      return (
                        (this.state.viewAll
                          ? index < this.state.searchedBooks.length
                          : index < 9) && (
                          <li
                            key={index}
                            className={`${this.props.mode && "dark2"}`}
                          >
                            <div className="img-part">
                              <img
                                src={x.attributes.cover_image_url}
                                alt="book-img"
                                onClick={() => {
                                  //@ts-ignore
                                  this.props.history.push(
                                    `/Catalogue/BookDetails/${
                                      x.attributes.id
                                    }`
                                  );
                                }}
                              />
                            </div>
                            <div className="details">
                              <div className="left">
                                <span>{x.attributes.name}</span>
                                <small>{x.attributes.author}</small>
                              </div>
                              <div className="right">
                                <strong className="color-gray">45</strong>
                                <strong className="color-black">
                                  ${x.attributes.price}
                                </strong>
                              </div>
                            </div>
                          </li>
                        )
                      );
                    })}
                </ul>
                {this.state.searchedBooks.length == 0 && (
                  <p>No Book Found !!</p>
                )}
              </div>
            )}
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
                  {/* <p className="text-center sub-title">
                You have not read this book yet!
              </p> */}

                  <div className="text-center m-t-20">
                    <img
                      src={this.state.returnBookId[2]}
                      style={{ width: "100px", borderRadius: "5px" }}
                      alt="Book cover"
                    />
                  </div>
                  {/* <p className="sub-title text-center m-t-35 m-b-35">
                You returning this book after 1 week
                <br />
                of purchase. Refund is not allowed here.
                <br /> still want to proceed with refund ?
              </p> */}
                  <div className="btns ">
                    <button
                      className="button button-primary w-100 m-b-5"
                      onClick={() => {
                        this.state.returnBookId &&
                          this.postRefundBook(
                            this.state.returnBookId[0],
                            this.state.returnBookId[1]
                          );
                      }}
                    >
                      Return Now
                    </button>
                    <p
                      className="cancelBtn"
                      onClick={() => this.handleReadSetModalClose()}
                    >
                      Cancel
                    </p>
                  </div>
                </div>
              </div>
            </Modal>
            {this.state.searchedBooks.length > 9 && !this.state.viewAll && (
              <button
                className="View-all"
                onClick={() => {
                  this.props.history.push("/view-allBooks");
                  this.setState({
                    viewAll: true,
                  });
                }}
              >
                View All
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
}
//@ts-ignore
const SearchBooksRouter = withRouter(SearchBooks);
const SearchBooksTheme = withTheme(SearchBooksRouter);
export default withStyles(styles)(SearchBooksTheme);

// Customizable Area Start
// Customizable Area End
