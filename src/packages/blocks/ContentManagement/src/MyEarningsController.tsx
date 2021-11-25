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

interface S {
  // Customizable Area Start
  authToken: string;
  myEarnings: any;
  todayDate: any;
  prevDate: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class MyEarningsController extends BlockComponent<Props, S, SS> {
  getMyEarningsCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      authToken: "",
      myEarnings: null,
      todayDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ),
      prevDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
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
      if (apiRequestCallId === this.getMyEarningsCallId) {
        this.props.hideLoader();
        if (responseJson && responseJson.data) {
          this.setState({
            myEarnings: responseJson.data,
          });
        } else {
          this.sessionLogout();
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
        return StorageProvider.remove("publisherToken");
      })
      .then(() => StorageProvider.remove("accountInfo"))
      .then(() => {
        const { history } = this.props;

        history.push("/");
      });
  };
  getMyEarnings(): any {
    const header = {
      token: this.state.authToken,
      "Content-Type": "application/json",
    };

    const httpBody = {
      start_date: this.state.prevDate.toISOString().slice(0, 10),
      end_date: this.state.todayDate.toISOString().slice(0, 10),
    };
    console.log(httpBody);

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getMyEarningsCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_publisher/monthly_earning_week_wise"
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
  }
  // Customizable Area End
}
