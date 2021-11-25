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
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// Customizable Area End

import AdminsListController, {
  Props,
  configJSON,
} from "./AdminsList.controller";
import SideBarWeb from "./SideBar.web";

import withAlertBox from "../../../components/src/withAlertBox.Web";
import withToast from "../../../components/src/withSnackBar.Web";
import withLoader from "../../../components/src/withLoader.Web";
import withDialog from "../../../components/src/withDialog.web";

import {
  searchImage,
  threeDot,
  EditIcon,
  BlockIcon,
  DeleteIcon,
} from "./assets";
import withTheme from "../../../components/src/Theme/withTheme";

const Tr = (props: any) =>
  props.th ? (
    <TableCell {...props}>
      <Typography variant="body2" color="textPrimary">
        {props.children}
      </Typography>
    </TableCell>
  ) : (
    <TableCell {...props}>
      <Typography variant="body2" color="textSecondary">
        {props.children}
      </Typography>
    </TableCell>
  );

class AdminsList extends AdminsListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount = (): any => {
    if (this.props.authToken) {
      this.getAdminsList();
    }
  };
  componentDidUpdate(prevProps: any) {
    if (prevProps.authToken !== this.props.authToken) {
      this.getAdminsList();
    }
  }
  handleRoutes = (route: any) => {
    this.props.history.push({
      pathname: route,
      state: {
        page: "admin",
        admin: this.state.adminsList[this.state.selectedIndex],
      },
    });
  };
  handleClick = (event: any, value: any) => {
    this.setState({ selectedIndex: value, anchorEl: event.currentTarget });
  };

  handleClose = (value: any) => {
    if (value === "edit") {
      this.handleRoutes("/AdminConsole/AddAdmin");
    } else if (value === "changeStatus") {
      this.handleRoutes("/AdminConsole/ChangeStatus");
    } else if (value === "delete") {
      this.deletePublisher();
    } else {
      this.setState({ selectedIndex: null, anchorEl: null });
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
                Admins
              </Typography>
            </Breadcrumbs>
            <Box mt={3}>
              <Box mb={1}>
                <Typography variant="h3">All Admins</Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid item xs={12} sm={8}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <img src={searchImage} width="25px" alt="search" />
                    </div>
                    <InputBase
                      placeholder="Search Admins"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      fullWidth
                      inputProps={{ "aria-label": "search" }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => this.handleRoutes("/AdminConsole/AddAdmin")}
                  >
                    ADD ADMIN
                  </Button>
                </Grid>
              </Grid>
              <Box display="flex" mb={3} />
              <Paper>
                <TableContainer>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead
                      style={{
                        borderRadius: "0.2rem",
                        backgroundColor: this.props.mode ? "#656565" : "#ccc",
                      }}
                    >
                      <TableRow>
                        <Tr th>ADMIN</Tr>
                        <Tr th align="right">
                          BOOKS ADDED
                        </Tr>
                        <Tr th align="right">
                          PUBLISHER ADDED
                        </Tr>
                        <Tr th align="right">
                          PACKAGE CREATED
                        </Tr>
                        <Tr th align="right">
                          LAST ACTIVE
                        </Tr>
                        <Tr th align="right">
                          STATUS
                        </Tr>
                        <Tr th align="right">
                          ACTIONS
                        </Tr>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.adminsList
                        .slice(this.state.page * 10, (this.state.page + 1) * 10)
                        .map((row: any, i: any) => (
                          <TableRow className={classes.tr} key={row.email}>
                            <Tr>
                              <Typography variant="body2" color="primary">
                                {row.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {row.email}
                              </Typography>
                            </Tr>
                            <Tr align="right">{row.books_added}</Tr>
                            <Tr align="right">{row.publisher_added}</Tr>
                            <Tr align="right">{row.package_created}</Tr>
                            <Tr align="right">{row.last_active}</Tr>
                            <Tr align="right">
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
                                  className={classes.blocked}
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
                            <Tr align="right">
                              <Button
                                aria-controls="selectActionButton"
                                aria-haspopup="true"
                                onClick={(e) => this.handleClick(e, i)}
                              >
                                <img
                                  src={threeDot}
                                  height="25px"
                                  alt="three dot"
                                />
                              </Button>
                              <Menu
                                id="selectActionButton"
                                keepMounted
                                open={i === this.state.selectedIndex}
                                onClose={this.handleClose}
                                anchorEl={this.state.anchorEl}
                              >
                                <MenuItem
                                  onClick={() => this.handleClose("edit")}
                                >
                                  <Box mr={1}>
                                    <img
                                      src={EditIcon}
                                      width="18px"
                                      alt="icon"
                                    />
                                  </Box>
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    this.handleClose("changeStatus")
                                  }
                                >
                                  <Box mr={1}>
                                    <img
                                      src={BlockIcon}
                                      width="20px"
                                      alt="icon"
                                    />
                                  </Box>
                                  Change Status
                                </MenuItem>
                                <MenuItem
                                  onClick={() => this.handleClose("delete")}
                                >
                                  <Box mr={1}>
                                    <img
                                      src={DeleteIcon}
                                      width="15px"
                                      alt="icon"
                                    />
                                  </Box>
                                  Delete
                                </MenuItem>
                              </Menu>
                            </Tr>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    style={{
                      width: "100%",
                      overflow: "inherit",
                    }}
                    component="div"
                    count={this.state.adminsList.length}
                    page={this.state.page}
                    rowsPerPage={10}
                    labelRowsPerPage=""
                    onPageChange={this.handleChangePage}
                    rowsPerPageOptions={[]}
                  />
                </TableContainer>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

// Customizable Area Start

const AdminsListAlertBox = withAlertBox(AdminsList);
const AdminsListLoader = withLoader(AdminsListAlertBox);
const AdminsListToast = withToast(AdminsListLoader);
const AdminsListWithDialog = withDialog(AdminsListToast);
const AdminsListWithTheme = withTheme(AdminsListWithDialog);

// Customizable Area End
export default withStyles((theme) =>
  createStyles({
    tr: {
      // "&:nth-of-type(odd)": {
      //   backgroundColor: theme.palette.action.hover,
      // },
    },
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
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: "#ccccccaa",
      marginLeft: 0,
      padding: "0.3rem",
      width: "100%",
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
      "& img":{
        zIndex:2
      }
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      backgroundColor:"#E5E5E5"
    },
    input: {
      border: "none",
    },
  })
)(AdminsListWithTheme);
