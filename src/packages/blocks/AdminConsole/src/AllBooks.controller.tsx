import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { RouteComponentProps } from "react-router";
import { withAlertBoxProps } from "../../../components/src/withAlertBox.Web";
import { withToastProps } from "../../../components/src/withSnackBar.Web";
import { withLoaderProps } from "../../../components/src/withLoader.Web";
// Customizable Area End

export const configJSON = require("./config");
import { toast } from "react-toastify";

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
  booksList: any;
  authToken: any;
  page: number;
  searchInput: any;
  searchQuery:any

  // Customizable Area End
}

interface SS {
  id: any;
}

export default class AllBooksController extends BlockComponent<Props, S, SS> {
  getBooksListCallId: any;
  getSubscriptionSearchCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      booksList: [],
      page: 0,
      authToken: "",
      searchInput: "",
      searchQuery:""
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
        if (responseJson && responseJson.data) {
          this.setState({
            booksList: responseJson.data,
          });
        } else {
          this.parseApiErrorResponse(responseJson);
        }
      } else if (apiRequestCallId === this.getSubscriptionSearchCallId) {
        this.props.hideLoader();
        if (responseJson.data) {
          this.setState({
            booksList: responseJson.data,
          });
        } else {
          function useQuery() {
            return new URLSearchParams(window.location.search);
          }
          let query = useQuery();
          const searchQuery = query.get("search");
         searchQuery && toast.error(responseJson.message);
          this.parseApiErrorResponse(responseJson);
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  getBooksList(): any {
    const header = {
      token: this.state.authToken,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getBooksListCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_admin/book_list"
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
      configJSON.searchAllbookEndPoint + `${query}`
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
