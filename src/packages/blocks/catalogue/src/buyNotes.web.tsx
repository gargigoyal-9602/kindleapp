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
// import "../assets/css/bootstrap.min.css";
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
  mastercard,
  paymentActive,
} from "./assets";
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
class buyNotes extends HomeController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  render() {
    const { classes } = this.props;
    const notes =
      this.state.AllNotesForPurchased && this.state.AllNotesForPurchased;
    return (
      <>
        <Loader loading={this.state.Loader} />
        <AppHeader />

        <div className="catalog-book">
          <SideBar
            selectedIndex={10}
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
                Buy Notes
              </Typography>
            </Breadcrumbs>
            <h3>Buy Notes</h3>
            <p className="color-gray">
              {(notes && notes.length) || 0} Books Available
            </p>
            <div className="row buy-notes-page">
              {/* <div className="buy-notes-page"> */}
              {notes &&
                notes.map((book: any, index: any) => {
                  return (
                    <div className="col-xs-12 col-sm-6 col-xl-4">
                      <div
                        className={`inner-divisions ${this
                          .props.mode && "dark-mode"}`}
                      >
                        <div className="d-flex">
                          <div>
                            <img src={Published} />
                          </div>
                          <div className="middle-section">
                            <p
                              className="name-of-note"
                              onClick={() => {
                                this.props.history.push(
                                  `/Catalogue/BookDetails/${
                                    book.id
                                  }`
                                );
                              }}
                            >
                              {book.attributes.name}
                            </p>
                            <p className="available-notes">
                              {book.attributes.notes.length ||
                                0}{" "}
                              Notes Available
                            </p>
                          </div>
                        </div>
                        <div
                          className="last-section"
                          onClick={() => {
                            //ts-ignore
                            this.props.history.push(
                              `/buyNotesPreview/${book.id}`
                            );
                          }}
                        >
                          <img src={selectArrow} />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {/* </div> */}
          </div>
        </div>
      </>
    );
  }
}
//@ts-ignore
const buyNotesRouter = withRouter(buyNotes);
const buyNotesTheme = withTheme(buyNotesRouter);
export default withStyles(styles)(buyNotesTheme);

// Customizable Area Start
// Customizable Area End
