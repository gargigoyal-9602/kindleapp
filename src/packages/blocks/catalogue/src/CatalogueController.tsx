import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  classes: any
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  arrayHolder: any;
  token: string;
  selectedIndex:any;
  activeStatus:any
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CatalogueController extends BlockComponent<Props, S, SS> {
  getProductApiCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage)
    ];

    this.state = {
      arrayHolder: [],
      token: "",
      selectedIndex:0,
      activeStatus:''
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
  }
  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };
  getListRequest = (token: any) => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getProductApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.productAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    // if (getName(MessageEnum.SessionResponseMessage) === message.id) {
    //   let token = message.getData(getName(MessageEnum.SessionResponseToken));
    //   this.setState({ token: token });
    //   this.getListRequest(token);
    // }
    // if (
    //   getName(MessageEnum.RestAPIResponceMessage) === message.id &&
    //   this.getProductApiCallId != null &&
    //   this.getProductApiCallId ===
    //   message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    // ) {
    //   var responseJson = message.getData(
    //     getName(MessageEnum.RestAPIResponceSuccessMessage)
    //   );
    //   if (responseJson && !responseJson.errors && responseJson.data) {
    //     this.setState({ arrayHolder: responseJson.data });
    //     runEngine.debugLog("arrayHolder", this.state.arrayHolder);
    //   } else {
    //     var errorReponse = message.getData(
    //       getName(MessageEnum.RestAPIResponceErrorMessage)
    //     );
    //     this.parseApiCatchErrorResponse(errorReponse);
    //   }
    // }
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
}
