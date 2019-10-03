import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import MainNavigator from "./src/navigation";

const AppContainer = createAppContainer(MainNavigator);

export default function App() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <AppContainer />
    </KeyboardAvoidingView>
  );
}
// eslint-disable-next-line no-console
console.disableYellowBox = true;
