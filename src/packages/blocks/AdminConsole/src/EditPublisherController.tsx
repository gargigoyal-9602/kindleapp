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
import { withAlertBoxProps } from "../../../components/src/withAlertBox.Web";
import { withToastProps } from "../../../components/src/withSnackBar.Web";
import { withLoaderProps } from "../../../components/src/withLoader.Web";
// Customizable Area End
import { toast } from "react-toastify";

export const configJSON = require("./config");

export type Props = RouteComponentProps & {
  authToken: any;
  history: any;
  classes:any;
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
  publisher: any;
  // Customizable Area End
}

interface SS {
  id: any;
  
}

export default class EditPublisherController extends BlockComponent<
  Props,
  S,
  SS
> {
  editPublisherCallId: any;
  forgotPassword: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      publisher: {},
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
      if (apiRequestCallId === this.editPublisherCallId) {
        this.props.hideLoader();
        if (!responseJson.errors) {
          toast.success(responseJson.message);
          setTimeout(() => {
            this.props.history.goBack();
          }, 1500);
        } else {
          toast.error("Something went wrong!\nPlease try again");
          this.parseApiErrorResponse(responseJson);
        }
      }
      if (apiRequestCallId === this.forgotPassword) {
       // console.log(responseJson,"forgot password")
        if(!responseJson.errors){
        toast.success("Please verify the link sent to your email address to reset password")
        }
        if(responseJson?.errors){
          toast.error(responseJson?.errors[0].otp)

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
      this.setState({
        enableField: !this.state.enableField,
      });
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

  ///to edit publisher/student
  handlePublisherSave(values: any) {
    const isPublisher =
      window.location.pathname.split("/")[3] == "EditPublisher";
    let httpBody = {
      data: {
        type: `${isPublisher ? "publisher" : "student"}`,
        attributes: {
          full_name: values.fullName,
          email: values.email,
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
    this.editPublisherCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.puteditpublisherAPiEndPoint
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
    this.props.showLoader();
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  // to reset password
  doForgotPassword(values: any): boolean {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
    };

    const httpBody = {
      data: {
        attributes: {
          email: values.email,
        },
      },
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.forgotPassword = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.forgotPasswordEndPoint
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
      configJSON.validationApiMethodTypePost
    );
    // this.props.showLoader();
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }
  // Customizable Area End
}
