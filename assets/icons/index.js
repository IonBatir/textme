/* eslint-disable global-require */
/* eslint-disable import/prefer-default-export */
import React from "react";
import { Image } from "react-native";

export const AttachmentIcon = () => (
  <Image source={require("./attachment.png")} />
);
export const AvatarIcon = () => <Image source={require("./avatar.png")} />;
export const ChatIcon = () => <Image source={require("./chat.png")} />;
export const GroupsIcon = () => <Image source={require("./groups.png")} />;
export const PhotoCameraIcon = () => (
  <Image source={require("./photo-camera.png")} />
);
export const PictureIcon = () => <Image source={require("./picture.png")} />;
export const RightArrowIcon = () => (
  <Image source={require("./right-arrow.png")} />
);
export const SettingsIcon = () => <Image source={require("./settings.png")} />;
export const SmileIcon = () => <Image source={require("./smile.png")} />;
export const TextMeIcon = () => <Image source={require("./textme.png")} />;
