import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import HomeStack from "./HomeStack";
import { Groups, Settings } from "../screens";
import { HOME_STACK, GROUPS_SCREEN, SETTINGS_SCREEN } from "../constants";
import {
  SPACING,
  FONT_SIZE,
  FONT_FAMILY,
  BOTTOM_NAVIGATOR_HEIGHT
} from "../theme";
import { ChatIcon, GroupsIcon, SettingsIcon } from "../../assets/icons";

export default createBottomTabNavigator(
  {
    [HOME_STACK]: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: "Chat",
        tabBarIcon: <ChatIcon />
      }
    },
    [GROUPS_SCREEN]: {
      screen: Groups,
      navigationOptions: { tabBarIcon: <GroupsIcon /> }
    },
    [SETTINGS_SCREEN]: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: <SettingsIcon />
      }
    }
  },
  {
    initialRouteName: HOME_STACK,
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
