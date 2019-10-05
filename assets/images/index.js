/* eslint-disable global-require */
/* eslint-disable import/prefer-default-export */
import React from "react";
import { Image } from "react-native";

export const Avatar = () => <Image source={require("./avatar.png")} />;
