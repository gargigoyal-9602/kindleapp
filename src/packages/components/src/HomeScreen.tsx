import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import { BlockComponent } from "../../framework/src/BlockComponent";
import AlertBlock from '../../blocks/alert/src/AlertBlock';
import CustomTextItem from "./CustomTextItem";
import NavigationBlock from "../../framework/src/Blocks/NavigationBlock";
import SingletonFactory from '../../framework/src/SingletonFactory';

import HomeScreenAdapter from '../../blocks/adapters/src/HomeScreenAdapter';
import InfoPageAdapter from '../../blocks/adapters/src/InfoPageAdapter';
import AlertPageWebAdapter from "../../blocks/adapters/src/AlertPageWebAdapter";

// Customizable Area Start
import PrivacyPolicyAdapter from "../../blocks/adapters/src/PrivacyPolicyAdapter";
import TermsAndConditionAdapter from "../../blocks/adapters/src/TermsAndConditionAdapter";
import SplashScreenAdapter from "../../blocks/adapters/src/SplashScreenAdapter";
import SocialMediaLogInAdapter from "../../blocks/adapters/src/SocialMediaLogInAdapter";
import EmailAccountLogInAdapter from "../../blocks/adapters/src/EmailAccountLogInAdapter";
import EmailAccountSignUpAdapter from "../../blocks/adapters/src/EmailAccountSignUpAdapter";
import ForgotPasswordAdapter from "../../blocks/adapters/src/ForgotPasswordAdapter";
import MobilePhoneToOTPAdapter from "../../blocks/adapters/src/MobilePhoneToOTPAdapter";
import OtpToNewPasswordAdapter from "../../blocks/adapters/src/OtpToNewPasswordAdapter";

//Assembler generated adapters start
const socialMediaLogInAdapter = new SocialMediaLogInAdapter();
const emailAccountLogInAdapter = new EmailAccountLogInAdapter();
const emailAccountSignUpAdapter = new EmailAccountSignUpAdapter();
const forgotPasswordAdapter = new ForgotPasswordAdapter();
const mobilePhoneToOTPAdapter = new MobilePhoneToOTPAdapter();
const otpToNewPasswordAdapter = new OtpToNewPasswordAdapter();

//Assembler generated adapters end



const privacyAdapter = new PrivacyPolicyAdapter();
const termAndConditionAdapter = new TermsAndConditionAdapter();
const splashScreenAdapter = new SplashScreenAdapter();
// Customizable Area End


const restAPIBlock = SingletonFactory.getRestBlockInstance();
const alertBlock = new AlertBlock();
const navigationBlock = new NavigationBlock();
const sessionBlock = SingletonFactory.getSessionBlockInstance();
const userAccountManagerBlock = SingletonFactory.getUserManagerInstance();
const homeScreenAdapter = new HomeScreenAdapter();
const infoPageAdapter = new InfoPageAdapter();
const alertPageWebAdapter = new AlertPageWebAdapter()

const instructions = Platform.select({
  // Customizable Area Start
  ios: "The iOS APP to rule them all!",
  android: "Now with Android AI",
  web: "Selector your adventure."
  // Customizable Area End
});

interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
interface S { }

interface SS { }

class HomeScreen extends BlockComponent<Props, S, SS> {

  static instance:HomeScreen;

  constructor(props: Props) {
    super(props);
    HomeScreen.instance = this;
  }

  render() {
    const { navigation } = this.props;
    const _this = this;

    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.welcome}>
                Welcome to KindleLikeApp!
              </Text>
            </View>

            <Text style={styles.instructions}>{instructions}</Text>
            <Text style={styles.header}>DEFAULT BLOCKS</Text>
            <CustomTextItem
              content={'InfoPage'}
              onPress={() => navigation.navigate("InfoPage")}
            />
            <CustomTextItem
              content={'Alert'}
              onPress={() => this.showAlert("Example", "This happened")}
            />
<CustomTextItem content={'Catalogue'}  onPress={() => navigation.navigate("Catalogue")} />
<CustomTextItem content={'Categoriessubcategories'}  onPress={() => navigation.navigate("Categoriessubcategories")} />
<CustomTextItem content={'SocialMediaAccountRegistrationScreen'}  onPress={() => navigation.navigate("SocialMediaAccountRegistrationScreen")} />
<CustomTextItem content={'social-media-account'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'EmailAccountLoginBlock'}  onPress={() => navigation.navigate("EmailAccountLoginBlock")} />
<CustomTextItem content={'EmailAccountRegistration'}  onPress={() => navigation.navigate("EmailAccountRegistration")} />
<CustomTextItem content={'CountryCodeSelector'}  onPress={() => navigation.navigate("CountryCodeSelector")} />
<CustomTextItem content={'ForgotPassword'}  onPress={() => navigation.navigate("ForgotPassword")} />
<CustomTextItem content={'OTPInputAuth'}  onPress={() => navigation.navigate("OTPInputAuth")} />
<CustomTextItem content={'SocialMediaAccountLoginScreen'}  onPress={() => navigation.navigate("SocialMediaAccountLoginScreen")} />
<CustomTextItem content={'Ordermanagement'}  onPress={() => navigation.navigate("Ordermanagement")} />
<CustomTextItem content={'CustomisableUserSubscriptions'}  onPress={() => navigation.navigate("CustomisableUserSubscriptions")} />
<CustomTextItem content={'Search'}  onPress={() => navigation.navigate("Search")} />
<CustomTextItem content={'UploadMedia'}  onPress={() => navigation.navigate("UploadMedia")} />
<CustomTextItem content={'ApiIntegration'}  onPress={() => navigation.navigate("ApiIntegration")} />
<CustomTextItem content={'PaymentAdmin'}  onPress={() => navigation.navigate("PaymentAdmin")} />
<CustomTextItem content={'Download'}  onPress={() => navigation.navigate("Download")} />
<CustomTextItem content={'ReviewPrompt'}  onPress={() => navigation.navigate("ReviewPrompt")} />
<CustomTextItem content={'Payments'}  onPress={() => navigation.navigate("Payments")} />
<CustomTextItem content={'AdminConsole'}  onPress={() => navigation.navigate("AdminConsole")} />
<CustomTextItem content={'QrCodes'}  onPress={() => navigation.navigate("QrCodes")} />
<CustomTextItem content={'Analytics'}  onPress={() => navigation.navigate("Analytics")} />
<CustomTextItem content={'AudioMusic'}  onPress={() => navigation.navigate("AudioMusic")} />
<CustomTextItem content={'Notes'}  onPress={() => navigation.navigate("Notes")} />
<CustomTextItem content={'ContentManagement'}  onPress={() => navigation.navigate("ContentManagement")} />
<CustomTextItem content={'OfflineBrowsing'}  onPress={() => navigation.navigate("OfflineBrowsing")} />
<CustomTextItem content={'PdfToEpubConvertedIntegration'}  onPress={() => navigation.navigate("PdfToEpubConvertedIntegration")} />
<CustomTextItem content={'PreviewAudioAndContent'}  onPress={() => navigation.navigate("PreviewAudioAndContent")} />

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
// Customizable Area End

// Customizable Area Start
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    height: Platform.OS === "web" ? '100vh' : 'auto',
    backgroundColor: "#F5FCFF"
  },
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  instructions: {
    textAlign: "center",
    color: "#6200EE",
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,

    padding: 10
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  header: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  item: {
    backgroundColor: '#00000000',
    padding: 18,
    color: '#6200EE',
    fontSize: 16,
    fontWeight: 'normal'
  }
});
// Customizable Area End
export default HomeScreen;