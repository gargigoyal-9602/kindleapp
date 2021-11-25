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
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// Customizable Area End

import AllBooksController, { Props, configJSON } from "./AllBooks.controller";
import SideBarWeb from "./SideBar.web";
import SearchIcon from "@material-ui/icons/Search";
import withAlertBox from "../../../components/src/withAlertBox.Web";
import withToast from "../../../components/src/withSnackBar.Web";
import withLoader from "../../../components/src/withLoader.Web";
import SimpleMenu from "./menu.web";
import { searchImage, DeleteIcon } from "./assets";
import withTheme from "../../../components/src/Theme/withTheme";

class AllBooks extends AllBooksController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount = async () => {
    if (this.props.authToken) {
      this.setState({ authToken: this.props.authToken }, () => {
        this.getBooksList();
        function useQuery() {
          return new URLSearchParams(window.location.search);
        }
        let query = useQuery();
        const searchQuery = query.get("search");
        this.setState({
          searchInput: searchQuery,
          searchQuery: searchQuery,
        });
        searchQuery && this.getsubscriPackagelist(searchQuery);
      });
    }
  };
  componentDidUpdate(prevProps: any) {
    if (prevProps.authToken !== this.props.authToken) {
      this.setState({ authToken: this.props.authToken }, () => {
        this.getBooksList();
      });
    }
    function useQuery() {
      return new URLSearchParams(window.location.search);
    }
    let query = useQuery();
    const searchQuery = query.get("search");
    if (searchQuery != this.state.searchQuery) {
      this.setState({
        searchInput: searchQuery,
        searchQuery: searchQuery,
      });
      this.getsubscriPackagelist(searchQuery);
    }
  }
  handleRoutes = (route: any, state: any) => {
    this.props.history.push(route);
  };
  handleChangePage = (e: any, newPage: number) => {
    this.setState({ page: newPage });
  };
  handleCloseModal = (value: any, indexId: any) => {
    // if (value === "edit") {
    //   // this.setState({ selectedIndex: null, anchorEl: null });
    //   // this.handleRoutes("/AdminConsole/EditPublisher");
    // } else if (value === "block") {
    //   // this.blockPublisher();
    // } else if (value === "delete") {
    //   // this.deletePublisher();
    // } else {
    // this.setState({ selectedIndex: !this.state.selectedIndex });
    // }
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
                All Books
              </Typography>
            </Breadcrumbs>
            <Box mt={3}>
              <Typography
                variant="h5"
                className={`${classes.head} ${this.props.mode &&
                  classes.darkFont}`}
              >
                All Books
              </Typography>
              <Box display="flex" mb="19px" mt="20px">
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
                    placeholder="Search Books"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    fullWidth
                    className={`${this.props.mode && classes.dark3Input}`}
                    inputProps={{ "aria-label": "search" }}
                    value={this.state.searchInput && this.state.searchInput}
                    onChange={(e: any) => {
                      this.setState({
                        searchInput: e.target.value,
                      });
                    }}
                    onKeyUp={(e: any) => {
                      if (e.key === "Enter") {
                        this.getsubscriPackagelist(this.state.searchInput);
                      }
                    }}
                  />
                </div>
              </Box>
              <Paper
                className={`${classes.bookContainer} ${this.props.mode &&
                  `${classes.dark1} ${classes.darkBorder}`}`}
              >
                <TableContainer
                  className={`${classes.bookContainerTable} ${this.props.mode &&
                    `${classes.dark1} ${classes.darkBorder}`}`}
                >
                  <Table
                    stickyHeader
                    className={classes.table}
                    aria-label="simple table"
                  >
                    <TableHead
                      style={{
                        borderRadius: "0.2rem",
                        backgroundColor: this.props.mode ? "#656565" : "#ccc",
                      }}
                    >
                      <TableRow>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props.mode &&
                            classes.dark2}`}
                        >
                          BOOK
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead2} ${this.props.mode &&
                            classes.dark2}`}
                        >
                          PUBLISHER
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props.mode &&
                            classes.dark2}`}
                        >
                          DOWNLOADS
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props.mode &&
                            classes.dark2}`}
                        >
                          VIEWERS
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props.mode &&
                            classes.dark2}`}
                        >
                          NOTES ADDED
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props.mode &&
                            classes.dark2}`}
                        >
                          NOTED DOWNLOADED
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props.mode &&
                            classes.dark2}`}
                        >
                          NOTES REVIEWS
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props.mode &&
                            classes.dark2}`}
                        >
                          EARNINGS
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props.mode &&
                            classes.dark2}`}
                        >
                          ACTIONS
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      className={`${classes.tableBody} ${this.props.mode &&
                        `${classes.dark1}`}`}
                    >
                      {this.state.booksList
                        .slice(this.state.page * 10, (this.state.page + 1) * 10)
                        .map((row: any, i: any) => (
                          <TableRow key={i}>
                            <TableCell className={classes.Thfirstcolumn}>
                              {row.name}
                            </TableCell>
                            <TableCell className={classes.Thfirstcolumn}>
                              <Typography variant="body2" color="textSecondary">
                                <span
                                  style={{
                                    color: "#3AAEEF",
                                    fontWeight: 700,
                                  }}
                                >
                                  {row.publisher_name}
                                </span>
                                <br /> {row.publisher_email}
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.downloads}
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.viewers}
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.noted_added}
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.notes_purchased}
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.note_reviews}
                            </TableCell>
                            <TableCell className={classes.th}>
                              {row.earnings}
                            </TableCell>
                            <TableCell className={classes.th}>
                              <SimpleMenu
                                mode={this.props.mode}
                                handleCloseModal={this.handleCloseModal}
                                indexId={i}
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
                  count={this.state.booksList.length}
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
const AllBooksAlertBox = withAlertBox(AllBooks);
const AllBooksLoader = withLoader(AllBooksAlertBox);
const AllBooksToast = withToast(AllBooksLoader);
const AllBooksTheme = withTheme(AllBooksToast);
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
        width: "150px",
        maxWidth: "200px",
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
)(AllBooksTheme);
