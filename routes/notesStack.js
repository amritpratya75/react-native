import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Header from "../shared/header";
import Notes from "../screens/notes";
import viewNotes from "../screens/viewNotes";

const screens = {
  Notes: {
    screen: Notes,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title="Notes" navigation={navigation} />,
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

const NotesStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerForceInset: { top: "never", bottom: "never" },
    headerStyle: { backgroundColor: "#7aa4ce", height: 60 },
  },
});

export default NotesStack;
