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
  classes: any;
  mode: any;
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
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class AddPublisherController extends BlockComponent<
  Props,
  S,
  SS
> {
  createPublisherCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
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
      if (apiRequestCallId === this.createPublisherCallId) {
        this.props.hideLoader();
        if (responseJson && responseJson.data) {
          this.props.showToast({
            message: "successfully create publisher",
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
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  handlePublisherSave(values: any) {
    console.log(values);
    let httpBody = {
      data: {
        type: "email_account",
        attributes: {
          full_name: values.fullName,
          email: values.email,
          password: values.password,
          user_type: "publisher",
          activated: true,
          terms_conditions: false,
        },
      },
    };
    const header = {
      token: this.props.authToken,
      "Content-Type": "application/json",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createPublisherCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "account_block/accounts"
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
  }

  // Customizable Area End
}
