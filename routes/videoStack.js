import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Header from "../shared/header";
import Videos from "../screens/videos";

const screens = {
  Videos: {
    screen: Videos,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title="Videos" navigation={navigation} />,
      };
    },
  },
};

const VideoStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerForceInset: { top: "never", bottom: "never" },
    headerStyle: { backgroundColor: "#7aa4ce", height: 60 },
  },
});

export default VideoStack;
