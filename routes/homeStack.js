import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Header from "../shared/header";
import Home from "../screens/home";
import viewNotes from "../screens/viewNotes";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header title="Previous Activity" navigation={navigation} />
        ),
      };
    },
  },
  viewNotes: {
    screen: viewNotes,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header title="View Notes" navigation={navigation} />
        ),
      };
    },
  },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerForceInset: { top: "never", bottom: "never" },
    headerStyle: { backgroundColor: "#7aa4ce", height: 60 },
  },
});

export default HomeStack;
