import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import { signUp, isLoading, removeError } from "../redux/actions/authAction";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    contact: "",
    secureTextEntry: true,
  };
  nameChanged = (val) => {
    this.props.removeError();

    this.setState({
      name: val,
    });
  };
  emailChanged = (val) => {
    this.props.removeError();

    this.setState({
      email: val,
    });
  };
  passwordChanged = (val) => {
    this.props.removeError();

    this.setState({
      password: val,
    });
  };
  contactChanged = (val) => {
    this.props.removeError();

    this.setState({
      contact: val,
    });
  };
  updateSecureTextEntry = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  };
  handleClick = () => {
    Keyboard.dismiss();
    this.props.isLoading({ signUpLoading: true });
    this.props.signUp(this.state, this.props.navigation);
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <StatusBar backgroundColor="#7aa4ce" barStyle="light-content" />
          <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
          </View>
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <ScrollView>
              <Text style={styles.text_footer}>Name</Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Name"
                  style={styles.textInput}
                  autoCapitalize="words"
                  onChangeText={(val) => {
                    this.nameChanged(val);
                  }}
                />
              </View>

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 30,
                  },
                ]}
              >
                Email
              </Text>
              <View style={styles.action}>
                <Feather name="mail" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Email"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => {
                    this.emailChanged(val);
                  }}
                />
              </View>

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 30,
                  },
                ]}
              >
                Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Password"
                  style={styles.textInput}
                  secureTextEntry={this.state.secureTextEntry ? true : false}
                  autoCapitalize="none"
                  onChangeText={(val) => {
                    this.passwordChanged(val);
                  }}
                />
                <TouchableOpacity onPress={() => this.updateSecureTextEntry()}>
                  {this.state.secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 30,
                  },
                ]}
              >
                Phone No.
              </Text>
              <View style={styles.action}>
                <Feather name="phone" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Phone No."
                  style={styles.textInput}
                  autoCapitalize="none"
                  keyboardType={"numeric"}
                  onChangeText={(val) => {
                    this.contactChanged(val);
                  }}
                />
              </View>
              {this.props.error.signUpError ? (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    {this.props.error.signUpError}
                  </Text>
                </Animatable.View>
              ) : null}

              <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                  By signing up you agree to our
                </Text>
                <Text
                  style={[styles.color_textPrivate, { fontWeight: "bold" }]}
                >
                  {" "}
                  Terms of service
                </Text>
                <Text style={styles.color_textPrivate}> and</Text>
                <Text
                  style={[styles.color_textPrivate, { fontWeight: "bold" }]}
                >
                  {" "}
                  Privacy policy
                </Text>
              </View>
              <View style={styles.button}>
                <TouchableOpacity
                  style={[
                    styles.signIn,
                    {
                      backgroundColor: "#7aa4ce",
                    },
                  ]}
                  onPress={() => {
                    this.handleClick();
                  }}
                >
                  {this.props.isLoad.signUpLoading ? (
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: "#fff",
                        },
                      ]}
                    >
                      ...Loading
                    </Text>
                  ) : (
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: "#fff",
                        },
                      ]}
                    >
                      Sign Up
                    </Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={[
                    styles.signIn,
                    {
                      borderColor: "#7aa4ce",
                      borderWidth: 1,
                      marginTop: 15,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#7aa4ce",
                      },
                    ]}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

function mapStateToProps(state) {
  const { AuthReducer } = state;
  return {
    error: AuthReducer.error,
    isLoad: AuthReducer.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: (state, navigation) => dispatch(signUp(state, navigation)),
    isLoading: (loading) => {
      dispatch(isLoading(loading));
    },
    removeError: () => {
      dispatch(removeError());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7aa4ce",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 7,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 16,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
});
