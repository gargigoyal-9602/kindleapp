import React, { useRef } from "react";
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
// import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AppHeader from "../../../components/src/Header/index";
import HomeController, { Props } from "./HomeController.web";
import "../assets/css/bookread.css";
import "../assets/css/custom-audio-player.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { withRouter, Link } from "react-router-dom";
import {
  IconButton,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  dropdown,
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
  bookRead,
  lockIcons,
  EditIcon,
} from "./assets";
import SideBar from "./Sidebar.web";
import Loader from "../../../components/src/Loader.web";
import Video from "react-native-video";
import BookReadAbled from "./BookReadAbled.web";
import "../assets/css/common.css";
import withToast from "../../../components/src/withSnackBar.Web";
import withLoader from "../../../components/src/withLoader.Web";
import withDialog from "../../../components/src/withDialog.web";
import withAlertBox from "../../../components/src/withAlertBox.Web";
import withTheme from "../../../components/src/Theme/withTheme";
const styles = {
  cardRoot: {
    maxWidth: "400px",
    margin: "20px",
  },
} as any;
class BookRead extends HomeController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  render() {
    const { classes } = this.props;
    const book = this.state.bookDetail && this.state.bookDetail.attributes;
    const player = React.createRef();
    const playSpeed = this.state.playBackSpeed && this.state.playBackSpeed;
    

