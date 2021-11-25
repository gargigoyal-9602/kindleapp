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
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AppHeader from "../../../components/src/Header/index";
import HomeController, { Props } from "./HomeController.web";
import "../assets/css/bookread.css";
import "../assets/css/index.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { withRouter, Link } from "react-router-dom";
// var Modal = require("react-bootstrap-modal");
import Modal from "@material-ui/core/Modal";
import Rating from "@material-ui/lab/Rating";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  DeleteClose,
  IconClose,
  EditIcon,
  notes,
  book,
  markRead,
  readSetting
} from "./assets";
import SideBar from "./Sidebar.web";
import Loader from "../../../components/src/Loader.web";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slider from "@material-ui/core/Slider";
import "../assets/css/common.css";
import withTheme from "../../../components/src/Theme/withTheme";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { EpubViewer, ReactEpubViewer } from "react-epub-viewer";
import { ReactReader } from "react-reader";
const styles = {
  cardRoot: {
    maxWidth: "400px",
    margin: "20px",
  },
} as any;
class BookReadAbled extends HomeController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  render() {
    const { classes } = this.props;
    const player = React.createRef();
    const renditionRef = React.createRef();
    const viewMynotes =
      this.state.bookNotes &&
      this.state.bookNotes.notes;
    const playSpeed = this.state.playBackSpeed && this.state.playBackSpeed;
   
