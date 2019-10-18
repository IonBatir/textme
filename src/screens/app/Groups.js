import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Conversation, Spinner, ErrorAlert } from "../../components";
import { CHAT_SCREEN } from "../../constants";
import { LIST_ITEM_HEIGHT } from "../../theme";
import { fetchGroupConversations } from "../../api";
import commonStyles from "./styles";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default function Groups({ navigation }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      fetchGroupConversations(
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

  const renderItem = ({ item }) => (
    <Conversation
      key={item.id}
      openChat={() => navigation.navigate(CHAT_SCREEN, { conversation: item })}
      avatar={item.avatar}
      name={item.name}
      text={item.text}
      date={item.date}
      time={item.time}
    />
  );

  if (loading) return <Spinner />;

  if (conversations.length === 0)
    return (
      <View style={commonStyles.centerContainer}>
        <Text style={commonStyles.text}>No groups, yet!</Text>
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
