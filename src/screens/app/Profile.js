import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  ActivityIndicator
} from "react-native";
import { ErrorAlert, Spinner } from "../../components";
import { BIG_AVATAR_SIZE, SPACING, FONT_FAMILY, FONT_SIZE } from "../../theme";
import { BigAvatar } from "../../../assets/images";
import { fetchProfile, updateName, updateStatus } from "../../api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  row: {
    flexDirection: "row"
  },
  top: {
    width: "100%",
    height: BIG_AVATAR_SIZE / 2 + SPACING.MEDIUM,
    backgroundColor: "#F5F5F5"
  },
  avatar: {
    position: "absolute",
    top: SPACING.MEDIUM
  },
  name: {
    fontFamily: FONT_FAMILY.NUNITO_BOLD,
    fontSize: FONT_SIZE.EXTRA_EXTRA_LARGE,
    color: "#0E2A47",
    marginTop: BIG_AVATAR_SIZE / 2 + SPACING.MEDIUM
  },
  status: {
    fontFamily: FONT_FAMILY.NUNITO_LIGHT,
    fontSize: FONT_SIZE.LARGE,
    color: "#8B8B8B"
  },
  actions: {
    width: "90%",
    alignSelf: "flex-start",
    marginTop: SPACING.LARGE,
    marginHorizontal: SPACING.LARGE
  },
  action: {
    borderBottomColor: "#C5C5C5",
    borderBottomWidth: 0.5,
    paddingVertical: SPACING.MEDIUM
  },
  actionText: {
    fontFamily: FONT_FAMILY.NUNITO_REGULAR,
    fontSize: FONT_SIZE.EXTRA_LARGE,
    color: "#0E2A47"
  },
  actionInput: {
    flex: 1,
    marginLeft: SPACING.SMALL,
    fontFamily: FONT_FAMILY.NUNITO_REGULAR,
    fontSize: FONT_SIZE.EXTRA_LARGE,
    color: "#0E2A47"
  },
  activityIndicator: {
    alignSelf: "flex-end"
  }
});

const nullProfile = {
  name: null,
  status: null,
  avatarURL: null
};

export default function Profile() {
  const [name, setName] = useState({ value: "", loading: false });
  const [status, setStatus] = useState({ value: "", loading: false });
  const [isShowingNameInput, showNameInput] = useState(false);
  const [isShowingStatusInput, showStatusInput] = useState(false);
  const [profile, setProfile] = useState({
    data: nullProfile,
    loading: true
  });

  useEffect(() => {
    fetchProfile()
      .then(data => setProfile({ data, loading: false }))
      .catch(error => {
        setProfile({ data: nullProfile, loading: false });
        ErrorAlert(error);
      });
  }, []);

  const actions = [
    {
      id: "0",
      name: "Edit Name",
      action: () => showNameInput(true),
      showInput: isShowingNameInput,
      field: "Name",
      value: name.value,
      loading: name.loading,
      onChange: value => setName(state => ({ ...state, value })),
      onBlur: () => {
        if (name.value.length === 0) {
          showNameInput(false);
          return;
        }
        setName(state => ({ ...state, loading: true }));
        updateName(name.value)
          .then(() => {
            setProfile(state => ({
              ...state,
              data: { ...state.data, name: name.value }
            }));
            setName({ value: "", loading: false });
            showNameInput(false);
          })
          .catch(error => {
            setName({ value: "", loading: false });
            ErrorAlert(error);
          });
      }
    },
    {
      id: "1",
      name: "Set a Status",
      action: () => showStatusInput(true),
      showInput: isShowingStatusInput,
      field: "Status",
      value: status.value,
      loading: status.loading,
      onChange: value => setStatus(state => ({ ...state, value })),
      onBlur: () => {
        if (status.value.length === 0) {
          showStatusInput(false);
          return;
        }
        setStatus(state => ({ ...state, loading: true }));
        updateStatus(status.value)
          .then(() => {
            setProfile(state => ({
              ...state,
              data: { ...state.data, status: status.value }
            }));
            setStatus({ value: "", loading: false });
            showStatusInput(false);
          })
          .catch(error => {
            setStatus({ value: "", loading: false });
            ErrorAlert(error);
          });
      }
    },
    { id: "2", name: "Upload avatar", showInput: false, action: () => {} }
  ];

  return profile.loading ? (
    <Spinner />
  ) : (
    <View style={styles.container}>
      <View style={styles.top} />
      <View style={styles.avatar}>
        {profile.data.avatarURL ? (
          <Image
            source={{ uri: profile.data.avatarURL }}
            style={{ width: BIG_AVATAR_SIZE, height: BIG_AVATAR_SIZE }}
          />
        ) : (
          <BigAvatar />
        )}
      </View>
      <Text style={styles.name}>{profile.data.name}</Text>
      <Text style={styles.status}>{profile.data.status}</Text>
      <View style={styles.actions}>
        {actions.map(action => (
          <View key={action.id} style={styles.action}>
            {action.showInput ? (
              <View style={styles.row}>
                <Text style={styles.actionText}>{`${action.field}:`}</Text>
                <TextInput
                  style={styles.actionInput}
                  onChangeText={action.onChange}
                  onBlur={action.onBlur}
                  value={action.value}
                  editable={!action.loading}
                  returnKeyType="done"
                  autoFocus
                />
                {action.loading && (
                  <ActivityIndicator style={styles.activityIndicator} />
                )}
              </View>
            ) : (
              <TouchableOpacity onPress={action.action}>
                <Text style={styles.actionText}>{action.name}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
