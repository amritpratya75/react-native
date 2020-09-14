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
import { login, isLoading, removeError } from "../redux/actions/authAction";

class Login extends Component {
  state = {
    email: "",
    password: "",
    secureTextEntry: true,
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

  updateSecureTextEntry = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  };

  handleClick = () => {
    Keyboard.dismiss();
    this.props.isLoading({ loginLoading: true });
    this.props.login(this.state, this.props.navigation);
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <StatusBar backgroundColor="#7aa4ce" barStyle="light-content" />

          <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
          </View>
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
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

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 35,
                },
              ]}
            >
              Password
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color={"black"} size={20} />
              <TextInput
                placeholder="Your Password"
                placeholderTextColor="#666666"
                secureTextEntry={this.state.secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => this.passwordChanged(val)}
              />
              <TouchableOpacity onPress={() => this.updateSecureTextEntry()}>
                {this.state.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {this.props.error.loginError ? (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  {this.props.error.loginError}
                </Text>
              </Animatable.View>
            ) : null}

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("ResetPassword")}
            >
              <Text style={{ color: "#7aa4ce", marginTop: 15 }}>
                Forgot password?
              </Text>
            </TouchableOpacity>
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => {
                  this.handleClick();
                }}
              >
                {this.props.isLoad.loginLoading ? (
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
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Register");
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
                <Text style={styles.textSign}>Sign Up</Text>
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
    login: (state, navigation) => {
      dispatch(login(state, navigation));
    },
    isLoading: (loading) => {
      dispatch(isLoading(loading));
    },
    removeError: () => {
      dispatch(removeError());
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
