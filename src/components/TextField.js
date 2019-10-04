/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import {
  StyleSheet,
  Platform,
  View,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";
import { SPACING, FONT_FAMILY, FONT_SIZE, COLOR } from "../theme";

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    marginBottom: SPACING.LARGE,
    paddingBottom: Platform.OS === "ios" ? SPACING.SMALL : 0
  },
  inputText: {
    flex: 1,
    fontFamily: FONT_FAMILY.NUNITO_REGULAR,
    fontSize: FONT_SIZE.MEDIUM,
    color: "rgba(11, 13, 15, 0.5)"
  },
  errorText: {
    fontFamily: FONT_FAMILY.NUNITO_LIGHT_ITALIC,
    fontSize: FONT_SIZE.EXTRA_EXTRA_SMALL,
    color: COLOR.RED
  },
  forgotButtonText: {
    fontFamily: FONT_FAMILY.NUNITO_REGULAR,
    fontSize: FONT_SIZE.MEDIUM,
    color: "#0052FF"
  }
});

const ForgotButton = ({ navigateToForgot }) => (
  <TouchableOpacity onPress={navigateToForgot}>
    <Text style={styles.forgotButtonText}>Forgot?</Text>
  </TouchableOpacity>
);

export default function TextField({
  inputRef,
  onChangeText,
  value,
  error,
  navigateToForgot,
  ...other
}) {
  return (
    <View
      style={[
        styles.input,
        { borderBottomColor: error ? COLOR.RED : "rgba(112, 112, 112, 0.5)" }
      ]}
    >
      <TextInput
        ref={inputRef}
        style={styles.inputText}
        onChangeText={onChangeText}
        value={value}
        {...other}
      />
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        navigateToForgot && <ForgotButton navigateToForgot={navigateToForgot} />
      )}
    </View>
  );
}
