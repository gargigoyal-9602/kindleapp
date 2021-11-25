import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { toast } from "react-toastify";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { RouteComponentProps } from "react-router";
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
  subscriptionsList: any;
  page: number;
  authToken: any;
  selectedIndex: any;
  anchorEl: any;
  searchInput: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class SubscriptionsController extends BlockComponent<
  Props,
  S,
  SS
> {
  getSubscriptionsListCallId: any;
  PutchangeStatusCallId: any;
  getSubscriptionSearchCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      subscriptionsList: [],
      page: 0,
      authToken: "",
      selectedIndex: null,
      anchorEl: null,
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
      if (apiRequestCallId === this.getSubscriptionsListCallId) {
        this.props.hideLoader();
        if (responseJson && responseJson.data) {
          this.setState({
            subscriptionsList: responseJson.data,
          });
        } else {
          this.parseApiErrorResponse(responseJson);
        }
      } else if (apiRequestCallId === this.PutchangeStatusCallId) {
        // this.props.hideLoader();
        if (responseJson) {
          this.setState({ selectedIndex: null }, () =>
            this.getSubscriptionsList()
          );
          toast.success(responseJson.message);
        } else {
          this.parseApiErrorResponse(responseJson);
          this.setState({
            selectedIndex: null,
          });
        }
      } else if (apiRequestCallId === this.getSubscriptionSearchCallId) {
        this.props.hideLoader();
        if (responseJson.data) {
          this.setState({
            subscriptionsList: responseJson.data,
          });
        } else {
          toast.error(responseJson.message);
          this.parseApiErrorResponse(responseJson);
          this.setState({
            selectedIndex: null,
          });
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  getSubscriptionsList(): any {
    const header = {
      token: this.state.authToken,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getSubscriptionsListCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_admin/subscription_list"
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

  PutchangeStatus(id: any, status: any): any {
    const header = {
      token: this.props.authToken,
      "Content-Type": configJSON.exampleApiContentType,
    };
    const httpBody = {
      data: {
        id: this.state.subscriptionsList[id].id,
        status: status,
      },
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.PutchangeStatusCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.putChangeStatussubcriberAPiEndPoint
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

  //search package
  getsubscriPackagelist = (query: any): any => {
    const header = {
      token: this.props.authToken,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getSubscriptionSearchCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.searchSubscripEndPoint + `${query}`
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
