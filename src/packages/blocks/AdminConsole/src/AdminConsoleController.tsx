import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { RouteComponentProps } from "react-router";
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
// Customizable Area End

export const configJSON = require("./config");

export type Props = RouteComponentProps & {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
};

interface S {
  // Customizable Area Start
  authToken: string;
  accountInfo: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class AdminConsoleController extends BlockComponent<
  Props,
  S,
  SS
> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      authToken: "",
      accountInfo: null,
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
    }
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
}
