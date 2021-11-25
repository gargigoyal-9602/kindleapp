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
import { toast } from "react-toastify";
// Customizable Area End

export const configJSON = require("./config");

export type Props = {
  authToken: any;
  history: any;
  location: any;
  mode: any;
  classes: any;
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
  page: any;
  package: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class EditPackageController extends BlockComponent<
  Props,
  S,
  SS
> {
  createPackageCallId: any;
  editPackageCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      package: {},
      page: null,
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
      if (apiRequestCallId === this.createPackageCallId) {
        this.props.hideLoader();
        if (responseJson && responseJson.data) {
          toast.success("successfully create Package.");
          setTimeout(() => {
            this.props.history.goBack();
          }, 2000);
        } else {
          toast.success("Something went wrong!\nPlease try again");
          this.parseApiErrorResponse(responseJson);
        }
      } else if (apiRequestCallId === this.editPackageCallId) {
        this.props.hideLoader();
        if (responseJson && responseJson.data) {
          this.props.showToast({
            message: "successfully Updated Package.",
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

  addPackage = (values: any) => {
    let httpBody = {
      package: {
        name: values.title,
        no_of_books: values.totalBooks ,
        per_month_price: values.monthlyPrice ,
        duration: values.packageDuration ,
        one_time_price: values.oneTimePrice,
      },
    };
    const header = {
      token: this.props.authToken,
      "Content-Type": "application/json",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createPackageCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_customisableusersubscriptions/subscription_packages"
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
      "POST"
    );
    this.props.showLoader();
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  editPackage = (values: any) => {
    let httpBody = {
      package: {
        no_of_books: values.totalBooks,
        per_month_price: values.monthlyPrice,
        duration: values.packageDuration,
        one_time_price: values.oneTimePrice,
      },
    };
    const header = {
      token: this.props.authToken,
      "Content-Type": "application/json",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.editPackageCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_customisableusersubscriptions/subscription_packages/${
        this.state.package.id
      }`
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

  handlePackageSave = (values: any) => {
    console.log(this.state.package.id);
    if (this.state.package.id) {
      this.editPackage(values);
    } else {
      this.addPackage(values);
    }
  };

  // Customizable Area End
}
