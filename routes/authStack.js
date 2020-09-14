import { createStackNavigator } from "react-navigation-stack";
import React from "react";
// import Header from "../shared/header";
import Login from "../screens/Login";
import Register from "../screens/register";
import Splash from "../screens/splash";
import ResetPassword from "../screens/ResetPassword";

const screens = {
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header: null,
    },
  },
  ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      header: null,
    },
  },
};

const AuthStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: { backgroundColor: "#7aa4ce", height: 60 },
  },
});

export default AuthStack;
