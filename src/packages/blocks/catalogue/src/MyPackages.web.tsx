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
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AppHeader from "../../../components/src/Header/index";
import HomeController, { Props } from "./HomeController.web";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { withRouter } from "react-router-dom";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import "../assets/css/common.css";
import withTheme from "../../../components/src/Theme/withTheme";
import Modal from "@material-ui/core/Modal";
import moment from "moment";

import {
  mastercard,
  bookPass,
  checkMarked,
  paymentActive,
  paymentInactive,
  IconClose
} from "./assets";
import SideBar from "./Sidebar.web";
import Loader from "../../../components/src/Loader.web";
const styles = {
  cardRoot: {
    maxWidth: "400px",
    margin: "20px",
  },
} as any;
class MyPackages extends HomeController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
  render() {
    const { classes } = this.props;
    const have_package = this.state.accountInfo &&
      this.state.accountInfo?.attributes?.have_package
    return (
      <>
        <Loader loading={this.state.Loader} />
        <AppHeader />
        <div className={`catalog-book ${this.props.mode && "dark3"}`}>
          <SideBar
            selectedIndex={6}
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
              <Typography style={{ color: "#797b79 !important" }}>My Packages</Typography>
            </Breadcrumbs>
            <h3>My Packages</h3>
            
            {this.state.myPackages && 
            <div className="my-package-wrapper ">
              <div className="package-wrapper">
              {this.state.myPackages.map((x :any,index:any)=>{
                return (
                  <div className={`book-pass ${this.props.mode && "dark1"}`}>
                  <div className="active-seaction">
                    <span>{x.attributes.is_active ? "Active" :"In Active"}</span>
                    
                    <p className="text-bold"> {`Valid till ${moment(x.attributes.end_date).format('ll')}`}</p>
                  </div>
                  <div className="book-review gradient-bg mt-20">
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
                  <div className="available-feature">
                    <p>Available Features</p>
                    <ul>
                      <li>
                        <img
                          src={checkMarked}
                          style={{
                            position: "absolute",
                            width: "19px",
                            left: "0",
                          }}
                        />
                        Download ebooks
                      </li>
                      <li>
                        <img
                          src={checkMarked}
                          style={{
                            position: "absolute",
                            width: "19px",
                            left: "0",
                          }}
                        />
                        Read/Play ebook anytime , anywhere
                      </li>
                    </ul>
                  </div>
                  <div className={`next-biling ${this.props.mode && "dark2"}`}>
                    <div>
                      <p className="text-bold">Last Renewed</p>
                      <p>20 Aug ,2020</p>
                    </div>
                    <div>
                      <p className="text-bold">Next Billing</p>
                      <p>20 Jan 2021</p>
                    </div>

                  </div>
                  <p onClick={() => {
                    this.setState({
                      readSetModal: true,
                      booksChecked:[x.attributes.order_id,x.attributes.subscription_package.id]
                    })
                  }}
                    className="cancelPass"
                    >Cancel Book Pass</p>
                    {!x.attributes.is_book_purchased && <p className="cancelPass"
                    onClick={()=>{
                      this.props.history.push(`/package-books/${x.attributes.subscription_package.no_of_books}?package_id=${x.attributes.subscription_package.id}&order_id=${x.attributes.order_id}`)
                    }}>Add Books</p>}
                </div>

                )
              })}
                </div>
              
              <div className={`right-part ${this.props.mode && "dark1"}`}>
                <div className="book_purchase_history_row">
                  <img src={this.props.mode ? paymentActive : paymentInactive} />
                  <strong className="title">Book Purchase history</strong>
                </div>
                <div className={`block-details ${this.props.mode && "dark2"}`}>
                  <span>Subscription Ended</span>
                  <span className="tag-line">Recturting per Month</span>
                  <ul>
                    <li>
                      <div className="fisrt-section">
                        <img
                          src={mastercard}
                          alt="master-card"
                          className="master-card"
                        />
                        <div className="discription-part">
                          <p>customer Name </p>
                          <strong>
                            000 000 <span className="color-gray">426</span>
                          </strong>
                        </div>
                      </div>
                      <div className="price-part">
                        <p>20/7/21</p>
                        <strong>$25</strong>
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
                          <p>customer Name </p>
                          <strong>
                            000 000 <span className="color-gray">426</span>
                          </strong>
                        </div>
                      </div>
                      <div className="price-part">
                        <p>20/7/21</p>
                        <strong>$25</strong>
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
                          <p>customer Name </p>
                          <strong>
                            000 000 <span className="color-gray">426</span>
                          </strong>
                        </div>
                      </div>
                      <div className="price-part">
                        <p>20/7/21</p>
                        <strong>$25</strong>
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
                          <p>customer Name </p>
                          <strong>
                            000 000 <span className="color-gray">426</span>
                          </strong>
                        </div>
                      </div>
                      <div className="price-part">
                        <p>20/7/21</p>
                        <strong>$25</strong>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className={`block-details ${this.props.mode && "dark2"}`}>
                  <span>Subscription Ended</span>
                  <span className="tag-line">Recturting per Month</span>
                  <ul>
                    <li>
                      <div className="fisrt-section">
                        <img
                          src={mastercard}
                          alt="master-card"
                          className="master-card"
                        />
                        <div className="discription-part">
                          <p>customer Name </p>
                          <strong>
                            000 000 <span className="color-gray">426</span>
                          </strong>
                        </div>
                      </div>
                      <div className="price-part">
                        <p>20/7/21</p>
                        <strong>$25</strong>
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
                          <p>customer Name </p>
                          <strong>
                            000 000 <span className="color-gray">426</span>
                          </strong>
                        </div>
                      </div>
                      <div className="price-part">
                        <p>20/7/21</p>
                        <strong>$25</strong>
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
                          <p>customer Name </p>
                          <strong>
                            000 000 <span className="color-gray">426</span>
                          </strong>
                        </div>
                      </div>
                      <div className="price-part">
                        <p>20/7/21</p>
                        <strong>$25</strong>
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
                          <p>customer Name </p>
                          <strong>
                            000 000 <span className="color-gray">426</span>
                          </strong>
                        </div>
                      </div>
                      <div className="price-part">
                        <p>20/7/21</p>
                        <strong>$25</strong>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

             } 
            </div>
        </div>
        <Modal
          open={this.state.readSetModal}
          onClose={this.handleReadSetModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="cancel-book-section d-flex justify-content-center align-items-center"
        >
          <div className={`cancel-book-wrapper ${this.props.mode && "dark2 darkFont"}`}>
            <img
              src={IconClose}
              alt="close"
              className="close-icon"
              onClick={()=>this.handleReadSetModalClose()}
            />
            <div className="inside-wrapper-box">
              <h4 className={`text-center ${this.props.mode && "darkFo"}`}>Are You Sure?</h4>
              {/* <p className="text-center sub-title">Cancel Your 4 Months Book Pass</p> */}
              <div className="book-review gradient-bg mt-20">
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
              
              <div className="btns ">
                <button className="button button-primary w-100 m-b-5" onClick={()=>{
                      this.postBookPassCancel(this.state.booksChecked[0],this.state.booksChecked[1])

                }}>Cancel Book Pass</button>
                <button className={`button button-secondary w-100 ${this.props.mode && "dark3"}`} onClick={()=>this.handleReadSetModalClose()}>Cancel</button>
              </div>
            </div>


          </div>
        </Modal>
      </>
    );
  }
}
//@ts-ignore
const MyPackagesRouter = withRouter(MyPackages);
const MyPackagesTheme = withTheme(MyPackagesRouter);
export default withStyles(styles)(MyPackagesTheme);
// Customizable Area Start
// Customizable Area End