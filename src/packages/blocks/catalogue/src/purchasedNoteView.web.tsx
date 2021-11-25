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
    const viewMynotes = this.state.buyNotesUser && this.state.buyNotesUser.attributes;
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
              <Link href="/purchasedNotes" style={{ color: "#3b9dd4" }}>
                Purchased Notes
              </Link>
              <Link
                href={`/purchasedNotePreview/${viewMynotes &&
                  viewMynotes.book.id}`}
                style={{ color: "#3b9dd4" }}
              >
                {viewMynotes && viewMynotes.book.name}
              </Link>

              <Typography style={{ color: "#797b79 !important" ,textTransform: "capitalize" }}>
                Notes By {viewMynotes && viewMynotes.account_name}
              </Typography>
            </Breadcrumbs>
            <div className="d-flex align-items-center flex-wrap">
              <h3>Purchased Notes</h3>
            </div>

            {viewMynotes && (
              <>
                {viewMynotes.chapters.map((chapter: any, index: any) => {
                  return (
                    chapter.attributes.note_texts.length >
                      0 && (
                      <div className="my-notes-main-wrapper">
                        <p className={`chapter-name ${this.props.mode && "darkFo"}`}>
                          {`Ch ${
                            chapter.attributes.chapter_no
                          } : ${
                            chapter.attributes.chapter_name
                          }
                  `}
                        </p>
                        {chapter.attributes.note_texts.map(
                          (note_text: any, index: any) => {
                            return (
                              <div
                                className="inside-wrapper"
                                key={index}
                              >
                                <div
                                  className={`right-section ${this
                                    .props.mode &&
                                    "darkFont"}`}
                                >
                                  <p>
                                    {
                                      note_text.attributes
                                        .note_title
                                    }
                                  </p>

                                  <p>
                                    {
                                      note_text.attributes
                                        .note_data
                                    }
                                  </p>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )
                  );
                })}
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
