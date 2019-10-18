import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Spinner, TextField, ErrorAlert } from "../../components";
import { SPACING, FONT_FAMILY, FONT_SIZE, COLOR } from "../../theme";
import { CONVERSATIONS_SCREEN } from "../../constants";
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

export default function Register({ navigation }) {
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const passwordConfirmInput = useRef(null);
  const [username, setUsername] = useState({ value: "", error: null });
  const [email, setEmail] = useState({ value: "", error: null });
  const [password, setPassword] = useState({ value: "", error: null });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: null
  });
  const [loading, setLoading] = useState(false);

  function onRegister() {
    if (username.value.length === 0) {
      setUsername(state => ({ ...state, error: "Please fill out this field" }));
      return;
    }
    if (email.value.length === 0) {
      setEmail(state => ({ ...state, error: "Please fill out this field" }));
      return;
    }
    if (password.value.length === 0) {
      setPassword(state => ({ ...state, error: "Please fill out this field" }));
      return;
    }
    if (password.value !== confirmPassword.value) {
      setConfirmPassword(state => ({
        ...state,
        error: "Passwords do not match!"
      }));
      return;
    }

    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(({ user }) =>
        firestore()
          .collection("users")
          .doc(user.uid)
          .set({
            email: user.email,
            name: username.value,
            avatarURL: user.photoURL
          })
      )
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
      <Text style={commonStyles.title}>Welcome!</Text>
      <Text style={commonStyles.subTitle}>Please enter your account data.</Text>
      <TextField
        onChangeText={text => setUsername(state => ({ ...state, value: text }))}
        onFocus={() => setUsername(state => ({ ...state, error: null }))}
        onSubmitEditing={() => emailInput.current.focus()}
        value={username.value}
        error={username.error}
        placeholder="Username"
        returnKeyType="next"
        autoCompleteType="username"
        textContentType="username"
      />
      <TextField
        inputRef={emailInput}
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
        onSubmitEditing={() => passwordConfirmInput.current.focus()}
        value={password.value}
        error={password.error}
        placeholder="Password"
        returnKeyType="next"
        secureTextEntry
      />
      <TextField
        inputRef={passwordConfirmInput}
        onChangeText={text => {
          setConfirmPassword(state => ({ ...state, value: text }));
        }}
        onFocus={() => setConfirmPassword(state => ({ ...state, error: null }))}
        onSubmitEditing={onRegister}
        value={confirmPassword.value}
        error={confirmPassword.error}
        placeholder="Confirm Password"
        returnKeyType="go"
        secureTextEntry
      />
      <TouchableOpacity style={styles.registerButton} onPress={onRegister}>
        <Text style={styles.registerButtonText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
}
