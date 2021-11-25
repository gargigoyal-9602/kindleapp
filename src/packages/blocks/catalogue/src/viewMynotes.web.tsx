import React from "react";
// Customizable Area Start
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { shadows } from "@material-ui/system";
import Modal from "@material-ui/core/Modal";
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
export const configJSON = require("./config");
import "../../../components/src/Styles/Styles.css";
import "../assets/css/index.css";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Switch from "@material-ui/core/Switch";
import AppHeader from "../../../components/src/Header/index";
import HomeController, { Props } from "./HomeController.web";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { withRouter } from "react-router-dom";
import { EditIcon, lockIcons, DeleteClose } from "./assets";
import SideBar from "./Sidebar.web";
import Loader from "../../../components/src/Loader.web";
import { FormControlLabel } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "../assets/css/common.css";
import withTheme from "../../../components/src/Theme/withTheme";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const styles = {
  cardRoot: {
    maxWidth: "400px",
    margin: "20px",
  },
  reupload: {
    color: "#3AAEEF",
    marginRight: "15px",
    cursor: "pointer",
  },
  remove: {
    color: "#FD6E9C",
    cursor: "pointer",
  },
  pdfImage: {
    marginRight: "10px",
  },
  PdfUploads: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginBottom: "10px",
    flexWrap: "wrap",
  },
  DarkPdfUploads: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#303030",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginBottom: "10px",
    flexWrap: "wrap",
  },
  NameofPdf: {
    display: "flex",
    alignItems: "center",
  },
  pdfName: {
    margin: 0,
  },
} as any;
import { IconClose, noteUpload, pdfIcon } from "./assets";
class viewMynotes extends HomeController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  render() {
    const { classes } = this.props;
    const viewMynotes =
      this.state.bookNotes &&
      this.state.bookNotes.length > 0 &&
      this.state.bookNotes;
    return (
      <>
        <AppHeader />
        <Loader loading={this.state.Loader} />

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

              <Link
                href={`/Catalogue/MyNotes`}
                style={{ color: "#3b9dd4" }}
              >
                My Notes
              </Link>
              <Typography style={{ color: "#797b79 !important" }}>
                {this.state.book && this.state.book.name}
              </Typography>
            </Breadcrumbs>
            <div className="d-flex align-items-center flex-wrap">
              <h3>My Notes</h3>
              {viewMynotes && (
                <div
                  className="edit-section m-l-30"
                  onClick={() => {
                    this.setState({
                      editNotes: !this.state.editNotes,
                    });
                  }}
                >
                  <img src={EditIcon} />
                  Edit
                </div>
              )}
              {/* // edit note modal */}
              {viewMynotes && (
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
                        price:
                          this.state.bookNotes[0].attributes.price || "",
                        note_ForSale:
                          this.state.bookNotes[0].attributes.set_public ||
                          false,
                      }}
                      validationSchema={Yup.object().shape({
                        price: Yup.number()
                          .required(configJSON.errorNameEmpty)
                          .positive(),
                        note_ForSale: Yup.string().required(
                          configJSON.errorNameEmpty
                        ),
                      })}
                      onSubmit={(values: any) => {
                        console.log("values", values);
                        this.putEditBookNote(values);
                      }}
                      enableReinitialize
                    >
                      {({
                        errors,
                        values,
                        setFieldValue,
                        setFieldTouched,
                      }) => {
                        return (
                          //@ts-ignore

                          <Form
                            className={classes.root}
                          >
                            <div
                              className={`edit-notes-wrapper ${this.props.mode && "dark1"}`}
                            >
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
                                  {
                                    this.state
                                      .bookNotes[0]
                                      .attributes.book
                                      .name
                                  }
                                </p>
                                <p>
                                  {
                                    this.state
                                      .bookNotes[0]
                                      .attributes
                                      .notes_count
                                  }{" "}
                                  notes available
                                </p>
                              </div>
                              <div className="d-flex justify-content-center m-b-20">
                                <Rating
                                  name={"index"}
                                  value={1}
                                  precision={0.1}
                                />
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
                                      className={`form-control ${this
                                        .props.mode &&
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
                                    className={`form-control ${this
                                      .props.mode &&
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
                                    this.deleteBookNote(
                                      this.state
                                        .bookNotes[0].id
                                    );
                                  }}
                                >
                                  <img
                                    src={DeleteClose}
                                  />
                                  <span>
                                    Delete Note
                                  </span>
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
              {viewMynotes && (
                <>
                  <div className="switch-section">
                    <FormControlLabel
                      control={<Switch name="checkedB" color="primary" />}
                      label="Set Public"
                      checked={this.state.setPublic || false}
                      onChange={(e: any) => {
                        this.setState({
                          editNotes: !this.state.editNotes,
                        });
                      }}
                    />
                  </div>
                  <div style={{ marginLeft: "15px" }}>
                    <Rating
                      name={"index"}
                      value={1}
                      precision={0.1}
                      max={5}
                    />
                    <p
                      style={{
                        margin: 0,
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                      }}
                    >
                      $
                      {this.state.bookNotes[0].attributes.price &&
                        this.state.bookNotes[0].attributes.price}
                    </p>
                  </div>
                </>
              )}
            </div>

            {viewMynotes && (
              <>
                {viewMynotes[0].attributes.chapters.map(
                  (chapter: any, index: any) => {
                    return (
                      chapter.attributes.note_texts.length > 0 && (
                        <div className="my-notes-main-wrapper">
                          <p
                            className={`chapter-name ${this.props.mode &&
                              "darkFo"}`}
                          >
                            {`Ch ${chapter.attributes.chapter_no} : ${
                              chapter.attributes.chapter_name
                            }
                  `}
                            <span
                              className="edit-section m-l-30"
                              onClick={() => {
                                this.getNoteText(
                                  chapter.attributes.note_texts[0].id
                                );
                                this.handleuploadNoteClose();
                              }}
                            >
                              <img src={noteUpload} />
                              Upload New Note
                            </span>
                          </p>
                          {chapter.attributes.note_texts.map(
                            (note_text: any, index: any) => {
                              return (
                                <div className="inside-wrapper" key={index}>
                                  {/* <div
                                    className={`left-section ${this.props
                                      .mode && "dark1"}`}
                                  >
                                    <p className="time">5:24</p>
                                    <p className="price">
                                      <span>$ 24</span>
                                    </p>
                                  </div> */}
                                  <div
                                    className={`right-section ${this.props
                                      .mode && "darkFont"}`}
                                  >
                                    <p>{note_text.attributes.note_title}</p>

                                    <p>{note_text.attributes.note_data}</p>

                                    <div className="bottom-division">
                                      <div
                                        className="edit-section"
                                        onClick={() => {
                                          this.getNoteText(note_text.id);

                                          this.setState({
                                            createNotes: !this.state
                                              .createNotes,
                                          });
                                        }}
                                      >
                                        <img src={EditIcon} />
                                        Edit
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )
                    );
                  }
                )}

                {/* // dialog box for upload new notes */}
                {this.state.noteText && this.state.upload_note && (
                  <Dialog
                    open={this.state.upload_note}
                    onClose={this.handleuploadNoteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="open-text-setup edit-notes-section"
                  >
                    <div className="main-dialog-wrapper create-note-wrapper">
                      <div
                        className={`inner-wrapper ${this.props.mode &&
                          "dark1"}`}
                      >
                        <DialogTitle
                          id="alert-dialog-title"
                          className="rate-review"
                        >
                          <h6>{`Ch ${
                            this.state.noteText.attributes.chapter_no
                          }: ${
                            this.state.noteText.attributes.chapter_name
                          }`}</h6>
                          <p>
                            {/* //Note from <span>05:24</span> */}
                          </p>
                          <DialogActions className="close-btn">
                            <img
                              src={IconClose}
                              alt="close"
                              className="close-icon"
                              onClick={() => {
                                this.handleuploadNoteClose();
                              }}
                            />
                          </DialogActions>
                        </DialogTitle>
                        <DialogContent>
                          {console.log(this.state.noteText, "note text")}
                          <Formik
                            initialValues={{
                              title: "",
                              note_data: "",
                              text_file: "",
                            }}
                            validationSchema={Yup.object().shape({
                              title: Yup.string().required(
                                configJSON.errorNameEmpty
                              ),
                              note_data: Yup.string().required(
                                configJSON.errorNameEmpty
                              ),
                            })}
                            onSubmit={(values: any) => {
                              this.setState({
                                currentChapterNo: this.state.noteText
                                  .attributes.chapter_no,
                                currentChapterName: this.state.noteText
                                  .attributes.chapter_name,
                                bookNoteId: this.state.noteText.attributes
                                  .note_id,
                              });
                              this.postCreateNotes(values);
                            }}
                            enableReinitialize
                          >
                            {({
                              errors,
                              values,
                              setFieldValue,
                              setFieldTouched,
                            }) => {
                              return (
                                //@ts-ignore

                                <Form
                                  className={
                                    classes.root
                                  }
                                >
                                  <div
                                    className={`form-group-wrap`}
                                  >
                                    <div
                                      className={`${
                                        this.props
                                          .mode
                                          ? classes.DarkPdfUploads
                                          : classes.PdfUploads
                                      }`}
                                    >
                                      <div
                                        className={
                                          classes.NameofPdf
                                        }
                                      >
                                        <img
                                          src={
                                            pdfIcon
                                          }
                                          width="15px"
                                          alt="pdf"
                                          className={
                                            classes.pdfImage
                                          }
                                        />
                                        <p
                                          className={
                                            classes.pdfName
                                          }
                                        >
                                          {values.text_file &&
                                            values
                                            .text_file[0]
                                            //@ts-ignore
                                              .name}
                                        </p>
                                      </div>
                                      <div>
                                        <span
                                          className={
                                            classes.reupload
                                          }
                                        >
                                          <input
                                            type="file"
                                            hidden
                                            id="text_file"
                                            name="text_file"
                                            accept=".txt"
                                            onChange={(
                                              e: any
                                            ) => {
                                              var reader = new FileReader();
                                              reader.onload = (
                                                event: any
                                              ) => {
                                                setFieldValue(
                                                  "note_data",
                                                  event
                                                    .target
                                                    .result
                                                );
                                              };
                                              reader.readAsText(
                                                e
                                                  .currentTarget
                                                  .files[0]
                                              );

                                              setFieldValue(
                                                "text_file",
                                                e
                                                  .currentTarget
                                                  .files
                                              );
                                            }}
                                            onClick={(
                                              event: any
                                            ) => {
                                              event.target.value = null;
                                            }}
                                          />
                                          <label htmlFor="text_file">
                                            {(values.text_file &&
                                              values
                                              .text_file[0]
                                              //@ts-ignore
                                                .name)? "RE-UPLOAD": "UPLOAD"}
                                            
                                          </label>
                                        </span>
                                        <span
                                          className={
                                            classes.remove
                                          }
                                          onClick={() => {
                                            setFieldValue(
                                              "text_file",
                                              ""
                                            );
                                            setFieldValue(
                                              "note_data",
                                              ""
                                            );
                                          }}
                                        >
                                          REMOVE
                                        </span>
                                      </div>
                                    </div>
                                    <div className="form-controls-custom">
                                      <label>
                                        Note Tilte
                                      </label>
                                      <Field
                                        type="text"
                                        name="title"
                                        placeholder="Eg: Mike Smith"
                                        autoComplete="off"
                                        className={`form-control ${this
                                          .props
                                          .mode &&
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
                                        className={`form-control ${this
                                          .props
                                          .mode &&
                                          "dark2"}`}
                                      />
                                      <span className="validation-summary">
                                        <ErrorMessage name="note_data" />
                                      </span>
                                    </div>
                                    <div className="del-notes">
                                      <p
                                        onClick={() => {
                                          this.handleuploadNoteClose();
                                        }}
                                      >
                                        <img
                                          src={
                                            DeleteClose
                                          }
                                        />
                                        <span>
                                          Cancel
                                          Note
                                        </span>
                                      </p>
                                    </div>
                                    <button
                                      className="button button-primary w-25 m-t-20 absolute-Btn"
                                      type="submit"
                                    >
                                      Create Note
                                    </button>
                                  </div>
                                </Form>
                              );
                            }}
                          </Formik>
                        </DialogContent>
                      </div>
                    </div>
                  </Dialog>
                )}

                {/* // dialog box for edit notes */}
                {this.state.noteText && (
                  <Dialog
                    open={this.state.createNotes}
                    onClose={this.handleCreateNotesClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="open-text-setup edit-notes-section"
                  >
                    <div className="main-dialog-wrapper create-note-wrapper">
                      <div
                        className={`inner-wrapper ${this.props.mode &&
                          "dark1"}`}
                      >
                        <DialogTitle
                          id="alert-dialog-title"
                          className="rate-review"
                        >
                          <h6>{`Ch ${
                            this.state.noteText.attributes.chapter_no
                          }: ${
                            this.state.noteText.attributes.chapter_name
                          }`}</h6>
                          <p>
                            {/* //Note from <span>05:24</span> */}
                          </p>
                          <DialogActions className="close-btn">
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
                          </DialogActions>
                        </DialogTitle>
                        <DialogContent>
                          <Formik
                            initialValues={{
                              title:
                                this.state.noteText.attributes.note_texts[0]
                                  .attributes.note_title != null
                                  ? this.state.noteText.attributes
                                      .note_texts[0].attributes.note_title
                                  : "",
                              note_data: this.state.noteText.attributes
                                .note_texts[0].attributes.note_data,
                            }}
                            validationSchema={Yup.object().shape({
                              title: Yup.string().required(
                                configJSON.errorNameEmpty
                              ),
                              note_data: Yup.string().required(
                                configJSON.errorNameEmpty
                              ),
                            })}
                            onSubmit={(values: any) => {
                              this.putEditNoteText(
                                values,
                                this.state.noteText.attributes.note_texts[0]
                                  .id
                              );
                            }}
                            enableReinitialize
                          >
                            {({
                              errors,
                              values,
                              setFieldValue,
                              setFieldTouched,
                            }) => {
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
                                        className={`form-control ${this
                                          .props.mode && "dark2"}`}
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
                                        className={`form-control ${this
                                          .props.mode && "dark2"}`}
                                      />
                                      <span className="validation-summary">
                                        <ErrorMessage name="note_data" />
                                      </span>
                                    </div>
                                    <div className="del-notes">
                                      <p
                                        onClick={() => {
                                          this.deleteNoteText(
                                            this.state.noteText.attributes
                                              .note_texts[0].id
                                          );
                                        }}
                                      >
                                        <img src={DeleteClose} />
                                        <span>Delete Note</span>
                                      </p>
                                    </div>
                                    <button
                                      className="button button-primary w-25 m-t-20 absolute-Btn"
                                      type="submit"
                                    >
                                      save
                                    </button>
                                  </div>
                                </Form>
                              );
                            }}
                          </Formik>
                        </DialogContent>
                      </div>
                    </div>
                  </Dialog>
                )}

                {/* // dialog box for edit notes */}
                {this.state.noteText && (
                  <Dialog
                    open={this.state.createNotes}
                    onClose={this.handleCreateNotesClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="open-text-setup edit-notes-section"
                  >
                    <div className="main-dialog-wrapper create-note-wrapper">
                      <div
                        className={`inner-wrapper ${this.props.mode &&
                          "dark1"}`}
                      >
                        <DialogTitle
                          id="alert-dialog-title"
                          className="rate-review"
                        >
                          <h6>{`Ch ${
                            this.state.noteText.attributes.chapter_no
                          }: ${
                            this.state.noteText.attributes.chapter_name
                          }`}</h6>
                          <p>
                            {/* //Note from <span>05:24</span> */}
                          </p>
                          <DialogActions className="close-btn">
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
                          </DialogActions>
                        </DialogTitle>
                        <DialogContent>
                          <Formik
                            initialValues={{
                              title:
                                this.state.noteText.attributes.note_texts[0]
                                  .attributes.note_title != null
                                  ? this.state.noteText.attributes
                                      .note_texts[0].attributes.note_title
                                  : "",
                              note_data: this.state.noteText.attributes
                                .note_texts[0].attributes.note_data,
                            }}
                            validationSchema={Yup.object().shape({
                              title: Yup.string().required(
                                configJSON.errorNameEmpty
                              ),
                              note_data: Yup.string().required(
                                configJSON.errorNameEmpty
                              ),
                            })}
                            onSubmit={(values: any) => {
                              this.putEditNoteText(
                                values,
                                this.state.noteText.attributes.note_texts[0]
                                  .id
                              );
                            }}
                            enableReinitialize
                          >
                            {({
                              errors,
                              values,
                              setFieldValue,
                              setFieldTouched,
                            }) => {
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
                                        className={`form-control ${this
                                          .props.mode && "dark2"}`}
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
                                        className={`form-control ${this
                                          .props.mode && "dark2"}`}
                                      />
                                      <span className="validation-summary">
                                        <ErrorMessage name="note_data" />
                                      </span>
                                    </div>
                                    <div className="del-notes">
                                      <p
                                        onClick={() => {
                                          this.deleteNoteText(
                                            this.state.noteText.attributes
                                              .note_texts[0].id
                                          );
                                        }}
                                      >
                                        <img src={DeleteClose} />
                                        <span>Delete Note</span>
                                      </p>
                                    </div>
                                    <button
                                      className="button button-primary w-25 m-t-20 absolute-Btn"
                                      type="submit"
                                    >
                                      save
                                    </button>
                                  </div>
                                </Form>
                              );
                            }}
                          </Formik>
                        </DialogContent>
                      </div>
                    </div>
                  </Dialog>
                )}
              </>
            )}
            {!viewMynotes && "No Notes Available !!"}
          </div>
        </div>
      </>
    );
  }
}
//@ts-ignore
const viewMynotesRouter = withRouter(viewMynotes);
const viewMynotesTheme = withTheme(viewMynotesRouter);
export default withStyles(styles)(viewMynotesTheme);

// Customizable Area Start
// Customizable Area End
