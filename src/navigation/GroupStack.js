import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Groups, Chat } from "../screens/app";
import { Header } from "../components";
import { GROUPS_SCREEN, CHAT_SCREEN } from "../constants";

export default createStackNavigator(
  {
    [GROUPS_SCREEN]: {
      screen: Groups,
      navigationOptions: {
        header: <Header label="Groups" />
      }
    },
    [CHAT_SCREEN]: Chat
  },
  {
    initialRouteName: GROUPS_SCREEN,
    headerMode: "screen",
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: navigation.state.index === 0
    })
  }
);
