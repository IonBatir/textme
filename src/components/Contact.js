import React from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import { LIST_ITEM_HEIGHT, SPACING, FONT_SIZES } from "../theme";

const styles = StyleSheet.create({
  container: {
    height: LIST_ITEM_HEIGHT,
    margin: SPACING.MEDIUM
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  textContent: {
    paddingLeft: SPACING.SMALL
  },
  nameText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZES.EXTRA_LARGE,
    color: "#3C444C"
  },
  statusText: {
    fontFamily: "Nunito-Light",
    fontSize: FONT_SIZES.MEDIUM,
    color: "#8B8B8B"
  }
});

export default function Contact({ openChat, avatar, name, status }) {
  return (
    <TouchableOpacity onPress={openChat}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Image source={avatar} />
          <View style={styles.textContent}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
