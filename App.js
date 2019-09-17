import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Home, Groups, Settings } from "./src/screens";
import { HOME_SCREEN, GROUPS_SCREEN, SETTINGS_SCREEN } from "./src/constants";
import ChatIcon from "./assets/icons/chat.png";
import GroupsIcon from "./assets/icons/groups.png";
import SettingsIcon from "./assets/icons/settings.png";
import { SPACING, FONT_SIZES } from "./src/theme";

const MainNavigator = createBottomTabNavigator(
  {
    [HOME_SCREEN]: {
      screen: Home,
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
    initialRouteName: HOME_SCREEN,
    tabBarOptions: {
      style: { height: 60, paddingTop: SPACING.SMALL },
      labelStyle: { fontFamily: "Nunito-Light", fontSize: FONT_SIZES.SMALL }
    }
  }
);

export default createAppContainer(MainNavigator);

// eslint-disable-next-line no-console
console.disableYellowBox = true;
