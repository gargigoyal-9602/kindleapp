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
import withToast from "../../../components/src/withSnackBar.Web";
import withLoader from "../../../components/src/withLoader.Web";
import withDialog from "../../../components/src/withDialog.web";
import withAlertBox from "../../../components/src/withAlertBox.Web";
import {
  imgdummy,
  IconClose,
  CardImage,
  SecureImage,
  MsgRecev,
  LockIcon,
  RightIcon,
  EmptyCart,
} from "./assets";
import "../assets/css/buyBook.css";
import "../assets/css/common.css";

import withTheme from "../../../components/src/Theme/withTheme";

const styles = {
  cardRoot: {
    maxWidth: "400px",
    margin: "20px",
  },
} as any;
class Cart extends BuyBookController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Loader loading={this.state.Loader} />
        <AppHeader />

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

              <Typography style={{ color: "#797b79 !important" }}>
                My Cart
              </Typography>
            </Breadcrumbs>
            <h3>My Cart</h3>
            <p className={`color-gray`}>
              {(this.state.bookCart && this.state.bookCart.length) || "No"}{" "}
              Books added ,{" "}
              {(this.state.notesCart && this.state.notesCart.length) || "No"}{" "}
              Notes added 
            </p>
            {this.state.cartInfo &&
              this.state.cartInfo.attributes.order_items.length > 0 && (
                <div>
                  <div className="card-list-wrapper cart-card-list">
                    {this.state.cartInfo.attributes.order_items.map(
                      (item: any, index: any) => {
                        return item.attributes.book ? (
                          <div key={index} className="left-part">
                            <div className="cart_cards card" id="cart_cards">
                              <div
                                className={`list list-for-card-items ${this
                                  .props.mode && "dark1"}`}
                              >
                                <div className="d-flex">
                                  <div
                                    className="img-part"
                                    onClick={() => {
                                      //@ts-ignore
                                      this.props.history.push(
                                        `/Catalogue/BookDetails/${
                                          item.attributes.book_id
                                        }`
                                      );
                                    }}
                                  >
                                    <img
                                      src={
                                        item.attributes.book.attributes
                                          .cover_image_url
                                      }
                                    />
                                  </div>

                                  <div className="text">
                                    <strong>
                                      {item.attributes.book.attributes.name}:{" "}
                                      {item.attributes.book.attributes.author}
                                    </strong>
                                    <small
                                      className={`color-gray ${this.props
                                        .mode && "darkFont"}`}
                                    >
                                      {item.attributes.book.attributes.author}
                                    </small>
                                  </div>
                                </div>

                                <div>
                                  <div className="details">
                                    <div className="old-price">$40</div>
                                    <div className="new-price">
                                      ${item.attributes.book.attributes.price}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="cart_btn">
                              <button
                                className="btn-pay"
                                onClick={() => {
                                  this.delCartItem(item.id);
                                }}
                              >
                                -
                              </button>
                            </div>
                          </div>
                        ) : (
                          item.attributes.note &&<div key={index} className="left-part">
                            <div className="card">
                              <div
                                className={`list list-for-card-items ${this
                                  .props.mode && "dark1"}`}
                              >
                                <div className="d-flex">
                                  <div
                                    className="img-part"
                                    onClick={() => {
                                      //@ts-ignore
                                      this.props.history.push(
                                        `/Catalogue/BookDetails/${
                                          item.attributes.note.attributes.book
                                            .id
                                        }`
                                      );
                                    }}
                                  >
                                    <img
                                      src={
                                        item.attributes.note.attributes.book
                                          .cover_image_url
                                      }
                                    />
                                  </div>

                                  <div className="text">
                                    <strong>
                                      {
                                        item.attributes.note.attributes.book
                                          .name
                                      }
                                      :{" "}
                                      {
                                        item.attributes.note.attributes.book
                                          .author
                                      }
                                    </strong>
                                    <small
                                      className={`color-gray ${this.props
                                        .mode && "darkFont"}`}
                                    >
                                      {
                                        item.attributes.note.attributes.book
                                          .author
                                      }
                                    </small>
                                  </div>
                                </div>

                                <div>
                                  <div className="details">
                                    <div className="old-price">$40</div>
                                    <div className="new-price">
                                      $
                                      {
                                        item.attributes.note.attributes.book
                                          .price
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <button
                                className="btn-pay"
                                onClick={() => {
                                  this.delCartItem(item.id);
                                }}
                              >
                                -
                              </button>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                  {this.state.cartInfo && (
                    <div className={`sub-total ${this.props.mode && "dark1 darkFont"}`}>
                      <div className="detail-section">
                        <div>
                          <p className="head">Sub Total</p>
                          <p>
                            {this.state.cartInfo.attributes.order_items
                              .length || 0}{" "}
                            item added
                          </p>
                        </div>
                        <div className="head">
                          $ {this.state.cartInfo.attributes.sub_total}
                        </div>
                      </div>
                      <div>
                        <button
                          className="button button-primary w-100"
                          onClick={() => {
                            //@ts-ignore
                            this.props.history.push("/buy-book");
                          }}
                        >
                          Proceed to pay
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            {!this.state.cartInfo ||
              (this.state.cartInfo &&
                this.state.cartInfo.attributes.order_items.length == 0 && (
                  <div className="empty-cart-part">
                    <img src={EmptyCart} />
                    <p className="cart-empty">Your cart is empty</p>
                    <p className="light-text">Add books you want to shop</p>
                    <button
                      className="button button-primary"
                      onClick={() => {
                        //@ts-ignore
                        this.props.history.push("/view-allBooks");
                      }}
                    >
                      SHOP NOW
                    </button>
                  </div>
                ))}
          </div>
        
        </div>
      </>
    );
  }
}
//@ts-ignore
//@ts-ignore
const cartAlertBox = withAlertBox(Cart);
const cartLoader = withLoader(cartAlertBox);
const cartToast = withToast(cartLoader);
const cartWithDialog = withDialog(cartToast);
const CartRouter = withRouter(cartWithDialog);
const CartTheme = withTheme(CartRouter);
export default withStyles(styles)(CartTheme);

// Customizable Area Start
// Customizable Area End
