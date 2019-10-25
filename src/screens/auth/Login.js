import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import { TextField, Spinner, ErrorAlert } from "../../components";
import { SPACING, FONT_FAMILY, FONT_SIZE, COLOR } from "../../theme";
import {
  FORGOT_PASSWORD_SCREEN,
  REGISTER_SCREEN,
  CONVERSATIONS_SCREEN
} from "../../constants";
import commonStyles from "./styles";

const styles = StyleSheet.create({
  loginButton: {
    height: 52,
    justifyContent: "center",
    backgroundColor: "#4AD285",
    marginVertical: SPACING.LARGE
  },
  loginButtonText: {
    fontFamily: FONT_FAMILY.NUNITO_BOLD,
    fontSize: FONT_SIZE.MEDIUM,
    color: COLOR.WHITE,
    textAlign: "center"
  },
  registerButtonText: {
    fontFamily: FONT_FAMILY.NUNITO_BOLD,
    fontSize: FONT_SIZE.MEDIUM,
    color: "rgba(11, 13, 15, 0.5)",
    textAlign: "center"
  }
});

export default function Login({ navigation }) {
  const passwordInput = useRef(null);
  const [email, setEmail] = useState({ value: "", error: null });
  const [password, setPassword] = useState({ value: "", error: null });
  const [loading, setLoading] = useState(false);

  function onLogin() {
    if (email.value.length === 0) {
      setEmail(state => ({ ...state, error: "Please fill out this field" }));
      return;
    }
    if (password.value.length === 0) {
      setPassword(state => ({ ...state, error: "Please fill out this field" }));
      return;
    }

    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(() => navigation.navigate(CONVERSATIONS_SCREEN))
      .catch(error => {
        setLoading(false);
        const { userInfo } = error;
        if (userInfo.code.includes("email")) {
          setEmail(state => ({ ...state, error: userInfo.message }));
          return;
        }
        if (userInfo.code.includes("password")) {
          setPassword(state => ({ ...state, error: userInfo.message }));
          return;
        }
        ErrorAlert(userInfo.message);
      });
  }

  return loading ? (
    <Spinner />
  ) : (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Welcome back!</Text>
      <Text style={commonStyles.subTitle}>Please login to your account.</Text>
      <TextField
        onChangeText={text => setEmail(state => ({ ...state, value: text }))}
        onFocus={() => setEmail(state => ({ ...state, error: null }))}
        onSubmitEditing={() => passwordInput.current.focus()}
        value={email.value}
        error={email.error}
        placeholder="Email Address"
        returnKeyType="next"
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <TextField
        inputRef={passwordInput}
        onChangeText={text => setPassword(state => ({ ...state, value: text }))}
        onFocus={() => setPassword(state => ({ ...state, error: null }))}
        onSubmitEditing={onLogin}
        value={password.value}
        error={password.error}
        placeholder="Password"
        returnKeyType="go"
        secureTextEntry
        navigateToForgot={() => navigation.navigate(FORGOT_PASSWORD_SCREEN)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(REGISTER_SCREEN)}>
        <Text style={styles.registerButtonText}>REGISTER NOW</Text>
      </TouchableOpacity>
    </View>
  );
}
