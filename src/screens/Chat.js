import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { ChatMessage } from "../components";
import Avatar from "../../assets/icons/avatar.png";

const styles = StyleSheet.create({
  container: { flex: 1 }
});

const messages = [
  {
    id: "0",
    avatar: Avatar,
    text: "But I must explain to you how all this",
    time: "10.11 AM",
    my: true,
    sender: "9"
  },
  {
    id: "1",
    avatar: Avatar,
    text: "But I must explain to you how all this",
    time: "10.11 AM",
    my: true,
    sender: "9"
  },
  {
    id: "2",
    avatar: Avatar,
    text: "But I must explain to you how all this",
    time: "10.11 AM",
    my: false,
    sender: "7"
  },
  {
    id: "3",
    avatar: Avatar,
    text: "But I must explain to you how all this",
    time: "10.11 AM",
    my: false,
    sender: "7"
  },
  {
    id: "4",
    avatar: Avatar,
    text: "But I must explain to you how all this",
    time: "10.11 AM",
    my: true,
    sender: "9"
  }
];

export default function Chat() {
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
    </View>
  );
}

Chat.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("name")
});
