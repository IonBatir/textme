import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { Conversation, Spinner, ErrorAlert } from "../../components";
import { CHAT_SCREEN } from "../../constants";
import { LIST_ITEM_HEIGHT } from "../../theme";
import { fetchGroupConversations } from "../../api";
import commonStyles from "./styles";

export default function Groups({ navigation }) {
  const [conversations, setConversations] = useState({
    data: [],
    loading: true
  });

  useEffect(
    () =>
      fetchGroupConversations(
        data => {
          setConversations({ data, loading: false });
        },
        error => {
          ErrorAlert(error);
          setConversations({ data: [], loading: false });
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
        text={item.text}
        date={item.date}
        time={item.time}
      />
    );
  }

  if (conversations.loading) return <Spinner />;

  if (conversations.data.length === 0)
    return (
      <View style={commonStyles.centerContainer}>
        <Text style={commonStyles.text}>No groups yet. Create one!</Text>
      </View>
    );

  return (
    <View style={commonStyles.container}>
      <FlatList
        data={conversations.data}
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
