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
} as any;
import { IconClose } from "./assets";
class BookNotes extends HomeController {
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
                My Notes
              </Typography>
            </Breadcrumbs>
            <h3>My Notes </h3>

            {this.state.noteText && (
              <div className="my-notes-main-wrapper">
                <p
                  className={`chapter-name ${this.props.mode && "darkFo"}`}
                >
                  {`Ch ${this.state.noteText.attributes.chapter_no} : ${
                    this.state.noteText.attributes.chapter_name
                  }`}
                </p>
                <div className="inside-wrapper">
                  {/* <div className={`left-section ${this.props.mode && "dark1"}`}>
                    <p className="time">5:24</p>
                    <p className="price">
                      <span>$ 24</span>
                    </p>
                  </div> */}
                  <div
                    className={`right-section ${this.props.mode &&
                      "darkFont"}`}
                  >
                    <p>
                      {
                        this.state.noteText.attributes.note_texts[0]
                          .attributes.note_title
                      }
                    </p>

                    <p>
                      {
                        this.state.noteText.attributes.note_texts[0]
                          .attributes.note_data
                      }
                    </p>

                    <div className="bottom-division">
                      <div
                        className="edit-section"
                        onClick={() => {
                          this.setState({
                            createNotes: !this.state.createNotes,
                          });
                        }}
                      >
                        <img src={EditIcon} />
                        Edit
                      </div>
                      {/* <div className="switch-section">
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.toggleMonth}
                              onChange={(e: any) => {
                                this.setState({
                                  toggleMonth: e.target.checked,
                                });
                              }}
                              name="checkedB"
                              color="primary"
                            />
                          }
                          label="Set Public"
                        />
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* // dialog box for edit notes */}
                <Dialog
                  open={this.state.createNotes}
                  onClose={this.handleCreateNotesClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  className="open-text-setup edit-notes-section"
                >
                  <div className="main-dialog-wrapper create-note-wrapper">
                    <div className="inner-wrapper">
                      <DialogTitle
                        id="alert-dialog-title"
                        className="rate-review"
                      >
                        <h6>
                          {`Ch ${
                            this.state.noteText.attributes.chapter_no
                          }: ${
                            this.state.noteText.attributes.chapter_name
                          }`}
                        </h6>
                        
                        <DialogActions className="close-btn">
                          <img
                            src={IconClose}
                            alt="close"
                            className="close-icon"
                            onClick={() => {
                              this.handleCreateNotesClose();
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
                            console.log("values", values);
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
                              <Form className={classes.root}>
                                <div className={`form-group-wrap`}>
                                  <div className="form-controls-custom">
                                    <label>Note Tilte</label>
                                    <Field
                                      type="text"
                                      name="title"
                                      placeholder="Eg: Mike Smith"
                                      autoComplete="off"
                                      className={`form-control ${this.props
                                        .mode && "dark2"}`}
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
                                      className={`form-control ${this.props
                                        .mode && "dark2"}`}
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
                                  <div className="savebtn">
                                    <button
                                      className="button button-primary w-50 m-t-20"
                                      type="submit"
                                    >
                                      save
                                    </button>
                                  </div>
                                </div>
                              </Form>
                            );
                          }}
                        </Formik>
                      </DialogContent>
                    </div>
                  </div>
                </Dialog>
              </div>
            )}
            {!this.state.noteText && "No Notes Available !!"}
          </div>
        </div>
      </>
    );
  }
}
//@ts-ignore
const BookNotesRouter = withRouter(BookNotes);
const BookNotesTheme = withTheme(BookNotesRouter);
export default withStyles(styles)(BookNotesTheme);

// Customizable Area Start
// Customizable Area End
