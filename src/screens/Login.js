import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { SPACING, FONT_FAMILY, FONT_SIZE, COLOR } from "../theme";
import { FORGOT_PASSWORD_SCREEN, REGISTER_SCREEN } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: SPACING.MEDIUM
  },
  title: {
    fontFamily: FONT_FAMILY.NUNITO_BOLD,
    fontSize: FONT_SIZE.EXTRA_EXTRA_LARGE,
    color: "#1D2226"
  },
  subTitle: {
    fontFamily: FONT_FAMILY.NUNITO_REGULAR,
    fontSize: FONT_SIZE.LARGE,
    color: "#1D2226",
    opacity: 0.6,
    marginBottom: SPACING.EXTRA_LARGE
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "rgba(112, 112, 112, 0.5)",
    borderBottomWidth: 1,
    marginBottom: SPACING.LARGE,
    paddingBottom: Platform.OS === "ios" ? SPACING.SMALL : 0
  },
  textInput: {
    flex: 1,
    fontFamily: FONT_FAMILY.NUNITO_REGULAR,
    fontSize: FONT_SIZE.MEDIUM,
    color: "rgba(11, 13, 15, 0.5)"
  },
  forgotButtonText: {
    fontFamily: FONT_FAMILY.NUNITO_REGULAR,
    fontSize: FONT_SIZE.MEDIUM,
    color: "#0052FF"
  },
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <Text style={styles.subTitle}>Please login to your account.</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
          placeholder="Email Address"
          returnKeyType="next"
          autoCompleteType="email"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          returnKeyType="go"
          autoCompleteType="password"
          secureTextEntry
          textContentType="password"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate(FORGOT_PASSWORD_SCREEN)}
        >
          <Text style={styles.forgotButtonText}>Forgot?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={() => {}}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(REGISTER_SCREEN)}>
        <Text style={styles.registerButtonText}>REGISTER NOW</Text>
      </TouchableOpacity>
    </View>
  );
}
