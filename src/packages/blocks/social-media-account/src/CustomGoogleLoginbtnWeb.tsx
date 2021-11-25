import PropTypes from "prop-types";
import React, { Component } from "react";
import { Text, Image, TouchableOpacity, View, StyleSheet } from "react-native";

import { googleIcon } from "./assets";

type Props = {
  testID: string;
  //loginGoogleButtonText: string;
  style: any;
  googleButtonImageStyle: any;
  googleButtonTextStyle: any;
  onPress: () => void;
  // Customizable Area Start
  // Customizable Area End
};

export default class CustomGoogleLogInButton extends Component<Props> {
  static propTypes = {
    testID: PropTypes.string,
    style: PropTypes.any,
    googleButtonImageStyle: PropTypes.any,
    //googleButtonTextStyle: PropTypes.any,
    // loginGoogleButtonText: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    // Customizable Area Start
    // Customizable Area End
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress();
        }}
        //style={this.props.style}
      >
        <View style={styles.googlebtnContainer}>
          <Image source={googleIcon} style={styles.googlicon} />
        </View>
        {/* <Text style={this.props.googleButtonTextStyle}>
          {this.props.loginGoogleButtonText}
        </Text> */}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  // Customizable Area Start
  googlebtnContainer: {
    backgroundColor: "#3AAEEF",
    width: 45,
    height: 45,
    borderRadius: 16,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5
  },
  googlicon: {
    height: 15,
    width: 15,
    flexDirection: "column",
    alignSelf: "center",
  },
});
