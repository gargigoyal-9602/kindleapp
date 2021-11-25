import React from "react";
// Customizable Area Start
import Typography from "@material-ui/core/Typography";
import { withStyles, createStyles } from "@material-ui/core/styles";
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
import "../assets/css/home.css";
import "../assets/css/notes.css";
import "../assets/css/mybook.css";
import "../assets/css/common.css";
import withTheme from "../../../components/src/Theme/withTheme";

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
} from "./assets";
import SideBar from "./Sidebar.web";
import Loader from "../../../components/src/Loader.web";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import BookListing from "../../../components/src/BookListing/index";
import ReactPlayer from "react-player";


const styles = (theme: any) =>
  createStyles({
    cardRoot: {
      maxWidth: "400px",
      margin: "20px",
    },
    aboutBookTitle: {
      width: "80px",
      [theme.breakpoints.down("sm")]: {
        width: "30%",
      },
    },
    aboutBookValue: {

      wordBreak: "break-all",
      [theme.breakpoints.down("sm")]: {
        width: "70%",
      },
    },
} as any);
class BookDetails extends HomeController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  render() {
    const { classes } = this.props;
    const book = this.state.bookDetail && this.state.bookDetail.attributes;
    return (
      <>
        <Loader loading={this.state.Loader} />
        <AppHeader />

        <div
          className={`catalog-book book-details ${this.props.mode &&
            "dark3"}`}
        >
          <SideBar
            selectedIndex={8}
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

              <Link href="/view-allBooks" style={{ color: "#3b9dd4" }}>
                In Stores
              </Link>
              <Typography style={{ color: "#797b79 !important" }}>
                Book Details
              </Typography>
            </Breadcrumbs>
            <h3>Book Details</h3>
            {book && (
              <>
                <div className="bookdetails-wrapper">
                  <div className="book-intro-wrap">
                    <div
                      className={`book-intro ${this.props.mode && "dark1"}`}
                    >
                      <div className="image-name">
                        <div className="book-image">
                          <img
                            src={book.cover_image_url}
                            alt="bookcoverpage"
                          />
                        </div>
                        <div className="book-name">
                          <strong>
                            {" "}
                            {book.name}: {book.author}
                          </strong>
                          <small>{book.author}</small>
                        </div>
                      </div>
                      <span
                        className="count"
                        style={{ color: `${this.props.mode && "black"}` }}
                      >
                        {book.view_count}
                      </span>
                    </div>

                    <div
                      className={`read-box click-pointer ${this.props
                        .mode && "dark1"}`}
                    >
                      <button
                        className="btn"
                        onClick={() => {
                          const { history }: any = this.props;
                          history.push(`/book-read/${book.id}`);
                        }}
                      >
                        Read or Listen to a sample
                      </button>
                    </div>

                    <div className="buynow-block">
                      {book.is_in_cart ? (
                        <button
                          className="buy-now"
                          onClick={() => {
                            //@ts-ignore
                            this.props.history.push("/cart");
                          }}
                        >
                          GO TO CART
                        </button>
                      ) : (
                        <button
                          className="buy-now"
                          onClick={() => {
                            this.settingBookId(book.id);
                            this.postCreateCart(book.id);
                          }}
                        >
                          ADD TO CART FOR ${book.price}
                        </button>
                      )}

                      <img
                        src={cartIcon}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          //@ts-ignore
                          this.props.history.push("/cart");
                        }}
                      />
                      {/* <button className="btn-cart" /> */}
                    </div>
                  </div>
                  <div
                    className={`book-description ${this.props.mode &&
                      "dark1"}`}
                  >
                    <h4>About Book:</h4>
                    <div>
                      <ul className="aboutBookUL">
                        <li className="li-class">
                          {" "}
                          <span className={classes.aboutBookTitle}>Written By: </span>{" "}
                          <strong className={classes.aboutBookValue}>{book.author}</strong>
                        </li>
                        <li className="li-class">
                          {" "}
                          <span className={classes.aboutBookTitle}>Language: </span>{" "}
                          <strong className={classes.aboutBookValue}>{book.language}</strong>{" "}
                        </li>
                        <li className="li-class">
                          {" "}
                          <span className={classes.aboutBookTitle}>ISBN: </span>
                          <strong className={classes.aboutBookValue}>1234</strong>{" "}
                        </li>
                        <li className="li-class">
                          {" "}
                          <span className={classes.aboutBookTitle}>Length: </span>{" "}
                          <strong className={classes.aboutBookValue}>{book.length_in_string}</strong>
                        </li>
                        <li className="li-class">
                          {" "}
                          <span className={classes.aboutBookTitle}>Publisher: </span>{" "}
                          <strong className={classes.aboutBookValue}>{book.publisher_name}</strong>{" "}
                        </li>
                      </ul>
                    </div>
                    <div
                      className={`summary-block ${this.props.mode &&
                        "dark2"}`}
                    >
                      <h4>Summary:</h4>
                      <div className="custom-scroll">
                        <p>{book.summary}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <BookListing
                  allBooks={this.state.allBooks && this.state.allBooks}
                />
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}
//@ts-ignore
const BookDetailsRouter = withRouter(BookDetails);
const BookDetailsTheme = withTheme(BookDetailsRouter);
export default withStyles(styles)(BookDetailsTheme);

// Customizable Area Start
// Customizable Area End
