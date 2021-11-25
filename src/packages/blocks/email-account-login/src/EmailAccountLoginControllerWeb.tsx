import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import StorageProvider from "../../../framework/src/StorageProvider.web";
import { RouteComponentProps, withRouter } from "react-router";
import { RouterProps } from "react-router";
import { withAlertBoxProps } from "../../../components/src/withAlertBox.Web";
import { withToastProps } from "../../../components/src/withSnackBar.Web";
import { withLoaderProps } from "../../../components/src/withLoader.Web";
import { DialogProps } from "../../../components/src/DialogContext";

import { runEngine } from "../../../framework/src/RunEngine";
import * as Yup from "yup";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
// Customizable Area End
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const configJSON = require("./config");

export type Props =
  // RouterProps &
  RouteComponentProps &
    DialogProps & { navigation: any; classes: any } & withAlertBoxProps &
    withToastProps &
    withLoaderProps & {
      id: string;
      // Customizable Area Start
      // Customizable Area End
    };

interface S {
  // Customizable Area Start
  password: string;
  email: string;
  enablePasswordField: boolean;
  checkedRememberMe: boolean;
  placeHolderEmail: string;
  placeHolderPassword: string;
  imgPasswordVisible: any;
  imgPasswordInVisible: any;
  labelHeader: string;
  btnTxtLogin: string;
  labelRememberMe: string;
  btnTxtSocialLogin: string;
  labelOr: string;
  validationSchema: any;
  setOpen: any;
  open: boolean;
  loader: any;
  isLoginScreen: any;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountLoginController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  forgotPassword: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      getName(MessageEnum.AlertMessage),
    ];
    let validationSchema = {
      email: Yup.string().required(configJSON.emailIsRequired),
      password: Yup.string().required(configJSON.pleaseEnterAPassword),
    };
    this.state = {
      email: "",
      password: "",
      enablePasswordField: true,
      checkedRememberMe: false,
      placeHolderEmail: configJSON.placeHolderEmail,
      placeHolderPassword: configJSON.placeHolderPassword,
      imgPasswordVisible: configJSON.imgPasswordVisible,
      imgPasswordInVisible: imgPasswordInVisible,
      labelHeader: configJSON.labelHeader,
      btnTxtLogin: configJSON.btnTxtLogin,
      labelRememberMe: configJSON.labelRememberMe,
      btnTxtSocialLogin: configJSON.btnTxtSocialLogin,
      labelOr: configJSON.labelOr,
      validationSchema: validationSchema,
      setOpen: false,
      open: false,
      loader: false,
      isLoginScreen: false,
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  //   goToEmailAccountRegistration = () => {
  // // console.log("Hello")
  //     const msg: Message = new Message(
  //       getName(MessageEnum.NavigateEmailSignUpMessage)
  //     );
  //     msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
  //     msg.addData(getName(MessageEnum.NavigateEmailSignUpMessage), "email");
  //     // msg.addData("Data_key",{
  //     //   name:"Yashwanth",
  //     //   age:23

  //     // })

  //     this.send(msg);
  //   }

  async componentDidMount() {
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    // Customizable Area Start
    let authToken;
    authToken = await StorageProvider.get("authToken");
    // await StorageProvider.remove("authToken");
    if (authToken) {
      return this.props.history.push("/Catalogue/Home");
    }
    authToken = await StorageProvider.get("publisherToken");
    if (authToken) {
      return this.props.history.push("/publisher");
    }
    authToken = await StorageProvider.get("adminToken");
    if (authToken) {
      return this.props.history.push("/AdminConsole");
    }
    // Customizable Area End
  }
  goTo = () => {
    console.log("Hel");
  };
  handleCloseLoader = () => {
    this.setState({
      open: false,
    });
  };
  handleToggle = (e: any) => {
    this.setState({
      open: !this.state.open,
    });
  };

  goToEmailAccountRegistration = () => {
    this.props.history.push("/EmailAccountRegistration");

    // const msg: Message = new Message(
    //   getName(MessageEnum.NavigationForgotPasswordMessage)
    // );
    // msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    // msg.addData(getName(MessageEnum.NavigateEmailSignUpMessage), "email");
    // this.send(msg);
  };

  // Customizable Area Start
  btnSocialLoginProps = {
    onPress: () => this.goToSocialLogin(),
  };

  // btnEmailLogInProps = {
  //   color: "#6200EE",
  //   onPress: () => this.doEmailLogIn()
  // };

  btnPasswordShowHideProps = {
    onPress: () => {
      this.setState({ enablePasswordField: !this.state.enablePasswordField });
      this.txtInputPasswordProps.secureTextEntry = !this.state
        .enablePasswordField;
      this.btnPasswordShowHideImageProps.source = this.txtInputPasswordProps
        .secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  CustomCheckBoxProps = {
    onChangeValue: (value: boolean) => {
      this.setState({ checkedRememberMe: value });
      this.CustomCheckBoxProps.isChecked = value;
    },
    isChecked: false,
  };

  btnForgotPasswordProps = {
    onPress: () => this.goToForgotPassword(),
  };
  btnRegistrationProps = {
    onPress: () => this.goToRegistration(),
  };

  txtInputPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ password: text });

      //@ts-ignore
      this.txtInputPasswordProps.value = text;
    },
    secureTextEntry: true,
  };

  btnPasswordShowHideImageProps = {
    source: imgPasswordVisible,
  };

  btnRememberMeProps = {
    onPress: () => {
      this.setState({
        checkedRememberMe: !this.CustomCheckBoxProps.isChecked,
      });
      this.CustomCheckBoxProps.isChecked = !this.CustomCheckBoxProps.isChecked;
    },
  };

  txtInputEmailWebProps = {
    onChangeText: (text: string) => {
      this.setState({ email: text });

      //@ts-ignore
      this.txtInputEmailProps.value = text;
    },
  };

  txtInputEmailMobileProps = {
    ...this.txtInputEmailWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputEmailProps = this.isPlatformWeb()
    ? this.txtInputEmailWebProps
    : this.txtInputEmailMobileProps;

  // Customizable Area End

  async receive(from: string, message: Message) {
    this.setState({
      open: false,
    });
    //console.log(message, "message");

    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      var errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId === this.forgotPassword) {
       // console.log(responseJson,"forgot password")
        if(!responseJson.errors){
        this.settingToken(responseJson.meta.token)
                toast.success("Please verify the link sent to your email address to reset password")

        }
        if(responseJson?.errors){
          toast.error(responseJson?.errors[0].otp)

        }
        this.setState({
          setOpen: false,
        })
      }
      if (apiRequestCallId === this.apiEmailLoginCallId) {
        this.props.hideLoader();
        this.saveLoggedInUserData(responseJson);
      }
    }

    //     if (message.properties?.RestAPIResponceSuccessMessage?.errors) {
    //       var errorMessage = message.properties?.RestAPIResponceSuccessMessage.errors
    //       let error = Object.keys(errorMessage[0])
    //       let errorMsg = errorMessage[0][error[0]]
    //       console.log(error, "error", errorMessage[0][error[0]])

    //       toast.error(errorMsg)

    // this.setState({
    //         setOpen: false
    //     })
    //     }

    // if (getName(MessageEnum.ReciveUserCredentials) === message.id) {
    //   const userName = message.getData(getName(MessageEnum.LoginUserName));

    //   const password = message.getData(getName(MessageEnum.LoginPassword));

    //   const countryCode = message.getData(
    //     getName(MessageEnum.LoginCountryCode)
    //   );

    //   if (!countryCode && userName && password) {
    //     this.setState({
    //       email: userName,
    //       password: password,
    //       checkedRememberMe: true
    //     });

    //     //@ts-ignore
    //     this.txtInputEmailProps.value = userName;

    //     //@ts-ignore
    //     this.txtInputPasswordProps.value = password;

    //     this.CustomCheckBoxProps.isChecked = true;
    //   }
    // } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
    //   const apiRequestCallId = message.getData(
    //     getName(MessageEnum.RestAPIResponceDataMessage)
    //   );

    //   var responseJson = message.getData(
    //     getName(MessageEnum.RestAPIResponceSuccessMessage)
    //   );

    //   var errorReponse = message.getData(
    //     getName(MessageEnum.RestAPIResponceErrorMessage)
    //   );

    //   if (apiRequestCallId != null) {
    //     if (
    //       apiRequestCallId === this.validationApiCallId &&
    //       responseJson !== undefined
    //     ) {
    //       var arrayholder = responseJson.data;

    //       if (arrayholder && arrayholder.length !== 0) {
    //         let regexData = arrayholder[0];

    //         if (regexData && regexData.email_validation_regexp) {
    //           this.emailReg = new RegExp(regexData.email_validation_regexp);
    //         }
    //       }
    //     }

    //     if (apiRequestCallId === this.apiEmailLoginCallId) {
    //       if (responseJson && responseJson.meta && responseJson.meta.token) {
    //         runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
    //         this.saveLoggedInUserData(responseJson);
    //         this.sendLoginSuccessMessage();
    //         this.openInfoPage();
    //       } else {
    //         //Check Error Response
    //         this.parseApiErrorResponse(responseJson);
    //         this.sendLoginFailMessage();
    //       }

    //       this.parseApiCatchErrorResponse(errorReponse);
    //     }
    //   }
    // }
    // Customizable Area End
  }
  async saveLoggedInUserData(responseJson: any) {
    console.log(responseJson,"responseJson")
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      console.log(`************** Loginpage, `, responseJson);

      const profileData = responseJson.user.data;
      const token = responseJson.meta.token;
      console.log(`************** Loginpage, `, responseJson);
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
console.log(profileData.attributes.user_type)
      if (profileData.attributes.user_type === "student") {
        toast.success("Logged In Successfully");
        await StorageProvider.set("authToken", token);
        await StorageProvider.set("accountInfo", JSON.stringify(profileData));
        this.props.history.push("/Catalogue/Home");
      } else if (profileData.attributes.user_type === "publisher") {
        toast.success("Logged In Successfully");
        await StorageProvider.set("publisherToken", token);
        await StorageProvider.set("accountInfo", JSON.stringify(profileData));
        this.props.history.push("/publisher");
      } else if (
        profileData.attributes.user_type === "admin" ||
        profileData.attributes.user_type === "super_admin"
      ) {
        toast.success("Logged In Successfully");
        await StorageProvider.set("adminToken", token);
        await StorageProvider.set("accountInfo", JSON.stringify(profileData));
        this.props.history.push("/AdminConsole");
      } else {
        toast.error("Some Error Happened.");
      }
    } else {
      toast.error("Some Error Happened.");
    }
  }

  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }

  sendLoginSuccessMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginSuccessMessage));

    msg.addData(getName(MessageEnum.LoginUserName), this.state.email);
    msg.addData(getName(MessageEnum.CountyCodeDataMessage), null);
    msg.addData(getName(MessageEnum.LoginPassword), this.state.password);
    msg.addData(
      getName(MessageEnum.LoginIsRememberMe),
      this.state.checkedRememberMe
    );

    this.send(msg);
  }

  openInfoPage() {
    const msg: Message = new Message(getName(MessageEnum.AccoutLoginSuccess));

    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    this.send(msg);
  }

  goToForgotPassword() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationForgotPasswordMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.NavigationForgotPasswordPageInfo), "email");
    this.send(msg);
  }

  goToSocialLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationSocialLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }
  goToRegistration() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigateEmailSignUpMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  doEmailLogIn(values: any): boolean {
    // console.log(values, "ll");
    // if (
    //   this.state.email === null ||
    //   this.state.email.length === 0 ||
    //   !this.emailReg.test(this.state.email)
    // ) {
    //   this.showAlert("Error", configJSON.errorEmailNotValid);
    //   return false;
    // }

    // if (this.state.password === null || this.state.password.length === 0) {
    //   this.showAlert("Error", configJSON.errorPasswordNotValid);
    //   return false;
    // }

    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const attrs = {
      email: values.email,
      password: values.password,
    };

    const data = {
      type: "email_account",
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiEmailLoginCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAPiEndPoint
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
      configJSON.loginAPiMethod
    );
    this.props.showLoader();

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  doForgotPassword(values: any): boolean {
    // if (
    //   this.state.email === null ||
    //   this.state.email.length === 0 ||
    //   !this.emailReg.test(this.state.email)
    // ) {
    //   this.showAlert("Error", configJSON.errorEmailNotValid);
    //   return false;
    // }

    // if (this.state.password === null || this.state.password.length === 0) {
    //   this.showAlert("Error", configJSON.errorPasswordNotValid);
    //   return false;
    // }

    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

   

    const httpBody = 
      {
"data": {
        "attributes": {
             "email": values.email
               }
    }
}
  
    

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
      configJSON.loginAPiMethod
    );
    // this.props.showLoader();
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }
  settingToken = async (token:any)=>{

     StorageProvider.set("resetToken", token);
  
  }
  
}
