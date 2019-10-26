import React from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import {
  LIST_ITEM_HEIGHT,
  SPACING,
  FONT_SIZE,
  FONT_FAMILY,
  AVATAR_SIZE
} from "../theme";
import { Avatar } from "../../assets/images";

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
  avatarImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2
  },
  nameText: {
    fontFamily: FONT_FAMILY.NUNITO_SEMI_BOLD,
    fontSize: FONT_SIZE.EXTRA_LARGE,
    color: "#3C444C"
  },
  statusText: {
    fontFamily: FONT_FAMILY.NUNITO_LIGHT,
    fontSize: FONT_SIZE.MEDIUM,
    color: "#8B8B8B"
  }
});

function Contact({ openChat, avatar, name, status }) {
  return (
    <TouchableOpacity onPress={openChat}>
      <View style={styles.container}>
        <View style={styles.row}>
          {avatar ? (
            <Image style={styles.avatarImage} source={{ uri: avatar }} />
          ) : (
            <Avatar />
          )}
          <View style={styles.textContent}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

Contact.defaultProps = {
  openChat: () => {},
  name: "Unknown",
  status: "Status"
};

export default Contact;
