import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Contact, Spinner } from "../../components";
import { CHAT_SCREEN } from "../../constants";
import { LIST_ITEM_HEIGHT } from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default function Contacts({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firestore()
      .collection("users")
      .get()
      .then(querySnapshot => {
        const users = [];
        querySnapshot.forEach(doc => users.push({ ...doc.data(), id: doc.id }));
        setContacts(users);
        setLoading(false);
      });
  }, []);

  function renderItem({ item }) {
    return (
      <Contact
        key={item.id}
        openChat={() => navigation.navigate(CHAT_SCREEN, { contact: item })}
        avatar={item.avatarURL}
        name={item.name}
        status={item.status}
      />
    );
  }

  return loading ? (
    <Spinner />
  ) : (
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
