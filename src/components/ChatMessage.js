import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { SPACING, FONT_SIZES, AVATAR_SIZE } from "../theme";

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
    fontFamily: "Nunito-Regular",
    fontSize: FONT_SIZES.MEDIUM,
    color: "#0E2A47"
  },
  timeText: {
    fontFamily: "Nunito-Light",
    fontSize: FONT_SIZES.EXTRA_EXTRA_SMALL,
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
            {isSameSender || <Image source={avatar} />}
            <View
              style={[
                styles.message,
                {
                  backgroundColor: "#F5F5F5",
                  marginLeft: SPACING.SMALL + (isSameSender ? AVATAR_SIZE : 0)
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
