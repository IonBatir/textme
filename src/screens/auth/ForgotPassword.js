import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { TextField, Spinner, ErrorAlert } from "../../components";
import { SPACING, FONT_FAMILY, FONT_SIZE, COLOR } from "../../theme";
import { LOGIN_SCREEN } from "../../constants";
import commonStyles from "./styles";

const styles = StyleSheet.create({
  recoverButton: {
    height: 52,
    justifyContent: "center",
    backgroundColor: "#4AD285",
    marginVertical: SPACING.LARGE
  },
  recoverButtonText: {
    fontFamily: FONT_FAMILY.NUNITO_BOLD,
    fontSize: FONT_SIZE.MEDIUM,
    color: COLOR.WHITE,
    textAlign: "center"
  }
});

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: null });
  const [loading, setLoading] = useState(false);

  function onRecoverPassword() {
    if (email.value.length === 0) {
      setEmail(state => ({ ...state, error: "Please fill out this field" }));
      return;
    }

    setLoading(true);
    auth()
      .sendPasswordResetEmail(email.value)
      .then(() => {
        setLoading(false);
        Alert.alert(
          "Recover Password",
          "We have sent you an email with instructions to reset your password.",
          [{ text: "OK", onPress: () => navigation.navigate(LOGIN_SCREEN) }]
        );
      })
      .catch(error => {
        setLoading(false);
        const { userInfo } = error;
        if (userInfo.code.includes("email")) {
          setEmail(state => ({ ...state, error: userInfo.message }));
          return;
        }
        ErrorAlert(userInfo.message);
      });
  }

  return loading ? (
    <Spinner />
  ) : (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Forgot Password?</Text>
      <Text style={commonStyles.subTitle}>
        Please enter email to your account.
      </Text>
      <TextField
        onChangeText={text => setEmail(state => ({ ...state, value: text }))}
        onFocus={() => setEmail(state => ({ ...state, error: null }))}
        onSubmitEditing={onRecoverPassword}
        value={email.value}
        error={email.error}
        placeholder="Email Address"
        returnKeyType="go"
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.recoverButton}
        onPress={onRecoverPassword}
      >
        <Text style={styles.recoverButtonText}>RECOVER PASSWORD</Text>
      </TouchableOpacity>
    </View>
  );
}
