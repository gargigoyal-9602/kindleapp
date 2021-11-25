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
  InputBase,
  TablePagination,
  Hidden,
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// Customizable Area End

import NotesController, { Props, configJSON } from "./Notes.controller";
import SideBarWeb from "./SideBar.web";

import withAlertBox from "../../../components/src/withAlertBox.Web";
import withToast from "../../../components/src/withSnackBar.Web";
import withLoader from "../../../components/src/withLoader.Web";

import {
  searchImage,
  threeDot,
  EditIcon,
  BlockIcon,
  DeleteIcon,
} from "./assets";
import withTheme from "../../../components/src/Theme/withTheme";

const Tr = (props: any) => (
  <TableCell className={props.classes.th}>
    <Typography variant="body2" color="textSecondary">
      {props.children}
    </Typography>
  </TableCell>
);

class Notes extends NotesController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount = (): any => {
    if (this.props.authToken) {
      this.setState({ authToken: this.props.authToken }, () => {
        this.getNotesList();
      });
    }
  };
  componentDidUpdate(prevProps: any) {
    if (prevProps.authToken !== this.props.authToken) {
      this.setState({ authToken: this.props.authToken }, () => {
        this.getNotesList();
      });
    }
  }
  handleRoutes = (route: any, state: any) => {
    this.props.history.push(route);
  };
  handleChangePage = (e: any, newPage: number) => {
    this.setState({ page: newPage });
  };
  // Customizable Area End

  render() {
    const { classes, accountInfo }: any = this.props;
    return (
      <Box m={3} className={classes.root}>
        <Grid container spacing={4}>
          <Hidden>
            <SideBarWeb closeDrawer={() => {}} />
          </Hidden>
          <Grid item xs={12} md={12} lg={10}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link style={{ color: "#3b9dd4" }} href="/AdminConsole">
                Home
              </Link>
              <Typography style={{ color: "#797b79 !important" }}>
                Notes
              </Typography>
            </Breadcrumbs>
            <Box mt={3}>
              <Typography variant="h5" className={classes.head}>Notes</Typography>
              <Box display="flex" mb="19px" mt="20px">
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <img src={searchImage} width="25px" alt="search" />
                  </div>
                  <InputBase
                    placeholder="Search Books, Publisher or Student"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    fullWidth
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              </Box>
              <Paper className={classes.bookContainer}>
                <TableContainer className={classes.bookContainerTable}>
                  <Table className={classes.table} aria-label="simple table" stickyHeader>
                    <TableHead
                      style={{
                        borderRadius: "0.2rem",
                        backgroundColor: this.props.mode ? "#656565" : "#ccc",
                      }}
                    >
                      <TableRow>
                        <TableCell className={classes.Tablehead}>NOTE</TableCell>
                        <TableCell className={classes.Tablehead2}  >
                          USER
                        </TableCell>
                        <TableCell className={classes.Tablehead2} >
                          BOOK
                        </TableCell>
                        <TableCell className={classes.Tablehead} >
                          NOTES PURCHASED
                        </TableCell>
                        <TableCell className={classes.Tablehead} >
                          REVIEWS
                        </TableCell>
                        <TableCell className={classes.Tablehead} >
                          EARNINGS
                        </TableCell>
                        <TableCell className={classes.Tablehead} >
                          ACTIONS
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                      {this.state.notesList
                        .slice(this.state.page * 10, (this.state.page + 1) * 10)
                        .map((row: any) => (
                          <TableRow key={row.email}>
                            <TableCell className={classes.Thfirstcolumn} align="left">
                              <Typography variant="body2" color="textSecondary">
                                <span
                                  style={{
                                    color: "#3AAEEF",
                                    fontWeight: 700,
                                  }}
                                >
                                  {row.name}
                                </span>
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.Thfirstcolumn } >
                            <Typography
                                variant="body2"
                                color="textSecondary"
                              >
                                <span
                                  style={{
                                    color: "#3AAEEF",
                                    fontWeight: 700,
                                  }}
                                >
                                  {row.user_name}
                                </span>
                                <br /> {row.user_email}
                              </Typography>
                              
                            </TableCell>
                            <TableCell className={classes.Thfirstcolumn}>
                              <span
                                style={{
                                  color: "#3AAEEF",
                                  fontWeight: 700,
                                }}
                              >
                                {row.book_name}
                              </span>
                            </TableCell>
                            <Tr classes={classes}>{row.notes_purchased}</Tr>
                            <Tr classes={classes}>{row.note_reviews}</Tr>
                            <Tr classes={classes}>{row.earnings}</Tr>
                            <Tr classes={classes}>
                              <Button
                                aria-controls="selectActionButton"
                                aria-haspopup="true"
                                // onClick={(e) => this.handleClick(e, i)}
                              >
                                <img
                                  src={threeDot}
                                  height="25px"
                                  alt="three dot"
                                />
                              </Button>
                              {/* <Menu
                            id="selectActionButton"
                            keepMounted
                            open={i === this.state.selectedIndex}
                            onClose={this.handleClose}
                            anchorEl={this.state.anchorEl}
                          >
                            <MenuItem onClick={() => this.handleClose("edit")}>
                              <Box mr={1}>
                                <img src={EditIcon} width="18px" alt="icon" />
                              </Box>
                              Edit
                            </MenuItem>
                            <MenuItem onClick={() => this.handleClose("block")}>
                              <Box mr={1}>
                                <img src={BlockIcon} width="20px" alt="icon" />
                              </Box>
                              Block
                            </MenuItem>
                            <MenuItem
                              onClick={() => this.handleClose("delete")}
                            >
                              <Box mr={1}>
                                <img src={DeleteIcon} width="15px" alt="icon" />
                              </Box>
                              Delete
                            </MenuItem>
                          </Menu>
                         */}
                            </Tr>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>{" "}
                </TableContainer>
                <TablePagination
                  style={{
                    width: "100%",
                    overflow: "inherit",
                  }}
                  component="div"
                  count={this.state.notesList.length}
                  page={this.state.page}
                  rowsPerPage={10}
                  labelRowsPerPage=""
                  onPageChange={this.handleChangePage}
                  rowsPerPageOptions={[]}
                />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

// Customizable Area Start
const NotesAlertBox = withAlertBox(Notes);
const NotesLoader = withLoader(NotesAlertBox);
const NotesToast = withToast(NotesLoader);
const NotesTheme = withTheme(NotesToast);
// Customizable Area End
export default withStyles((theme) =>
  createStyles({
    root: {},
    blocked: {
      borderRadius: "1rem",
      backgroundColor: "#f5440017",
      fontSize: "12px",
    },
    active: {
      borderRadius: "1rem",
      backgroundColor: "#c0caff8c",
      fontSize: "12px",
      color: "#0127ff",
    },
    search: {
      height: "63px",
      width: "100%",
      padding: "0.3rem",
      position: "relative",
      marginleft: 0,
      borderRadius: "11px",
      backgroundColor: "#E5E5E5",
      display: "flex",
      alignItems: "center",
    },
    head: {
      color: "black",
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      top: "0px",
    },
    inputRoot: {
      color: "inherit",
      marginLeft: "15px",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      "&::placeholder": {
        fontWeight: "bold",
      },
    },
    bookContainer: {
      borderRadius: "16px",
      backgroundColor: "#fff",
      border: "2px solid #eeeeee",
      marginTop: "0",
    },
    bookContainerTable: {
      borderRadius: "16px",
      backgroundColor: "#fff",
      marginTop: "0",
      borderBottom: "2px solid #eeeeee",
      height: "500px",
      [theme.breakpoints.up("sm")]: {
        marginRight: "2rem",
      },
      [theme.breakpoints.down("sm")]: {
        height: "350px",
      },
    },
    table: {
      padding: "5px",
    },
    tableBody: {
      backgroundColor: "white !important",
      overflowY: "auto",
    },
    Tablehead: {
      fontSize: "0.775rem",
      color: "black",
      fontWeight: 600,
      backgroundColor: "#f3f2f7",
      border: 0,
      textAlign: "center",
      borderRadius: 0,
      "&:first-child": {
        borderTopLeftRadius: "10px",
        borderBottomLeftRadius: "10px",
        textAlign: "justify",
        width: "300px",
        maxWidth: "300px",
      },
      "&:last-child": {
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px",
      },
    },
    Tablehead2: {
      fontSize: "0.775rem",
      color: "black",
      fontWeight: 600,
      backgroundColor: "#f3f2f7",
      border: 0,
      borderRadius: 0,
      textAlign: "justify",
    },

    th: {
      fontSize: "0.775rem",
      textAlign: "center",
    },
    Thfirstcolumn: {
      fontSize: "0.780rem",
      color: "#3b9dd4 !important",
      fontWeight: "bold",
    },
  })
)(NotesTheme);
