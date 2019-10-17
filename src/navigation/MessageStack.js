import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Messages, Chat, Contacts } from "../screens/app";
import { Header } from "../components";
import { MESSAGES_SCREEN, CHAT_SCREEN, CONTACTS_SCREEN } from "../constants";

export default createStackNavigator(
  {
    [MESSAGES_SCREEN]: {
      screen: Messages,
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
    initialRouteName: MESSAGES_SCREEN,
    headerMode: "screen",
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: navigation.state.index === 0
    })
  }
);
