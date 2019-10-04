/* eslint-disable import/prefer-default-export */
import auth from "@react-native-firebase/auth";

export const login = ({ email, password }) =>
  auth().signInWithEmailAndPassword(email, password);
export const register = ({ email, password }) =>
  auth().createUserWithEmailAndPassword(email, password);
export const recoverPassword = ({ email }) =>
  auth().sendPasswordResetEmail({ email });
