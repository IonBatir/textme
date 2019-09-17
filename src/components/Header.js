import React from "react";
import { SafeAreaView, View, StyleSheet, Image, Text } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import TextMeIcon from "../../assets/icons/textme.png";
import AvatarIcon from "../../assets/icons/avatar.png";
import { COLORS, SPACING, FONT_SIZES } from "../theme";
import { APP_NAME } from "../constants";

const styles = StyleSheet.create({
  container: {
    height: 64 + getStatusBarHeight(),
    backgroundColor: COLORS.WHITE
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.MEDIUM
  },
  title: {
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZES.EXTRA_LARGE
  }
});

export default function Header() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={TextMeIcon} />
        <Text style={styles.title}>{APP_NAME}</Text>
        <Image source={AvatarIcon} />
      </View>
    </SafeAreaView>
  );
}
