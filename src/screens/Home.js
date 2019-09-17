import React from "react";
import { View, StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import Messages from "./Messages";
import Contacts from "./Contacts";
import { Header } from "../components";
import { FONT_SIZES, COLORS } from "../theme";
import { MESSAGES_SCREEN, CONTACTS_SCREEN } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND
  },
  screenTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const TabNavigator = createMaterialTopTabNavigator(
  {
    [MESSAGES_SCREEN]: Messages,
    [CONTACTS_SCREEN]: Contacts
  },
  {
    initialRouteName: MESSAGES_SCREEN,
    tabBarOptions: {
      style: { backgroundColor: COLORS.WHITE },
      labelStyle: {
        fontFamily: "Nunito-Regular",
        fontSize: FONT_SIZES.EXTRA_LARGE,
        color: "#0E2A47"
      },
      indicatorStyle: { backgroundColor: "#3DBA91" }
    }
  }
);

const Tabs = createAppContainer(TabNavigator);

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <Tabs />
    </View>
  );
}
