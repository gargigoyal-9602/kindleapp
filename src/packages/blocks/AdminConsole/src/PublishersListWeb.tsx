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
  Select,
  Menu,
  MenuItem,
  InputLabel,
  TextField,
  TablePagination,
  Hidden,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// Customizable Area End

import PublishersListController, {
  Props,
  configJSON,
} from "./PublishersListController";
import SideBarWeb from "./SideBar.web";

import withAlertBox from "../../../components/src/withAlertBox.Web";
import withToast from "../../../components/src/withSnackBar.Web";
import withLoader from "../../../components/src/withLoader.Web";
import withDialog from "../../../components/src/withDialog.web";
import { searchImage } from "./assets";
import withTheme from "../../../components/src/Theme/withTheme";
import SimpleMenu from "./menu.web";

const Tr = (props: any) => (
  <TableCell align="right">
    <Typography variant="body2" color="textSecondary">
      {props.children}
    </Typography>
  </TableCell>
);

class PublishersList extends PublishersListController {
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
  };
  componentDidUpdate(prevProps: any) {
    if (prevProps.authToken !== this.props.authToken) {
      this.getPublishersList();
    }
  }
  handleRoutes = (route: any) => {
    setTimeout(() => {
      this.props.history.push({
        pathname: route,
        state: {
          publisher: this.state.publishersList.slice(this.state.page * 10, (this.state.page + 1) * 10)[this.state.selectedIndex],
        },
      });
    }, 1000);
  };

  handleCloseModal = (value: any, indexId: any) => {
    this.setState({
      selectedIndex: indexId,
    });
    if (value === "edit") {
      this.handleRoutes("/AdminConsole/Edit/EditPublisher");
    } else if (value === "active" || value === "blocked") {
      this.PutchangeStatus(indexId, value);
    } else if (value === "suspended") {
      this.PutchangeStatus(indexId, value);
    } else {
      this.setState({ selectedIndex: null });
    }
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
                Publishers
              </Typography>
            </Breadcrumbs>
            <Box mt={3}>
              <Box mb={3}>
                <Typography
                  variant="h5"
                  className={`${classes.head} ${this.props.mode &&
                    classes.darkFont}`}
                >
                  All Publisher
                </Typography>
              </Box>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={8} lg={10}>
                  <div
                    className={`${classes.search} ${this.props.mode &&
                      classes.dark1}`}
                  >
                    <div className={classes.searchIcon}>
                      {this.props.mode ? (
                        <SearchIcon style={{ fontSize: "25px" }} />
                      ) : (
                        <img src={searchImage} width="25px" alt="search" />
                      )}
                    </div>
                    
                      <InputBase
                        name="search"
                        autoComplete="off"
                        placeholder="Search Publisher"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        fullWidth
                        className={`${this.props.mode &&
                          classes.dark3Input}`}
                        inputProps={{ "aria-label": "search" }}
                        value={
                          this.state.searchInput && this.state.searchInput
                        }
                        onChange={(e: any) => {
                          this.setState({
                            searchInput: e.target.value,
                          });
                        }}
                        onKeyUp={(e: any) => {
                          if (e.key === "Enter") {
                            this.getPublisherSearchlist(
                              this.state.searchInput
                            );
                          }
                        }}
                      />
                  </div>
                </Grid>
                <Grid item xs={12} sm={4} lg={2}>
                  <Button
                    className={classes.btn + " " + classes.primary}
                    fullWidth
                    onClick={() =>
                      this.handleRoutes("/AdminConsole/AddPublisher")
                    }
                  >
                    ADD PUBLISHERS
                  </Button>
                </Grid>
              </Grid>
              <Box display="flex" mb={3} />
              <Paper
                className={`${classes.bookContainer} ${this.props.mode &&
                  `${classes.dark1} ${classes.darkBorder}`}`}
              >
                <TableContainer
                  className={`${classes.bookContainerTable} ${this.props
                    .mode && `${classes.dark1} ${classes.darkBorder}`}`}
                >
                  <Table
                    className={classes.table}
                    aria-label="simple table"
                    stickyHeader
                  >
                    <TableHead
                      style={{
                        borderRadius: "0.2rem",
                        backgroundColor: this.props.mode
                          ? "#656565"
                          : "#ccc",
                      }}
                    >
                      <TableRow>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props
                            .mode && classes.dark2}`}
                        >
                          USER
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props
                            .mode && classes.dark2}`}
                          align="right"
                        >
                          BOOKS
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props
                            .mode && classes.dark2}`}
                          align="right"
                        >
                          DOWNLOADS
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props
                            .mode && classes.dark2}`}
                          align="right"
                        >
                          VIEWERS
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props
                            .mode && classes.dark2}`}
                          align="right"
                        >
                          REVIEWS
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props
                            .mode && classes.dark2}`}
                          align="right"
                        >
                          EARNINIG
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props
                            .mode && classes.dark2}`}
                          align="right"
                        >
                          STATUS
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props
                            .mode && classes.dark2}`}
                          align="right"
                        >
                          ACTIONS
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      className={`${classes.tableBody} ${this.props.mode &&
                        `${classes.dark1}`}`}
                    >
                      {this.state.publishersList
                        .slice(
                          this.state.page * 10,
                          (this.state.page + 1) * 10
                        )
                        .map((row: any, i: any) => (
                          <TableRow key={row.email}>
                            <TableCell className={classes.Thfirstcolumn}>
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
                                  {row.name}
                                </span>
                                <br />
                                {row.email}
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.totalbooks}
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.totaldownloads}
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.totalviews}
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.totalviews}
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.totalearnings}
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.status === "active" ? (
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                  className={classes.active}
                                >
                                  Active
                                </Button>
                              ) : row.status === "suspended" ? (
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  size="small"
                                  className={classes.suspended}
                                >
                                  Suspended
                                </Button>
                              ) : (
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  size="small"
                                  className={classes.blocked}
                                >
                                  Blocked
                                </Button>
                              )}
                            </TableCell>
                            <TableCell className={classes.th}>
                              <SimpleMenu
                                mode={this.props.mode}
                                handleCloseModal={this.handleCloseModal}
                                indexId={i}
                                status={row.status}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  style={{
                    width: "100%",
                    overflow: "inherit",
                  }}
                  component="div"
                  count={this.state.publishersList.length}
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

