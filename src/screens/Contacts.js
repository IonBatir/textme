import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Contact } from "../components";
import Avatar from "../../assets/images/avatar.png";

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

export default function Contacts() {
  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <Contact
            key={item.id}
            avatar={item.avatar}
            name={item.name}
            status={item.status}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}