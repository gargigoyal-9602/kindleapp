import React, { useRef } from "react";
// Customizable Area Start
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { shadows } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
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
import "../../../components/src/Styles/Styles.css";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
// import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AppHeader from "../../../components/src/Header/index";
import "../../catalogue/assets/css/bookread.css";
import "../../catalogue/assets/css/custom-audio-player.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { withRouter, Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  bookCover,
  viewIcon,
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
} from "../../catalogue/src/assets";
import SideBarWeb from "./SideBar.web";
import { ReactReader } from "react-reader";

import Loader from "../../../components/src/Loader.web";
import Video from "react-native-video";
// import BookReadAbled from "./BookReadAbled.web";
import "../../catalogue/assets/css/common.css";
import withToast from "../../../components/src/withSnackBar.Web";
import withLoader from "../../../components/src/withLoader.Web";
import withDialog from "../../../components/src/withDialog.web";
import withAlertBox from "../../../components/src/withAlertBox.Web";
import withTheme from "../../../components/src/Theme/withTheme";
import UploadMediaController, { Props, S } from "./UploadMediaController";
const styles = {
  cardRoot: {
    maxWidth: "400px",
    margin: "20px",
  },
} as any;
class BookRead extends UploadMediaController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  componentDidMount = async () => {
    const { location }: any = this.props;
    const { state }: any = location;
    if (location && state && state.uploadData) {
      const audioUrl = await this.toBase64(state.uploadData.bookSampleMp3[0]);

      this.setState({
        uploadData: state.uploadData,
        audioUrl: audioUrl,
      });
    }
  };
  handleLoadMetadata = (meta: any) => {
    const { duration } = meta.target;
  };
  handleRoutes = (route: any, value: any) => {
    this.props.history.push({
      pathname: route,
      state: {
        uploadData: value,
      },
    });
  };

  // Customizable Area Start
  // Customizable Area End
  render() {
    const { classes } = this.props;
    const book = this.state.bookDetail && this.state.bookDetail.attributes;
    const player = React.createRef();
    let duration;

    const playSpeed = this.state.playBackSpeed && this.state.playBackSpeed;

    return (
      <>
        {this.state.uploadData && true && (
          <React.Fragment>
            {/* <Loader loading={this.state.Loader} /> */}
            <div className="book-read bookReadListenWrapper">
              <Box className="content">
                <div
                  className={`book-reading-part ${this.props.mode &&
                    "dark-back"}`}
                >
                  <div className="row">
                    <div className="col-md-12 ">
                      <strong>
                        {this.state.uploadData &&
                          this.state.uploadData.bookSamplePdf[0].name.split(
                            ".epub"
                          )[0]}
                      </strong>
                      <div className="story">
                        <div className="book-content-description">
                          <p
                            className={`bookHeight ${this.props.mode &&
                              "darkbookHeight"}`}
                          >
                            <ReactReader
                              url={this.state.uploadData.bookSamplePdf[0]}
                              showToc={false}
                              getRendition={(rendition) => {
                                //@ts-ignore 
                               this.props.mode &&  rendition?.themes?.register(
                                  "custom",
                                  {
                                    body: {
                                      "color": "white",

                                    },
                                    div:{
                                      "font-size":"18px",
                                      "color": "white",

                                    },
                                    p:{
                                      "font-size":"18px",
                                      "color": "white",

                                    }
                                  }
                                );
                                rendition.themes.select('custom')
                              }}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 part-two" />
                  </div>
                  {/* =======custom-video-player===== */}
                  <div className="row">
                    <div className="video-player-col col-md-12">
                      <div className="custom-video-player">
                        <AudioPlayer
                          autoPlay={false}
                          //@ts-ignore
                          ref={player}
                          src={this.state.audioUrl}
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
                <div
                  className={`right-side-panel ${this.props.mode &&
                    "dark-mode"}`}
                >
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
                          this.handleRoutes(
                            "/AdminConsole/UploadMedia",
                            this.state.uploadData
                          );
                        }}
                      >
                        <KeyboardBackspaceIcon />
                      </IconButton>
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
                              1.{" "}
                              {this.state.uploadData &&
                                this.state.uploadData.bookSamplePdf[0].name.split(
                                  ".epub"
                                )[0]}
                            </strong>{" "}
                            <small>Sample playing</small>
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
                              <strong>2. The Reader of the life.</strong>{" "}
                              <small>30 Sample playing</small>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Box>
            </div>
          </React.Fragment>
        )}
        {this.state.bookDetail &&
          this.state.bookDetail.attributes.is_purchased && (
            <React.Fragment>{/* @ts-ignore */}</React.Fragment>
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
