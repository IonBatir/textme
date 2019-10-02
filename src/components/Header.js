import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import TextMeIcon from "../../assets/icons/textme.png";
import AvatarIcon from "../../assets/icons/avatar.png";
import { COLORS, SPACING, FONT_SIZES, HEADER_HEIGHT } from "../theme";
import { APP_NAME } from "../constants";

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    backgroundColor: COLORS.WHITE
  },
  row: {
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
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={TextMeIcon} />
        <Text style={styles.title}>{APP_NAME}</Text>
        <Image source={AvatarIcon} />
      </View>
    </View>
  );
}
