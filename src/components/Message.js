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
    justifyContent: "space-between"
  },
  content: {
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
  messageText: {
    fontFamily: "Nunito-Light",
    fontSize: FONT_SIZES.SMALL,
    color: "#8B8B8B"
  },
  verticalLine: {
    height: 39,
    borderLeftWidth: 0.5,
    borderLeftColor: "#D5D5D5",
    paddingRight: SPACING.EXTRA_SMALL
  },
  dateText: {
    fontFamily: "Nunito-LightItalic",
    fontSize: FONT_SIZES.EXTRA_SMALL,
    color: "#E9A823",
    textAlign: "right",
    paddingBottom: SPACING.EXTRA_SMALL
  },
  timeText: {
    fontFamily: "Nunito-LightItalic",
    fontSize: FONT_SIZES.EXTRA_SMALL,
    color: "#E9A823",
    textAlign: "right"
  }
});

const MAX_TEXT_LENGTH = 25;

export default function Message({ openChat, avatar, name, text, date, time }) {
  const message =
    text.length > MAX_TEXT_LENGTH
      ? text.substring(0, MAX_TEXT_LENGTH - 3).concat("...")
      : text;

  return (
    <TouchableOpacity onPress={openChat}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.content}>
            <Image source={avatar} />
            <View style={styles.textContent}>
              <Text style={styles.nameText}>{name}</Text>
              <Text style={styles.messageText}>{message}</Text>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.verticalLine} />
            <View>
              <Text style={styles.dateText}>{date}</Text>
              <Text style={styles.timeText}>{time}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
