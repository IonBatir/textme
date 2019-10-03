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
import { LOGIN_SCREEN } from "../constants";

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
  registerButton: {
    height: 52,
    justifyContent: "center",
    backgroundColor: "#4AD285",
    marginVertical: SPACING.LARGE
  },
  registerButtonText: {
    fontFamily: FONT_FAMILY.NUNITO_BOLD,
    fontSize: FONT_SIZE.MEDIUM,
    color: COLOR.WHITE,
    textAlign: "center"
  }
});

export default function Register({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subTitle}>Please enter your account data.</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          onChangeText={setFirstName}
          value={firstName}
          placeholder="First Name"
          returnKeyType="next"
          autoCompleteType="name"
          textContentType="givenName"
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          onChangeText={setLastName}
          value={lastName}
          placeholder="Last Name"
          returnKeyType="next"
          autoCompleteType="name"
          textContentType="familyName"
        />
      </View>
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
          returnKeyType="next"
          autoCompleteType="password"
          secureTextEntry
          textContentType="newPassword"
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm Password"
          returnKeyType="go"
          autoCompleteType="password"
          secureTextEntry
          textContentType="newPassword"
        />
      </View>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate(LOGIN_SCREEN)}
      >
        <Text style={styles.registerButtonText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
}