    return (
      <>
        {/* <AppHeader /> */}
        <header className="book-header">
          <div className="for-logo"
          onClick={() => {
                //@ts-ignore
                this.props.history.push("/Catalogue/Home");
              }}
          >
            <img
              src={require("../assets/images/Logo_White.png")}
              className="logo-img"
              
            />
          </div>

          <div className="next-portion">
            <ul>
              <li
                onClick={() => {
                  this.setState({
                    bookFinished: true,
                  });
                }}
              >
                <a href="#">
                  <img src={markRead} alt="" />
                  Mark as Finished
                </a>
              </li>
              <li
                // className="li-active"
                onClick={() => {
                  this.setState({
                    readSetModal: true,
                    // changeSetting: false,
                  });
                }}
              >
                <a href="#">
                  <img src={readSetting} alt="" />
                  Reading Setting
                </a>
              </li>
              <li
                onClick={() => {
                  (this.state.bookNotes && this.state.bookNotes.length > 0 && this.state.bookNotes[0]?.attributes?.notes_count) 
                    ? this.setState({
                      viewNotes: true,
                    })
                    : //@ts-ignore
                    toast.warning("No Notes Available");
                }}
              >
                <a href="#">
                  <img src={require("../assets/images/image_View Notes.png")} alt="" />
                  My Notes
                </a>
              </li>
              {/* <li>
                <a href="#">
                  <img src={require("../assets/book-img.png")} alt="" />
                  Highlights
                </a>
              </li> */}
              
            </ul>
            <div className="select-book-dropdown">
              <div
                onClick={() => {
                  this.setState({
                    displayChap: !this.state.displayChap,
                  });
                }}
                className="titleWrap"
              >
                {(this.state.currentChapterName && this.state.currentChapterNo) && `${this.state.currentChapterNo}. ${this.state.currentChapterName}`}
              <img src={dropdown} className="dropImg"/>
              </div>
              {this.state.displayChap && (
                <div className="select-book-name" >
                  <img
                    src={IconClose}
                    alt="close"
                    className="close-icon"
                    onClick={() => {
                      this.setState({
                        displayChap: false
                      });
                    }}
                  />
                  <ul>
                    {this.state.chaptersListing.map((chap: any, index: any) => {

                      return (
                        <li key={index}>
                          <div
                            onClick={() => {
                              this.setState({
                                location: chap.href,
                                displayChap: false,
                                currentChapterName: chap.label,
                              });
                            }}
                          >
                            <p className="title-of-book">{index + 1}. {chap.label}</p>
                            <p className="added-notes">
                              {this.state.bookNotes && this.state.bookNotes.length > 0 && this.state.bookNotes[0].attributes.chapters.filter((chap: any) => {
                                return chap.attributes.chapter_no == index + 1
                              })[0]?.attributes?.note_texts?.length || 0}
                              {" "}Notes added</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            <div className="humburger-icon">
              <img
                src={require("../assets/images/white-humburger.png")}
                alt=""
                onClick={() => {
                  this.setState({
                    toggleMenu: !this.state.toggleMenu,
                  });
                }}
              />
              {this.state.toggleMenu && (
                <div className="responsive-menu">
                  <ul>
                    <li
                      className="li-active"
                      onClick={() => {
                        this.handleReadSetModalClose();
                      }}
                    >
                      <a href="#">
                        <img src={require("../assets/images/pen-img.png")} alt="" />
                        Reading Setting
                      </a>
                    </li>
                    <li
                      onClick={() => {
                        (this.state.bookNotes && this.state.bookNotes.length > 0 && this.state.bookNotes[0]?.attributes?.notes_count)
                          ? this.setState({
                            viewNotes: true,
                            toggleMenu: false,
                          })
                          : //@ts-ignore
                          toast.warning("No Notes Available");
                      }}
                    >
                      <a href="#">
                        <img src={require("../assets/images/book-img.png")} alt="" />
                        <span>My Notes</span>
                      </a>
                    </li>
                    {/* <li>
                      <a href="#">
                        <img src={require("../assets/book-img.png")} alt="" />
                        Highlights
                      </a>
                    </li> */}
                    <li
                      onClick={() => {
                        this.setState({
                          bookFinished: true,
                          toggleMenu: false,
                        });
                      }}
                    >
                      <a href="#">
                        <img src={require("../assets/images/book-img.png")} alt="" />
                        Mark as Finished
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>
        {/* <Loader loading={this.state.Loader} /> */}
        <div
          className={`reading-books-with-description ${this.props.mode &&
            "dark3"}`}
        >
          <div className="content">
            <div className="row">
              <div className="chapter-name-description">
                <div className="barcode-img">
                  <img src={require("../assets/images/Master Card.png")} alt="" />
                </div>
                <div>
                  <p>Reading</p>
                  <p className="chapter-decription">{this.state.currentChapterName && this.state.currentChapterName}</p>
                </div>
              </div>

              <div className="book-content-description">
                <p
                  // style={{
                  //   fontWeight:
                  //     this.state.changeSetting &&
                  //     this.state.changeSetting.fontWeight,
                  //   //@ts-ignore
                  //   fontSize:
                  //     this.state.changeSetting &&
                  //     `${this.state.changeSetting.fontSize}px`,
                  //   backgroundColor:
                  //     this.state.changeSetting &&
                  //     this.state.changeSetting.backColor,
                  //   //@ts-ignore
                  //   color:
                  //     this.state.changeSetting &&
                  //     (this.state.changeSetting.selectedColor == "#000000"
                  //       ? "#fafafa"
                  //       : ""),
                  // }}
                  className="bookHeight"
                >
                  <ReactReader
                    location={this.state.location}
                    locationChanged={(e: any) => {
                      this.setState({
                        location: e,
                      });
                      this.chapterChanged(e);
                    }}
                    getRendition={(rendition) => {
                      //@ts-ignore
                      this.state.renditionRefChap.current = rendition;
                      //@ts-ignore
                      this.state.renditionRef.current = rendition;
                    }}
                    url={
                      //book
                      "https://gerhardsletten.github.io/react-reader/files/alice.epub"
                    }
                    showToc={false}
                    tocChanged={(e: any) => {
                      
                      this.setState({
                        chaptersListing: e,
                      });
                    }}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =======custom-video-player===== */}
        <div className="author-video-player custom-video-player">
          <AudioPlayer
            // autoPlay
            autoPlay={false}
            //@ts-ignore
            ref={player}
            src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
            onPlay={(e: any) => console.log("onPlay")}
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
          <div
            className="note-icon"
            onClick={() => {
              this.handleCreateNotesClose();
            }}
          >
            <img src={EditIcon} alt="note" />
          </div>
        </div>
        {/* =======ends: custom-video-player===== */}


        {this.state.viewNotes &&
          this.state.bookNotes &&
          this.state.bookNotes.length > 0 &&(
             this.state.bookNotes[0]?.attributes?.notes_count &&
              <div className="my-notes-section">
              <div>
                <div
                  className="edit-blog"
                  onClick={() => {
                    this.setState({
                      editNotes: true,
                    });
                  }}
                >
                  <img src={EditIcon} alt="edit" className="edit-image" />
                  <span style={{top:"-3px", position:"relative"}}>Edit</span>
                </div>
                <img
                  src={IconClose}
                  alt="close"
                  className="close-icon"
                  onClick={() => {
                    this.setState({
                      viewNotes: false,
                    });
                  }}
                />
              </div>
              <div className="top-part">
                <h3>My Notes</h3>

                <p>
                  {this.state.bookNotes[0].attributes.notes_count} Notes
                  Available
                </p>
              </div>
              {this.state.bookNotes[0].attributes.chapters.map(
                (chap: any, index: any) => {
                  return (
                    chap.attributes.note_texts.length > 0 && (
                      <Accordion key={index}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <div className="accodion-top-part">
                            <div className="chapter-section">
                              <img src={notes} alt="" />
                              <span>Chapter {chap.attributes.chapter_no}</span>
                            </div>

                            <p>{chap.attributes.chapter_name}</p>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="notes-detail">
                            {chap.attributes.note_texts.map(
                              (note: any, index: any) => {
                                return (
                                  <div className="repeated-section" key={index}>
                                    {/* <div className="duration-section">
                                      05:24
                                    </div> */}
                                    <div className="contant-section">
                                      {note.attributes.note_title}
                                    </div>
                                    <div
                                      className="view-link"
                                      onClick={() => {
                                        this.props.history.push(
                                          `/booknotes/${note.id}`
                                        );
                                      }}
                                    >
                                      View
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
          
              
              )}

        {/* // edit note modal */}
        {this.state.bookNotes && this.state.bookNotes.length > 0 && (
          <Modal
            open={this.state.editNotes}
            onClose={this.handleeditNotesClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className="edit-notes-popup"
          >
            <div className="main-wrapper">
              <Formik
                initialValues={{
                  price: this.state.bookNotes[0].attributes.price || "",
                  note_ForSale:
                    this.state.bookNotes[0].attributes.set_public || false,
                }}
                validationSchema={Yup.object().shape({
                  price: Yup.number().required(configJSON.errorNameEmpty)
                    .positive(),
                  note_ForSale: Yup.string().required(
                    configJSON.errorNameEmpty
                  ),
                })}
                onSubmit={(values: any) => {
                  this.putEditBookNote(values);
                }}
                enableReinitialize
              >
                {({ errors, values, setFieldValue, setFieldTouched }) => {
                  return (
                    //@ts-ignore

                    <Form className={classes.root}>
                      <div className="edit-notes-wrapper">
                        <img
                          src={IconClose}
                          alt="close"
                          className="close-icon"
                          onClick={() => {
                            this.setState({
                              editNotes: false,
                            });
                          }}
                        />
                        <div className="headings">
                          <p className="main-heading">
                            The Readers of the life
                          </p>
                          <p>
                            {this.state.bookNotes[0].attributes.notes_count}{" "}
                            notes available
                          </p>
                        </div>
                        <div className="d-flex justify-content-center m-b-20">
                          <Rating name={"index"} value={1} precision={0.1} />
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <label className="check-box-container">
                              Note Open to sale
                              <Field
                                type="checkbox"
                                // checked={values.note_ForSale}
                                name="note_ForSale"
                                placeholder="Eg: Mike Smith"
                                autoComplete="off"
                                className={`form-control ${this.props.mode &&
                                  "dark2"}`}
                              />
                              <span className="checkmark" />
                            </label>
                            <span className="validation-summary">
                              <ErrorMessage name="note_ForSale" />
                            </span>
                          </div>
                          <div className="display-doller-amt">
                            <span>$</span>
                            <Field
                              type="text"
                              name="price"
                              autoComplete="off"
                              className={`form-control ${this.props.mode &&
                                "dark2"}`}
                            />
                            <span className="validation-summary">
                              <ErrorMessage name="price" />
                            </span>
                          </div>
                        </div>
                        <div className="del-notes">
                          <p
                            onClick={() => {
                              this.deleteBookNote(this.state.bookNotes[0].id);
                            }}
                          >
                            <img src={DeleteClose} />
                            <span>Delete Note</span>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="button-primary button m-t-20 save-btn"
                        >
                          Save
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </Modal>
        )}
        {/* reading setting modal */}
        <Modal
          open={this.state.readSetModal}
          onClose={this.handleReadSetModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="open-text-setup"
        >
          <div className="main-dialog-wrapper">
            <div className="inner-wrapper">
              <div id="alert-dialog-title" className="rate-review">
                <h6>Reading setting</h6>
                <div className="close-btn">
                  <img
                    src={IconClose}
                    alt="close"
                    className="close-icon"
                    onClick={() => {
                      this.handleReadSetModalClose();
                      this.setState({
                        // changeSetting: true,
                        toggleMenu: false,
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="main-content-wrapper">
                  <div className="font-settings settings">
                    <label>Font Settings</label>
                    <div className="main-wrapper-radios set-font-size">
                      <label className="container-radio">
                        A
                        <input
                          type="radio"
                          name="radio1"
                          checked={this.state.selectedWeight == 200}
                          onChange={(e: any) => {
                            this.setState({
                              selectedWeight: 200,
                            });
                          }}
                        />
                        <span className="checkmark f-w-200">Aa</span>
                      </label>
                      <label className="container-radio">
                        A
                        <input
                          type="radio"
                          name="radio2"
                          checked={this.state.selectedWeight == 500}
                          onChange={(e: any) => {
                            this.setState({
                              selectedWeight: 500,
                            });
                          }}
                        />
                        <span className="checkmark f-w-400">Aa</span>
                      </label>
                      <label className="container-radio">
                        A
                        <input
                          type="radio"
                          name="radio3"
                          checked={this.state.selectedWeight == 700}
                          onChange={(e: any) => {
                            this.setState({
                              selectedWeight: 700,
                            });
                          }}
                        />
                        <span className="checkmark f-w-500">Aa</span>
                      </label>
                      <label className="container-radio">
                        A
                        <input
                          type="radio"
                          name="radio4"
                          checked={this.state.selectedWeight == "bold"}
                          onChange={(e: any) => {
                            this.setState({
                              selectedWeight: "bold",
                            });
                          }}
                        />
                        <span className="checkmark f-w-bold">Aa</span>
                      </label>
                    </div>
                    <div className="increase-font-size">
                      <span>A</span>
                      <Slider
                        defaultValue={this.state.selectedSize}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={2}
                        marks
                        min={16}
                        max={24}
                        onChange={(e: any, value: any) => {
                          this.setState({
                            selectedSize: value,
                          });
                        }}
                        className="increase-font-size-slider"
                      />
                      <span className="f-s-22">A</span>
                    </div>
                  </div>
                  <div className="background-settings settings">
                    <label>Background Settings</label>
                    <div className="main-wrapper-radios set-bg-color">
                      <label className="container-radio">
                        <input
                          type="radio"
                          name="radio5"
                          checked={this.state.selectedColor == "#000000"}
                          onChange={(e: any) => {
                            this.setState({
                              selectedColor: "#000000",
                            });
                          }}
                        />
                        <span className="checkmark bg-color-1" />
                      </label>
                      <label className="container-radio">
                        <input
                          type="radio"
                          name="radio6"
                          checked={this.state.selectedColor == "#fff"}
                          onChange={(e: any) => {
                            this.setState({
                              selectedColor: "#fff",
                            });
                          }}
                        />
                        <span className="checkmark bg-color-2" />
                      </label>
                      <label className="container-radio">
                        <input
                          type="radio"
                          name="radio7"
                          checked={this.state.selectedColor == "#fbf0da"}
                          onChange={(e: any) => {
                            this.setState({
                              selectedColor: "#fbf0da",
                            });
                          }}
                        />
                        <span className="checkmark bg-color-3" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="button button-primary w-100"
                  type="submit"
                  onClick={() => {
                    this.handleReadSetModalClose();
                    this.setState({
                      toggleMenu: false,
                    });
                    const customize = {
                      backColor: this.state.selectedColor,
                      fontSize: this.state.selectedSize,
                      fontWeight: this.state.selectedWeight,
                    };
                    this.handleCustomize(customize);
                  }}
                >
                  save
                </button>
              </div>
            </div>

            <div className="text-preview-section">
              <p className="text-preview-heading">Text Preview</p>
              <p
                className="text-preview-text"
                style={{
                  fontWeight: this.state.selectedWeight,
                  fontSize: `${this.state.selectedSize}px`,
                  backgroundColor: this.state.selectedColor,
                  color: this.state.selectedColor == "#000000" ? "#fafafa" : "",
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries,
              </p>
            </div>
          </div>
        </Modal>

        {/* create note modal */}
        <Modal
          open={this.state.createNotes}
          onClose={this.handleCreateNotesClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="main-dialog-wrapper create-note-wrapper open-text-setup">
            <div className="inner-wrapper">
              <div className="rate-review">
                <h6>Create Note</h6>
                {/* <p>
                  Note From <span>05:24</span>
                </p> */}
                <div className="close-btn">
                  <img
                    src={IconClose}
                    alt="close"
                    className="close-icon"
                    onClick={() => {
                      this.handleCreateNotesClose();
                      // this.setState({
                      //   // changeSetting: true,
                      //   toggleMenu: false,
                      // });
                    }}
                  />
                </div>
              </div>
              <div>
                <Formik
                  initialValues={{
                    title: "",
                    note_data: "",
                  }}
                  validationSchema={Yup.object().shape({
                    title: Yup.string().required(configJSON.errorNameEmpty),
                    note_data: Yup.string().required(configJSON.errorNameEmpty),
                  })}
                  onSubmit={(values: any) => {
                    this.postCreateNotes(values);
                  }}
                  enableReinitialize
                >
                  {({ errors, values, setFieldValue, setFieldTouched }) => {
                    return (
                      //@ts-ignore

                      <Form className={classes.root}>
                        <div className={`form-group-wrap`}>
                          <div className="form-controls-custom">
                            <label>Note Tilte</label>
                            <Field
                              type="text"
                              name="title"
                              placeholder="Eg: Mike Smith"
                              autoComplete="off"
                              className={`form-control ${this.props.mode &&
                                "dark2"}`}
                            />
                            <span className="validation-summary">
                              <ErrorMessage name="title" />
                            </span>
                          </div>
                          <div className="form-controls-custom">
                            <Field
                              type="text"
                              as="textarea"
                              name="note_data"
                              placeholder="Eg: Mike Smith"
                              autoComplete="off"
                              className={`form-control ${this.props.mode &&
                                "dark2"}`}
                            />
                            <span className="validation-summary">
                              <ErrorMessage name="note_data" />
                            </span>
                          </div>
                          <div>
                            <div className="buttons-wrapper">
                              <button
                                className="button button-primary w-100 m-b-10"
                                type="submit"
                              >
                                save
                              </button>
                              <button
                                className="button button-transparent w-100"
                                type="submit"
                                onClick={() => {
                                  this.setState({
                                    createNotes: false,
                                  });
                                }}
                              >
                                cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.bookFinished}
          onClose={this.bookFinishedClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="cancel-book-section d-flex justify-content-center align-items-center "
        >
          <div className="cancel-book-wrapper completed-reading-book">
            <img src={IconClose} alt="close" className="close-icon" onClick={()=>this.bookFinishedClose()}/>
            <div className="inside-wrapper-box">
              <h4 className="text-center">Well Done!</h4>
              <div className="text-center m-t-20 image-center">
                <img src={bookCover} />
              </div>
              <div className="text-center book-detail-portion">
                <p className="font-weight-500 heading">
                  The World of Abstract Art
                </p>
                <p className="sub-heading">
                  By<span>Emily Robbines</span>
                </p>
              </div>
              <p className="sub-title text-center ">
                You have completed this book with-in 8 days of purchase. Let's
                Start reading another book.{" "}
              </p>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const BookReadAbledWithRouter = withRouter(BookReadAbled);
const BookReadAbledTheme = withTheme(BookReadAbledWithRouter);
export default withStyles(styles)(BookReadAbledTheme);
// Customizable Area Start
// Customizable Area End
