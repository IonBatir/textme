import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Message } from "../components";
import Avatar from "../../assets/images/avatar.png";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const messages = [
  {
    id: "0",
    avatar: Avatar,
    name: "Donatella Nobatti",
    text: "But I must explain to you how all this",
    date: "12 Dec",
    time: "11.10 PM"
  },
  {
    id: "1",
    avatar: Avatar,
    name: "Paige Turner",
    text: "this application generates endless unique",
    date: "12 Dec",
    time: "11.10 PM"
  },
  {
    id: "2",
    avatar: Avatar,
    name: "#New Year Party",
    text: "Just need one name?",
    date: "12 Dec",
    time: "11.10 PM"
  },
  {
    id: "3",
    avatar: Avatar,
    name: "Petey Cruiser",
    text: "who avoids a pain that produces no resultant ",
    date: "12 Dec",
    time: "11.10 PM"
  },
  {
    id: "4",
    avatar: Avatar,
    name: "Bob Frapples",
    text: "Pleasure of the moment",
    date: "12 Dec",
    time: "11.10 PM"
  },
  {
    id: "5",
    avatar: Avatar,
    name: "Anna Mull",
    text: "behind the word mountain",
    date: "12 Dec",
    time: "11.10 PM"
  }
];

export default function Messages() {
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Message
            key={item.id}
            avatar={item.avatar}
            name={item.name}
            text={item.text}
            date={item.date}
            time={item.time}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
