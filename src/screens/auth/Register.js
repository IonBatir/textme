import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { FormComponent, Spinner, TextField } from "../../components";
import { SPACING, FONT_FAMILY, FONT_SIZE, COLOR } from "../../theme";
import { MESSAGES_SCREEN } from "../../constants";
import { register } from "../../api";
import commonStyles from "./styles";

const styles = StyleSheet.create({
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

export default class Register extends FormComponent {
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

    if (email.value.length === 0) {
      this.setFieldError("email", "Please fill out this field");
      return;
    }
    if (password.value.length === 0) {
      this.setFieldError("password", "Please fill out this field");
      return;
    }
    if (password.value !== confirmPassword.value) {
      this.setFieldError("confirmPassword", "Passwords do not match!");
      return;
    }

    this.setState({ loading: true });
    register({ email: email.value, password: password.value })
      // eslint-disable-next-line no-underscore-dangle
      .then(user => navigation.navigate(MESSAGES_SCREEN, { user: user._user }))
      .catch(error => {
        const { userInfo } = error;
        if (userInfo.code.includes("email")) {
          this.setFieldError("email", userInfo.message);
          return;
        }
        if (userInfo.code.includes("password")) {
          this.setFieldError("password", userInfo.message);
          return;
        }
        this.setState({ loading: false });
        Alert.alert("Register Error", userInfo.message, [
          { text: "OK", onPress: () => {} }
        ]);
      });
  }

  render() {
    const {
      form: { email, password, confirmPassword },
      loading
    } = this.state;

    return loading ? (
      <Spinner />
    ) : (
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>Welcome!</Text>
        <Text style={commonStyles.subTitle}>
          Please enter your account data.
        </Text>
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