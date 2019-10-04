import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { Spinner, TextField } from "../components";
import { SPACING, FONT_FAMILY, FONT_SIZE, COLOR } from "../theme";
import { APP_STACK } from "../constants";
import { register } from "../api";

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

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: { value: "", error: null },
        password: { value: "", error: null },
        confirmPassword: { value: "", error: null }
      },
      loading: false
    };
    this.passwordInput = React.createRef();
    this.passwordConfirmInput = React.createRef();
    this.onRegister = this.onRegister.bind(this);
  }

  onRegister() {
    const {
      form: { email, password, confirmPassword }
    } = this.state;
    const { navigation } = this.props;

    if (password.value !== confirmPassword.value) {
      this.setFieldError("confirmPassword", "Passwords do not match!");
      return;
    }

    this.setState({ loading: true });
    register({ email: email.value, password: password.value })
      .then(user => navigation.navigate(APP_STACK, { user }))
      .catch(error => {
        if (error.code.includes("email")) {
          this.setFieldError("email", error.nativeErrorMessage);
          return;
        }
        if (error.code.includes("password")) {
          this.setFieldError("password", error.nativeErrorMessage);
          return;
        }
        this.setState({ loading: false });
        Alert.alert("Register Error", error.nativeErrorMessage, [
          { text: "OK", onPress: () => {} }
        ]);
      });
  }

  setFieldValue(field, value) {
    this.setState(previousState => ({
      ...previousState,
      form: {
        ...previousState.form,
        [field]: { ...previousState.form.field, value }
      }
    }));
  }

  setFieldError(field, error) {
    this.setState(previousState => ({
      ...previousState,
      form: {
        ...previousState.form,
        [field]: { ...previousState.form.field, error }
      },
      loading: false
    }));
  }

  render() {
    const {
      form: { email, password, confirmPassword },
      loading
    } = this.state;

    return loading ? (
      <Spinner />
    ) : (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subTitle}>Please enter your account data.</Text>
        <TextField
          onChangeText={text => this.setFieldValue("email", text)}
          onFocus={() => this.setFieldError("email", null)}
          onSubmitEditing={() => this.passwordInput.current.focus()}
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
          inputRef={this.passwordInput}
          onChangeText={text => this.setFieldValue("password", text)}
          onFocus={() => this.setFieldError("password", null)}
          onSubmitEditing={() => this.passwordConfirmInput.current.focus()}
          value={password.value}
          error={password.error}
          placeholder="Password"
          returnKeyType="next"
          secureTextEntry
        />
        <TextField
          inputRef={this.passwordConfirmInput}
          onChangeText={text => this.setFieldValue("confirmPassword", text)}
          onFocus={() => this.setFieldError("confirmPassword", null)}
          onSubmitEditing={this.onRegister}
          value={confirmPassword.value}
          error={confirmPassword.error}
          placeholder="Confirm Password"
          returnKeyType="go"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={this.onRegister}
        >
          <Text style={styles.registerButtonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
