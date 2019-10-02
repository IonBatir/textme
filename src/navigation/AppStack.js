import React from "react";
import { Image } from "react-native";
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
import ChatIcon from "../../assets/icons/chat.png";
import GroupsIcon from "../../assets/icons/groups.png";
import SettingsIcon from "../../assets/icons/settings.png";

export default createBottomTabNavigator(
  {
    [HOME_STACK]: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: "Chat",
        tabBarIcon: <Image source={ChatIcon} />
      }
    },
    [GROUPS_SCREEN]: {
      screen: Groups,
      navigationOptions: { tabBarIcon: <Image source={GroupsIcon} /> }
    },
    [SETTINGS_SCREEN]: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: <Image source={SettingsIcon} />
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
