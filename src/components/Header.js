import React from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import { TextMeIcon, AvatarIcon } from "../../assets/icons";
import {
  COLOR,
  SPACING,
  FONT_SIZE,
  FONT_FAMILY,
  HEADER_HEIGHT
} from "../theme";
import { APP_NAME } from "../constants";

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    borderBottomColor: COLOR.HORIZONTAL_LINE,
    borderBottomWidth: 0.5
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.MEDIUM
  },
  title: {
    fontFamily: FONT_FAMILY.NUNITO_BOLD,
    fontSize: FONT_SIZE.EXTRA_LARGE
  }
});

export default function Header({ label }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <TextMeIcon />
        <Text style={styles.title}>{label || APP_NAME}</Text>
        <AvatarIcon />
      </View>
    </SafeAreaView>
  );
}
