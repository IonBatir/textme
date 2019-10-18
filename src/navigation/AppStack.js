import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import MessageStack from "./MessageStack";
import GroupStack from "./GroupStack";
import { Settings } from "../screens/app";
import { MESSAGE_STACK, GROUP_STACK, SETTINGS_SCREEN } from "../constants";
import {
  SPACING,
  FONT_SIZE,
  FONT_FAMILY,
  BOTTOM_NAVIGATOR_HEIGHT
} from "../theme";
import { ChatIcon, GroupsIcon, SettingsIcon } from "../../assets/icons";

export default createBottomTabNavigator(
  {
    [MESSAGE_STACK]: {
      screen: MessageStack,
      navigationOptions: {
        tabBarLabel: "Conversations",
        tabBarIcon: <ChatIcon />
      }
    },
    [GROUP_STACK]: {
      screen: GroupStack,
      navigationOptions: { tabBarLabel: "Groups", tabBarIcon: <GroupsIcon /> }
    },
    [SETTINGS_SCREEN]: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: <SettingsIcon />
      }
    }
  },
  {
    initialRouteName: MESSAGE_STACK,
    tabBarOptions: {
      style: {
        height: BOTTOM_NAVIGATOR_HEIGHT,
        paddingVertical: SPACING.SMALL
      },
      labelStyle: {
        fontFamily: FONT_FAMILY.NUNITO_LIGHT,
        fontSize: FONT_SIZE.SMALL
      }
    }
  }
);
