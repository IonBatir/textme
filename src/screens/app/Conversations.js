import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Spinner, Conversation } from "../../components";
import { CHAT_SCREEN } from "../../constants";
import { LIST_ITEM_HEIGHT } from "../../theme";
import { fetchPersonalConversations } from "../../api";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default function Conversations({ navigation }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      fetchPersonalConversations(
        data => {
          setConversations(data);
          setLoading(false);
        },
        error => {
          console.log(error);
          setLoading(false);
        }
      ),
    []
  );

  function renderItem({ item }) {
    return (
      <Conversation
        key={item.id}
        openChat={() => {
          navigation.navigate(CHAT_SCREEN, { conversationId: item.id });
        }}
        avatar={item.avatar}
        name={item.name}
        text={item.lastMessage}
        timestamp={item.lastTimestamp.toDate()}
      />
    );
  }

  return loading ? (
    <Spinner />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={conversations}
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
