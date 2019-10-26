import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { SPACING, FONT_SIZE, FONT_FAMILY, AVATAR_ICON_SIZE } from "../theme";
import { AvatarIcon } from "../../assets/icons";
import { getFormatedTime } from "../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: SPACING.MEDIUM,
    marginHorizontal: SPACING.MEDIUM
  },
  leftContent: { flexDirection: "row" },
  avatarImage: {
    width: AVATAR_ICON_SIZE,
    height: AVATAR_ICON_SIZE,
    borderRadius: AVATAR_ICON_SIZE / 2
  },
  message: {
    maxWidth: "80%",
    justifyContent: "center",
    padding: SPACING.SMALL,
    borderRadius: 4
  },
  messageText: {
    fontFamily: FONT_FAMILY.NUNITO_REGULAR,
    fontSize: FONT_SIZE.MEDIUM,
    color: "#0E2A47"
  },
  timeText: {
    fontFamily: FONT_FAMILY.NUNITO_LIGHT,
    fontSize: FONT_SIZE.EXTRA_EXTRA_SMALL,
    color: "#8B8B8B"
  }
});

export default function Message({
  avatar,
  text,
  timestamp,
  isMy,
  isSameSender
}) {
  return (
    <View
      style={[
        styles.container,
        isSameSender ? { marginTop: -SPACING.SMALL } : {}
      ]}
    >
      {isMy ? (
        <>
          <Text style={styles.timeText}>{getFormatedTime(timestamp)}</Text>
          <View style={[styles.message, { backgroundColor: "#70CADB" }]}>
            <Text style={styles.messageText}>{text}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.leftContent}>
            {isSameSender ||
              (avatar ? (
                <Image style={styles.avatarImage} source={{ uri: avatar }} />
              ) : (
                <AvatarIcon />
              ))}
            <View
              style={[
                styles.message,
                {
                  backgroundColor: "#F5F5F5",
                  marginLeft:
                    SPACING.SMALL + (isSameSender ? AVATAR_ICON_SIZE : 0)
                }
              ]}
            >
              <Text style={styles.messageText}>{text}</Text>
            </View>
          </View>
          <Text style={styles.timeText}>{getFormatedTime(timestamp)}</Text>
        </>
      )}
    </View>
  );
}
