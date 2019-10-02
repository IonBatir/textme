import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Contact } from "../components";
import Avatar from "../../assets/images/avatar.png";
import { CHAT_SCREEN } from "../constants";
import { LIST_ITEM_HEIGHT } from "../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const contacts = [
  {
    id: "0",
    avatar: Avatar,
    name: "Sue Vaneer",
    status: "UX Designer"
  },
  {
    id: "1",
    avatar: Avatar,
    name: "Terry Aki",
    status: "UX Product Designer"
  },
  {
    id: "2",
    avatar: Avatar,
    name: "Paul Molive",
    status: "Head of Marketing"
  },
  {
    id: "3",
    avatar: Avatar,
    name: "Sal Monella",
    status: "CEO"
  },
  {
    id: "4",
    avatar: Avatar,
    name: "Zack Lee",
    status: "Software Engineer"
  },
  {
    id: "5",
    avatar: Avatar,
    name: "Anna Mull",
    status: "Project Manager"
  }
];

export default function Contacts({ navigation }) {
  const renderItem = ({ item }) => (
    <Contact
      key={item.id}
      openChat={() => {
        navigation.navigate(CHAT_SCREEN, { name: item.name });
      }}
      avatar={item.avatar}
      name={item.name}
      status={item.status}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
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
