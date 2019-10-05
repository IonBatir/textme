import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { FormComponent, TextField, Spinner } from "../../components";
import { SPACING, FONT_FAMILY, FONT_SIZE, COLOR } from "../../theme";
import {
  FORGOT_PASSWORD_SCREEN,
  REGISTER_SCREEN,
  APP_STACK
} from "../../constants";
import { login, subscribeOnAuthStateChanged } from "../../api";
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

export default class Login extends FormComponent {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: { value: "", error: null },
        password: { value: "", error: null }
      },
      loading: false
    };
    this.passwordInput = React.createRef();
    this.onLogin = this.onLogin.bind(this);
    this.unsubscribe = null;
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ loading: true });
    this.unsubscribe = subscribeOnAuthStateChanged(user =>
      user
        ? navigation.navigate(APP_STACK, { user })
        : this.setState({ loading: false })
    );
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  onLogin() {
    const {
      form: { email, password }
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

    this.setState({ loading: true });
    login({ email: email.value, password: password.value })
      .then(user => navigation.navigate(APP_STACK, { user }))
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
        Alert.alert("Login Error", userInfo.message, [
          { text: "OK", onPress: () => {} }
        ]);
      });
  }

  render() {
    const {
      form: { email, password },
      loading
    } = this.state;
    const { navigation } = this.props;

    return loading ? (
      <Spinner />
    ) : (
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>Welcome back!</Text>
        <Text style={commonStyles.subTitle}>Please login to your account.</Text>
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
          onSubmitEditing={this.onLogin}
          value={password.value}
          error={password.error}
          placeholder="Password"
          returnKeyType="go"
          secureTextEntry
          navigateToForgot={() => navigation.navigate(FORGOT_PASSWORD_SCREEN)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={this.onLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(REGISTER_SCREEN)}>
          <Text style={styles.registerButtonText}>REGISTER NOW</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
