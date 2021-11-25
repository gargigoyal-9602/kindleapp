import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";


import {
  withStyles,
  createStyles,
  Grid,
  Box,
  Paper,
  Breadcrumbs,
  Typography,
  Link,
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  MenuItem,
  Select,
  Hidden,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  FormLabel,
} from "@material-ui/core";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import withAlertBox from "../../../components/src/withAlertBox.Web";
import withToast from "../../../components/src/withSnackBar.Web";
import withLoader from "../../../components/src/withLoader.Web";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import withTheme from "../../../components/src/Theme/withTheme";
// Customizable Area End

import UploadMediaController, {
  Props,
  S,
  configJSON,
} from "./UploadMediaController";
import SideBarWeb from "./SideBar.web";

import {
  pinkDownload,
  UploadImage,
  pdfIcon,
  musicIcon,
  CloseIcon,
  removeIcon,bookName
} from "./assets";
import { toast } from "react-toastify";

const Schema = Yup.object().shape({
  autherName: Yup.string().required("This field is required."),
  publisherName: Yup.string().required("This field is required."),
  language: Yup.string().required("This field is required."),
  length: Yup.string().required("This field is required."),
  isbn: Yup.string().required("This field is required."),
  pageCount: Yup.number().positive().required("This field is required."),
  oneTimePrice: Yup.number().positive().required("This field is required."),
  monthlyPrice: Yup.number().positive().required("This field is required."),
  discount: Yup.number().positive().required("This field is required."),
  packageOneTimePrice: Yup.number().positive().required("This field is required."),
  packageMonthlyPrice: Yup.number().positive().required("This field is required."),
  packageDiscount: Yup.number().positive().required("This field is required."),
  bookDesc: Yup.string().required("This field is required."),
  thumbnail: Yup.string().required("This field is required."),
  bookPdf: Yup.string().required("This field is required."),
  bookMp3: Yup.string().required("This field is required."),
  bookSamplePdf: Yup.string().required("This field is required."),
  bookSampleMp3: Yup.string().required("This field is required."),

});

class UploadMedia extends UploadMediaController {

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount = (): any => {
    if (this.props.authToken) {
      this.getPublishersList();
    }
    const { location }: any = this.props;
    const { state }: any = location;
    console.log(state,"state")
    if (location && state && state.uploadData) {
     this.setState({ uploadData: state.uploadData });
    }
  };
  componentDidUpdate = (prevProps: any) => {
    if (prevProps.authToken !== this.props.authToken) {
      this.getPublishersList();
    }
  };
  handleRoutes = (route: any,value:any) => {
    this.props.history.push({
      pathname: route,
      state: {
        uploadData: value,
      },
    });
  };

  toggleModel = (): any => {
    this.setState((prevState: S) => ({ open: !prevState.open }));
  };
  // Customizable Area End

