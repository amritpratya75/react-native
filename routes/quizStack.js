import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Header from "../shared/header";
import Quiz from "../screens/quiz";

const screens = {
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title="Quiz" navigation={navigation} />,
      };
    },
  },
};

const QuizStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerForceInset: { top: "never", bottom: "never" },
    headerStyle: { backgroundColor: "#eee", height: 60 },
  },
});

export default QuizStack;
