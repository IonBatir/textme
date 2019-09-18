import React from "react";
import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export default function Chat() {
  return (
    <View style={styles.container}>
      <Text>Chat</Text>
    </View>
  );
}

Chat.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("name")
});
