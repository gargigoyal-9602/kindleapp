import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { bellIcon, bookLogo, navigator, searchIcon } from './assets';
import { withTheme } from 'react-native-elements';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#3AAEEF"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    // padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  search: {
    marginRight: "10%",
    marginLeft: "10%",
    width: 800,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#349DD8",
    height: 40,
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    display: "flex"
  },
  appLogo: {
    width: 60,
    height: 40
  },
  navigatorInput: {
    color: "#ffffff",
    marginLeft: 13,
    marginTop: 14
  },
  navigateContainer: {
    width: 208,
    height: 50,
    backgroundColor: "#2F8DC1",
    borderRadius: 10,
    display: "flex",

  },
  navigateContainerSelect: {
    width: 150,
    //marginLeft: 13,
    //marginTop: 14,
    color: "#ffffff",
    marginLeft: 10,
    border: "none",
    textDecoration: "none",

  },
  browseLogo: {
    height: 30,
    width: 30,
    alignSelf: "center",
    marginLeft: 10
  },
  selectIcon: {
    color: "#ffffff"
  },
  searchIcon: {
    height: 25,
    width: 25,
    padding: 5
  },

}));

const AppHeader = () => {
  const classes = useStyles();
  return <div >
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <img src={bookLogo} className={classes.appLogo} />
        </Typography>
        <div className={classes.navigateContainer}>
          <img src={navigator} className={classes.browseLogo} />
          <InputLabel className={classes.navigatorInput} htmlFor="outlined-age-native-simple">Browse</InputLabel>
          <Select
            placeholder="Browse"
            disableUnderline
            className={classes.navigateContainerSelect}
            inputProps={{
              classes: {
                icon: classes.selectIcon,
              },
            }}
            native
            label="Age"
          >
            <option aria-label="None" value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <img src={searchIcon} className={classes.searchIcon} />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <img src={bellIcon} className={classes.browseLogo} />
      </Toolbar>
    </AppBar>
  </div >
}
export default AppHeader;
