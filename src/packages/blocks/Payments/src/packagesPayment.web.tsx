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
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import App from "./Stripe1.web";
import withTheme from "../../../components/src/Theme/withTheme";


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
class BuyPackage extends BuyBookController {
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

              
              <Typography style={{ color: "#797b79 !important" }}>
                Buy Packages
              </Typography>
            </Breadcrumbs>
            <h3>Buy Packages</h3>

            <div className="payment-wrapper">
              <div
                className={`add-details-paymentcard review-part card-part process-completed ${this.props.mode && "dark1"}`}
                style={
                  {
                    //opacity: `${this.state.reviewOrder ? 1 : 0.3}`,
                    // cursor: "none",
                  }
                }
              >
                <div>
                  <div
                    className="top-part"
                    onClick={() => {
                      //@ts-ignore
                      this.props.history.push("/BuyPackages");
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
                      paymentIntent={this.postBuyPackage}
                      disable={this.state.reviewOrder}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
//@ts-ignore
const BuyPackageRouter = withTheme(BuyPackage);
const BuyPackageTheme = withRouter(BuyPackageRouter);
export default withStyles(styles)(BuyPackageTheme);

// Customizable Area Start
// Customizable Area End
