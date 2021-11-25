import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { IBlock } from "../../../framework/src/IBlock";

import { ToastContainer, toast } from "react-toastify";
import { RouteComponentProps, withRouter } from "react-router";

import StorageProvider from "../../../framework/src/StorageProvider.web";

import googleController, { GoogleWebDelegate } from "./GoogleWebController";
import FacebookController, { FacebookDelegate } from "./FacebookController";

export const configJSON = require("./config");

export type Props = RouteComponentProps & { isMobileScreen: any };

interface S {
  loading: boolean;
  isRegistration: boolean;
}

interface SS {}

export default class SocialMediaAccountWebController
  extends BlockComponent<Props, S, SS>
  implements GoogleWebDelegate, FacebookDelegate {
  createAccountAPICallId: any;
  googleUser: any;

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [];
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
    ]);

    this.state = {
      loading: false,
      isRegistration: false,
    };
  }

  //When facebook sends back the reponse this gets called
  googleUserStatusChanged(userInfo: any): void {
    if (this.state.isRegistration) {
      this.createAccountFromSocial(
        userInfo.email,
        userInfo.id,
        userInfo.fullName,
        this.props
      );
    } else {
      this.logInWithSocial(
        userInfo.email,
        userInfo.email,
        userInfo.id,
        userInfo.fullName,
        this.props
      );
    }
  }

  startLoading = () => {
    this.setState({ loading: true });
  };

  stopLoading = () => {
    this.setState({ loading: false });
  };

  facebookUserStatusChanged = (response: any) => {
    this.stopLoading();
    console.log(response);
    if (this.state.isRegistration) {
      this.createAccountFromSocial(
        response.email,
        response.id,
        response.fullName,
        this.props
      );
    } else {
      this.logInWithSocial(
        response.email,
        response.email,
        response.id,
        response.fullName,
        this.props
      );
    }
    runEngine.debugLog(response);
  };

 appleUserStatusChanged = (response: any) => {
   console.log("running")
    this.stopLoading();
    console.log(response);
    if (this.state.isRegistration) {
      this.createAccountFromSocial(
        response.email,
        response.id,
        response.fullName,
        this.props
      );
    } else {
      this.logInWithSocial(
        response.email,
        response.email,
        response.id,
        response.fullName,
        this.props
      );
    }
    runEngine.debugLog(response);
  };


  googleLogIn = (isRegistration: boolean) => {
    const self = this;
    const { googleLogIn } = googleController;
    googleLogIn(this).then(
      function() {
        self.stopLoading();
        runEngine.debugLog("User SIGNED IN.");
      },
      function(error: any) {
        self.stopLoading();
        if (error.error === "popup_closed_by_user") {
          //handle window closed event
        }
      }
    );
  };

  async receive(from: string, message: Message) {
    this.stopLoading();

    if (getName(MessageEnum.SessionSaveMessage) === message.id) {
      //this.openInfoPage();
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.createAccountAPICallId != null &&
      this.createAccountAPICallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson && responseJson.meta && responseJson.meta.token) {
        this.saveLoggedInUserData(responseJson);
        console.log("sucessfull");
      } else if (responseJson && responseJson.errors) {
        // this.parseApiErrorResponse(responseJson);
        console.log("un sucessfull");

        toast.error(responseJson.errors[0].failed_login);
      } else {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        toast.error("Email has already been taken");
        // this.parseApiCatchErrorResponse(errorReponse);
      }
    } else {
      runEngine.debugLog("GOIT");
    }
  }

  async createAccountFromSocial(
    incomingEmail: String,
    incomingId: String,
    incomingName: string,
    props: Props
  ) {
    if (
      !incomingEmail ||
      incomingEmail.length === 0 ||
      !incomingId ||
      incomingId.length === 0
    ) {
      runEngine.debugLog("createAccountFromSocial empty info");
      return;
    }

    this.startLoading();

    const header = {
      "Content-Type": configJSON.urlHeaderTypeJSON,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createAccountAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createAccountURL
    );

    const httpBody = {
      data: {
        type: "social_account",
        attributes: {
          email: incomingEmail,
          unique_auth_id: incomingId,
          full_name: incomingName,
          user_type: "student",
          activated: true,
        },
      },
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(getName(MessageEnum.NavigationPropsMessage), props);

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postHttpRequest
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async logInWithSocial(
    incomingEmail: string,
    incomingPassword: string,
    incomingId: string,
    incomingFullName: string,
    props: Props
  ) {
    if (
      !incomingEmail ||
      incomingEmail.length === 0 ||
      !incomingId ||
      incomingId.length === 0
    ) {
      runEngine.debugLog("createAccountFromSocial empty info");
      return;
    }

    this.startLoading();

    const header = {
      "Content-Type": "application/json",
    };

    const attrs = {
      email: incomingEmail,
      unique_auth_id: incomingId,
    };

    const data = {
      type: "social_account",
      attributes: {
        email: incomingEmail,
        // password: incomingEmail,
        unique_auth_id: incomingId,
      },
    };

    const httpBody = {
      data: data,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createAccountAPICallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAccountURL
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(getName(MessageEnum.NavigationPropsMessage), props);

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  navigate() {
    runEngine.debugLog("this.isRegistration");
    runEngine.debugLog(this.state.isRegistration);
    if (this.state.isRegistration) {
      runEngine.debugLog("Registration");
      runEngine.debugLog(this.state.isRegistration);
      this.navigateToSignup();
    } else {
      runEngine.debugLog("Registration");
      runEngine.debugLog(this.state.isRegistration);
      this.navigateToLogin();
    }
  }

  navigateToSignup() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigateEmailSignUpMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  navigateToLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  async saveLoggedInUserData(responseJson: any) {
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      let profileData;
      if (this.state.isRegistration) {
        profileData = responseJson.data;
      } else {
        profileData = responseJson.user.data;
      }
      const token = responseJson.meta.token;
      if (await StorageProvider.get("authToken")) {
        await StorageProvider.remove("authToken");
      }
      if (await StorageProvider.get("adminToken")) {
        await StorageProvider.remove("adminToken");
      }
      if (await StorageProvider.get("publisherToken")) {
        await StorageProvider.remove("publisherToken");
      }
      if (await StorageProvider.get("accountInfo")) {
        await StorageProvider.remove("accountInfo");
      }
      if (profileData.attributes.user_type == null || "student") {
        toast.success("Logged In Successfully");
        await StorageProvider.set("authToken", token);
        await StorageProvider.set("accountInfo", JSON.stringify(profileData));
        this.props.history.push("/Catalogue/Home");
      } else if (profileData.attributes.user_type === "publisher") {
        toast.success("Logged In Successfully");

        await StorageProvider.set("publisherToken", token);
        await StorageProvider.set("accountInfo", JSON.stringify(profileData));
        this.props.history.push("/publisher");
      } else if (profileData.attributes.user_type === "admin") {
        toast.success("Logged In Successfully");

        await StorageProvider.set("adminToken", token);
        await StorageProvider.set("accountInfo", JSON.stringify(profileData));
        this.props.history.push("/AdminConsole");
      } else {
        toast.warning("Some Error Happened.");
      }
    } else {
      toast.warning("Some Error Happened.");
    }
  }

  openInfoPage() {
    const msg = new Message(
      getName(
        this.state.isRegistration
          ? MessageEnum.AccoutResgistrationSuccess
          : MessageEnum.AccoutLoginSuccess
      )
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  //Create response callback.
  responseInfoCallback(error: any, result: any) {
    if (error) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorDescription + error.toString()
      );
    } else {
      runEngine.debugLog("Result Name: " + result.name);
    }
  }

  btnFacebookLogInProps = {
    onPress: () => {
      this.startLoading();
      // FacebookController.handleFacebookLogin(this, this.state.isRegistration);
    },
    callback: this.facebookUserStatusChanged,
  };

  btnGoogleLogInProps = {
    onPress: () => {
      this.googleLogIn(this.state.isRegistration);
      this.startLoading();
    },
  };

  btnNavigateProps = {
    onPress: () => this.navigate(),
  };
}
