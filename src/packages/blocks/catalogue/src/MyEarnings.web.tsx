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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
export const configJSON = require("./config");
import "../../../components/src/Styles/Styles.css";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { withRouter } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AppHeader from "../../../components/src/Header/index";
import HomeController, { Props } from "./HomeController.web";
import "../assets/css/notes.css";
import "../assets/css/my-earnings.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import moment from "moment";
import "../assets/css/common.css";
import withTheme from "../../../components/src/Theme/withTheme";
import {
  bookLogo,
  playButton,
  Published,
  selectArrow,
  downloads,
  Notes,
  earnings,
  subscription,
  paymentHistory,
  purchasedNotes,
  mastercard,
  download,
  dollar,
  star,
  eye,
  next,
  prev,
} from "./assets";
import SideBar from "./Sidebar.web";
import Loader from "../../../components/src/Loader.web";
import {
  Chart,
  registerables,
  ChartTypeRegistry,
  ChartConfiguration,
  ChartType,
  ChartData,
} from "chart.js";
Chart.register(...registerables);

const styles = {
  cardRoot: {
    maxWidth: "400px",
    margin: "20px",
  },
} as any;
class MyEarnings extends HomeController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  createChart() {
    const labels: any = ["W1", "W2", "W3", "W4"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Earnings",
          backgroundColor: "#4caeef",
          data: [20,30,30,40],
          borderWidth: 1,
        },
      ],
    };
    const lineConfig: ChartConfiguration<
      keyof ChartTypeRegistry,
      number[],
      string
    > = {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            display: false,
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
      },
    };
    this.lineChart = new Chart(
      document.getElementById("lineChart") as HTMLCanvasElement,
      lineConfig
    );
  }

  render() {
    const { classes } = this.props;
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return (
      <>
        <Loader loading={this.state.Loader} />
        <AppHeader />

        <div className="my-earnings catalog-home">
          <SideBar
            selectedIndex={4}
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
                My Earnings
              </Typography>
            </Breadcrumbs>
            <h3>My Earnings</h3>
            <div className="inner-block">
              <div className="left-part">
                <div
                  className={`graph-box ${this.props.mode &&
                    "dark1 dark-boxshadow"}`}
                >
                  <div className="top-part arrows">
                    <img
                      src={prev}
                      className="left"
                      onClick={() => {
                        this.setState({
                          getMonth: this.state.getMonth
                            .subtract(1, "months")
                            .endOf("month"),
                        });
                        this.postEarnings(this.state.getMonth);
                      }}
                    />

                    <div className="month">
                      <strong>This Month</strong>
                      <span>
                        {`1-${moment(this.state.getMonth).daysInMonth()}`}
                        {` ${
                          monthNames[this.state.getMonth.format("M") - 1]
                        } ${this.state.getMonth.format("YYYY")}`}
                      </span>
                    </div>
                    <img
                      src={next}
                      className="left"
                      onClick={() => {
                        this.setState({
                          getMonth: this.state.getMonth
                            .add(1, "months")
                            .endOf("month"),
                        });
                        this.postEarnings(this.state.getMonth);
                      }}
                    />
                  </div>
                  <div style={{ padding: "0 10px", width: "100%" }}>
                    <canvas id="lineChart" />
                  </div>
                </div>
                {this.state.analytics && (
                  <div
                    className={`counter-wrap ${this.props.mode && "dark1"}`}
                  >
                    <div className="counter-cell border-right border-bottom">
                      <div className="img-part">
                        <img src={eye} />
                        <span className="tag">Viewers</span>
                      </div>
                      <strong>{this.state.analytics.totalviews}</strong>
                      <div className="progress-bar">
                        <span className="progress color-purple" />
                      </div>
                    </div>

                    <div className="counter-cell border-bottom">
                      <div className="img-part">
                        <img src={download} />

                        <span className="tag">Purchases</span>
                      </div>
                      <strong>{this.state.analytics.totaldownloads}</strong>
                      <div className="progress-bar">
                        <span className="progress color-purple" />
                      </div>
                    </div>

                    <div className="counter-cell border-right">
                      <div className="img-part">
                        <img src={dollar} />

                        <span className="tag">Earnings</span>
                      </div>
                      <strong>{this.state.analytics.totalearnings}</strong>
                      <div className="progress-bar">
                        <span className="progress color-purple" />
                      </div>
                    </div>

                    <div className="counter-cell ">
                      <div className="img-part">
                        <img src={star} />

                        <span className="tag">Reviews</span>
                      </div>
                      <strong>{this.state.analytics.total_reviews}</strong>
                      <div className="progress-bar">
                        <span className="progress color-purple" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={`right-part ${this.props.mode && "dark1"}`}>
                <strong className="title">Withdrawal History</strong>

                <div
                  className={`block-details ${this.props.mode && "dark2"}`}
                >
                  <span>Subscription Ended</span>
                  <span className="tag-line">Recturting per Month</span>

                  <ul>
                    <li>
                      <div className="fisrt-section">
                        <img
                          src={mastercard}
                          alt="master-card"
                          className="master-card"
                        />
                        <div className="discription-part">
                          <p>customer Name </p>
                          <strong>
                            000 000 <span className="color-gray">426</span>
                          </strong>
                        </div>
                      </div>

                      <div className="price-part">
                        <p>20/7/21</p>
                        <strong>$25</strong>
                      </div>
                    </li>
                    <li>
                      <div className="fisrt-section">
                        <img
                          src={mastercard}
                          alt="master-card"
                          className="master-card"
                        />
                        <div className="discription-part">
                          <p>customer Name </p>
                          <strong>
                            000 000 <span className="color-gray">426</span>
                          </strong>
                        </div>
                      </div>

                      <div className="price-part">
                        <p>20/7/21</p>
                        <strong>$25</strong>
                      </div>
                    </li>
                    <li>
                      <div className="fisrt-section">
                        <img
                          src={mastercard}
                          alt="master-card"
                          className="master-card"
                        />
                        <div className="discription-part">
                          <p>customer Name </p>
                          <strong>
                            000 000 <span className="color-gray">426</span>
                          </strong>
                        </div>
                      </div>

                      <div className="price-part">
                        <p>20/7/21</p>
                        <strong>$25</strong>
                      </div>
                    </li>
                    <li>
                      <div className="fisrt-section">
                        <img
                          src={mastercard}
                          alt="master-card"
                          className="master-card"
                        />
                        <div className="discription-part">
                          <p>customer Name </p>
                          <strong>
                            000 000 <span className="color-gray">426</span>
                          </strong>
                        </div>
                      </div>

                      <div className="price-part">
                        <p>20/7/21</p>
                        <strong>$25</strong>
                      </div>
                    </li>
                  </ul>

                  <div
                    className={`balance-pending ${this.props.mode &&
                      "dark3 dark-boxshadow"}`}
                  >
                    <div className="left-part">
                      <span>
                        Blance <br /> Pending
                      </span>
                      <span className="price">
                        <small>$</small> <strong>250</strong>
                      </span>
                    </div>
                    <button className="btn-primary">WITHDRAW</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const MyEarningsRouter = withRouter(MyEarnings);
const MyEarningsTheme = withTheme(MyEarningsRouter);
export default withStyles(styles)(MyEarningsTheme);

// Customizable Area Start
// Customizable Area End
