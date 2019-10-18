import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Conversations, Chat, Contacts } from "../screens/app";
import { Header } from "../components";
import {
  CONVERSATIONS_SCREEN,
  CHAT_SCREEN,
  CONTACTS_SCREEN
} from "../constants";

export default createStackNavigator(
  {
    [CONVERSATIONS_SCREEN]: {
      screen: Conversations,
      navigationOptions: {
        header: ({ navigation }) => (
          <Header toContacts={() => navigation.navigate(CONTACTS_SCREEN)} />
        )
      }
    },
    [CHAT_SCREEN]: Chat,
    [CONTACTS_SCREEN]: {
      screen: Contacts,
      navigationOptions: {
        headerTitle: "Contacts"
      }
    }
  },
  {
    initialRouteName: CONVERSATIONS_SCREEN,
    headerMode: "screen",
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: navigation.state.index === 0
    })
  }
);
