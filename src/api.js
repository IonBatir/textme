/* eslint-disable import/prefer-default-export */
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const { uid } = auth().currentUser;

const usersRef = firestore().collection("users");
const conversationsRef = firestore().collection("conversations");

export const fetchContacts = () =>
  usersRef.get().then(querySnapshot => {
    const users = [];
    querySnapshot.forEach(doc => users.push({ ...doc.data(), id: doc.id }));
    return Promise.resolve(users);
  });

export const fetchPersonalConversations = (successCallback, errorCallback) =>
  conversationsRef
    .where("membersId", "array-contains", uid)
    .where("member_count", "==", 2)
    .onSnapshot(
      querySnapshot => {
        const conversations = [];
        querySnapshot.forEach(doc => {
          const { members, lastMessage, lastTimestamp } = doc.data();
          const partner = members.find(member => member.id !== uid);
          conversations.push({
            id: doc.id,
            name: partner.name,
            avatar: partner.avatarURL,
            lastMessage,
            lastTimestamp
          });
        });
        successCallback(conversations);
      },
      error => errorCallback(error)
    );

export const fetchGroupConversations = (successCallback, errorCallback) =>
  conversationsRef
    .where("membersId", "array-contains", uid)
    .where("member_count", ">", 2)
    .onSnapshot(
      querySnapshot => {
        const conversations = [];
        querySnapshot.forEach(doc => {
          const { name, avatarURL, lastMessage, lastTimestamp } = doc.data();
          conversations.push({
            id: doc.id,
            name,
            avatar: avatarURL,
            lastMessage,
            lastTimestamp
          });
        });
        successCallback(conversations);
      },
      error => errorCallback(error)
    );
