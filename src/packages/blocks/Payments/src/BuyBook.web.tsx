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
import BuyBookController, { Props } from "./BuyBookController.web";
import { withRouter } from "react-router-dom";
import SideBar from "../../catalogue/src/Sidebar.web";
import Loader from "../../../components/src/Loader.web";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import BookListing from "../../../components/src/BookListing/index";
import ReactPlayer from "react-player";
import withTheme from "../../../components/src/Theme/withTheme";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import App from "./Stripe1.web";
import {
  imgdummy,
  IconClose,
  CardImage,
  SecureImage,
  MsgRecev,
  LockIcon,
  RightIcon,
} from "./assets";
import "../assets/css/buyBook.css";
import "../assets/css/common.css";
const styles = {
  cardRoot: {
    maxWidth: "400px",
    margin: "20px",
  },
} as any;
class BuyBook extends BuyBookController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
  render() {
    const { classes } = this.props;
    console.log(this.state.cartInfo, "cart info");
    return (
      <>
        <AppHeader />
        <Loader loading={this.state.Loader} />
        <div className="catalog-book buy-book-ui">
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
              <Link href="/cart" style={{ color: "#3b9dd4" }}>
                My Cart
              </Link>
              <Typography style={{ color: "#797b79 !important" }}>
                Buy Book
              </Typography>
            </Breadcrumbs>
            <h3>Buy Book</h3>
            <div className="payment-wrapper">
              <div
                className={`review-part card-part ${this.state
                  .reviewOrder && "process-completed"} ${this.props.mode &&
                  "dark1"}`}
              >
                <div>
                  <div className="top-part">
                    <div>
                      <h3>Review Order</h3>
                      <small>
                        {this.state.cartInfo &&
                          this.state.cartInfo.attributes.order_items
                            .length}{" "}
                        Item Added
                      </small>
                    </div>
                    {this.state.reviewOrder ? (
                      <div>
                        <img
                          src={RightIcon}
                          alt="close"
                          className="right-icon"
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          //@ts-ignore
                          this.props.history.push(`/cart`);
                        }}
                      >
                        <img
                          src={IconClose}
                          alt="close"
                          className="close-icon"
                        />
                      </div>
                    )}
                  </div>
                  {this.state.cartInfo && (
                    <div className={`repeat-lists`}>
                      {this.state.cartInfo.attributes.order_items.length >
                        0 &&
                        this.state.cartInfo.attributes.order_items.map(
                          (x: any, index: any) => {
                            return x.attributes
                              .book ? (
                              <div
                                className={`image-details ${this
                                  .props.mode &&
                                  "dark-back"}`}
                                key={index}
                              >
                                <div className="img-part">
                                  <img
                                    src={
                                      x.attributes
                                        .book
                                        .attributes
                                        .cover_image_url
                                    }
                                    alt="book cover"
                                  />
                                </div>
                                <div className="book-details">
                                  <strong>
                                    {`${
                                      x.attributes
                                        .book
                                        .attributes
                                        .name
                                    }:${
                                      x.attributes
                                        .book
                                        .attributes
                                        .author
                                    }`}
                                  </strong>
                                  <small>
                                    {
                                      x.attributes
                                        .book
                                        .attributes
                                        .author
                                    }
                                  </small>
                                </div>
                                <span
                                  className="minus-icon"
                                  onClick={() => {
                                    this.delCartItem(
                                      x.id
                                    );
                                  }}
                                >
                                  -
                                </span>
                              </div>
                            ) : (
                              x.attributes.note && (
                                <div
                                  className="image-details"
                                  key={index}
                                >
                                  <div className="img-part">
                                    <img
                                      src={
                                        x.attributes
                                          .note
                                          .attributes
                                          .book
                                          .cover_image_url
                                      }
                                      alt="book cover"
                                    />
                                  </div>
                                  <div className="book-details">
                                    <strong>
                                      {`${
                                        x.attributes
                                          .note
                                          .attributes
                                          .book.name
                                      }:${
                                        x.attributes
                                          .note
                                          .attributes
                                          .book
                                          .author
                                      }`}
                                    </strong>
                                    <small>
                                      {
                                        x.attributes
                                          .note
                                          .attributes
                                          .book
                                          .author
                                      }
                                    </small>
                                  </div>
                                  <span
                                    className="minus-icon"
                                    onClick={() => {
                                      this.delCartItem(
                                        x.id
                                      );
                                    }}
                                  >
                                    -
                                  </span>
                                </div>
                              )
                            );
                          }
                        )}
                    </div>
                  )}
                </div>
                {this.state.reviewOrder ? (
                  <div className="bottom-process-completed-section">
                    <div className="Lock-part">
                      <img src={LockIcon} alt="dummy-img" />
                      <p>First Step Completed</p>
                    </div>
                  </div>
                ) : (
                  <div className="price" style={{ marginTop: "10px" }}>
                    <strong>
                      <span
                        style={{
                          fontSize: "26px",
                          fontWeight: "normal",
                          color: "gray",
                        }}
                      >
                        $
                      </span>
                      <span
                        style={{
                          fontSize: "30px",
                          fontWeight: "bold",
                          paddingLeft: "4px",
                          paddingTop: "10px",
                        }}
                      >
                        350
                      </span>
                      <span style={{ fontWeight: "bold" }}>/ Month</span>
                      {/* <b className="color-gray" >$</b>350{" "}
                      <span style={{marginLeft:'-7px',fontWeight:'bold'}}>/ Month</span> */}
                    </strong>
                    <div className="montly-plan-price">
                      <FormGroup row className="buy-book-switch">
                        <p
                        // className={`${!this.state.toggleMonth &&
                        //   "toggle-color"}`}
                        >
                          Pay One Time
                        </p>
                        <div className="switch px1">
                          <FormControlLabel
                            control={
                              <Switch
                                //checked={true}
                                // onChange={(e: any) => {
                                //   this.setState({
                                //     toggleMonth: e.target.checked,
                                //   });
                                // }}
                                name="checkedB"
                                style={{ color: "#42AFED", margin: "0px" }}
                              />
                            }
                            label=""
                          />
                        </div>
                        <p
                        // className={`${this.state.toggleMonth &&
                        //   "toggle-color"}`}
                        >
                          Pay Per Month
                        </p>
                      </FormGroup>
                    </div>
                    <button
                      className="btn-pay w-100"
                      onClick={() => {
                        this.setState({
                          reviewOrder: true,
                        });
                      }}
                    >
                      Proceed To Pay
                    </button>
                  </div>
                )}
              </div>
              <div
                className={`add-details-paymentcard review-part card-part process-completed ${this
                  .props.mode && "dark1"}`}
                style={{
                  opacity: `${this.state.reviewOrder ? 1 : 0.3}`,
                  cursor: "none",
                }}
              >
                <div>
                  <div
                    className="top-part"
                    onClick={() => {
                      this.setState({
                        reviewOrder: false,
                      });
                    }}
                  >
                    <h3>
                      Add Details <br />
                      Payment Card
                    </h3>
                    {this.state.cardDetailsSubmitted ? (
                      <div>
                        <img
                          src={RightIcon}
                          alt="close"
                          className="right-icon"
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          src={IconClose}
                          alt="close"
                          className="close-icon"
                        />
                      </div>
                    )}
                  </div>
                  <div className="card-img">
                    <img src={CardImage} alt="card" />
                  </div>
                </div>
                <div>
                  {this.state.cardDetailsSubmitted ? (
                    <div className="bottom-process-completed-section">
                      <div className="Lock-part">
                        <img src={LockIcon} alt="dummy-img" />
                        <p>Second Step Completed</p>
                      </div>
                    </div>
                  ) : (
                    <App
                      paymentIntent={this.postPaymentIntent}
                      disable={!this.state.reviewOrder}
                    />
                    // <div>
                    //   <div className="form-group">
                    //     <label>Card Address</label>
                    //     <input type="text" className="form-control" />
                    //   </div>
                    //   <div className="form-group-wrap v1">
                    //     <div className="form-group">
                    //       <label>Card Address</label>
                    //       <input type="text" className="form-control" />
                    //     </div>
                    //     <div className="form-group cvv">
                    //       <label>Card Address</label>
                    //       <input type="text" className="form-control" />
                    //     </div>
                    //   </div>
                    //   <div className="form-group">
                    //     <label>Customer Number</label>
                    //     <input type="text" className="form-control" />
                    //   </div>
                    //   <div className="form-group">
                    //     <button
                    //       className="btn-pay w-100"
                    //       onClick={() => {
                    //         this.setState({
                    //           cardDetailsSubmitted: true,
                    //         });
                    //       }}
                    //     >
                    //       Proceed To Pay
                    //     </button>
                    //   </div>
                    //   <div className="certification">
                    //     <img src={SecureImage} alt="card" />
                    //     <div>
                    //       <span className="color-gray">Secure payment via</span>
                    //       <strong className="color-gray">
                    //         SSL encryption transactions
                    //       </strong>
                    //     </div>
                    //   </div>
                    // </div>
                  )}
                </div>
              </div>
              {/* <div
                className="otp-received-payment card-part"
                style={{
                  opacity: `${
                    this.state.reviewOrder && this.state.cardDetailsSubmitted
                      ? 1
                      : 0.3
                  }`,
                  cursor: "none",
                }}
              >
                <div>
                  <div className="top-part">
                    <h3>
                      Confirm <br />
                      OTP Received
                    </h3>
                    <div
                      onClick={() => {
                        this.setState({
                          cardDetailsSubmitted: false,
                        });
                      }}
                    >
                      <img src={IconClose} alt="close" className="close-icon" />
                    </div>
                    <div>
                    <img src={RightIcon} alt="close" className="right-icon"/>
                    </div>
                  </div>
                  <div className="msg-received-image">
                    <img src={MsgRecev} alt="" />
                  </div>
                  <div>
                    <div className="form-group">
                      <label>Enter OTP</label>
                      <div className="enter-otp">
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            min="1"
                            max="1"
                          />
                        </div>
                        <div>
                          <input type="text" className="form-control" />
                        </div>
                        <div>
                          <input type="text" className="form-control" />
                        </div>
                        <div>
                          <input type="text" className="form-control" />
                        </div>
                        <div>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="resend-otp-link">
                      <a href="">Resend OTP</a>
                      <span>00:25</span>
                    </p>
                  </div>
                </div>
                <div>
                  <div className="form-group margin-bottom-15">
                    <button className="btn-pay w-100">Proceed To Pay</button>
                  </div>
                  <div className="certification">
                    <img src={SecureImage} alt="card" />
                    <div>
                      <span className="color-gray">Secure payment via</span>
                      <strong className="color-gray">
                        SSL encryption transactions
                      </strong>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}
//@ts-ignore
const BuyBookRouter = withRouter(BuyBook);
const BuyBookTheme = withTheme(BuyBookRouter);
export default withStyles(styles)(BuyBookTheme);
// Customizable Area Start
// Customizable Area End