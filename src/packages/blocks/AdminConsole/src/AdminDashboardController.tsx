import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from "../../../framework/src/StorageProvider.web";

// Customizable Area Start
import { RouteComponentProps, RouteProps } from "react-router";
import { withAlertBoxProps } from "../../../components/src/withAlertBox.Web";
import { withToastProps } from "../../../components/src/withSnackBar.Web";
import { withLoaderProps } from "../../../components/src/withLoader.Web";
// Customizable Area End

export const configJSON = require("./config");

export type Props = RouteComponentProps & {
  authToken: any;
  logout: any;
  mode: boolean;
  accountInfo: any;
  // Customizable Area Start
  // Customizable Area End
} & withAlertBoxProps &
  withToastProps &
  withLoaderProps & {
    id: string;
    // Customizable Area Start
    // Customizable Area End
  };

interface S {
  // Customizable Area Start
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  publishersList: any;
  studentList: any;
  booksList: any;
  statistics: any;
  selectedIndex: any;
  anchorEl: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class AdminDashboardController extends BlockComponent<
  Props,
  S,
  SS
> {
  getPublishersListCallId: any;
  getStudentsListCallId: any;
  getBooksListCallId: any;
  getStatisticsCallId: any;
  deletePublisherCallId: any;
  blockPublisherCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      publishersList: [],
      studentList: [],
      booksList: [],
      statistics: {
        downloads: "",
        notes_published: "",
        notes_purchased: "",
        percent_difference: "",
        publishers: "",
        students: "",
        subscriptions: "",
        total_earnings: "",
      },
      selectedIndex: null,
      anchorEl: null,
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
      if (apiRequestCallId === this.getPublishersListCallId) {
        this.props.hideLoader();
        if (responseJson && responseJson.data) {
          this.setState({
            publishersList: responseJson.data,
          });
        } else {
          this.sessionLogout();
        }
      } else if (apiRequestCallId === this.getStudentsListCallId) {
        this.props.hideLoader();
        if (responseJson && responseJson.data) {
          this.setState({
            studentList: responseJson.data,
          });
        } else {
          this.sessionLogout();
        }
      } else if (apiRequestCallId === this.getBooksListCallId) {
        this.props.hideLoader();
        if (responseJson && responseJson.data) {
          this.setState({
            booksList: responseJson.data,
          });
        } else {
          this.sessionLogout();
        }
      } else if (apiRequestCallId === this.getStatisticsCallId) {
        this.props.hideLoader();
        if (responseJson && responseJson.data) {
          this.setState({
            statistics: responseJson.data,
          });
        } else {
          this.sessionLogout();
        }
      } else if (apiRequestCallId === this.blockPublisherCallId) {
        this.props.hideLoader();
        if (responseJson) {
          this.setState({ selectedIndex: null, anchorEl: null }, () =>
            this.getPublishersList()
          );
          this.props.showToast({
            type: "success",
            message: "Publisher blocked succssfully",
          });
        } else {
          this.props.showToast({
            type: "error",
            message: "SomeThing went Wrong! Please try again.",
          });
          this.parseApiErrorResponse(responseJson);
          this.setState({ selectedIndex: null, anchorEl: null });
        }
      } else if (apiRequestCallId === this.deletePublisherCallId) {
        this.props.hideLoader();
        if (responseJson) {
          this.setState({ selectedIndex: null, anchorEl: null }, () =>
            this.getPublishersList()
          );
          this.props.showToast({
            type: "success",
            message: "Publisher suspended succssfully",
          });
        } else {
          this.props.showToast({
            type: "error",
            message: "SomeThing went Wrong! Please try again.",
          });
          this.setState({ selectedIndex: null, anchorEl: null });
          this.parseApiErrorResponse(responseJson);
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  getPublishersList(): any {
    const header = {
      token: this.props.authToken,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getPublishersListCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_admin/publishers_list"
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
  }
  sessionLogout = () => {
    this.props
      .showAlert({
        title: "Session Expired",
        message: "Please Login again!",
      })
      .then((data: any) => {
        console.log(data);
        return StorageProvider.remove("adminToken");
      })
      .then(() => StorageProvider.remove("accountInfo"))
      .then(() => {
        const { history } = this.props;

        history.push("/");
      });
  };
  getStudentsList(): any {
    const header = {
      token: this.props.authToken,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getStudentsListCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_admin/students_list"
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
  }
  getBooksList(): any {
    const header = {
      token: this.props.authToken,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getBooksListCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_admin/book_data"
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
  }
  getStatistics(): any {
    const header = {
      token: this.props.authToken,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getStatisticsCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_admin/statistics"
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
  }
  blockPublisher(): any {
    const header = {
      token: this.props.authToken,
      "Content-Type": configJSON.exampleApiContentType,
    };
    const httpBody = {
      id: this.state.publishersList[this.state.selectedIndex].id,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.blockPublisherCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_admin/block_publisher"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "PUT"
    );
    this.props.showLoader();
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  deletePublisher(): any {
    const header = {
      token: this.props.authToken,
      "Content-Type": configJSON.exampleApiContentType,
    };
    const httpBody = {
      id: this.state.publishersList[this.state.selectedIndex].id,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.deletePublisherCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_admin/delete_publisher/"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "PUT"
    );
    this.props.showLoader();
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  // Customizable Area End
}
