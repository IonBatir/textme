import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Header, Message } from "../../components";
import { CHAT_SCREEN } from "../../constants";
import { LIST_ITEM_HEIGHT } from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const groups = [
  {
    id: "0",
    name: "Donatella Nobatti",
    text: "But I must explain to you how all this",
    date: "12 Dec",
    time: "11.10 PM"
  },
  {
    id: "1",
    name: "Paige Turner",
    text: "this application generates endless unique",
    date: "12 Dec",
    time: "11.10 PM"
  },
  {
    id: "2",
    name: "#New Year Party",
    text: "Just need one name?",
    date: "12 Dec",
    time: "11.10 PM"
  },
  {
    id: "3",
    name: "Petey Cruiser",
    text: "who avoids a pain that produces no resultant ",
    date: "12 Dec",
    time: "11.10 PM"
  },
  {
    id: "4",
    name: "Bob Frapples",
    text: "Pleasure of the moment",
    date: "12 Dec",
    time: "11.10 PM"
  },
  {
    id: "5",
    name: "Anna Mull",
    text: "behind the word mountain",
    date: "12 Dec",
    time: "11.10 PM"
  }
];

export default function Groups({ navigation }) {
  const renderItem = ({ item }) => (
    <Message
      key={item.id}
      openChat={() => navigation.navigate(CHAT_SCREEN, { name: item.name })}
      avatar={item.avatar}
      name={item.name}
      text={item.text}
      date={item.date}
      time={item.time}
    />
  );

  return (
    <View style={styles.container}>
      <Header label="Groups" />
      <FlatList
        data={groups}
        renderItem={renderItem}
        getItemLayout={(_, index) => ({
          length: LIST_ITEM_HEIGHT,
          offset: LIST_ITEM_HEIGHT * index,
          index
        })}
      />
    </View>
  );
}
