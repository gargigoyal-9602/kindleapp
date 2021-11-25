import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { RouteProps, RouteComponentProps } from "react-router-dom";
import { withAlertBoxProps } from "../../../components/src/withAlertBox.Web";
import { withToastProps } from "../../../components/src/withSnackBar.Web";
import { withLoaderProps } from "../../../components/src/withLoader.Web";
import { toast } from "react-toastify";
// Customizable Area End

export const configJSON = require("./config");

export type Props = {
  authToken: any;
} & RouteProps &
  RouteComponentProps &
  withAlertBoxProps &
  withToastProps &
  withLoaderProps;

interface S {
  // Customizable Area Start
  authToken: string;
  booksList: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class MyBooksController extends BlockComponent<Props, S, SS> {
  getBooksListCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      authToken: "",
      booksList: [],
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
      if (apiRequestCallId === this.getBooksListCallId) {
        this.props.hideLoader();
        if (responseJson && Array.isArray(responseJson.data)) {
          this.setState({
            booksList: responseJson.data,
          });
        } else if (responseJson && responseJson.message) {
          toast.warning(responseJson.message);
        } else {
          this.props.showAlert({
            title: "Session Expired!",
            message: "Please login again.",
          });
          this.parseApiErrorResponse(responseJson);
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  getMyBooks(): any {
    const header = {
      token: this.state.authToken,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getBooksListCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_book/publisher_my_books"
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
  // Customizable Area End
}
