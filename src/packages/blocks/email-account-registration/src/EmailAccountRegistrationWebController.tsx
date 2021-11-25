import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
    getName
} from "../../../framework/src/Messages/MessageEnum";
import * as Yup from "yup";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { ToastContainer, toast } from 'react-toastify';

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
    navigation: any;
    id: string;
    classes:any
}

export interface S {
    // Customizable Area Start
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    otpAuthToken: string;
    reTypePassword: string;
    data: any[];
    passwordHelperText: string;
    enablePasswordField: boolean;
    enableReTypePasswordField: boolean;
    countryCodeSelected: string;
    phone: string;
    checkedRememberMe: boolean
    selectedOptions: any,
    validationSchema: any;
    selectedValue:any;
    radioButtonValidation:any
    checkedB:any
    // Customizable Area End
}

export interface SS {
    // Customizable Area Start
    id: any;
    // Customizable Area End
}
export interface Pr {
    message: ""
}
export default class EmailAccountRegistrationController extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start
    arrayholder: any[];
    passwordReg: RegExp;
    emailReg: RegExp;
    createAccountApiCallId: any;
    validationApiCallId: string = "";

    imgPasswordVisible: any;
    imgPasswordInVisible: any;

    labelHeader: any;
    labelFirstName: string;
    lastName: string;
    labelEmail: string;
    labelPassword: string;
    labelRePassword: string;
    labelLegalText: string;
    labelLegalTermCondition: string;
    labelLegalPrivacyPolicy: string;
    btnTextSignUp: string;
    currentCountryCode: any;

    // Customizable Area End

    constructor(props: Props) {
        super(props);
        //console.log(props,"props")
        this.subScribedMessages = [
            getName(MessageEnum.RestAPIResponceMessage),
            getName(MessageEnum.NavigationPayLoadMessage),
            getName(MessageEnum.CountryCodeMessage)
        ];
        this.receive = this.receive.bind(this);
        this.isStringNullOrBlank = this.isStringNullOrBlank.bind(this);

        runEngine.attachBuildingBlock(this, this.subScribedMessages);
        //validation schema
        let validationSchema = {
            email: Yup.string()
                .email(configJSON.pleaseEnterAValidEmail)
                .required(configJSON.emailIsRequired),
            password: Yup.string()
                .required(configJSON.pleaseEnterAPassword)
                .min(6, configJSON.passwordMustBeAtLeast2Characters),
            firstName: Yup.string()
                .required(configJSON.nameIsRequired)
        };
        this.state = {
            // Customizable Area Start
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            reTypePassword: "",
            otpAuthToken: "",
            data: [],
            passwordHelperText: "",
            enablePasswordField: true,
            enableReTypePasswordField: true,
            countryCodeSelected: "",
            phone: "",
            checkedRememberMe: false,
            selectedOptions: {
                key: 'student',
                text: 'Student',
            },
            validationSchema: validationSchema,
            selectedValue:"",
            radioButtonValidation:false,
            checkedB:false
            // Customizable Area End
        };

        // Customizable Area Start
        this.arrayholder = [];
        this.passwordReg = new RegExp("\\w+");
        this.emailReg = new RegExp("\\w+");

        this.imgPasswordVisible = imgPasswordVisible;
        this.imgPasswordInVisible = imgPasswordInVisible;

        this.labelHeader = configJSON.labelHeader;
        this.labelFirstName = configJSON.labelFirstName;
        this.lastName = configJSON.lastName;
        this.labelEmail = configJSON.labelEmail;
        this.labelPassword = configJSON.labelPassword;
        this.labelRePassword = configJSON.labelRePassword;
        this.labelLegalText = configJSON.labelLegalText;
        this.labelLegalTermCondition = configJSON.labelLegalTermCondition;
        this.labelLegalPrivacyPolicy = configJSON.labelLegalPrivacyPolicy;
        this.btnTextSignUp = configJSON.btnTextSignUp;
        // Customizable Area End
    }

    CustomCheckBoxProps = {
        onChangeValue: (value: boolean) => {
            this.setState({ checkedRememberMe: value });
            this.CustomCheckBoxProps.isChecked = value;
        },
        isChecked: false
    };
   

    goToPage = ()=>{
//@ts-ignore

        this.props.history.push('/')
        // this.props.navigation.navigate('')
    }
    async receive(from: string, message: Message) {
        // Customizable Area Start
        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
            
        }
        if (message.properties?.RestAPIResponceSuccessMessage?.errors) {
            var errorMessage = message.properties?.RestAPIResponceSuccessMessage.errors
            let error = Object.keys(errorMessage[0])
            let errorMsg = errorMessage[0][error[0]]
            console.log(error, "error", errorMessage[0][error[0]])
      
            toast.error(errorMsg)
      
      
          }
      
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson && !responseJson.errors) {
        const apiRequestCallId = message.getData(
          getName(MessageEnum.RestAPIResponceDataMessage)
        );
        if (apiRequestCallId != null) {


            //sucessfull registration
            if (apiRequestCallId === this.createAccountApiCallId) {
            //console.log("get best seller ", responseJson.data);
            toast.success("You've Registered Successfully,Pls Signin")
            //@ts-ignore
            this.props.history.push('/')
          }

        }
    }
      
        
        // Customizable Area End
    }

    // Customizable Area Start
    goToPrivacyPolicy() {
        const msg: Message = new Message(
            getName(MessageEnum.NavigationPrivacyPolicyMessage)
        );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }

    goToTermsAndCondition() {
        const msg: Message = new Message(
            getName(MessageEnum.NavigationTermAndConditionMessage)
        );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }

    goToLogin() {
        // console.log(this.props,"props")
        // this.props.navigation.navigate('')
        this.props.navigation.navigate('EmailAccountLoginBlock')

        // this.props.navigation.navigate('')

    }

    isStringNullOrBlank(str: string) {
        return str === null || str.length === 0;
    }

    isValidEmail(email: string) {
        return this.emailReg.test(email);
    }
    onSelect = (item: any) => {
        console.log(item);
        const option: any = this.state.selectedOptions;
        if (option && option.key === item.key) {
            console.log(this.state.selectedOptions)
            this.setState({
                selectedOptions: {}
            })
        } else {
            this.setState({
                selectedOptions: item
            })
        }
    };
    btnLoginProps = {
        onPress: () => this.goToLogin()
    }
    createAccount(values: any): boolean {
      
       
        const header = {
            "Content-Type": configJSON.contentTypeApiAddDetail,
        };
        const attrs = {
           
            full_name: values.name,
			email: values.email,
			password: values.password,
            user_type:this.state.selectedValue,
            // password_confirmation: "123456",
            activated: true,
            terms_conditions:this.state.checkedB
        };
        console.log(attrs, 'oo');

        const data = {
            type: "email_account",
            attributes: attrs
        };

        const httpBody = {
            data: data,
            token: this.state.otpAuthToken
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.createAccountApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.accountsAPiEndPoint
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
            configJSON.apiMethodTypeAddDetail
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
    }

    getValidations() {
        const headers = {
            "Content-Type": configJSON.validationApiContentType
        };

        const getValidationsMsg = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.validationApiCallId = getValidationsMsg.messageId;

        getValidationsMsg.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.urlGetValidations
        );

        getValidationsMsg.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(headers)
        );
        getValidationsMsg.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.validationApiMethodType
        );
        runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
    }

    isNonNullAndEmpty(value: String) {
        return (
            value !== undefined &&
            value !== null &&
            value !== "null" &&
            value.trim().length > 0
        );
    }

    validateCountryCodeAndPhoneNumber(countryCode: string, phoneNumber: string) {
        let error = null;

        if (this.isNonNullAndEmpty(phoneNumber)) {
            if (!this.isNonNullAndEmpty(String(countryCode))) {
                error = configJSON.errorCountryCodeNotSelected;
            }
        } else if (this.isNonNullAndEmpty(countryCode)) {
            if (!this.isNonNullAndEmpty(phoneNumber)) {
                error = "Phone " + configJSON.errorBlankField;
            }
        }

        return error;
    }

    imgEnableRePasswordFieldProps = {
        source: imgPasswordVisible
    };

    // btnConfirmPasswordShowHideProps = {
    //   onPress: () => {
    //     this.setState({
    //       enableReTypePasswordField: !this.state.enableReTypePasswordField
    //     });
    //     this.txtInputConfirmPasswordProps.secureTextEntry = !this.state
    //       .enableReTypePasswordField;
    //     this.imgEnableRePasswordFieldProps.source = this
    //       .txtInputConfirmPasswordProps.secureTextEntry
    //       ? imgPasswordVisible
    //       : imgPasswordInVisible;
    //   }
    // };

    imgEnablePasswordFieldProps = {
        source: imgPasswordVisible
    };

    btnPasswordShowHideProps = {
        onPress: () => {
            this.setState({ enablePasswordField: !this.state.enablePasswordField });
            this.txtInputPasswordProps.secureTextEntry = !this.state
                .enablePasswordField;
            this.imgEnablePasswordFieldProps.source = this.txtInputPasswordProps
                .secureTextEntry
                ? imgPasswordVisible
                : imgPasswordInVisible;
        }
    };

    // btnSignUpProps = {
    //     onPress: () => this.createAccount()
    // };

    btnLegalPrivacyPolicyProps = {
        onPress: () => this.goToPrivacyPolicy()
    };

    btnLegalTermsAndConditionProps = {
        onPress: () => this.goToTermsAndCondition()
    };

    txtInputEmailWebPrpos = {
        onChangeText: (text: string) => {
            this.setState({ email: text });
            //@ts-ignore
            this.txtInputEmailPrpos.value = text;
        }
    };


    txtInputEmailMobilePrpos = {
        ...this.txtInputEmailWebPrpos,
        keyboardType: "email-address"
    };

    txtInputEmailPrpos = this.isPlatformWeb()
        ? this.txtInputEmailWebPrpos
        : this.txtInputEmailMobilePrpos;

    // txtPhoneNumberWebProps = {
    //   onChangeText: (text: string) => {
    //     this.setState({ phone: text });

    //     //@ts-ignore
    //     this.txtPhoneNumberProps.value = text;
    //   }
    // };

    // txtPhoneNumberMobileProps = {
    //   ...this.txtPhoneNumberWebProps,
    //   autoCompleteType: "tel",
    //   keyboardType: "phone-pad"
    // };

    // txtPhoneNumberProps = this.isPlatformWeb()
    //   ? this.txtPhoneNumberWebProps
    //   : this.txtPhoneNumberMobileProps;

    // txtInputLastNamePrpos = {
    //   onChangeText: (text: string) => {
    //     this.setState({ lastName: text });

    //     //@ts-ignore
    //     this.txtInputLastNamePrpos.value = text;
    //   }
    // };

    txtInputFirstNamePrpos = {
        onChangeText: (text: string) => {
            this.setState({ firstName: text });

            //@ts-ignore
            this.txtInputFirstNamePrpos.value = text;
        }
    };

    // txtInputConfirmPasswordProps = {
    //   onChangeText: (text: string) => {
    //     this.setState({ reTypePassword: text });

    //     //@ts-ignore
    //     this.txtInputConfirmPasswordProps.value = text;
    //   },
    //   secureTextEntry: true
    // };

    txtInputPasswordProps = {
        onChangeText: (text: string) => {
            this.setState({ password: text });

            //@ts-ignore
            this.txtInputPasswordProps.value = text;
        },
        secureTextEntry: true
    };

    // Customizable Area End
}
