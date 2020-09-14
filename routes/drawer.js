import { createDrawerNavigator } from "react-navigation-drawer";
import CustomDrawerContentComponent from "../drawerContent/drawerContent";
import React from "react";
import { Feather } from "@expo/vector-icons";

import HomeStack from "./homeStack";
import ProfileStack from "./profileStack";
import VideoStack from "./videoStack";
import NotesStack from "./notesStack";
import QuizStack from "./quizStack";

const SignedIn = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        title: "Home",
        drawerIcon: ({ tintColor }) => (
          <Feather name="home" size={24} color={tintColor} />
        ),
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        title: "Profile",
        drawerIcon: ({ tintColor }) => (
          <Feather name="user" size={24} color={tintColor} />
        ),
      },
    },
    Videos: {
      screen: VideoStack,
      navigationOptions: {
        title: "Videos",
        drawerIcon: ({ tintColor }) => (
          <Feather name="youtube" size={24} color={tintColor} />
        ),
      },
    },
    Notes: {
      screen: NotesStack,
      navigationOptions: {
        title: "Notes",
        drawerIcon: ({ tintColor }) => (
          <Feather name="book" size={24} color={tintColor} />
        ),
      },
    },
    Quiz: {
      screen: QuizStack,
      navigationOptions: {
        title: "Quiz",
        drawerIcon: ({ tintColor }) => (
          <Feather name="help-circle" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: "Home",
    drawerPosition: "left",
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
  }
);

export default SignedIn;
// export default createAppContainer(SignedIn);
