import React, { useRef, useEffect } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { createAppContainer, NavigationActions } from "react-navigation";
import auth from "@react-native-firebase/auth";
import MainNavigator from "./src/navigation";
import { CONVERSATIONS_SCREEN, LOGIN_SCREEN } from "./src/constants";

const AppContainer = createAppContainer(MainNavigator);

export default function App() {
  const navigatorRef = useRef();

  useEffect(
    () =>
      auth().onAuthStateChanged(user =>
        navigatorRef.current.dispatch(
          NavigationActions.navigate({
            routeName: user ? CONVERSATIONS_SCREEN : LOGIN_SCREEN
          })
        )
      ),
    []
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <AppContainer ref={navigatorRef} />
    </KeyboardAvoidingView>
  );
}
