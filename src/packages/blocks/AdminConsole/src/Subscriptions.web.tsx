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
  Menu,
  MenuItem,
} from "@material-ui/core";
import SimpleMenu from "./menu.web";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// Customizable Area End

import SubscriptionsController, {
  Props,
  configJSON,
} from "./Subscriptions.controller";
import SideBarWeb from "./SideBar.web";

import withTheme from "../../../components/src/Theme/withTheme";
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
import SearchIcon from "@material-ui/icons/Search";

const Tr = (props: any) => (
  <TableCell className={props.classes.th}>
    <Typography variant="body2" color="textSecondary">
      {props.children}
    </Typography>
  </TableCell>
);

class Subscriptions extends SubscriptionsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount = (): any => {
    if (this.props.authToken) {
      this.setState({ authToken: this.props.authToken }, () => {
        this.getSubscriptionsList();
      });
    }
  };
  componentDidUpdate(prevProps: any) {
    if (prevProps.authToken !== this.props.authToken) {
      this.setState({ authToken: this.props.authToken }, () => {
        this.getSubscriptionsList();
      });
    }
  }
  handleRoutes = (route: any, state: any) => {
    this.props.history.push({ pathname: route, state });
  };
  handleChangePage = (e: any, newPage: number) => {
    this.setState({ page: newPage });
  };

  handleClose = (value: any) => {
    if (value === "changeStatus") {
      // this.setState({ selectedIndex: null, anchorEl: null });
      this.handleRoutes("/AdminConsole/ChangeStatus", {
        page: "subscriptions",
        subscriptions: this.state.subscriptionsList[this.state.selectedIndex],
      });
    } else {
      this.setState({ selectedIndex: null, anchorEl: null });
    }
  };

  handleCloseModal = (value: any, indexId: any) => {
    if (value === "active" || value === "blocked") {
      this.PutchangeStatus(indexId, value);
    }
    if (value === "suspended") {
      this.PutchangeStatus(indexId, value);
    }
    this.setState({
      selectedIndex: !this.state.selectedIndex,
    });
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
                Subscriptions
              </Typography>
            </Breadcrumbs>
            <Box mt={3}>
              <Typography
                variant="h5"
                className={`${classes.head} ${this.props.mode &&
                  classes.darkFont}`}
              >
                Subscriptions List
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
                    placeholder="Search Students"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    fullWidth
                    inputProps={{ "aria-label": "search" }}
                    className={`${this.props.mode && classes.dark3Input}`}
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
                    className={classes.table}
                    aria-label="simple table"
                    stickyHeader
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
                          USER
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props.mode &&
                            classes.dark2}`}
                          align="right"
                        >
                          LAST BOUGHT
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props.mode &&
                            classes.dark2}`}
                          align="right"
                        >
                          STATUS
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props.mode &&
                            classes.dark2}`}
                          align="right"
                        >
                          PAYMENT TYPE
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props.mode &&
                            classes.dark2}`}
                          align="right"
                        >
                          RENEWAL ON
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props.mode &&
                            classes.dark2}`}
                          align="right"
                        >
                          TOTAL SPEND
                        </TableCell>
                        <TableCell
                          className={`${classes.Tablehead} ${this.props.mode &&
                            classes.dark2}`}
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
                      {this.state.subscriptionsList
                        .slice(this.state.page * 10, (this.state.page + 1) * 10)
                        .map((row: any, i: any) => (
                          <TableRow key={i}>
                            <TableCell className={classes.Thfirstcolumn}>
                              <Typography variant="body2" color="textSecondary">
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
                            <Tr classes={classes}>{row.last_bought}</Tr>
                            <Tr classes={classes}>
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
                            </Tr>

                            <Tr classes={classes}>{row.payment_type}</Tr>
                            <Tr classes={classes}>{row.renewal_on}</Tr>
                            <Tr classes={classes}>{row.amount_payable}</Tr>
                            <Tr classes={classes}>
                              <SimpleMenu
                                mode={this.props.mode}
                                handleCloseModal={this.handleCloseModal}
                                indexId={i}
                                status={row.status}
                              />
                            </Tr>
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
                  count={this.state.subscriptionsList.length}
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
const SubscriptionsAlertBox = withAlertBox(Subscriptions);
const SubscriptionsLoader = withLoader(SubscriptionsAlertBox);
const SubscriptionsToast = withToast(SubscriptionsLoader);
const SubscriptionsTheme = withTheme(SubscriptionsToast);
// Customizable Area End
export default withStyles((theme) =>
  createStyles({
    root: {},
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
)(SubscriptionsTheme);
