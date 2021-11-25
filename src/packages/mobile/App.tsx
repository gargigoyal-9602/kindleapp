import React from 'react';

import {
  createStackNavigator
} from "react-navigation";

import HomeScreen from "../components/src/HomeScreen";
import InfoPage from '../blocks/info-page/src/InfoPageBlock'
import EmailAccountRegistration from "../blocks/email-account-registration/src/EmailAccountRegistration";
import ContentManagement from "../blocks/ContentManagement/src/ContentManagement";
import Download from "../blocks/Download/src/Download";
import Notes from "../blocks/Notes/src/Notes";
import Categoriessubcategories from "../blocks/categoriessubcategories/src/Categoriessubcategories";
import CustomisableUserSubscriptions from "../blocks/CustomisableUserSubscriptions/src/CustomisableUserSubscriptions";
import OTPInputAuth from "../blocks/otp-input-confirmation/src/OTPInputAuth";
import UploadMedia from "../blocks/UploadMedia/src/UploadMedia";
import OfflineBrowsing from "../blocks/OfflineBrowsing/src/OfflineBrowsing";
import ReviewPrompt from "../blocks/ReviewPrompt/src/ReviewPrompt";
import SocialMediaAccountRegistrationScreen from "../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen";
import Catalogue from "../blocks/catalogue/src/Catalogue";
import PreviewAudioAndContent from "../blocks/PreviewAudioAndContent/src/PreviewAudioAndContent";
import PaymentAdmin from "../blocks/PaymentAdmin/src/PaymentAdmin";
import ApiIntegration from "../blocks/ApiIntegration/src/ApiIntegration";
import Search from "../blocks/Search/src/Search";
import AdminConsole from "../blocks/AdminConsole/src/AdminConsole";
import QrCodes from "../blocks/QrCodes/src/QrCodes";
import SocialMediaAccountLoginScreen from "../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen";
import Analytics from "../blocks/Analytics/src/Analytics";
import Ordermanagement from "../blocks/ordermanagement/src/Ordermanagement";
import OrderDetails from "../blocks/ordermanagement/src/OrderDetails";
import CountryCodeSelector from "../blocks/country-code-selector/src/CountryCodeSelector";
import CountryCodeSelectorTable from "../blocks/country-code-selector/src/CountryCodeSelectorTable";
import PdfToEpubConvertedIntegration from "../blocks/PdfToEpubConvertedIntegration/src/PdfToEpubConvertedIntegration";
import Payments from "../blocks/Payments/src/Payments";
import AudioMusic from "../blocks/AudioMusic/src/AudioMusic";
import EmailAccountLoginBlock from "../blocks/email-account-login/src/EmailAccountLoginBlock";
import ForgotPassword from "../blocks/forgot-password/src/ForgotPassword";
import ForgotPasswordOTP from "../blocks/forgot-password/src/ForgotPasswordOTP";
import NewPassword from "../blocks/forgot-password/src/NewPassword";


const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen, navigationOptions: { header: null, title: "Home" } },
EmailAccountRegistration:{ screen:EmailAccountRegistration,navigationOptions:{ title:"EmailAccountRegistration"}},
ContentManagement:{ screen:ContentManagement,navigationOptions:{ title:"ContentManagement"}},
Download:{ screen:Download,navigationOptions:{ title:"Download"}},
Notes:{ screen:Notes,navigationOptions:{ title:"Notes"}},
Categoriessubcategories:{ screen:Categoriessubcategories,navigationOptions:{ title:"Categoriessubcategories"}},
CustomisableUserSubscriptions:{ screen:CustomisableUserSubscriptions,navigationOptions:{ title:"CustomisableUserSubscriptions"}},
OTPInputAuth:{ screen:OTPInputAuth,navigationOptions:{ title:"OTPInputAuth"}},
UploadMedia:{ screen:UploadMedia,navigationOptions:{ title:"UploadMedia"}},
OfflineBrowsing:{ screen:OfflineBrowsing,navigationOptions:{ title:"OfflineBrowsing"}},
ReviewPrompt:{ screen:ReviewPrompt,navigationOptions:{ title:"ReviewPrompt"}},
SocialMediaAccountRegistrationScreen:{ screen:SocialMediaAccountRegistrationScreen,navigationOptions:{ title:"SocialMediaAccountRegistrationScreen"}},
Catalogue:{ screen:Catalogue,navigationOptions:{ title:"Catalogue"}},
PreviewAudioAndContent:{ screen:PreviewAudioAndContent,navigationOptions:{ title:"PreviewAudioAndContent"}},
PaymentAdmin:{ screen:PaymentAdmin,navigationOptions:{ title:"PaymentAdmin"}},
ApiIntegration:{ screen:ApiIntegration,navigationOptions:{ title:"ApiIntegration"}},
Search:{ screen:Search,navigationOptions:{ title:"Search"}},
AdminConsole:{ screen:AdminConsole,navigationOptions:{ title:"AdminConsole"}},
QrCodes:{ screen:QrCodes,navigationOptions:{ title:"QrCodes"}},
SocialMediaAccountLoginScreen:{ screen:SocialMediaAccountLoginScreen,navigationOptions:{ title:"SocialMediaAccountLoginScreen"}},
Analytics:{ screen:Analytics,navigationOptions:{ title:"Analytics"}},
Ordermanagement:{ screen:Ordermanagement,navigationOptions:{ title:"Ordermanagement"}},
OrderDetails:{ screen:OrderDetails,navigationOptions:{ title:"OrderDetails"}},
CountryCodeSelector:{ screen:CountryCodeSelector,navigationOptions:{ title:"CountryCodeSelector"}},
CountryCodeSelectorTable:{ screen:CountryCodeSelectorTable,navigationOptions:{ title:"CountryCodeSelectorTable"}},
PdfToEpubConvertedIntegration:{ screen:PdfToEpubConvertedIntegration,navigationOptions:{ title:"PdfToEpubConvertedIntegration"}},
Payments:{ screen:Payments,navigationOptions:{ title:"Payments"}},
AudioMusic:{ screen:AudioMusic,navigationOptions:{ title:"AudioMusic"}},
EmailAccountLoginBlock:{ screen:EmailAccountLoginBlock,navigationOptions:{ title:"EmailAccountLoginBlock"}},
ForgotPassword:{ screen:ForgotPassword,navigationOptions:{ title:"ForgotPassword"}},
ForgotPasswordOTP:{ screen:ForgotPasswordOTP,navigationOptions:{ title:"ForgotPasswordOTP"}},
NewPassword:{ screen:NewPassword,navigationOptions:{ title:"NewPassword"}},

  InfoPage: { screen: InfoPage, navigationOptions: { title: "Info" } }, 
});

if (!HomeScreen.instance) {
  const defaultProps = {
    navigation: null,
    id: "HomeScreen"
  };
  const homeScreen = new HomeScreen(defaultProps);
}

export function App() {
  return (
    <HomeStack />
  );
};