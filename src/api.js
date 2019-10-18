/* eslint-disable import/prefer-default-export */
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const { uid } = auth().currentUser;

const usersRef = firestore().collection("users");
const conversationsRef = firestore().collection("conversations");
const userConversationsRef = firestore()
  .collection("conversations")
  .where("membersId", "array-contains", uid);

export const fetchUser = userId =>
  usersRef
    .doc(userId)
    .get()
    .then(doc =>
      doc.exists
        ? Promise.resolve(doc.data())
        : Promise.reject(new Error("No such document!"))
    );

export const fetchContacts = () =>
  usersRef.get().then(querySnapshot => {
    const users = [];
    querySnapshot.forEach(doc => users.push({ ...doc.data(), id: doc.id }));
    return Promise.resolve(users);
  });

export const fetchPersonalConversations = (successCallback, errorCallback) =>
  userConversationsRef.where("member_count", "==", 2).onSnapshot(
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
          lastTimestamp: lastTimestamp && lastTimestamp.toDate()
        });
      });
      successCallback(conversations);
    },
    error => errorCallback(error)
  );

export const fetchGroupConversations = (successCallback, errorCallback) =>
  conversationsRef.where("member_count", ">", 2).onSnapshot(
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

export const fetchMessages = (conversationId, successCallback, errorCallback) =>
  conversationsRef
    .doc(conversationId)
    .collection("messages")
    .onSnapshot(
      querySnapshot => {
        const messages = [];
        querySnapshot.forEach(doc =>
          messages.push({ ...doc.data(), id: doc.id })
        );
        successCallback(messages);
      },
      error => errorCallback(error)
    );

export const createConversation = partner =>
  fetchUser(uid).then(currentUser => {
    conversationsRef
      .add({
        member_count: 2,
        members: [
          { id: uid, name: currentUser.name, avatarURL: currentUser.avatarURL },
          { id: partner.id, name: partner.name, avatarURL: partner.avatarURL }
        ],
        membersId: [uid, partner.id]
      })
      .then(doc => {
        return Promise.resolve({
          ...doc.data(),
          id: doc.id,
          name: partner.name,
          avatar: partner.avatarURL
        });
      })
      .catch(error => Promise.reject(error));
  });

export const getConversationByPartnerId = partner =>
  userConversationsRef.get().then(querySnapshot => {
    let conversation;
    querySnapshot.forEach(doc => {
      const data = doc.data();
      if (data.membersId.includes(partner.id)) conversation = data;
    });
    return Promise.resolve(
      conversation || {
        name: partner.name
      }
    );
  });
