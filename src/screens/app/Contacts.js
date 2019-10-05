import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Contact } from "../../components";
import { CHAT_SCREEN } from "../../constants";
import { LIST_ITEM_HEIGHT } from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const contacts = [
  {
    id: "0",
    name: "Sue Vaneer",
    status: "UX Designer"
  },
  {
    id: "1",
    name: "Terry Aki",
    status: "UX Product Designer"
  },
  {
    id: "2",
    name: "Paul Molive",
    status: "Head of Marketing"
  },
  {
    id: "3",
    name: "Sal Monella",
    status: "CEO"
  },
  {
    id: "4",
    name: "Zack Lee",
    status: "Software Engineer"
  },
  {
    id: "5",
    name: "Anna Mull",
    status: "Project Manager"
  }
];

export default function Contacts({ navigation }) {
  const renderItem = ({ item }) => (
    <Contact
      key={item.id}
      openChat={() => navigation.navigate(CHAT_SCREEN, { name: item.name })}
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
