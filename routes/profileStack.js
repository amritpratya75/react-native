import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Header from "../shared/header";
import Profile from "../screens/profile";

const screens = {
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title="Profile" navigation={navigation} />,
      };
    },
  },
};

const ProfileStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerForceInset: { top: "never", bottom: "never" },
    headerStyle: { backgroundColor: "#eee", height: 60 },
  },
});

export default ProfileStack;
