import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Message, Spinner, ErrorAlert } from "../../components";
import { COLOR, SPACING, FONT_FAMILY, FONT_SIZE } from "../../theme";
import {
  RightArrowIcon,
  SmileIcon,
  AttachmentIcon,
  PhotoCameraIcon,
  PictureIcon
} from "../../../assets/icons";
import { fetchMessages, createConversation, addMessage } from "../../api";
import commonStyles from "./styles";

const styles = StyleSheet.create({
  bottom: {
    justifyContent: "flex-end",
    width: "100%",
    paddingTop: SPACING.MEDIUM,
    paddingHorizontal: SPACING.MEDIUM,
    borderTopColor: COLOR.HORIZONTAL_LINE,
    borderTopWidth: 0.5
  },
  textInputView: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#F6F6F6"
  },
  textInput: {
    flex: 1,
    fontFamily: FONT_FAMILY.NUNITO_LIGHT,
    fontSize: FONT_SIZE.LARGE,
    color: "#8B8B8B",
    paddingHorizontal: SPACING.MEDIUM
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  touch: {
    padding: SPACING.MEDIUM
  }
});

export default function Chat({ navigation }) {
  const [message, setMessage] = useState({ value: "", sending: false });
  const [messages, setMessages] = useState({ data: [], loading: true });
  const [conversation, setConversation] = useState(
    navigation.getParam("conversation") || { id: null }
  );
  const partner = navigation.getParam("partner");

  useEffect(
    () =>
      fetchMessages(
        conversation,
        data => {
          setMessages({ data: data.reverse(), loading: false });
        },
        error => {
          ErrorAlert(error);
          setMessages({ data: [], loading: false });
        }
      ),
    [conversation.id]
  );

  function sendMessage() {
    if (message.value.length === 0) return;
    setMessage(state => ({ ...state, sending: true }));
    if (conversation.id) {
      addMessage(conversation.id, message.value)
        .then(() => setMessage({ value: "", sending: false }))
        .catch(error => {
          ErrorAlert(error);
          setMessage(state => ({ ...state, sending: false }));
        });
    } else {
      createConversation(partner)
        .then(data => {
          setConversation(data);
          return addMessage(data.id, message.value);
        })
        .then(() => setMessage({ value: "", sending: false }))
        .catch(error => {
          ErrorAlert(error);
          setMessage(state => ({ ...state, sending: false }));
        });
    }
  }

  function renderItem({ item, index }) {
    return (
      <Message
        key={item.id}
        avatar={item.avatar}
        text={item.text}
        timestamp={item.timestamp}
        isMy={item.my}
        isSameSender={
          index !== messages.data.length - 1 &&
          item.from === messages.data[index + 1].from
        }
      />
    );
  }

  return messages.loading ? (
    <Spinner />
  ) : (
    <SafeAreaView style={commonStyles.container}>
      {messages.data.length === 0 ? (
        <View style={commonStyles.centerContainer}>
          <Text style={commonStyles.text}>
            No messages here yet. Say Hello!
          </Text>
        </View>
      ) : (
        <FlatList data={messages.data} renderItem={renderItem} inverted />
      )}
      <View style={styles.bottom}>
        <View style={styles.textInputView}>
          <TextInput
            style={styles.textInput}
            onChangeText={value => setMessage(state => ({ ...state, value }))}
            value={message.value}
            onSubmitEditing={sendMessage}
            placeholder="Type a message here"
            returnKeyType="send"
          />
          <View>
            {message.sending ? (
              <ActivityIndicator style={styles.touch} />
            ) : (
              <TouchableOpacity style={styles.touch} onPress={sendMessage}>
                <RightArrowIcon />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.touch} onPress={() => {}}>
            <SmileIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress={() => {}}>
            <AttachmentIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress={() => {}}>
            <PhotoCameraIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress={() => {}}>
            <PictureIcon />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

Chat.navigationOptions = ({ navigation }) => {
  const { conversation, partner } = navigation.state.params;
  return {
    title: conversation ? conversation.name : partner.name
  };
};
