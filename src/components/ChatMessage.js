import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { SPACING, FONT_SIZE, FONT_FAMILY, AVATAR_ICON_SIZE } from "../theme";
import { AvatarIcon } from "../../assets/icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: SPACING.MEDIUM,
    marginHorizontal: SPACING.SMALL
  },
  leftContent: { flexDirection: "row" },
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

export default function ChatMessage({
  avatar,
  text,
  time,
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
          <View style={styles.leftContent}>
            {isSameSender ||
              (avatar ? (
                <Image
                  source={{ uri: avatar }}
                  style={{ width: AVATAR_ICON_SIZE, height: AVATAR_ICON_SIZE }}
                />
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
          <Text style={styles.timeText}>{time}</Text>
        </>
      ) : (
        <>
          <Text style={styles.timeText}>{time}</Text>
          <View style={[styles.message, { backgroundColor: "#70CADB" }]}>
            <Text style={styles.messageText}>{text}</Text>
          </View>
        </>
      )}
    </View>
  );
}
