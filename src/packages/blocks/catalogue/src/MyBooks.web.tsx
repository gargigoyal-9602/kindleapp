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
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
export const configJSON = require("./config");
import "../../../components/src/Styles/Styles.css";
import "../assets/css/common.css";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import AppHeader from "../../../components/src/Header/index";
import HomeController, { Props } from "./HomeController.web";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { withRouter } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import {
  playButton,
  paymentHistory,
  userIcon,
  mastercard,
  IconClose,
  paymentActive,
  bookPass,
  menuLightMode,
} from "./assets";
import SideBar from "./Sidebar.web";
import SimpleMenu from "./bookMenu.web";
import Loader from "../../../components/src/Loader.web";
import "../assets/css/common.css";
import withTheme from "../../../components/src/Theme/withTheme";
const styles = {
  cardRoot: {
    maxWidth: "400px",
    margin: "20px",
  },
} as any;
class MyBooks extends HomeController {
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

        <div className="catalog-book my-earnings">
          <SideBar
            selectedIndex={1}
            accountInfo={this.state.accountInfo && this.state.accountInfo}
          />
          <div className="content">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="medium" />}
              aria-label="breadcrumb"
            >
              <Link href="/Catalogue/Home" style={{ color: "#3b9dd4" }}>
                Home
              </Link>
              <Typography style={{ color: "#797b79 !important" }}>
                My Books
              </Typography>
            </Breadcrumbs>
            <h3>My Books</h3>
            <p className="color-gray">
              {(this.state.myBooks && this.state.myBooks.length) || 0} Books
              Available
            </p>

            {this.state.myBooks && (
              <div className="card-list-wrapper my-books-new-wrapper">
                <div className="left-part">
                  <div className="row">
                    <div className="card" id="my-books-cards">
                      {this.state.myBooks &&
                        this.state.myBooks.map((x: any, index: any) => {
                          return (
                            <div className="col-12 col-sm-6 col-lg-12">
                              <React.Fragment
                                key={index}
                              >
                                <div className="d-flex inner-divs">
                                  <div
                                    className={`list ${this
                                      .props.mode &&
                                      "dark1"}`}
                                  >
                                    <div className="img-part">
                                      <img
                                        src={
                                          x.attributes
                                            .cover_image_url
                                        }
                                        alt="image"
                                        onClick={() => {
                                          //@ts-ignore
                                          this.props.history.push(
                                            `/book-read/${
                                              x
                                                .attributes
                                                .id
                                            }`
                                          );
                                        }}
                                      />
                                    </div>

                                    <div className="text">
                                      <strong>
                                        {
                                          x.attributes
                                            .name
                                        }
                                      </strong>
                                      <small
                                        className={`color-gray ${this
                                          .props
                                          .mode &&
                                          "darkFo"}`}
                                      >
                                        {
                                          x.attributes
                                            .book_type
                                        }
                                      </small>
                                      <div className="details">
                                        <div>
                                          <span>
                                            {
                                              x
                                                .attributes
                                                .author
                                            }
                                          </span>
                                          <span className="color-blue">
                                            {
                                              x
                                                .attributes
                                                .note_count
                                            }{" "}
                                            Noted
                                            Available
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <img
                                      src={playButton}
                                      alt="play"
                                      className="play-btn"
                                      onClick={() => {
                                        this.props.history.push(
                                          `/book-read/${
                                            x.id
                                          }`
                                        );
                                      }}
                                    />
                                  </div>
                                  <div
                                    className="more"
                                    onClick={() => {
                                      this.setState({
                                        returnBookId: [
                                          x.id,
                                          x.attributes
                                            .order_id,
                                          x.attributes
                                            .cover_image_url,
                                        ],
                                      });
                                    }}
                                  >
                                    
                                    {/* <button className="btn" /> */}
                                    <SimpleMenu
                                      handleReadSetModalClose={
                                        this
                                          .handleReadSetModalClose
                                      }
                                      mode={this.props.mode}
                                    />
                                  </div>
                                </div>
                              </React.Fragment>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className={`right-part ${this.props.mode && "dark1"}`}>
                  <div className="book_purchase_history_row">
                    <img
                      src={this.props.mode ? paymentActive : paymentHistory}
                    />
                    <strong className="title">Book Purchase history</strong>
                  </div>
                  {/* card1 */}
                  <div
                    className={`purchase-history-card block-details ${this
                      .props.mode && "dark2"}`}
                  >
                    <span className="tag-line">Recturting per Month</span>
                    <div
                      className={`card-header ${this.props.mode &&
                        "dark-mode"}`}
                    >
                      <img
                        src={userIcon}
                        alt="The world of Abstract Art"
                        className="book-img"
                      />
                      <div className="right-block">
                        <h6
                          className={`title ${this.props.mode && "darkFo"}`}
                        >
                          The world of Abstract Art
                        </h6>
                        <span>Thriller</span>
                        <h5 className={`${this.props.mode && "darkFo"}`}>
                          Emily Robbins
                        </h5>
                      </div>
                    </div>
                    {/* <span>Subscription Ended</span> */}

                    <ul>
                      <li>
                        <div className="fisrt-section">
                          <img
                            src={mastercard}
                            alt="master-card"
                            className="master-card"
                          />
                          <div className="discription-part">
                            <p className={`${this.props.mode && "darkFo"}`}>
                              Nathaniel Dixon{" "}
                            </p>
                            <strong>
                              <span>••••</span> <span>••••</span>{" "}
                              <span className="color-gray">4121</span>
                            </strong>
                          </div>
                        </div>

                        <div
                          className={`price-part ${this.props.mode &&
                            "darkFont"}`}
                        >
                          <p>20 Aug, 2020</p>
                          <div className="price-row">
                            <span>$</span>
                            <h5>350</h5>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="fisrt-section">
                          <img
                            src={mastercard}
                            alt="master-card"
                            className="master-card"
                          />
                          <div className="discription-part">
                            <p className={`${this.props.mode && "darkFo"}`}>
                              Nathaniel Dixon{" "}
                            </p>
                            <strong>
                              <span>••••</span> <span>••••</span>{" "}
                              <span className="color-gray">4121</span>
                            </strong>
                          </div>
                        </div>

                        <div
                          className={`price-part ${this.props.mode &&
                            "darkFont"}`}
                        >
                          <p>20 Aug, 2020</p>
                          <div className="price-row">
                            <span>$</span>
                            <h5>350</h5>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="fisrt-section">
                          <img
                            src={mastercard}
                            alt="master-card"
                            className="master-card"
                          />
                          <div className="discription-part">
                            <p className={`${this.props.mode && "darkFo"}`}>
                              Nathaniel Dixon{" "}
                            </p>
                            <strong>
                              <span>••••</span> <span>••••</span>{" "}
                              <span className="color-gray">4121</span>
                            </strong>
                          </div>
                        </div>

                        <div
                          className={`price-part ${this.props.mode &&
                            "darkFont"}`}
                        >
                          <p>20 Aug, 2020</p>
                          <div className="price-row">
                            <span>$</span>
                            <h5>350</h5>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  {/* ends: card1 */}
                </div>
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
      </>
    );
  }
}
//@ts-ignore
const MyBooksRouter = withRouter(MyBooks);
const MyBooksTheme = withTheme(MyBooksRouter);
export default withStyles(styles)(MyBooksTheme);

// Customizable Area Start
// Customizable Area End
