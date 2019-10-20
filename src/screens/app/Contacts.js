import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Contact, Spinner, ErrorAlert } from "../../components";
import { CHAT_SCREEN } from "../../constants";
import { LIST_ITEM_HEIGHT } from "../../theme";
import { fetchContacts, getConversationByPartnerId } from "../../api";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default function Contacts({ navigation }) {
  const [contacts, setContacts] = useState({ data: [], loading: true });

  useEffect(() => {
    fetchContacts()
      .then(data => setContacts({ data, loading: false }))
      .catch(error => {
        setContacts({ data: [], loading: false });
        ErrorAlert(error);
      });
  }, []);

  function openChat(item) {
    getConversationByPartnerId(item)
      .then(conversation => {
        navigation.navigate(CHAT_SCREEN, { conversation, partner: item });
      })
      .catch(error => {
        ErrorAlert(error);
      });
  }

  function renderItem({ item }) {
    return (
      <Contact
        key={item.id}
        openChat={() => openChat(item)}
        avatar={item.avatarURL}
        name={item.name}
        status={item.status}
      />
    );
  }

  return contacts.loading ? (
    <Spinner />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={contacts.data}
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
