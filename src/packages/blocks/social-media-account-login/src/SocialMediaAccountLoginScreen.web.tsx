import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { withRouter } from "react-router";
import Loader from "../../../components/src/Loader";

//@ts-ignore
import AppleSignin from "react-apple-signin-auth";
import { Button, Box, Typography } from "@material-ui/core";

import SocialMediaAccountWebController, {
  Props,
  configJSON,
} from "../../social-media-account/src/SocialMediaAccountWebController";

import CustomFacebookLogInButton from "../../social-media-account/src/CustomFacebookloginbtnWeb";
import CustomGoogleLogInButton from "../../social-media-account/src/CustomGoogleLoginbtnWeb";
import {
  appleIcon,
  fbIcon,
  googleIcon,
} from "../../social-media-account/src/assets";

class SocialMediaAccountLoginScreen extends SocialMediaAccountWebController {
  static SocialMediaAccountLoginScreen: SocialMediaAccountLoginScreen;

  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      isRegistration: false,
    };
  }
  render() {
    // const buttonStyle = {
    //   backgroundColor: "#4caef0",
    //   color: "white",
    //   whiteSpace: "nowrap",
    //   justifyContent: "flex-start",
    //   alignItems: "center",
    //   "&:hover": {
    //     backgroundColor: "#4caeef",
    //     color: "white",
    //   },
    // };
    if (this.props.isMobileScreen) {
      return (
        <>
          <Box m={1}>
            <Button
              fullWidth
              style={{
                backgroundColor: "#4caef0",
                color: "white",
                whiteSpace: "nowrap",
                justifyContent: "flex-start",
                alignItems: "center",
                borderRadius: "15px",
                padding: "6px 30px",
                boxShadow:
                  "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
              }}
              onClick={this.btnGoogleLogInProps.onPress}
            >
              <Box
                p={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  src={googleIcon}
                  style={{
                    objectFit: "contain",
                    width: "20px",
                    height: "20px",
                  }}
                  alt="icons"
                />
              </Box>
              Sign In With Google
            </Button>
          </Box>
          <Box m={1}>
            <Button
              fullWidth
              style={{
                backgroundColor: "#4caef0",
                color: "white",
                whiteSpace: "nowrap",
                justifyContent: "flex-start",
                alignItems: "center",
                borderRadius: "15px",
                padding: "6px 30px",
                boxShadow:
                  "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
              }}
            >
              <Box
                p={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  src={fbIcon}
                  style={{
                    objectFit: "contain",
                    width: "20px",
                    height: "20px",
                  }}
                  alt="icons"
                />
              </Box>
              Sign In With FaceBook
            </Button>
          </Box>
          <AppleSignin
            authOptions={{
              clientId: "com.kindleapp.app",
              scope: "email name",
              redirectURI:
                "https://kindlelikeapp-42900-react-native.b42900.dev.us-east-1.aws.svc.builder.cafe/Catalogue/Home",
              state: "state",
              nonce: "nonce",
              usePopup: true,
            }}
            className="apple-auth-btn"
            noDefaultStyle={false}
            buttonExtraChildren="Continue with Apple"
            /** Extra controlling props */
            /** Called upon signin success in case authOptions.usePopup = true -- which means auth is handled client side */
            onSuccess={(response: any) => {
              console.log(response);
              this.appleUserStatusChanged(response);
            }} // default = undefined
            /** Called upon signin error */
            onError={(error: any) => {
              console.error(error, "error comes");
              this.appleUserStatusChanged(error);
            }} // default = undefined
            /** Skips loading the apple script if true */
            skipScript={false} // default = undefined
            render={(props: any) => (
              <Box p={1} {...props} >
                <Button
                  fullWidth
                  style={{
                    backgroundColor: "#4caef0",
                    color: "white",
                    whiteSpace: "nowrap",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderRadius: "15px",
                    padding: "6px 30px",
                    boxShadow:
                      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
                  }}
                >
                  <Box
                    p={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="left"
                  >
                    <img
                      src={appleIcon}
                      style={{
                        objectFit: "contain",
                        width: "20px",
                        height: "20px",
                      }}
                      alt="icons"
                    />
                  </Box>
                  Sign In With Apple
                </Button>
              </Box>
            )}
          />
        </>
      );
    }
    return (
      <View style={styles.container}>
        <CustomGoogleLogInButton
          testID="btnGoogleLogIn" //Merge Engine::From BDS
          style={styles.googleStyle} //UI Engine::From Sketch
          //loginGoogleButtonText={configJSON.loginGoogleButtonText} //UI Engine::From Sketch
          googleButtonImageStyle={styles.googleButtonImageStyle} //UI Engine::From Sketch
          googleButtonTextStyle={styles.googleButtonTextStyle} //UI Engine::From Sketch
          {...this.btnGoogleLogInProps} //Merge Engine::From BDS - {...this.testIDProps}
        />
        <CustomFacebookLogInButton
          testID="btnFacebookLogIn" //Merge Engine::From BDS
          appId="170982444234877" //Merge Engine::From SDS
          // loginFacebookButtonText={configJSON.facebookButtonText} //UI Engine::From Sketch
          {...this.btnFacebookLogInProps} //Merge Engine::From BDS - {...this.testIDProps}
        />

        <AppleSignin
          authOptions={{
            clientId: "com.kindleapp.app",
            scope: "email name",
            redirectURI:
              "https://kindlelikeapp-42900-react-native.b42900.dev.us-east-1.aws.svc.builder.cafe/Catalogue/Home",
            state: "state",
            nonce: "nonce",
            usePopup: true,
          }}
          className="apple-auth-btn"
          noDefaultStyle={false}
          buttonExtraChildren="Continue with Apple"
          /** Extra controlling props */
          /** Called upon signin success in case authOptions.usePopup = true -- which means auth is handled client side */
          onSuccess={(response: any) => {
            console.log(response);
            this.appleUserStatusChanged(response);
          }} // default = undefined
          /** Called upon signin error */
          onError={(error: any) => {
            console.error(error, "error comes");
            this.appleUserStatusChanged(error);
          }} // default = undefined
          /** Skips loading the apple script if true */
          skipScript={false} // default = undefined
          render={(props: any) => (
            <Box
              {...props}
              style={{
                backgroundColor: "rgb(58, 174, 239)",
                borderRadius: "16px",
                padding: "0.6rem 0.9rem",
              }}
            >
              <img src={appleIcon} alt="icon" width="17px" />
            </Box>
          )}
        />

        {/* Customizable Area Start */}
      </View>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  logInButtonContainer: {
    overflow: "hidden",
    display: undefined,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "flex-start",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    height: 40,
    width: 205,
    marginTop: 16,
    elevation: 6,
    backgroundColor: "#ffffff",
  },
  facebookStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    elevation: 6,
    shadowRadius: 8,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "#ffffff",
    padding: "11px",
  },
  facebookImageStyle: {
    width: 20,
    height: 20,
  },
  facebookTextStyle: {
    color: "#2553b4",
  },
  googleStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    elevation: 6,
    shadowRadius: 8,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "#ffffff",
    padding: "11px",
    marginTop: 32,
  },
  googleButtonImageStyle: {
    width: 20,
    height: 20,
  },
  googleButtonTextStyle: {
    paddingLeft: 6,
    paddingRight: 3,
    fontSize: 14,
    color: "#2553b4",
    fontFamily: "Helvetica-Bold, sans-serif",
    marginLeft: 8,
  },
  orTextStyle: {
    color: "#00000",
    fontWeight: "bold",
    alignSelf: "center",
    margin: 20,
  },
  signUpButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    elevation: 6,
    shadowRadius: 8,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "#ffffff",
    padding: "11px",
    height: "100%",
    width: "100%",
  },
  signUpButtonTextStyle: {
    color: "#2553b4",
    fontSize: 11,
    fontFamily: "Helvetica-Bold, sans-serif",
  },
  titleWhySignUp: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  labelTitle: {
    marginTop: 24,
    marginBottom: 32,
    fontSize: 32,
    textAlign: "left",
    marginVertical: 8,
    color: "#6200EE",
  },
});
// Customizable Area End

export default withRouter(SocialMediaAccountLoginScreen);
