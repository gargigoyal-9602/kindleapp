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
import Rating from "@material-ui/lab/Rating";
import { bookLogo, playButton, Published, selectArrow } from "./assets";
import SideBar from "./Sidebar.web";
import Loader from "../../../components/src/Loader.web";
import "../assets/css/common.css";
import withTheme from "../../../components/src/Theme/withTheme";
const styles = {
  cardRoot: {
    maxWidth: "400px",
    margin: "20px",
  },
} as any;
class purchasedRating extends HomeController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  render() {
    const { classes } = this.props;
    const notes = this.state.buyNotesUser && this.state.buyNotesUser;
    return (
      <>
        <Loader loading={this.state.Loader} />
        <AppHeader />

        <div className="catalog-book">
          <SideBar
            selectedIndex={10}
            accountInfo={this.state.accountInfo && this.state.accountInfo}
          />
          <div className="content purchase-rating-page">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link href="/Catalogue/Home" style={{ color: "#3b9dd4" }}>
                Home
              </Link>
              <Typography style={{ color: "#797b79 !important" }}>
                Buy Notes
              </Typography>
            </Breadcrumbs>
            {notes && (
              <>
                <h3>{notes.attributes.book.name}</h3>
                <p className="color-gray">{notes.attributes.book.name}</p>

                <div
                  className={`display-book-rating book-purchase-rating ${this
                    .props.mode && "dark-boxshadow dark1"}`}
                >
                  <span className="rounded-img">
                    <img src={Published} />
                  </span>

                  <div>
                    <p className="authorTitle">
                      {notes.attributes.book.name}
                    </p>
                    <p className="byAuthor">
                      <span style={{ color: `${this.props.mode ? "white": "#183b56"}` }}>By</span>{" "}
                      <span>{notes.attributes.account_name}</span>
                    </p>
                  </div>
                  <Rating
                    className={`ratingStars ${this.props.mode &&
                      "dark-boxshadow"}`}
                    name={"index"}
                    precision={0.5}
                    value={this.state.product_rating}
                    onChange={(event: any, newValue: any) => {
                      console.log(newValue, "value");
                      this.setState({
                        product_rating: newValue,
                      });
                    }}
                  />
                </div>

                <button
                  className="button-primary button"
                  onClick={() => {
                    this.postProductReview(this.state.product_rating);
                  }}
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}
//@ts-ignore
const purchasedRatingRouter = withRouter(purchasedRating);
const purchasedRatingTheme = withTheme(purchasedRatingRouter);
export default withStyles(styles)(purchasedRatingTheme);

// Customizable Area Start
// Customizable Area End
