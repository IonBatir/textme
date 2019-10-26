import React from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import {
  LIST_ITEM_HEIGHT,
  SPACING,
  FONT_SIZE,
  FONT_FAMILY,
  AVATAR_SIZE
} from "../theme";
import { getFormatedDate, getFormatedTime } from "../utils";
import { Avatar } from "../../assets/images";

const styles = StyleSheet.create({
  container: {
    height: LIST_ITEM_HEIGHT,
    margin: SPACING.SMALL
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
  avatarImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2
  },
  textContent: {
    width: "64%",
    paddingLeft: SPACING.SMALL
  },
  nameText: {
    fontFamily: FONT_FAMILY.NUNITO_SEMI_BOLD,
    fontSize: FONT_SIZE.EXTRA_LARGE,
    color: "#3C444C"
  },
  messageText: {
    fontFamily: FONT_FAMILY.NUNITO_LIGHT,
    fontSize: FONT_SIZE.SMALL,
    color: "#8B8B8B"
  },
  verticalLine: {
    height: 39,
    borderLeftWidth: 0.5,
    borderLeftColor: "#D5D5D5",
    paddingRight: SPACING.EXTRA_SMALL
  },
  dateText: {
    fontFamily: FONT_FAMILY.NUNITO_LIGHT_ITALIC,
    fontSize: FONT_SIZE.EXTRA_SMALL,
    color: "#E9A823",
    textAlign: "right",
    paddingBottom: SPACING.EXTRA_SMALL
  },
  timeText: {
    fontFamily: FONT_FAMILY.NUNITO_LIGHT_ITALIC,
    fontSize: FONT_SIZE.EXTRA_SMALL,
    color: "#E9A823",
    textAlign: "right"
  }
});

export default function Conversation({
  openChat,
  avatar,
  name,
  text,
  timestamp
}) {
  return (
    <TouchableOpacity onPress={openChat}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.content}>
            {avatar ? (
              <Image style={styles.avatarImage} source={{ uri: avatar }} />
            ) : (
              <Avatar />
            )}
            <View style={styles.textContent}>
              <Text style={styles.nameText}>{name}</Text>
              <Text style={styles.messageText} numberOfLines={1}>
                {text}
              </Text>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.verticalLine} />
            <View>
              <Text style={styles.dateText}>
                {timestamp && getFormatedDate(timestamp)}
              </Text>
              <Text style={styles.timeText}>
                {timestamp && getFormatedTime(timestamp)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
