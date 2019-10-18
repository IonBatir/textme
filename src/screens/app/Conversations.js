import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { Spinner, Conversation, ErrorAlert } from "../../components";
import { CHAT_SCREEN } from "../../constants";
import { LIST_ITEM_HEIGHT } from "../../theme";
import { fetchPersonalConversations } from "../../api";
import commonStyles from "./styles";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default function Conversations({ navigation }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      fetchPersonalConversations(
        data => {
          setConversations(data);
          setLoading(false);
        },
        error => {
          ErrorAlert(error.userInfo.message);
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
          navigation.navigate(CHAT_SCREEN, { conversation: item });
        }}
        avatar={item.avatar}
        name={item.name}
        text={item.lastMessage}
        timestamp={item.lastTimestamp}
      />
    );
  }

  if (loading) return <Spinner />;

  if (conversations.length === 0)
    return (
      <View style={commonStyles.centerContainer}>
        <Text style={commonStyles.text}>No conversations, yet!</Text>
      </View>
    );

  return (
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
