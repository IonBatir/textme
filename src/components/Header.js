import React from "react";
import { View, StyleSheet, Text } from "react-native";
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
    backgroundColor: COLOR.WHITE
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

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextMeIcon />
        <Text style={styles.title}>{APP_NAME}</Text>
        <AvatarIcon />
      </View>
    </View>
  );
}