    return (
      <>
        <Loader loading={this.state.Loader} />
        {this.state.bookDetail &&
          !this.state.bookDetail.attributes.is_purchased && (
            <React.Fragment>
              <AppHeader />
              <Loader loading={this.state.Loader} />
              <div className="book-read">
                <div className="content">
                  <div
                    className={`book-reading-part ${this.props.mode &&
                      "dark1"}`}
                  >
                    <div className="row">
                      <div className="col-md-6 part-one">
                        <strong>
                          The world Abstract Art:Emily Robbins
                        </strong>
                        <div className="story">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing
                            and typesetting industry. Lorem Ipsum has been
                            the industry's standard dummy text ever since
                            the 1500s, when an unknown printer took a galley
                            of type and scrambled it to make a type specimen
                            book. It has survived not only five centuries,
                            but also the leap into electronic typesetting,
                            remaining essentially unchanged. It was
                            popularised in the 1960s with the release of
                            Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing
                            software like Aldus PageMaker including versions
                            of Lorem IpsumLorem Ipsum is simply dummy text
                            of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy
                            text ever since the 1500s, when an unknown
                            printer took a galley of type and scrambled it
                            to make a type specimen book. It has survived
                            not only five centuries, but also the leap into
                            electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with
                            the release of Letraset sheets containing Lorem
                            Ipsum passages, and more recently with desktop
                            publishing software like Aldus PageMaker
                            including versions of Lorem IpsumLorem Ipsum is
                            simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the
                            1500s, when an unknown printer took a galley of
                            type and scrambled it to make a type specimen
                            book. It has survived not only five centuries,
                            but also the leap into electronic typesetting,
                            remaining essentially unchanged. It was
                            popularised in the 1960s with the release of
                            Letraset{" "}
                            <span className="unread">
                              {" "}
                              sheets containing Lorem Ipsum passages, and
                              more recently with desktop publishing software
                              like Aldus PageMaker including versions of
                              Lorem IpsumLorem Ipsum is simply dummy text of
                              the printing and typesetting industry. Lorem
                              Ipsum has been the industry's standard dummy
                              text ever since the 1500s, when an unknown
                              printer took a galley of type and scrambled it
                              to make a type specimen book. It has survived
                              not only five centuries, but also the leap
                              into electronic typesetting, remaining
                              essentially unchanged. It was popularised in
                              the 1960s with the release of Letraset sheets
                              containing Lorem Ipsum passages, and more
                              recently with desktop publishing software like
                              Aldus PageMaker including versions of Lorem
                              Ipsum{" "}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6 part-two">
                        <div
                          className={`story ${this.props.mode &&
                            "dark1 darkFont"}`}
                        >
                          <p>
                            <span className="unread">
                              sheets containing Lorem Ipsum passages, and
                              more recently with desktop publishing software
                              like Aldus PageMaker including versions of
                              Lorem IpsumLorem Ipsum is simply dummy text of
                              the printing and typesetting industry. Lorem
                              Ipsum has been the industry's standard dummy
                              text ever since the 1500s, when an unknown
                              printer took a galley of type and scrambled it
                              to make a type specimen book. It has survived
                              not only five centuries, but also the leap
                              into electronic typesetting, remaining
                              essentially unchanged. It was popularised in
                              the 1960s with the release of Letraset sheets
                              containing Lorem Ipsum passages, and more
                              recently with desktop publishing software like
                              Aldus PageMaker including versions of Lorem
                              Ipsum sheets containing Lorem Ipsum passages,
                              and more recently with desktop publishing
                              software like Aldus PageMaker including
                              versions of Lorem IpsumLorem Ipsum is simply
                              dummy text of the printing and typesetting
                              industry. Lorem Ipsum has been the industry's
                              standard dummy text ever since the 1500s, when
                              an unknown printer took a galley of type and
                              scrambled it to make a type specimen book. It
                              has survived not only five centuries, but also
                              the leap into electronic typesetting,
                              remaining essentially unchanged. It was
                              popularised in the 1960s with the release of
                              Letraset sheets containing Lorem Ipsum
                              passages, and more recently with desktop
                              publishing software like Aldus PageMaker
                              including versions of Lorem Ipsumsheets
                              containing Lorem Ipsum passages, and more
                              recently with desktop publishing software like
                              Aldus PageMaker including versions of Lorem
                              IpsumLorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem Ipsum
                              has been the industry's standard dummy text
                              ever since the 1500s, when an unknown printer
                              took a galley of type and scrambled it to make
                              a type specimen book. It has survived not only
                              five centuries, but also the leap into
                              electronic typesetting, remaining essentially
                              unchanged. It was popularised in the 1960s
                              with the release of Letraset sheets containing
                              Lorem Ipsum passages, and more recently with
                              desktop publishing software like Aldus
                              PageMaker including versions of Lorem
                              Ipsumsheets containing Lorem Ipsum passages,
                              and more recently with desktop publishing
                              software like Aldus PageMaker including
                              versions of Lorem IpsumLorem Ipsum is simply
                              dummy text of the printing and typesetting{" "}
                            </span>{" "}
                          </p>

                          <p className="buyto-continue-reading">
                            <img src={lockIcons} alt="pause" />{" "}
                            <span>Buy to Continue Reading</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* =======custom-video-player===== */}
                    <div className="row">
                      <div className="video-player-col col-md-12">
                        <div className="custom-video-player">
                          <AudioPlayer
                            autoPlay={false}
                            //@ts-ignore
                            ref={player}
                            src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
                            onPlay={(e: any) => {
                              this.setState({
                                is_playing: !this.state.is_playing,
                              });
                            }}
                            onPause={(e: any) => {
                              this.setState({
                                is_playing: !this.state.is_playing,
                              });
                            }}
                            // other props here
                          />
                          <div className="select-speed">
                            <form>
                              <select
                                name="cars"
                                id="cars"
                                value={this.state.playBackSpeed}
                                onChange={(e: any) => {
                                  if (player.current) {
                                    //@ts-ignore
                                    if (player.current.audio) {
                                      //@ts-ignore

                                      if (player.current.audio.current) {
                                        //@ts-ignore

                                        player.current.audio.current.playbackRate =
                                          e.target.value;
                                      }
                                    }
                                  }
                                  this.setState({
                                    playBackSpeed: e.target.value,
                                  });
                                }}
                              >
                                <option value="1">1x</option>
                                <option value="1.5">1.5x</option>
                                <option value="1.75">1.75x</option>
                                <option value="2">2x</option>
                              </select>
                            </form>
                          </div>
                          <div className="note-icon">
                            <img src={EditIcon} alt="note" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* =======ends: custom-video-player===== */}
                  </div>

                  <div className="right-side-panel">
                    <div>
                      <button className="back back-bookdetails">
                        <IconButton
                          style={{
                            height: "50px",
                            width: "50px",
                            backgroundColor: "#EFEFEF",
                            border: "1px #F4F4F4 solid",
                            marginRight: "12px",
                          }}
                          onClick={() => {
                            this.props.history.push(
                              `/Catalogue/BookDetails/${
                                this.state.bookDetail.id
                              }`
                            );
                          }}
                        >
                          <KeyboardBackspaceIcon />
                        </IconButton>
                        <span style={{ textAlign: "left" }}>
                          {`${this.state.bookDetail.attributes.name} : ${
                            this.state.bookDetail.attributes.author
                          }`}
                        </span>
                      </button>
                      <ul>
                        <li>
                          <div className="img-list-name">
                            <span>
                              {this.state.is_playing ? (
                                <img
                                  src={bookRead}
                                  alt="pause"
                                  className="pause"
                                  onClick={() => {
                                    //@ts-ignore
                                    player.current.audio.current.pause();
                                  }}
                                />
                              ) : (
                                <img
                                  src={playButton}
                                  alt="pause"
                                  className="pause"
                                  onClick={() => {
                                    //@ts-ignore
                                    player.current.audio.current.play();
                                  }}
                                />
                              )}
                            </span>
                            <div className="left">
                              {" "}
                              <strong>
                                1. The Reader of the life.
                              </strong>{" "}
                              <small>30 Sample playing</small>
                            </div>
                          </div>
                          
                        </li>
                        {[...Array(4)].map((e: any, i: any) => (
                          <li key={i}>
                            <div className="img-list-name books-blur-title">
                              <span>
                                <img
                                  src={lockIcons}
                                  alt="pause"
                                  className="lock"
                                />{" "}
                              </span>
                              <div className="left">
                                {" "}
                                <strong>
                                  2. The Reader of the life.
                                </strong>{" "}
                                <small>30 Sample playing</small>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className={`full-version ${this.props.mode &&
                        "dark1"}`}
                      style={{ border: `${this.props.mode && "none"}` }}
                    >
                      <div className="price">
                        <strong className="name">
                          Get the Full Versions
                        </strong>
                        <strong>
                          $<br />
                          {book.price}
                        </strong>
                      </div>
                      {book.is_in_cart ? (
                        <button
                          className="btn button-buy"
                          onClick={() => {
                            //@ts-ignore
                            this.props.history.push("/cart");
                          }}
                        >
                          GO TO CART
                        </button>
                      ) : (
                        <button
                          className="btn button-buy"
                          onClick={() => {
                            this.settingBookId(book.id);
                            this.postCreateCart(book.id);
                          }}
                        >
                          ADD TO CART FOR ${book.price}
                        </button>
                      )}

                      {/* <button className="btn button-buy">Buy Now For $124</button> */}
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        {this.state.bookDetail &&
          this.state.bookDetail.attributes.is_purchased && (
            <React.Fragment>
              {/* @ts-ignore */}
              <BookReadAbled />
            </React.Fragment>
          )}
      </>
    );
  }
}


//@ts-ignore
const BookReadAlertBox = withAlertBox(BookRead);
const BookReadLoader = withLoader(BookReadAlertBox);
const BookReadToast = withToast(BookReadLoader);
const BookReadWithDialog = withDialog(BookReadToast);
const BookReadWithRouter = withRouter(BookReadWithDialog);
const BookReadThemes = withTheme(BookReadWithRouter);
export default withStyles(styles)(BookReadThemes);

// Customizable Area Start
// Customizable Area End
