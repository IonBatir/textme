import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { FormComponent, TextField, Spinner } from "../components";
import { SPACING, FONT_FAMILY, FONT_SIZE, COLOR } from "../theme";
import { LOGIN_SCREEN } from "../constants";
import { recoverPassword } from "../api";

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

export default class ForgotPassword extends FormComponent {
  constructor(props) {
    super(props);
    this.state = {
      form: { email: { value: "", error: null } },
      loading: false
    };
    this.onRecoverPassword = this.onRecoverPassword.bind(this);
  }

  onRecoverPassword() {
    const {
      form: { email }
    } = this.state;
    const { navigation } = this.props;

    if (email.value.length === 0) {
      this.setFieldError("email", "Please fill out this field");
      return;
    }

    this.setState({ loading: true });
    recoverPassword({ email: email.value })
      .then(() => {
        this.setState({ loading: false });
        Alert.alert(
          "Recover Password",
          "We have sent you an email with instructions to reset your password.",
          [{ text: "OK", onPress: () => navigation.navigate(LOGIN_SCREEN) }]
        );
      })
      .catch(error => {
        const { userInfo } = error;
        if (userInfo.code.includes("email")) {
          this.setFieldError("email", userInfo.message);
          return;
        }
        this.setState({ loading: false });
        Alert.alert("Recover Password Error", error.nativeErrorMessage, [
          { text: "OK", onPress: () => {} }
        ]);
      });
  }

  render() {
    const {
      form: { email },
      loading
    } = this.state;

    return loading ? (
      <Spinner />
    ) : (
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subTitle}>Please enter email to your account.</Text>
        <View style={styles.input}>
          <TextField
            onChangeText={text => this.setFieldValue("email", text)}
            onFocus={() => this.setFieldError("email", null)}
            onSubmitEditing={this.onRecoverPassword}
            value={email.value}
            error={email.error}
            placeholder="Email Address"
            returnKeyType="go"
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          style={styles.recoverButton}
          onPress={this.onRecoverPassword}
        >
          <Text style={styles.recoverButtonText}>RECOVER PASSWORD</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
