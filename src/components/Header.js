import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { AvatarIcon } from "../../assets/icons";
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.MEDIUM
  },
  title: {
    fontFamily: FONT_FAMILY.NUNITO_BOLD,
    fontSize: FONT_SIZE.EXTRA_LARGE
  },
  right: {
    position: "absolute",
    right: SPACING.SMALL
  }
});

function Header({ label, navigate }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{label}</Text>
        {navigate && (
          <View style={styles.right}>
            <TouchableOpacity onPress={navigate}>
              <AvatarIcon />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

Header.defaultProps = {
  label: APP_NAME
};

export default Header;
