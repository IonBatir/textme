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
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts()
      .then(users => {
        setContacts(users);
        setLoading(false);
      })
      .catch(error => {
        ErrorAlert(error.userInfo.message);
        setLoading(false);
      });
  }, []);

  function renderItem({ item }) {
    return (
      <Contact
        key={item.id}
        openChat={() => {
          getConversationByPartnerId(item)
            .then(conversation => {
              navigation.navigate(CHAT_SCREEN, { conversation });
            })
            .catch(error => {
              ErrorAlert(error.userInfo.message);
            });
        }}
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
