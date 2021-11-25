import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from "../../../framework/src/StorageProvider.web";

// Customizable Area Start
import { RouteProps, RouteComponentProps } from "react-router-dom";
import { withAlertBoxProps } from "../../../components/src/withAlertBox.Web";
import { withToastProps } from "../../../components/src/withSnackBar.Web";
import { withLoaderProps } from "../../../components/src/withLoader.Web";
// Customizable Area End

export const configJSON = require("./config");

export type Props = {
  authToken: any;
} & RouteProps &
  RouteComponentProps &
  withAlertBoxProps &
  withToastProps &
  withLoaderProps & {
    id: string;
    // Customizable Area Start
    // Customizable Area End
  };

export interface S {
  // Customizable Area Start
  authToken: string;
  monthlySales: any;
  totalSales: any;
  customDateSales: any;
  anchorEl: any;
  selectedIndex: any;
  todayDate: any;
  prevDate: any;
  activeButton: string;
  date: any;
  publishers: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class MySummeryController extends BlockComponent<Props, S, SS> {
  getMonthlySalesCallId: any;
  getTotalSalesCallId: any;
  getCustomDateSalesCallId: any;
  lineChart: any;
  getPublisherCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      authToken: "",
      monthlySales: null,
      totalSales: null,
      customDateSales: null,
      anchorEl: null,
      selectedIndex: "This Month",
      todayDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ),
      prevDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      date: [
        {
          startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
          endDate: new Date(),
          key: "selection",
        },
      ],
      activeButton: "This Month",
      publishers: {
        totalbooks: "0",
        totaldownloads: "0",
        totalearnings: "0$",
        totalviews: "0",
      },
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (apiRequestCallId === this.getMonthlySalesCallId) {
        this.props.hideLoader();
        if (responseJson && responseJson.data) {
          this.setState({
            monthlySales: responseJson.data,
          });
        } else {
          this.sessionLogout();
          // this.parseApiErrorResponse(responseJson);
        }
      } else if (apiRequestCallId === this.getTotalSalesCallId) {
        this.props.hideLoader();

        if (responseJson && responseJson.data) {
          this.setState({
            totalSales: responseJson.data,
          });
        } else {
          this.sessionLogout();
          // this.parseApiErrorResponse(responseJson);
        }
      } else if (apiRequestCallId === this.getCustomDateSalesCallId) {
        this.props.hideLoader();
        if (responseJson && responseJson.data) {
          this.setState({
            customDateSales: responseJson.data,
          });
        } else {
          this.sessionLogout();
          // this.parseApiErrorResponse(responseJson);
        }
      } else if (apiRequestCallId === this.getPublisherCallId) {
        this.props.hideLoader();
        if (responseJson && responseJson.data) {
          this.setState({
            publishers: responseJson.data,
          });
        } else {
          this.sessionLogout();
          // this.parseApiErrorResponse(responseJson);
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  sessionLogout = () => {
    this.props
      .showAlert({
        title: "Session Expired",
        message: "Please Login again!",
      })
      .then((data: any) => {
        console.log(data);
        return StorageProvider.remove("publisherToken");
      })
      .then(() => StorageProvider.remove("accountInfo"))
      .then(() => {
        const { history } = this.props;

        history.push("/");
      });
  };
  monthlySales = (): any => {
    const header = {
      token: this.state.authToken,
      "Content-Type": "application/json",
    };

    const httpBody = {
      start_date: this.state.prevDate.toISOString().slice(0, 10),
      end_date: this.state.todayDate.toISOString().slice(0, 10),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getMonthlySalesCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_publisher/monthly"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );
    this.props.showLoader();
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  totalSales = (): any => {
    const header = {
      token: this.state.authToken,
      "Content-Type": "application/json",
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getTotalSalesCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_publisher/total_sales"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    this.props.showLoader();
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  customDateSales = (): any => {
    const header = {
      token: this.state.authToken,
      "Content-Type": "application/json",
    };
    console.log();
    const httpBody = {
      start_date: new Date(this.state.date[0].startDate)
        .toISOString()
        .slice(0, 10),
      end_date: new Date(this.state.date[0].endDate).toISOString().slice(0, 10),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getCustomDateSalesCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_publisher/custom_date_data"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );
    this.props.showLoader();
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  getPublishers = () => {
    const header = {
      token: this.state.authToken,
      "Content-Type": "application/json",
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getPublisherCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_publisher/publishers"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    this.props.showLoader();
    runEngine.sendMessage(requestMessage.id, requestMessage);

    // Customizable Area End
  };
}
