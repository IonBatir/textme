import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { BIG_AVATAR_SIZE, SPACING, FONT_FAMILY, FONT_SIZE } from "../../theme";
import { BigAvatar } from "../../../assets/images";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
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
  }
});

function Profile() {
  const actions = [
    { id: "0", name: "Set a Status" },
    { id: "1", name: "Edit Name" }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.top} />
      <View style={styles.avatar}>
        <BigAvatar style={styles.avatar} />
      </View>
      <Text style={styles.name}>Towkir Ahmed Bappy</Text>
      <Text style={styles.status}>UX Designer</Text>
      <View style={styles.actions}>
        {actions.map(action => (
          <View key={action.id} style={styles.action}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.actionText}>{action.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

Profile.navigationOptions = {
  headerTitle: "MyProfile"
};

export default Profile;
