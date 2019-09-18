import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Platform
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import TextMeIcon from "../../assets/icons/textme.png";
import AvatarIcon from "../../assets/icons/avatar.png";
import { COLORS, SPACING, FONT_SIZES } from "../theme";
import { APP_NAME } from "../constants";

const styles = StyleSheet.create({
  container: {
    height: 40 + (Platform.OS === "ios" ? getStatusBarHeight() : 0),
    marginTop: Platform.OS === "ios" ? 0 : SPACING.MEDIUM,
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
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Image source={TextMeIcon} />
        <Text style={styles.title}>{APP_NAME}</Text>
        <Image source={AvatarIcon} />
      </View>
    </SafeAreaView>
  );
}
