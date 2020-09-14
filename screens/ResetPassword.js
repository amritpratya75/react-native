import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import {
  isLoading,
  removeError,
  resetPassword,
} from "../redux/actions/authAction";

class Login extends Component {
  state = {
    email: "",
  };

  emailChanged = (val) => {
    this.props.removeError();
    this.setState({
      email: val,
    });
  };

  handleClick = () => {
    Keyboard.dismiss();
    this.props.isLoading({ resetPassword: true });
    this.props.resetPassword(this.state);
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <StatusBar backgroundColor="#7aa4ce" barStyle="light-content" />

          <View style={styles.header}>
            <Text style={styles.text_header}>Password Reset</Text>
          </View>
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            {this.props.isLoad.emailSent ? (
              <View>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  A Reset Password Link has been send to your E-mail
                </Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "600", marginTop: 20 }}
                >
                  Kindly check your E-mail
                </Text>
              </View>
            ) : (
              <View>
                <Text style={styles.text_footer}>Email</Text>

                <View style={styles.action}>
                  <Feather name="mail" color={"black"} size={20} />
                  <TextInput
                    placeholder="Your Email"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => this.emailChanged(val)}
                  />
                </View>
              </View>
            )}

            {this.props.error.resetPassword ? (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  {this.props.error.resetPassword}
                </Text>
              </Animatable.View>
            ) : null}

            <View style={styles.button}>
              {this.props.isLoad.emailSent ? null : (
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => {
                    this.handleClick();
                  }}
                >
                  {this.props.isLoad.resetPassword ? (
                    <View style={{ flexDirection: "row" }}>
                      <ActivityIndicator size="small" color="white" />
                      <Text
                        style={[
                          styles.textSign,
                          {
                            color: "white",
                          },
                        ]}
                      >
                        Loading
                      </Text>
                    </View>
                  ) : (
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: "white",
                        },
                      ]}
                    >
                      Reset
                    </Text>
                  )}
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => {
                  this.props.isLoading({ emailSent: false });
                  this.props.navigation.navigate("Login");
                }}
                style={[
                  styles.signIn,
                  {
                    borderWidth: 1,
                    borderColor: "#7aa4ce",
                    backgroundColor: "white",
                  },
                ]}
              >
                <Text style={styles.textSign}>Login</Text>
              </TouchableOpacity>
            </View>
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
    isLoading: (loading) => {
      dispatch(isLoading(loading));
    },
    removeError: () => {
      dispatch(removeError());
    },
    resetPassword: (state) => {
      dispatch(resetPassword(state));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
    flex: 3,
    backgroundColor: "white",
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
    color: "black",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "black",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
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
    backgroundColor: "#7aa4ce",
    marginTop: 15,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7aa4ce",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  modalView: {
    margin: 15,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
