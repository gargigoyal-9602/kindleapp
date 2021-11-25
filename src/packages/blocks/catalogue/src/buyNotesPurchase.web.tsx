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
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IconClose, EditIcon, cartIcon } from "./assets";
import SideBar from "./Sidebar.web";
import Loader from "../../../components/src/Loader.web";
import "../assets/css/common.css";
import withTheme from "../../../components/src/Theme/withTheme";
import Rating from "@material-ui/lab/Rating";

const styles = {
  cardRoot: {
    maxWidth: "400px",
    margin: "20px",
  },
} as any;
class buyNotesPurchase extends HomeController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  render() {
    const { classes } = this.props;
    const userNotes = this.state.buyNotesUser && this.state.buyNotesUser;
    return (
      <>
        <Loader loading={this.state.Loader} />
        <AppHeader />

        <div className="catalog-book">
          <SideBar
            selectedIndex={10}
            accountInfo={this.state.accountInfo && this.state.accountInfo}
          />
          {userNotes && (
            <div className="content">
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Link href="/Catalogue/Home" style={{ color: "#3b9dd4" }}>
                  Home
                </Link>
                <Link href="/buyNotes" style={{ color: "#3b9dd4" }}>
                  Buy Notes
                </Link>
                <Link
                  href={`/buyNotesPreview/${userNotes.attributes.book.id}`}
                  style={{ color: "#3b9dd4" }}
                >
                  {userNotes.attributes.book.name}
                </Link>
                <Typography
                  style={{
                    color: "#797b79 !important",
                    textTransform: "capitalize",
                  }}
                >
                  Notes By {userNotes.attributes.account_name}
                </Typography>
              </Breadcrumbs>
              <h3>Buy Notes</h3>
              <p className="text-grey-smll">
                {userNotes.attributes.book.name}
              </p>

              <div
                className={`my-notes-section buyNotesPurchase-page ${this
                  .props.mode && "myNotes"}`}
              >
                {userNotes.attributes.chapters.map(
                  (chapter: any, index: any) => {
                    return (
                      chapter.attributes.note_texts.length >
                        0 && (
                        <Accordion key={index}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <div className="accodion-top-part">
                              <div className="chapter-section">
                                <img
                                  src={require("../assets/images/Notes.png")}
                                  alt=""
                                />
                                <span>
                                  Chapter{" "}
                                  {
                                    chapter.attributes
                                      .chapter_no
                                  }
                                </span>
                              </div>

                              <p>
                                {
                                  chapter.attributes
                                    .chapter_name
                                }
                              </p>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div
                              className={`notes-detail ${this
                                .props.mode &&
                                "dark-back"}`}
                            >
                              {chapter.attributes.note_texts.map(
                                (note: any, index: any) => {
                                  return (
                                    <div
                                      className={`repeated-section ${this
                                        .props.mode &&
                                        "darkFo"}`}
                                    >
                                      <div className="duration-section">
                                        05:24
                                      </div>
                                      <div className="contant-section">
                                        {
                                          note.attributes
                                            .note_title
                                        }
                                      </div>
                                      <div className="view-link">
                                        Read Sample
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      )
                    );
                  }
                )}
              </div>
              {console.log(userNotes)}
              <div className="buy-purchase-second-section">
                <div
                  className={`buy-section-ratigs ${this.props.mode &&
                    "dark1"}`}
                >
                  <div className="d-flex justify-content-between align-items-center m-b-10">
                    <p className="note-name">
                      {userNotes.attributes.notes_count} Notes Added
                    </p>{" "}
                    <Rating
                      name={"index"}
                      value={
                        userNotes.attributes.note_reviews.avg_rating &&
                        userNotes.attributes.note_reviews.avg_rating
                      }
                      precision={0.5}
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="by-name">
                      By
                      <span style={{ textTransform: "capitalize" }}>
                        {userNotes.attributes.account_name}
                      </span>
                    </div>
                    <div className="price">
                      ${userNotes.attributes.price}
                    </div>
                  </div>
                </div>

                <div className="allReviews">
                  <p className="font-weight-500">Customer Reviews:</p>

                  {userNotes.attributes.note_reviews.reviews.length > 0 &&
                    userNotes.attributes.note_reviews.reviews.map(
                      (review: any, index: any) => {
                        return (
                          (this.state.upload_note
                            ? index <
                              userNotes.attributes.note_reviews.reviews
                                .length
                            : index < 4) && (
                            <div className="m-b-15" key={index}>
                              <Rating
                                name={"index"}
                                value={1}
                                precision={0.1}
                              />
                              <div className="by-name">
                                By<span>Emily Robbines</span>
                              </div>
                            </div>
                          )
                        );
                      }
                    )}
                </div>

                <div
                  className={`buy-section-ratigs m-b-20 ${this.props.mode &&
                    "dark1"}`}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <Rating
                        name={"index"}
                        value={
                          userNotes.attributes.note_reviews.avg_rating &&
                          userNotes.attributes.note_reviews.avg_rating
                        }
                        precision={0.5}
                        className="m-b-10"
                      />
                      <p className="font-weight-500">
                        Customer Reviews(
                        {userNotes.attributes.note_reviews.reviews.length})
                      </p>
                    </div>
                    {userNotes.attributes.note_reviews.reviews.length <
                      4 && (
                      <div
                        className="view-all-link"
                        onClick={() => {
                          this.setState({
                            upload_note: !this.state.upload_note,
                          });
                        }}
                      >
                        {this.state.upload_note ? "View Less" : "View All &#62;"}
                        
                      </div>
                    )}
                  </div>
                </div>

                <div className="buy-all-notes">
                  <div className="d-flex justify-content-between align-items-center m-b-20">
                    <p>Buy These Notes for</p>
                    <p>$25</p>
                  </div>
                  <div className="d-flex buy-now-parts">
                    <button
                      className="button button-primary w-100"
                      onClick={() => {
                        this.setState({
                          note_id: userNotes.id,
                        });
                        this.settingBookId(userNotes.attributes.book.id);
                        this.postCreateCart(userNotes.id);
                      }}
                    >
                      ADD TO CART FOR ${userNotes.attributes.price}
                    </button>
                    <img
                      src={cartIcon}
                      onClick={() => this.props.history.push("/cart")}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
//@ts-ignore
const buyNotesPurchaseRouter = withRouter(buyNotesPurchase);
const buyNotesPurchaseTheme = withTheme(buyNotesPurchaseRouter);
export default withStyles(styles)(buyNotesPurchaseTheme);

// Customizable Area Start
// Customizable Area End
