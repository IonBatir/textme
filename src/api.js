/* eslint-disable import/prefer-default-export */
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const usersRef = firestore().collection("users");

// AUTH
export const signIn = ({ email, password }) =>
  auth().signInWithEmailAndPassword(email, password);

export const createUser = ({ username, email, password }) =>
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) =>
      usersRef.doc(user.uid).set({
        email: user.email,
        name: username,
        avatarURL: user.photoURL
      })
    );

export const recoverPassword = ({ email }) =>
  auth().sendPasswordResetEmail(email);

export const subscribeOnAuthStateChanged = callback =>
  auth().onAuthStateChanged(callback);

// APP
export const fetchContacts = () =>
  usersRef.get().then(querySnapshot => {
    const users = [];
    querySnapshot.forEach(doc =>
      users.push({ ...doc.data(), id: doc.id, status: "" })
    );
    return Promise.resolve(users);
  });
