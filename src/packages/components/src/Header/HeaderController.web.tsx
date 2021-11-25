import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import StorageProvider from "../../../framework/src/StorageProvider.web";

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  classes: any;
  mode: any;
  setTheme: any;
  // Customizable Area Start
  // Customizable Area End
}

export interface S {
  authToken: any;
  Loader: any;
  searchInput: any;
}

interface SS {
  id: any;
}

export default class HeaderController extends BlockComponent<Props, S, SS> {
  getStudentsListCallId: any;
  postSearchBookApiCallId: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      authToken: "",
      Loader: false,
      searchInput: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  componentDidMount = async () => {
    const authToken = await StorageProvider.get("authToken");
    const searchInput = await StorageProvider.get("search");
    const location = window.location.pathname.split("/");
    if (authToken) {
      this.setState({ authToken }, () => {
        location[1] == "search-books" &&
          this.setState({
            searchInput: searchInput,
          });
      });
    } else {
      const { history }: any = this.props;
      history.push("/");
    }
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson && !responseJson.errors) {
        const apiRequestCallId = message.getData(
          getName(MessageEnum.RestAPIResponceDataMessage)
        );
        if (apiRequestCallId != null) {
          // get all books
          if (apiRequestCallId === this.postSearchBookApiCallId) {
            console.log("+++++++++search books+++++++++++");
            console.log("search books ", responseJson.data);
          }
        }
      }
    }
    // Customizable Area End
  }

  //SEARCH BOOKS

  postSearchBook = (): boolean => {
    // const product = this.state.productToBeAdded

    this.setState({
      Loader: true,
    });

    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const httpBody = {
      search_string: "t",
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postSearchBookApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postSearchBookAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePost
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // Customizable Area Start
}
// Customizable Area End