  render() {
    const { classes, accountInfo }: any = this.props;
    const {autherName,
                  publisherName,
                  publisherId,
                  language,
                  length,
                  isbn,
                  pageCount,
                  bookDesc,
                  oneTimePrice,
                  monthlyPrice,
                  discount,
                  packageOneTimePrice,
                  packageMonthlyPrice,
                  packageDiscount,
                  thumbnail,
                  bookPdf,
                  bookMp3,
                  bookSamplePdf,
                  bookSampleMp3,
                  flag}= this.state.uploadData && this.state.uploadData

    return (
      <Box m={3} className={classes.root}>
        <Grid container spacing={4}>
          <Hidden >
            <SideBarWeb closeDrawer={() => { }} />
          </Hidden>
          <Grid item xs={12} md={12} lg={10}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link href="/AdminConsole" style={{ color: "#3b9dd4" }}>
                Home
              </Link>
              <Typography style={{ color: "#797b79 !important" }}>Upload Media</Typography>
            </Breadcrumbs>
            <Box mt={3}>
              <Formik
                initialValues={{
                  autherName:  (autherName && autherName)  || "",
                  publisherName: (publisherName && publisherName)  || "" ,
                  publisherId: (publisherId && publisherId)  || "",
                  language: (language && language)  || "",
                  length: (length && length)  || "",
                  isbn: (isbn && isbn)  || "",
                  pageCount:(pageCount && pageCount)  || "",
                  bookDesc: (bookDesc && bookDesc)  || "",
                  oneTimePrice: (oneTimePrice && oneTimePrice)  || "",
                  monthlyPrice: (monthlyPrice && monthlyPrice)  || "",
                  discount: (discount && discount)  || "",
                  packageOneTimePrice: (packageOneTimePrice && packageOneTimePrice)  || "",
                  packageMonthlyPrice: (packageMonthlyPrice && packageMonthlyPrice)  || "",
                  packageDiscount: (packageDiscount && packageDiscount)  || "",
                  thumbnail: (thumbnail && thumbnail)  || "",
                  bookPdf: (bookPdf && bookPdf)  || "",
                  bookMp3: (bookMp3 && bookMp3)  || "",
                  bookSamplePdf: (bookSamplePdf && bookSamplePdf)  || "",
                  bookSampleMp3: (bookSampleMp3 && bookSampleMp3)  || "",
                  flag: (flag && flag) && false 
                }}
                enableReinitialize
                validationSchema={Schema}
                onSubmit={(values, actions) => {
                  this.handleBookSave(values);
                }}
              >
                {(formikProps) => {
                  const {
                    values,
                    setFieldValue,
                    handleChange,
                    touched,
                    errors,
                  } = formikProps;
                  return (
                    <Form
                      translate="no"
                      noValidate
                      autoComplete="off"
                    >
                      <Grid container>
                        <Grid item xs={12} md={6}>
                          <Typography variant="h5">
                            Upload Media
                          </Typography>
                          <Paper
                            className={
                              classes.uploadContainer
                            }
                          >
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Box>
                                <Typography variant="h6">
                                  Upload Book Thumbnail
                                </Typography>
                                <Typography variant="body2">
                                  This will be your Cover
                                  Picture.
                                </Typography>
                              </Box>
                              <Box
                                className={
                                  classes.uploadImagesection
                                }
                              >
                                <input
                                  type="file"
                                  hidden
                                  id="thumbnail"
                                  name="thumbnail"
                                  accept="image/png, image/jpeg, image/jpg"
                                  onChange={(e: any) => {
                                    
                                    setFieldValue(
                                      "thumbnail",
                                      e.currentTarget.files
                                    );
                                  }}
      
      onClick={(event:any)=> { 
           event.target.value = null
      }}

                                />

                                {values.thumbnail.length !=
                                  0 && (
                                    <>
                                      <img
                                        src={removeIcon}
                                        className={
                                          classes.closeIconImage
                                        }
                                        onClick={() => {
                                          setFieldValue(
                                            "thumbnail",
                                            ""
                                          );
                                        }}
                                      />
                                      <img
                                        src={(
                                          window.URL ||
                                          // (window as any)
                                          window.webkitURL
                                        ).createObjectURL(
                                          values.thumbnail[0]
                                        )}
                                        width="80px"
                                        height="100px"
                                        className={
                                          classes.bookUploadedImage
                                        }
                                      />
                                    </>
                                  )}
                                {/* {values.thumbnail[0].name} */}
                                <label htmlFor="thumbnail">
                                  {values?.thumbnail?.length ==
                                    0 &&
                                    <Button className={classes.btn + " " + classes.primary}
                                      component="span">
                                      <Box
                                        pr={1}
                                        component="span"
                                      >
                                        <img
                                          src={UploadImage}
                                          alt="upload"
                                          width="20px"
                                        />
                                      </Box>
                                      Upload File
                                    </Button>
                                  }
                                </label>
                              </Box>
                            </Box>
                          </Paper>
                          <span className={classes.validationSummary}>
                            <ErrorMessage name="thumbnail" />
                          </span>

                          {/* book pdf and audio upload */}
                          <Paper
                            className={
                              classes.uploadContainer
                            }
                          >
                            <Box display="flex">
                              <Box mr={2}>
                                <Typography variant="h6">
                                  Drag and drop files
                                </Typography>
                                <Typography variant="body2">
                                  Upload book PDF and Audio
                                  MP3 <br /> here to get
                                  started
                                </Typography>
                              </Box>
                              <Box display="flex" ml="auto">
                                <Box m={2}>
                                  <img
                                    src={musicIcon}
                                    width="30px"
                                    alt="music"
                                  />
                                </Box>
                                <Box m={2}>
                                  <img
                                    src={pdfIcon}
                                    width="30px"
                                    alt="pdf"
                                  />
                                </Box>
                              </Box>
                            </Box>
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <Box mt={2}>
                                  {values?.bookPdf?.length !=
                                    0 && <div
                                      className={
                                        `${classes.uploadPdfAndImage} ${this.props
                                .mode && classes.dark1}`
                                      }
                                    >
                                      <div
                                        className={
                                          classes.uploadings
                                        }
                                      >
                                        {" "}
                                        <img
                                          src={pdfIcon}
                                          width="15px"
                                          alt="pdf"
                                          className={
                                            classes.pdfImage
                                          }
                                        />
                                        <span>
                                          {values?.bookPdf?.length !=
                                            0 &&
                                            //@ts-ignore 
                                            values?.bookPdf[0].name}</span>
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
                                            id="bookPdf"
                                            name="bookPdf"
                                            accept=".epub"
                                            onChange={(e: any) => {
                                              setFieldValue(
                                                "bookPdf",
                                                e.currentTarget.files
                                              );
                                            }}
                                            onClick={(event:any)=> { 
           event.target.value = null
      }}
                                          />
                                          <label htmlFor="bookPdf" >
                                            RE-UPLOAD
                                          </label>
                                        </span>
                                        <span
                                          className={
                                            classes.remove
                                          }
                                          onClick={() => {
                                            setFieldValue(
                                              "bookPdf",
                                              ""
                                            );
                                          }}
                                        >
                                          REMOVE
                                        </span>
                                      </div>
                                    </div>
                                  }
                                  {values?.bookMp3?.length !=
                                    0 && <div
                                      className={
                                        `${classes.uploadPdfAndImage} ${this.props
                                .mode && classes.dark1}`
                                      }
                                    >
                                      <div
                                        className={
                                          classes.uploadings
                                        }
                                      >
                                        {" "}
                                        <img
                                          src={musicIcon}
                                          width="15px"
                                          alt="pdf"
                                          className={
                                            classes.pdfImage
                                          }
                                        />
                                        <span>{values?.bookMp3?.length !=
                                          0 &&
                                          //@ts-ignore
                                          values?.bookMp3[0].name}</span>
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
                                            id="bookMp3"
                                            name="bookMp3"
                                            accept="audio/mp3"
                                            onChange={(e: any) => {
                                              setFieldValue(
                                                "bookMp3",
                                                e.currentTarget.files
                                              );
                                            }}
                                            onClick={(event:any)=> { 
           event.target.value = null
      }}
                                          />
                                          <label htmlFor="bookMp3">
                                            RE-UPLOAD
                                          </label>
                                        </span>
                                        <span
                                          className={
                                            classes.remove
                                          }
                                          onClick={() => {
                                            setFieldValue(
                                              "bookMp3",
                                              ""
                                            );
                                          }}
                                        >
                                          REMOVE
                                        </span>
                                      </div>
                                    </div>
                                  }
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box mb={1}>
                                  <input
                                    type="file"
                                    hidden
                                    id="bookPdf1"
                                    name="bookPdf1"
                                    accept=".epub"
                                    onChange={(e: any) => {
                                      setFieldValue(
                                        "bookPdf",
                                        e.currentTarget.files
                                      );
                                    }}
                                    //@ts-ignore
                                    disabled={values?.bookPdf && values?.bookPdf[0].length != 0}
                                    onClick={(event:any)=> { 
           event.target.value = null
      }}

                                  />

                                  <label htmlFor="bookPdf1">
                                    <Button className={`${classes.btn} ${classes.primary} ${this.props.mode && classes.darkBtnDisabled}`}
                                      fullWidth
                                      variant="contained"
                                      component="span"
                                      color="primary"
                                      //@ts-ignore
                                      disabled={values?.bookPdf && values?.bookPdf[0].length != 0}
                                    >
                                      <Box
                                        pr={1}
                                        component="span"
                                      >
                                        <img
                                          src={UploadImage}
                                          alt="upload"
                                          width="20px"
                                        />
                                      </Box>
                                      Upload File
                                    </Button>
                                  </label>
                                </Box>
                                <span className={classes.validationSummary}>
                                  <ErrorMessage name="bookPdf" />
                                </span>
                              </Grid>
                              <Grid item xs={6}>
                                <Box mb={1}>
                                  <input
                                    type="file"
                                    hidden
                                    id="bookMp"
                                    name="bookMp"
                                    accept="audio/mp3"
                                    onChange={(e: any) => {
                                      setFieldValue(
                                        "bookMp3",
                                        e.currentTarget.files
                                      );
                                      

                                    }}
                                    //@ts-ignore
                                    disabled={values?.bookMp3 && values?.bookMp3[0].length != 0}
                                    onClick={(event:any)=> { 
           event.target.value = null
      }}
                                  />
                                  <label htmlFor="bookMp">
                                    <Button className={`${classes.btn} ${classes.primary} ${this.props.mode && classes.darkBtnDisabled}`}
                                      fullWidth
                                      component="span"

                                      //@ts-ignore
                                      disabled={values?.bookMp3 && values?.bookMp3[0].length != 0}

                                    >
                                      <Box
                                        pr={1}
                                        component="span"
                                      >
                                        <img
                                          src={UploadImage}
                                          alt="upload"
                                          width="20px"
                                        />
                                      </Box>
                                      Upload mp3
                                    </Button>
                                  </label>
                                </Box>
                                <span className={classes.validationSummary}>
                                  <ErrorMessage name="bookMp3" />
                                </span>
                              </Grid>
                            </Grid>
                          </Paper>



                          {/* book sample pdf and sample audio upload */}
                          <Paper
                            className={
                              classes.uploadContainer
                            }
                          >
                            <Box display="flex">
                              <Box mr={2}>
                                <Typography variant="h6">
                                  Drag and drop sample files
                                </Typography>
                                <Typography variant="body2">
                                  Upload sample book PDF and sample Audio
                                  MP3 <br /> here to get
                                  started
                                </Typography>
                              </Box>
                              <Box display="flex" ml="auto">
                                <Box m={2}>
                                  <img
                                    src={musicIcon}
                                    width="30px"
                                    alt="music"
                                  />
                                </Box>
                                <Box m={2}>
                                  <img
                                    src={pdfIcon}
                                    width="30px"
                                    alt="pdf"
                                  />
                                </Box>
                              </Box>
                            </Box>
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <Box mt={2}>
                                  {values?.bookSamplePdf?.length !=
                                    0 && <div
                                      className={
                                        `${classes.uploadPdfAndImage} ${this.props
                                .mode && classes.dark1}`
                                      }
                                    >
                                      <div
                                        className={
                                          classes.uploadings
                                        }
                                      >
                                        {" "}
                                        <img
                                          src={pdfIcon}
                                          width="15px"
                                          alt="pdf"
                                          className={
                                            classes.pdfImage
                                          }
                                        />
                                        <span>
                                          {values?.bookSamplePdf?.length !=
                                            0 &&
                                            //@ts-ignore 
                                            values?.bookSamplePdf[0].name}</span>
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
                                            id="bookSamplePdf"
                                            name="bookSamplePdf"
                                            accept=".epub"
                                            onChange={(e: any) => {
                                              setFieldValue(
                                                "bookSamplePdf",
                                                e.currentTarget.files
                                              );
                                            }}
                                            onClick={(event:any)=> { 
           event.target.value = null
      }}
                                          />
                                          <label htmlFor="bookSamplePdf">
                                            RE-UPLOAD
                                          </label>
                                        </span>
                                        <span
                                          className={
                                            classes.remove
                                          }
                                          onClick={() => {
                                            setFieldValue(
                                              "bookSamplePdf",
                                              ""
                                            );
                                          }}
                                        >
                                          REMOVE
                                        </span>
                                      </div>
                                    </div>
                                  }
                                  {values?.bookSampleMp3?.length !=
                                    0 && <div
                                      className={
                                        `${classes.uploadPdfAndImage} ${this.props
                                .mode && classes.dark1}`
                                      }
                                    >
                                      <div
                                        className={
                                          classes.uploadings
                                        }
                                      >
                                        {" "}
                                        <img
                                          src={musicIcon}
                                          width="15px"
                                          alt="pdf"
                                          className={
                                            classes.pdfImage
                                          }
                                        />
                                        <span>{values?.bookSampleMp3?.length !=
                                          0 &&
                                          //@ts-ignore
                                          values?.bookSampleMp3[0].name}</span>
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
                                            id="bookSampleMp3"
                                            name="bookSampleMp3"
                                            accept="audio/mp3"
                                            onChange={(e: any) => {
                                              setFieldValue(
                                                "bookSampleMp3",
                                                e.currentTarget.files
                                              );
                                            }}
                                            onClick={(event:any)=> { 
           event.target.value = null
      }}
                                          />
                                          <label htmlFor="bookSampleMp3">
                                            RE-UPLOAD
                                          </label>
                                        </span>
                                        <span
                                          className={
                                            classes.remove
                                          }
                                          onClick={() => {
                                            setFieldValue(
                                              "bookSampleMp3",
                                              ""
                                            );
                                          }}
                                        >
                                          REMOVE
                                        </span>
                                      </div>
                                    </div>
                                  }
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box mb={1}>
                                  <input
                                    type="file"
                                    hidden
                                    id="bookSamplePdf1"
                                    name="bookSamplePdf1"
                                    accept=".epub"
                                    onChange={(e: any) => {
                                      setFieldValue(
                                        "bookSamplePdf",
                                        e.currentTarget.files
                                      );
                                    }}
                                    onClick={(event:any)=> { 
           event.target.value = null
      }}
                                    //@ts-ignore
                                    disabled={values?.bookSamplePdf && values?.bookSamplePdf[0].length != 0}

                                  />

                                  <label htmlFor="bookSamplePdf1">
                                    <Button className={`${classes.btn} ${classes.primary} ${this.props.mode && classes.darkBtnDisabled}`}
                                      fullWidth
                                      variant="contained"
                                      component="span"
                                      color="primary"
                                      //@ts-ignore
                                      disabled={values?.bookSamplePdf && values?.bookSamplePdf[0].length != 0}
                                    >
                                      <Box
                                        pr={1}
                                        component="span"
                                      >
                                        <img
                                          src={UploadImage}
                                          alt="upload"
                                          width="20px"
                                        />
                                      </Box>
                                      Upload File
                                    </Button>
                                  </label>
                                </Box>
                                <span className={classes.validationSummary}>
                                  <ErrorMessage name="bookSamplePdf" />
                                </span>
                              </Grid>
                              <Grid item xs={6}>
                                <Box mb={1}>
                                  <input
                                    type="file"
                                    hidden
                                    id="bookSampleMp31"
                                    name="bookSampleMp31"
                                    accept="audio/mp3"
                                    onChange={(e: any) => {
                                      setFieldValue(
                                        "bookSampleMp3",
                                        e.currentTarget.files
                                      );

                                    }}
                                    onClick={(event:any)=> { 
           event.target.value = null
      }}
                                    //@ts-ignore
                                    disabled={values?.bookSampleMp3 && values?.bookSampleMp3[0].length != 0}
                                  />
                                  <label htmlFor="bookSampleMp31">
                                    <Button className={`${classes.btn} ${classes.primary} ${this.props.mode && classes.darkBtnDisabled}`}
                                      fullWidth
                                      component="span"

                                      //@ts-ignore
                                      disabled={values?.bookSampleMp3 && values?.bookSampleMp3[0].length != 0}

                                    >
                                      <Box
                                        pr={1}
                                        component="span"
                                      >
                                        <img
                                          src={UploadImage}
                                          alt="upload"
                                          width="20px"
                                        />
                                      </Box>
                                      Upload mp3
                                    </Button>
                                  </label>
                                </Box>
                                <span className={classes.validationSummary}>
                                  <ErrorMessage name="bookSampleMp3" />
                                </span>
                              </Grid>
                            </Grid>
                          </Paper>
                          <Box m={2} mr={5}>
                            <Divider />
                          </Box>
                          {/* textfield */}
                          <Grid
                            container
                            spacing={3}
                            className={
                              classes.bookUploadContainer
                            }
                          >
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography variant="body1" className={classes.formLabel}>
                                  Author Name
                                </Typography>

                                <TextField
                                  required
                                  name="autherName"
                                  id="autherName"
                                  className={`${classes.textField} ${this.props.mode && classes.darkInput}`}
                                  value={values.autherName}
                                  onChange={handleChange}
                                  fullWidth
                                  variant="filled"
                                  placeholder="Eg: Mike Smith"
                                  InputProps={{
                                    className: classes.input,
                                  }}
                                  error={
                                    touched.autherName &&
                                    Boolean(
                                      errors.autherName
                                    )
                                  }
                                  helperText={
                                    touched.autherName &&
                                    errors.autherName
                                  }
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="body1" className={classes.formLabel}>
                                  Publisher Name
                                </Typography>
                                <Select style={{ border: "none", }}
                                  required
                                  fullWidth
                                  variant="filled"
                                  name="publisherName"
                                  className={`${classes.selectField} ${this.props.mode && classes.darkselectField}`}
                                  placeholder="Eg: Mike Smith"
                                  id="publisherName"

                                  value={
                                    values.publisherName
                                  }
                                  onClick={(e: any) => {
                                    if (
                                      e.target.value ===
                                      "addPublisher"
                                    ) {
                                      this.toggleModel();
                                    } else handleChange(e);
                                  }}
                                  error={
                                    touched.publisherName &&
                                    Boolean(
                                      errors.publisherName
                                    )
                                  }
                                >
                                  <MenuItem
                                    value=""
                                    disabled
                                  >
                                    Select Publisher
                                  </MenuItem>
                                  {this.state.publishersList.map(
                                    (publisher: any) => {
                                      return (
                                        <MenuItem
                                          key={publisher.id}
                                          value={
                                            publisher.name
                                            && publisher.name

                                          }
                                          onClick={() => {
                                            setFieldValue("publisherId", publisher.id)
                                          }}
                                        >
                                          {publisher.name
                                            ? publisher.name
                                            : publisher.email}
                                        </MenuItem>
                                      );
                                    }
                                  )}
                                  <MenuItem
                                    key="addPublisher"
                                    value="addPublisher"
                                  >
                                    Add Publisher
                                  </MenuItem>
                                </Select>
                              </Grid>
                              <Grid item xs={12}>
                                <h2 className={classes.h2Title}>Book Pricing</h2>
                              </Grid>
                              <Grid container>
                                <Grid item xs={12} md={6}>
                                  <Box>
                                    <Typography variant="body1" className={classes.formLabel}>
                                      Onetime Payement Pricing
                                    </Typography>
                                    <TextField
                                      required
                                      variant="filled"
                                      name="oneTimePrice"
                                      id="oneTimePrice"
                                      className={`${classes.textField} ${this.props.mode && classes.darkInput}`}
                                      onChange={
                                        handleChange
                                      }
                                      value={values.oneTimePrice}
                                      InputProps={{
                                        className: classes.input,
                                      }}
                                      placeholder="Eg: 25"
                                      error={
                                        touched.oneTimePrice &&
                                        Boolean(
                                          errors.oneTimePrice
                                        )
                                      }
                                      helperText={
                                        touched.oneTimePrice &&
                                        errors.oneTimePrice
                                      }
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Box className={classes.ml}>
                                    <Typography variant="body1" className={classes.formLabel}>
                                      Monthly Payement Pricing
                                    </Typography>
                                    <Field
                                      component={TextField}
                                      required
                                      variant="filled"
                                      name="monthlyPrice"
                                      id="monthlyPrice"
                                      className={`${classes.textField} ${this.props.mode && classes.darkInput}`}

                                      onChange={
                                        handleChange
                                      }
                                      value={
                                        values.monthlyPrice
                                      }
                                      InputProps={{
                                        className: classes.input,
                                      }}
                                      placeholder="Eg: 5"
                                      error={
                                        touched.monthlyPrice &&
                                        Boolean(
                                          errors.monthlyPrice
                                        )
                                      }
                                      helperText={
                                        touched.monthlyPrice &&
                                        errors.monthlyPrice
                                      }
                                    />
                                  </Box>
                                </Grid>
                              </Grid>
                              <Grid container>
                                <Grid item xs={12}>
                                  <Box>
                                    <Typography variant="body1" className={classes.formLabel}>
                                      Publisher commission on individual book
                                    </Typography>
                                    <TextField
                                      required
                                      variant="filled"
                                      name="discount"
                                      id="discount"
                                      className={`${classes.textField} ${this.props.mode && classes.darkInput}`}
                                      onChange={
                                        handleChange
                                      }
                                      value={values.discount}
                                      InputProps={{
                                        className: classes.input,
                                      }}
                                      placeholder="Eg: 25"
                                      error={
                                        touched.discount &&
                                        Boolean(
                                          errors.discount
                                        )
                                      }
                                      helperText={
                                        touched.discount &&
                                        errors.discount
                                      }
                                    />
                                  </Box>
                                </Grid>
                              </Grid>
                              <Grid item xs={12}>
                                <h2 className={classes.h2Title}>Package Pricing</h2>
                              </Grid>
                              <Grid container>
                                <Grid item xs={12} md={6}>
                                  <Box>
                                    <Typography variant="body1" className={classes.formLabel}>
                                      Onetime Payement Pricing
                                    </Typography>
                                    <TextField
                                      required
                                      variant="filled"
                                      name="packageOneTimePrice"
                                      id="packageOneTimePrice"
                                      className={`${classes.textField} ${this.props.mode && classes.darkInput}`}
                                      onChange={
                                        handleChange
                                      }
                                      value={values.packageOneTimePrice}
                                      InputProps={{
                                        className: classes.input,
                                      }}
                                      placeholder="Eg: 25"
                                      error={
                                        touched.packageOneTimePrice &&
                                        Boolean(
                                          errors.packageOneTimePrice
                                        )
                                      }
                                      helperText={
                                        touched.packageOneTimePrice &&
                                        errors.packageOneTimePrice
                                      }
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Box className={classes.ml}>
                                    <Typography variant="body1" className={classes.formLabel}>
                                      Monthly Payement Pricing
                                    </Typography>
                                    <Field
                                      component={TextField}
                                      required
                                      variant="filled"
                                      name="packageMonthlyPrice"
                                      id="packageMonthlyPrice"
                                      className={`${classes.textField} ${this.props.mode && classes.darkInput}`}

                                      onChange={
                                        handleChange
                                      }
                                      value={
                                        values.packageMonthlyPrice
                                      }
                                      InputProps={{
                                        className: classes.input,
                                      }}
                                      placeholder="Eg: 5"
                                      error={
                                        touched.packageMonthlyPrice &&
                                        Boolean(
                                          errors.packageMonthlyPrice
                                        )
                                      }
                                      helperText={
                                        touched.packageMonthlyPrice &&
                                        errors.packageMonthlyPrice
                                      }
                                    />
                                  </Box>
                                </Grid>
                              </Grid>
                              <Grid container>
                                <Grid item xs={12}>
                                  <Box>
                                    <Typography variant="body1" className={classes.formLabel}>
                                      Publisher commission on individual book
                                    </Typography>
                                    <TextField
                                      required
                                      variant="filled"
                                      name="packageDiscount"
                                      id="packageDiscount"
                                      className={`${classes.textField} ${this.props.mode && classes.darkInput}`}
                                      onChange={
                                        handleChange
                                      }
                                      value={values.packageDiscount}
                                      InputProps={{
                                        className: classes.input,
                                      }}
                                      placeholder="Eg: 25"
                                      error={
                                        touched.packageDiscount &&
                                        Boolean(
                                          errors.packageDiscount
                                        )
                                      }
                                      helperText={
                                        touched.packageDiscount &&
                                        errors.packageDiscount
                                      }
                                    />
                                  </Box>
                                </Grid>
                              </Grid>
                              <Grid container>
                                <Grid item xs={12} md={6}>
                                  <Box>
                                    <Typography variant="body1" className={classes.formLabel}>
                                      Language
                                    </Typography>
                                    <TextField
                                      required
                                      variant="filled"
                                      name="language"
                                      id="language"
                                      className={`${classes.textField} ${this.props.mode && classes.darkInput}`}
                                      onChange={
                                        handleChange
                                      }
                                      value={values.language}
                                      InputProps={{
                                        className: classes.input,
                                      }}
                                      placeholder="Eg: 25"
                                      error={
                                        touched.language &&
                                        Boolean(
                                          errors.language
                                        )
                                      }
                                      helperText={
                                        touched.language &&
                                        errors.language
                                      }
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Box className={classes.ml}>
                                    <Typography variant="body1" className={classes.formLabel}>
                                      Length
                                    </Typography>
                                    <Field
                                      component={TextField}
                                      required
                                      variant="filled"
                                      name="length"
                                      id="length"
                                      className={`${classes.textField} ${this.props.mode && classes.darkInput}`}
                                      onChange={
                                        handleChange
                                      }
                                      value={
                                        values.length
                                      }
                                      InputProps={{
                                        className: classes.input,
                                      }}
                                      placeholder="Eg: 6hr"
                                      error={
                                        touched.length &&
                                        Boolean(
                                          errors.length
                                        )
                                      }
                                      helperText={
                                        touched.length &&
                                        errors.length
                                      }
                                    />
                                  </Box>
                                </Grid>
                              </Grid>
                              <Grid container>
                                <Grid item xs={12} md={6}>
                                  <Box>
                                    <Typography variant="body1" className={classes.formLabel}>
                                      ISBN
                                    </Typography>
                                    <TextField
                                      required
                                      variant="filled"
                                      name="isbn"
                                      id="isbn"
                                      className={`${classes.textField} ${this.props.mode && classes.darkInput}`}
                                      onChange={
                                        handleChange
                                      }
                                      value={values.isbn}
                                      InputProps={{
                                        className: classes.input,
                                      }}
                                      placeholder="Eg: 25"
                                      error={
                                        touched.isbn &&
                                        Boolean(
                                          errors.isbn
                                        )
                                      }
                                      helperText={
                                        touched.isbn &&
                                        errors.isbn
                                      }
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Box className={classes.ml}>
                                    <Typography variant="body1" className={classes.formLabel}>
                                      Page Count
                                    </Typography>
                                    <Field
                                      component={TextField}
                                      required
                                      variant="filled"
                                      name="pageCount"
                                      id="pageCount"
                                      className={`${classes.textField} ${this.props.mode && classes.darkInput}`}
                                      onChange={
                                        handleChange
                                      }
                                      value={
                                        values.pageCount
                                      }
                                      InputProps={{
                                        className: classes.input,
                                      }}
                                      placeholder="Eg: 5"
                                      error={
                                        touched.pageCount &&
                                        Boolean(
                                          errors.pageCount
                                        )
                                      }
                                      helperText={
                                        touched.pageCount &&
                                        errors.pageCount
                                      }
                                    />
                                  </Box>
                                </Grid>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="body1" className={classes.formLabel}>
                                  Book Description
                                </Typography>

                                <TextField
                                  required
                                  name="bookDesc"
                                  id="bookDesc"
                                  className={`${classes.textField} ${this.props.mode && classes.darkInput}`}
                                  value={values.bookDesc}
                                  onChange={handleChange}
                                  fullWidth
                                  variant="filled"
                                  placeholder="Eg: Mike Smith"
                                  InputProps={{
                                    className: classes.input,
                                  }}
                                  error={
                                    touched.bookDesc &&
                                    Boolean(
                                      errors.bookDesc
                                    )
                                  }
                                  helperText={
                                    touched.bookDesc &&
                                    errors.bookDesc
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          {/* ends: textfield */}
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="h5">
                            Preview
                          </Typography>
                          <Paper
                            className={
                              `${classes.previewContainer} ${this.props.mode && classes.dark1}`
                            }
                          >
                            <Grid container spacing={4}>
                              <Grid item xs={12} md={6}>
                                <Paper elevation={10} className={`${classes.paperBox} ${this.props.mode && classes.dark2}`} style={{height:"fit-content",minHeight:"fit-content"}}>
                                  <Box p={2} display="flex">
                                    <Box m={1}>
                                      <img
                                        src={values?.thumbnail ? ((window.URL ||
                                          window.webkitURL
                                        ).createObjectURL(
                                          values.thumbnail[0]
                                        )) : bookName}
                                        alt="Book cover page"
                                        width="80px"
                                        height="100px"
                                        className={
                                          classes.bookUploadedImage
                                        }
                                      />
                                    </Box>
                                    <Box m={1}>
                                      <Typography variant="subtitle1">
                                        {values.bookPdf
                                          //@ts-ignore
                                          ? values?.bookPdf[0].name.split('.epub')[0]
                                          : " Book Name"}

                                      </Typography>
                                      <Typography variant="subtitle2">
                                        {values.autherName
                                          ? values.autherName
                                          : "Author Name"}

                                      </Typography>
                                    </Box>
                                  </Box>
                                </Paper>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Box m={1}>
                                  <h2 className={classes.previewTitle}>About Book:</h2>
                                  <Box display="flex">
                                    <Box>
                                      <Typography
                                        className={
                                          `${classes.AboutBookBody} ${this.props
                                .mode && classes.darkFont}`
                                        }
                                        variant="subtitle1"
                                      >
                                        Writtern By:
                                      </Typography>
                                      <Typography
                                        className={
                                          `${classes.AboutBookBody} ${this.props
                                .mode && classes.darkFont}`
                                        }
                                        variant="subtitle1"
                                      >
                                        Length:
                                      </Typography>
                                      <Typography
                                        className={
                                          `${classes.AboutBookBody} ${this.props
                                .mode && classes.darkFont}`
                                        }
                                        variant="subtitle1"
                                      >
                                        Language:
                                      </Typography>
                                      <Typography
                                        className={
                                          `${classes.AboutBookBody} ${this.props
                                .mode && classes.darkFont}`
                                        }
                                        variant="subtitle1"
                                      >
                                        Publisher:
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <Typography
                                        className={
                                          `${classes.AboutBookBodyValue} ${this.props
                                .mode && classes.darkFont}`
                                        }
                                        variant="body1"
                                      >
                                        {values.autherName
                                          ? values.autherName
                                          : " Eg: Mike Smith"}
                                      </Typography>
                                      <Typography
                                        className={
                                          `${classes.AboutBookBodyValue} ${this.props
                                .mode && classes.darkFont}`
                                        }
                                        variant="body1"
                                      >
                                        {values.length
                                          ? values.length
                                          : "Eg: 6hr"}

                                      </Typography>
                                      <Typography
                                        className={
                                          `${classes.AboutBookBodyValue} ${this.props
                                .mode && classes.darkFont}`
                                        }
                                        variant="body1"
                                      >
                                        {values.language
                                          ? values.language
                                          : " Eg: English"}

                                      </Typography>
                                      <Typography
                                        className={
                                          `${classes.AboutBookBodyValue} ${this.props
                                .mode && classes.darkFont}`
                                        }
                                        variant="body1"
                                      >
                                        {/* Eg: Mike Smith */}
                                        {values.publisherName ? values.publisherName : "Eg: Mike Smith "}
                                        {/* // ? this.state.publishersList.filter(
                                          //   (
                                          //     publihser: any
                                          //   ) =>
                                          //     publihser.id ===
                                          //     values.publisherName
                                          // )[0].name
                                          // : "Eg: Mike Smith "} */}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid item xs={12}>
                                <Box mt={0} mb={4}>
                                  <Paper elevation={3} className={`${classes.paperBox} ${this.props.mode && classes.dark2}`}>
                                    <Box p={3}>
                                      <Typography variant="h6" className={classes.contentTitle}>
                                        <strong>Summary </strong>
                                      </Typography>
                                      <Typography variant="body2" className={`${classes.bookDesc} ${this.props.mode && classes.darkFont}`}>
                                        {values.bookDesc
                                          ? values.bookDesc
                                          : " Eg: As far back as 1840 Tuner..."}
                                      </Typography>
                                    </Box>
                                  </Paper>
                                </Box>
                                <Box>
                                  <Box onClick={()=> {
                                    (values?.bookSamplePdf?.length !=
                                    0 && values?.bookSampleMp3?.length !=
                                    0)?
                                    this.handleRoutes("/AdminConsole/ReadAndListen",values) : toast.warning("Pls upload sample pdf and sample mp3")
                                    }}>
                                    <Button className={`${classes.btn} ${classes.white} ${this.props.mode && classes.dark2}`}
                                      type="button"
                                      fullWidth
                                    >
                                      Read or Listen to a
                                      Sample
                                    </Button>
                                  </Box>
                                 
                                </Box>
                              </Grid>
                            </Grid>
                          </Paper>
                          <Box m={2} mt={4} my={4}>
                            <Button className={classes.btn + " " + classes.primary}
                              type="submit"
                              fullWidth
                            >
                              Upload Book
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Form>
                  );
                }}
              </Formik>
            </Box>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={this.toggleModel}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Publisher</DialogTitle>
          <form onSubmit={this.addPublisher}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="publisherName"
                label="publisherName"
                type="text"
                fullWidth
                required
                onChange={(e) =>
                  this.setState({ publisherName: e.target.value })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button type="button" onClick={this.toggleModel} color="primary">
                Cancel
              </Button>
              <Button type="submit" onClick={this.toggleModel} color="primary">
                Subscribe
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box >
    );
  }
}

// Customizable Area Start

const UploadMediaAlertBox = withAlertBox(UploadMedia);
const UploadMediaLoader = withLoader(UploadMediaAlertBox);
const UploadMediaTheme = withTheme(UploadMediaLoader);
const UploadMediaToast = withToast(UploadMediaTheme);
// Customizable Area End
export default withStyles((theme) =>
  createStyles({
    root: {},
    ml:
    {
      marginLeft: 15,
      "@media (max-width: 768px)":
      {
        marginLeft: 0,
      }
    },
    contentTitle:
    {
      marginBottom: 20,
    },
    bookDesc:
    {
      fontWeight: 600,
      opacity: "0.8",
      color: "#000",
    },
    previewTitle:
    {
      fontWeight: 500,
      marginTop: 0,
      marginBottom: "10px"
    },
    h2Title:
    {
      fontWeight: 500,
    },
    textField: {
      width: "100%",
    },
    selectField:
    {
      backgroundColor: "#F4F4F4 !important",
      border: "2px solid #F4F4F4",
      // padding: "22px 17px",
      fontWeight: 600,
      fontSize: 15,
      color: "#a6a7af",
      borderRadius: 15,
      height: "60px",
      "& .MuiSelect-selectMenu":
      {
          height: "32px",
      },
      "& .MuiSelect-select:focus":
      {
        backgroundColor: "#F4F4F4 !important",
        borderRadius: 15,
      },
      "&.MuiFilledInput-underline:before":
      {
        borderBottom: "0 !important",
      },
      "&.MuiFilledInput-underline:after":
      {
        borderBottom: "0 !important",
      },
    },
    formLabel:
    {
      fontWeight: 600,
      fontSize: 13,
      color: "#a6a7af",
      marginBottom: 15,
    },
    input: {
      borderRadius: "10px !important",
      marginBottom: 15,
      backgroundColor: "transparent",
      "&.MuiFilledInput-root:hover":
      {
        backgroundColor: "transparent",
      },
      "& input":
      {
        padding: "22px 17px",
        fontWeight: 600,
        fontSize: 15,
        color: "#a6a7af",
        backgroundColor: "#F4F4F4 !important",
        border: "2px solid #F4F4F4",
        borderRadius: 15,
        "&:hover":
        {
          borderColor: "#3b9dd4",
        },
        "&:focus":
        {
          borderColor: "#3b9dd4",
        },
      },
      "& textarea":
      {
        padding: "22px 17px",
        fontWeight: 600,
        fontSize: 15,
        color: "#a6a7af",
      },
      "&::before":
      {
        borderBottom: "0 !important",
      },
      "&::after":
      {
        borderBottom: "0 !important",
      },
      "&::hover":
      {
        borderBottom: "0 !important",
        backgroundColor: "#f4f4f4",
        border: "1px solid #3b9dd4",
      },
      "&::focus":
      {
        borderBottom: "0 !important",
        backgroundColor: "#F4F4F4 !important",
        border: "1px solid #3b9dd4",
      },
      "&::placeholder":
      {
        color: "#a6a7af",
        opacity: 1,
      }
    },
    uploadContainer: {
      // backgroundColor: "#f1f1f1",
      borderRadius: "1rem",
      padding: "1rem",
      marginRight: "2rem",
      marginTop: "1rem",
      border: "2px dashed #E6E6E6",
      "@media (max-width: 768px)":
      {
        marginRight: "0",
        width: "100%",
      }
    },
    uploadImageNew: {
      float: "right",
      backgroundColor: "#3AAEEF",
    },
    backgroundColorPrimary: {
      backgroundColor: "#3AAEEF",
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
    uploadPdfAndImage: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      marginBottom: "10px",
    },
    closeIconImage: {
      height: "30px",
      width: "30px",
      position: "absolute",
      right: "0",
      top: "-4px",
      cursor: "pointer",
    },
    uploadImagesection: {
      position: "relative",
    },
    pdfImage: {
      marginRight: "10px",
    },
    bookUploadedImage: {
      float: "right",
      boxShadow: "0px 0px 13px 1px rgba(0,0,0,.2)",
      borderRadius: "10px",
      objectFit: "cover",
    },
    uploadings: {
      display: "flex",
      alignItems: "center",
    },
    bookUploadContainer: {
      marginRight: "3rem",
      padding: "2rem 2rem 2rem 1rem",
      "@media (max-width: 768px)":
      {
        padding: "2rem 1rem",
      }
    },
    previewContainer: {
      borderRadius: "1rem",
      backgroundColor: "#F8F8F8",
      padding: "1rem",
      marginTop: "1rem",
    },
    AboutBookBody: {
      fontSize: "0.9rem",
      lineHeight: "1.5rem",
      width: 100,
      color: "#000",
      opacity: "0.7",
      fontWeight: 600,
    },
    AboutBookBodyValue: {
      fontSize: "0.9rem",
      lineHeight: "1.5rem",
      color: "#000",
      fontWeight: 600,
    },
    paperBox: {
      backgroundColor: "#fff",
      borderRadius: "14px",
      boxShadow: "0px 8px 10px 0px rgb(0 0 0 / 20%)",
      minHeight: "200px",
    overflowY: "auto",
    height: "200px"
    },
    btn: {
      backgroundColor: "#fff",
      borderRadius: "14px",
      padding: "15px 25px",
      color: "rgb(0,0,0, 0.8)",
      boxShadow: "0px 8px 10px 0px rgb(0 0 0 / 20%)",
      "@media (max-width: 767px)":
      {
        padding: "10px 15px",
      }
    },
    white: {
      "& .MuiButton-label":
      {
        textTransform: "initial",
        fontWeight: 600,
        fontSize: "15px",
        whiteSpace: "nowrap",
        "@media (max-width: 767px)":
        {
          fontSize: "13px",
        }
      },
      "&:hover":
      {
        backgroundColor: "#3b9dd4",
        color: "#fff",
        boxShadow: "0px 8px 10px 0px rgb(0 0 0 / 20%)",
      },
    },
    primary: {
      color: "#fff",
      backgroundColor: "#3aaeef",
      "& .MuiButton-label":
      {
        textTransform: "initial",
        // textTransform: "uppercase",
        fontWeight: 600,
        fontSize: "15px",
        whiteSpace: "nowrap",
        "@media (max-width: 767px)":
        {
          fontSize: "13px",
        }
      },
      "&:hover":
      {
        backgroundColor: "#3b9dd4",
        boxShadow: "0px 8px 10px 0px rgb(0 0 0 / 20%)",
      },
    },
    validationSummary: {
      color: "#f44336",
      marginLeft: "10px",
      marginTop: "5px",
      fontSize: "0.75rem"
    },
    dark3: {
      backgroundColor: "#1f2023 !important",
      color: "#fff !important",
    },
    dark2: {
      backgroundColor: "#2f3134 !important",
      color: "#fff !important",
    },
    dark1: {
      backgroundColor: "#424242 !important",
      color: "#fff !important",
    },
    darkFont: {
      color: "#fff !important",
    },
    darkBorder: {
      border: "1px solid #9b9da4",
    },
    darkBtnDisabled:{
      "& span":{
        color: "#fff !important",
      }

    },
    darkInput:{
      "& input":
      {
        color: "white !important",
        backgroundColor: "#303030 !important",
        border: "1px solid #9b9da4",
        "&:hover":
        {
          borderColor: "#3b9dd4",
        },
        "&:focus":
        {
          borderColor: "#3b9dd4",
        },
      },
    },
    darkselectField:
    {
      color: "white !important",
        backgroundColor: "#303030 !important",
        border: "1px solid #9b9da4 !important",
        "& .MuiSelect-select:focus":
      {
        backgroundColor: "transparent !important",
      },
    }
  })
)(UploadMediaToast);
