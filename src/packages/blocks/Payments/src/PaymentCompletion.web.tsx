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
import {
  imgdummy,
  IconClose,
  CardImage,
  SecureImage,
  MsgRecev,
} from "./assets";
import "../assets/css/buyBook.css";
import withTheme from "../../../components/src/Theme/withTheme";

const styles = {
  cardRoot: {
    maxWidth: "400px",
    margin: "20px",
  },
} as any;
class PaymentCompletion extends BuyBookController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  render() {
    const { classes } = this.props;
    const location = window.location.pathname.split("/")[2];
    console.log(location);
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
            <div className="congratulation-box">
              <div className="inner-box">
                <div
                  onClick={() => {
                    //@ts-ignore
                    this.props.history.push("/Catalogue/Home");
                  }}
                >
                  <img src={IconClose} alt="close" className="close-icon" />
                </div>
                <p className="text-big">Congratulations!</p>
                <p className="text-small">
                  Your order has been sucessfully processed.
                </p>
                <div className="dynamic-img-section">
                  <img src="" alt="" />
                </div>
                <div className="bottom-text">
                  <p className="text-small">
                    {`Your order has been sucessfully processed. Your ${
                      location == "book" ? "Book" : "Package"
                    } is now
                    available in your My ${
                      location == "book" ? "Books" : "Packages"
                    }.`}
                  </p>
                </div>
                <div className="button-section">
                  <button
                    className="btn-pay"
                    style={{ width: "134%" }}
                    onClick={() =>
                      //@ts-ignore

                      location == "book"
                        ? this.props.history.push(`/Catalogue/MyBooks`)
                        : this.props.history.push(`/MyPackages`)
                    }
                  >
                    Read or Listen Now
                  </button>
                  {/* <button className="btn-widthout-border">My Dowanloads</button> */}
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
const PaymentCompletionRouter = withRouter(PaymentCompletion);
export default withStyles(styles)(PaymentCompletionRouter);

// Customizable Area Start
// Customizable Area End
