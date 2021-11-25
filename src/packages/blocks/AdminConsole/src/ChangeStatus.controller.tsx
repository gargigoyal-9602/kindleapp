import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { withAlertBoxProps } from "../../../components/src/withAlertBox.Web";
import { withToastProps } from "../../../components/src/withSnackBar.Web";
import { withLoaderProps } from "../../../components/src/withLoader.Web";
// Customizable Area End

export const configJSON = require("./config");

export type Props = {
  authToken: any;
  history: any;
  location: any;
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
  admin: any;
  page: string;
  package: any;
  subscriptions: any;
  adminStatusList: Array<string>;
  packageStatusList: Array<string>;
  subscriptionsStatusList: Array<string>;
  // adminStatusList: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ChangeStatusController extends BlockComponent<
  Props,
  S,
  SS
> {
  changeAdminStatusCallId: any;
  changePackageStatusCallId: any;
  changeSubscriptionsStatusCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      admin: {},
      page: "",
      package: {},
      subscriptions: {},
      adminStatusList: ["Active", "Blocked", "Suspended"],
      packageStatusList: ["Active", "On Hold", "Stopped"],
      subscriptionsStatusList: ["Active", "On Hold", "Stopped"],
      // adminStatusList: ['active','blocked','suspended']
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
      if (apiRequestCallId === this.changeAdminStatusCallId) {
        this.props.hideLoader();
        if (responseJson && responseJson.data) {
          this.props.showToast({
            message: "successfully Upadate Admin Status.",
            type: "success",
          });
          setTimeout(() => {
            this.props.history.goBack();
          }, 2000);
        } else {
          this.props.showToast({
            message: "Something went wrong!\nPlease try again",
            type: "error",
          });
          this.parseApiErrorResponse(responseJson);
        }
      } else if (apiRequestCallId === this.changePackageStatusCallId) {
        this.props.hideLoader();
        if (responseJson && responseJson.data) {
          this.props.showToast({
            message: "successfully Updated Package Status.",
            type: "success",
          });
          setTimeout(() => {
            this.props.history.goBack();
          }, 1500);
        } else {
          this.props.showToast({
            message: "Something went wrong!\nPlease try again",
            type: "error",
          });
          this.parseApiErrorResponse(responseJson);
        }
      } else if (apiRequestCallId === this.changeSubscriptionsStatusCallId) {
        this.props.hideLoader();
        if (responseJson && responseJson.data) {
          this.props.showToast({
            message: "successfully Updated Subscriptions Status.",
            type: "success",
          });
          setTimeout(() => {
            this.props.history.goBack();
          }, 1500);
        } else {
          this.props.showToast({
            message: "Something went wrong!\nPlease try again",
            type: "error",
          });
          this.parseApiErrorResponse(responseJson);
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  changeAdminStatus = (values: any) => {
    if (!this.state.admin.id) {
      this.props.history.goBack();
      this.props.showToast({
        message: "Something went wrong!\nPlease try again",
        type: "error",
      });
      return;
    }
    let httpBody = {
      id: this.state.admin.id,
      status:
        values.status === "Active"
          ? "active"
          : values.status === "Blocked"
          ? "blocked"
          : "suspended", //"active" or "blocked" or "suspended"
    };
    const header = {
      token: this.props.authToken,
      "Content-Type": "application/json",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.changeAdminStatusCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_admin/change_status"
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
  };

  changePackageStatus = (values: any) => {
    if (!this.state.package.id) {
      this.props.history.goBack();
      this.props.showToast({
        message: "Something went wrong!\nPlease try again",
        type: "error",
      });
      return;
    }
    let httpBody = {
      id: this.state.package.id,
      status:
        values.status === "Active"
          ? "active"
          : values.status === "On Hold"
          ? "on_hold"
          : "stopped", //"active" or "on_hold" or "stopped"
    };
    const header = {
      token: this.props.authToken,
      "Content-Type": "application/json",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.changePackageStatusCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_customisableusersubscriptions/change_status"
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
  };
  changeSubscriptionsStatus = (values: any) => {
    if (!this.state.subscriptions.id) {
      this.props.history.goBack();
      this.props.showToast({
        message: "Something went wrong!\nPlease try again",
        type: "error",
      });
      return;
    }
    let httpBody = {
      id: this.state.subscriptions.id,
      status:
        values.status === "Active"
          ? "active"
          : values.status === "On Hold"
          ? "on_hold"
          : "stopped", //"active" or "on_hold" or "stopped"
    };
    const header = {
      token: this.props.authToken,
      "Content-Type": "application/json",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.changeSubscriptionsStatusCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_customisableusersubscriptions/change_status_subscription"
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
  };

  handleAdminSave = (values: any) => {
    if (this.state.page === "package") {
      this.changePackageStatus(values);
    } else if (this.state.page === "admin") {
      this.changeAdminStatus(values);
    } else if (this.state.page === "subscriptions") {
      this.changeSubscriptionsStatus(values);
    }
  };

  // Customizable Area End
}
