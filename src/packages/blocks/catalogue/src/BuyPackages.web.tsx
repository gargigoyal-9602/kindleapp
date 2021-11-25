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
class BuyPackages extends HomeController {
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
            selectedIndex={11}
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
              <Typography style={{ color: "#797b79 !important" }}>Buy Packages</Typography>
            </Breadcrumbs>
            <h3>Buy Packages</h3>
           
            {this.state.availablePackages && <div className="my-package-wrapper ">
             
                <div className={`book-pass ${this.props.mode && "dark1"}`}>
                  <div className="book-review gradient-bg">
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
                  <div className="select-plans">
                    <p className="font-weight-500">Select plan</p>
                    {this.state.availablePackages && this.state.availablePackages.map((x: any, index: any) => {
                      return (
                        <div className={`plan-checkboxes ${this.state.selectedPackage == x.id && "selected-plan"} ${this.props.mode && "dark2"}`} key={index}>
                          <label className="container-label">
                            <div>
                              <p className="total-book">{x.attributes.no_of_books} Books</p>
                              <p>For {x.attributes.duration} months</p>
                            </div>
                            <div>
                              <input type="radio" name={x.id}
                                checked={this.state.selectedPackage == x.id}
                                onChange={(e: any) => {
                                  this.setState({
                                    selectedPackage: e.target.name
                                  })
                                }} />
                              <span className="checkmark" />
                            </div>
                          </label>
                        </div>
                      )
                    })}

                  </div>
                  {this.state.availablePackages && this.state.availablePackages.map((x: any, index: any) => {
                    return (
                      x.id == this.state.selectedPackage && <div className={`montly-plan-price ${this.props.mode && "darkFo"}`} key={index}>
                        <p>
                          <span>$</span>
                          <span>{this.state.toggleMonth ? x.attributes.per_month_price : x.attributes.one_time_price}</span>
                          <span>/{this.state.toggleMonth ? " Monthly" : " One Time"}</span>
                        </p>
                        <FormGroup row className="buypackage-switch">
                          <p style={{ marginRight: "0px" }} className={`${!this.state.toggleMonth && "toggle-color"}`}>Pay One Time</p>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={this.state.toggleMonth}
                                onChange={(e: any) => {
                                  this.setState({
                                    toggleMonth: e.target.checked
                                  })
                                }}
                                name="checkedB"
                                color="primary"
                              />
                            }
                            label=""
                          />
                          <p className={`${this.state.toggleMonth && "toggle-color"}`} >Pay Per Month</p>
                        </FormGroup>
                        <button className="btn-pay w-100" onClick={()=>{
                          const isMonthly = this.state.toggleMonth ? "monthly" : "oneTime"
                          this.props.history.push(`/buy-package/${x.id}/${isMonthly}`)
                        }}>
                          Proceed To Payment
                        </button>
                      </div>
                    )
                  })


                  }
                </div>

              
              
            </div>

            }</div>
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
              onClick={()=> this.handleReadSetModalClose()}
            />
            <div className="inside-wrapper-box">
              <h4 className="text-center">Are You Sure?</h4>
              <p className="text-center sub-title">Cancel Your 4 Months Book Pass</p>
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
              <p className="sub-title text-center m-t-35 m-b-35">You Bougth this last month only one month <br></br>refund will be proceed and you will loose at <br></br> Your book . still want to proceed with refund ?</p>
              <div className="btns ">
                <button className="button button-primary w-100 m-b-5">Save</button>
                <button className="button button-secondary w-100" onClick={()=> this.handleReadSetModalClose()}>Cancel</button>
              </div>
            </div>


          </div>
        </Modal>
      </>
    );
  }
}
//@ts-ignore
const BuyPackagesRouter = withRouter(BuyPackages);
const BuyPackagesTheme = withTheme(BuyPackagesRouter);
export default withStyles(styles)(BuyPackagesTheme);
// Customizable Area Start
// Customizable Area End