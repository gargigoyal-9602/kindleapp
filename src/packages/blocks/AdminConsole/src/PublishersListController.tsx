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
import { toast } from "react-toastify";
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
  selectedIndex: any;
  anchorEl: any;
  page: number;
  searchInput: any;

  // Customizable Area End
}

interface SS {
  id: any;
}

export default class PublishersListController extends BlockComponent<
  Props,
  S,
  SS
> {
  getPublishersListCallId: any;
  PutchangeStatusCallId: any;
  deletePublisherCallId: any;
  getPublisherSearchCallId: any;

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
      selectedIndex: null,
      anchorEl: null,
      page: 0,
      searchInput: "",
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
      } else if (apiRequestCallId === this.PutchangeStatusCallId) {
        // this.props.hideLoader();
        if (responseJson) {
          this.setState({ selectedIndex: null, anchorEl: null }, () =>
            this.getPublishersList()
          );
          toast.success(responseJson.message);
        } else {
          this.parseApiErrorResponse(responseJson);
          this.setState({ selectedIndex: null, anchorEl: null });
        }
      } else if (apiRequestCallId === this.getPublisherSearchCallId) {
        this.props.hideLoader();
        if (responseJson.data) {
          this.setState({ publishersList: responseJson.data });
        } else {
          toast.error(responseJson.message);
          this.parseApiErrorResponse(responseJson);
          this.setState({ selectedIndex: null });
        }
      } else if (apiRequestCallId === this.deletePublisherCallId) {
        // this.props.hideLoader();
        if (responseJson) {
          this.setState({ selectedIndex: null, anchorEl: null }, () =>
            this.getPublishersList()
          );
          this.props.showToast({
            type: "success",
            message: "Publisher suspended succssfully",
          });
        } else {
          this.setState({ selectedIndex: null, anchorEl: null });
          this.parseApiErrorResponse(responseJson);
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
        return StorageProvider.remove("adminToken");
      })
      .then(() => StorageProvider.remove("accountInfo"))
      .then(() => {
        const { history } = this.props;

        history.push("/");
      });
  };

  getPublishersList(): any {
    this.props.showLoader();
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
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  PutchangeStatus(id: any, status: any): any {
    const header = {
      token: this.props.authToken,
      "Content-Type": configJSON.exampleApiContentType,
    };
    const httpBody = {
      data: {
        type: "publisher",
        attributes: {
          id: this.state.publishersList[id].id,
          status: status,
        },
      },
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.PutchangeStatusCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.putChangeStatusAPiEndPoint
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
      configJSON.validationApiMethodTypePut
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  deletePublisher(id: any): any {
    const header = {
      token: this.props.authToken,
      "Content-Type": configJSON.exampleApiContentType,
    };
    const httpBody = {
      id: this.state.publishersList[id].id,
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
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getPublisherSearchlist = (query: any): any => {
    const header = {
      token: this.props.authToken,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getPublisherSearchCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.searchPublisherEndPoint + `${query}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    this.props.showLoader();
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // Customizable Area End
}
