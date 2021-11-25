import React from "react";
// Customizable Area Start

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
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import withAlertBox from "../../../components/src/withAlertBox.Web";
import withToast from "../../../components/src/withSnackBar.Web";
import withLoader from "../../../components/src/withLoader.Web";
// Customizable Area End

import MyBooksController, { Props, configJSON } from "./MyBooksController";

import { dollerIcon } from "./assets";

class MyBooks extends MyBooksController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount = (): any => {
    if (this.props.authToken) {
      this.setState({ authToken: this.props.authToken }, () => {
        this.getMyBooks();
      });
    }
  };
  componentDidUpdate = (prevProps: Props): any => {
    if (prevProps.authToken !== this.props.authToken) {
      this.setState({ authToken: this.props.authToken }, () => {
        this.getMyBooks();
      });
    }
  };
  handleRoutes = (route: any) => {
    this.props.history.push(route);
  };
  // Customizable Area End

  render() {
    const { classes }: any = this.props;
    return (
      <Box m={3} className={classes.root}>
        <Grid item xs={10}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link style={{ color: "#3b9dd4" }} href="/Publisher">
              Home
            </Link>
            <Typography style={{ color: "#797b79 !important" }}>
              My Books
            </Typography>
          </Breadcrumbs>
          <Box mt={3}>
            <Typography variant="h5">My Books</Typography>
            <Typography variant="body1">
              {this.state.booksList.length} Books available
            </Typography>
            <Grid container spacing={4}>
              {this.state.booksList.map((book: any) => (
                <Grid item xs={12} sm={4} key={book.id}>
                  <Paper>
                    <Box display="flex" p={1}>
                      <Box
                        m={3}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <img
                          src={book.attributes.cover_image_url}
                          alt="book image"
                        />
                      </Box>
                      <Box>
                        <Typography variant="h6">
                          {book.attributes.name}
                        </Typography>
                        <Typography variant="body2">Thriller</Typography>
                        <Box mt={1}>
                          <Typography variant="subtitle1">
                            {book.attributes.author}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Box>
    );
  }
}

// Customizable Area Start

const MyBooksAlertBox = withAlertBox(MyBooks);
const MyBooksLoader = withLoader(MyBooksAlertBox);
const MyBooksToast = withToast(MyBooksLoader);
// Customizable Area End
export default withStyles((theme) =>
  createStyles({
    root: {},
  })
)(MyBooksToast);
