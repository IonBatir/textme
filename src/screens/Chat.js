import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity
} from "react-native";
import { ChatMessage } from "../components";
import { SPACING, FONT_FAMILY, FONT_SIZE } from "../theme";
import {
  RightArrowIcon,
  SmileIcon,
  AttachmentIcon,
  PhotoCameraIcon,
  PictureIcon
} from "../../assets/icons";
import AvatarIcon from "../../assets/icons/avatar.png";

const styles = StyleSheet.create({
  container: { flex: 1 },
  bottom: {
    justifyContent: "flex-end",
    width: "100%",
    paddingTop: SPACING.MEDIUM,
    paddingHorizontal: SPACING.MEDIUM,
    marginBottom: Platform.OS === "ios" ? SPACING.MEDIUM : 0,
    borderTopColor: "rgba(44,44,44, 0.2)",
    borderTopWidth: 0.5
  },
  textInputView: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#F6F6F6"
  },
  textInput: {
    flex: 1,
    fontFamily: FONT_FAMILY.NUNITO_LIGHT,
    fontSize: FONT_SIZE.LARGE,
    color: "#8B8B8B",
    paddingHorizontal: SPACING.MEDIUM
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  touch: {
    padding: SPACING.MEDIUM
  }
});

const messages = [
  {
    id: "0",
    avatar: AvatarIcon,
    text: "But I must explain to you how all this",
    time: "10.11 AM",
    my: true,
    sender: "9"
  },
  {
    id: "1",
    avatar: AvatarIcon,
    text: "But I must explain to you how all this",
    time: "10.11 AM",
    my: true,
    sender: "9"
  },
  {
    id: "2",
    avatar: AvatarIcon,
    text: "But I must explain to you how all this",
    time: "10.11 AM",
    my: false,
    sender: "7"
  },
  {
    id: "3",
    avatar: AvatarIcon,
    text: "But I must explain to you how all this",
    time: "10.11 AM",
    my: false,
    sender: "7"
  },
  {
    id: "4",
    avatar: AvatarIcon,
    text: "But I must explain to you how all this",
    time: "10.11 AM",
    my: true,
    sender: "9"
  }
];

export default function Chat() {
  const [message, setMessage] = useState("");
  const renderItem = ({ item, index }) => (
    <ChatMessage
      key={item.id}
      avatar={item.avatar}
      text={item.text}
      time={item.time}
      isMy={item.my}
      isSameSender={index > 0 && item.sender === messages[index - 1].sender}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList data={messages} renderItem={renderItem} />
      <View style={styles.bottom}>
        <View style={styles.textInputView}>
          <TextInput
            style={styles.textInput}
            onChangeText={setMessage}
            value={message}
            placeholder="Type a message here"
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.touch} onPress={() => {}}>
            <RightArrowIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.touch} onPress={() => {}}>
            <SmileIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress={() => {}}>
            <AttachmentIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress={() => {}}>
            <PhotoCameraIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress={() => {}}>
            <PictureIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

Chat.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("name")
});
