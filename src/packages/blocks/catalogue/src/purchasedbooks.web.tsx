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
import "../assets/css/notes.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { withRouter } from "react-router-dom";
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
} from "./assets";
import SideBar from "./Sidebar.web";
import Loader from "../../../components/src/Loader.web";

const styles = {
  cardRoot: {
    maxWidth: "400px",
    margin: "20px",
  },
} as any;
class purchasedBooks extends HomeController {
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
      this.state.purchasedNotes &&
      this.state.purchasedNotes.length > 0 &&
      this.state.purchasedNotes;
    return (
      <>
        <Loader loading={this.state.Loader} />
        <AppHeader />

        <div className="catalog-book my-notes">
          <SideBar
            selectedIndex={3}
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
                Purchased notes
              </Typography>
            </Breadcrumbs>

            <h3>Purchased Notes</h3>
            <p className="color-gray">
              {(this.state.purchasedNotes &&
                this.state.purchasedNotes.length) ||
                0}{" "}
              Notes available
            </p>
            <div className="card-list-wrapper">
              <div className="left-part w-100">
                <div className="row">
                  <div className="col-xs-12 col-sm-6 col-xl-4" id="card_blocks">
                    <div className="card">
                      {notes &&
                        notes.map((x: any, index: any) => {
                          return (
                            <div className={`list ${this.props.mode && "dark1"}`}>
                              <div className="list-inner">
                                <div className="img-part">
                                  <img src={Published} />
                                </div>
                                <div className="text">
                                  <strong
                                    onClick={() => {
                                      //@ts-ignore
                                      this.props.history.push("/bookNotes");
                                    }}
                                  >
                                    {x.attributes.name}
                                  </strong>
                                  <span className="color-blue">
                                    {x.attributes.notes[0].attributes.notes_count}{" "}
                                    Noted Available
                                  </span>
                                </div>
                              </div>
                              <img
                                src={selectArrow}
                                alt="select arrow"
                                className="arrow"
                                onClick={() => {
                                  //@ts-ignore
                                  this.props.history.push(
                                    `/purchasedNotePreview/${x.id}`
                                  );
                                }}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
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
const purchasedBooksRouter = withRouter(purchasedBooks);
const purchasedBooksTheme = withTheme(purchasedBooksRouter);
export default withStyles(styles)(purchasedBooksTheme);

// Customizable Area Start
// Customizable Area End