const PublishersListAlertBox = withAlertBox(PublishersList);
const PublishersListLoader = withLoader(PublishersListAlertBox);
const PublishersListToast = withToast(PublishersListLoader);
const PublishersListWithDialog = withDialog(PublishersListToast);
const PublisherListTheme = withTheme(PublishersListWithDialog);

// Customizable Area End
export default withStyles((theme) =>
  createStyles({
    root: {},
    btn: {
      backgroundColor: "#fff",
      borderRadius: "14px",
      padding: "15px 25px",
      color: "rgb(0,0,0, 0.8)",
      boxShadow: "0px 8px 10px 0px rgb(0 0 0 / 20%)",
      "@media (max-width: 767px)": {
        padding: "10px 15px",
      },
    },
    primary: {
      color: "#fff",
      backgroundColor: "#3aaeef",
      "& .MuiButton-label": {
        textTransform: "initial",
        // textTransform: "uppercase",
        fontWeight: 600,
        fontSize: "15px",
        whiteSpace: "nowrap",
        "@media (max-width: 767px)": {
          fontSize: "13px",
        },
      },
      "&:hover": {
        backgroundColor: "#3b9dd4",
        boxShadow: "0px 8px 10px 0px rgb(0 0 0 / 20%)",
      },
    },
    blocked: {
      borderRadius: "1rem",
      backgroundColor: "#FBDCDD",
      fontSize: "12px",
      color: "#ED4643",
      fontWeight: "bold",
      border: "none",
    },
    active: {
      borderRadius: "1rem",
      backgroundColor: "#DEEFFB",
      fontSize: "12px",
      color: "#51B5EE",
      fontWeight: "bold",
      border: "none",
    },
    suspended: {
      borderRadius: "1rem",
      backgroundColor: "#FBE7D7",
      fontSize: "12px",
      color: "#F1A76E",
      fontWeight: "bold",
      border: "none",
    },
    search: {
      height: "58px",
      width: "100%",
      padding: "0.3rem",
      position: "relative",
      marginleft: 0,
      borderRadius: "10px 10px 5px 5px !important",
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
      "& img": {
        zIndex: 2,
      },
      "& svg": {
        zIndex: 2,
      },
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
      backgroundColor: "#E5E5E5",
    },
    input: {
      border: "none",
    },
    dot: {
      backgroundColor: "#bbb",
      padding: "0.12rem",
      margin: "0.15rem",
      borderRadius: "0.2rem",
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
      "&::-webkit-scrollbar": {
        width: "4px",
      },
      "&::-webkit-scrollbar-track": {
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        backgroundColor: "#f1f1f1",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#d3c5c5",
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
      },
      "&:last-child": {
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px",
      },
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
    dark3Input: {
      "& input": {
        backgroundColor: "#424242 !important",
        color: "#fff !important",
      },
    },
  })
)(PublisherListTheme);
