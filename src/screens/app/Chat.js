import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity
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
  container: { flex: 1 },
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
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(
    navigation.getParam("conversation") || { id: null }
  );
  const [loading, setLoading] = useState(true);
  const partner = navigation.getParam("partner");

  useEffect(
    () =>
      fetchMessages(
        conversation,
        data => {
          setMessages(data);
          setLoading(false);
        },
        error => {
          ErrorAlert(error);
          setLoading(false);
        }
      ),
    [conversation.id]
  );

  function sendMessage() {
    if (conversation.id) {
      addMessage(conversation.id, message)
        .then(() => setMessage(""))
        .catch(error => ErrorAlert(error));
    } else {
      createConversation(partner)
        .then(data => {
          setConversation(data);
          return addMessage(data.id, message);
        })
        .then(() => setMessage(""))
        .catch(error => ErrorAlert(error));
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
        isSameSender={index > 0 && item.from === messages[index - 1].from}
      />
    );
  }

  return loading ? (
    <Spinner />
  ) : (
    <SafeAreaView style={styles.container}>
      {messages.length === 0 ? (
        <View style={commonStyles.centerContainer}>
          <Text style={commonStyles.text}>
            No messages here yet. Say Hello!
          </Text>
        </View>
      ) : (
        <FlatList data={messages} renderItem={renderItem} />
      )}
      <View style={styles.bottom}>
        <View style={styles.textInputView}>
          <TextInput
            style={styles.textInput}
            onChangeText={setMessage}
            value={message}
            onSubmitEditing={sendMessage}
            placeholder="Type a message here"
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.touch} onPress={sendMessage}>
            <RightArrowIcon />
          </TouchableOpacity>
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
