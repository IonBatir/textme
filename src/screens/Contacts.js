import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default function Contacts() {
  return (
    <View style={styles.container}>
      <Text>Contacts</Text>
    </View>
  );
}
