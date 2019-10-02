/* eslint-disable import/prefer-default-export */
import { Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const SPACING = {
  EXTRA_SMALL: 4,
  SMALL: 8,
  MEDIUM: 16,
  LARGE: 24,
  EXTRA_LARGE: 32
};

export const COLORS = {
  WHITE: "#fff",
  BLACK: "#000",
  RED: "#ff0000",
  BACKGROUND: "#fff"
};

export const FONT_SIZES = {
  EXTRA_EXTRA_SMALL: 8,
  EXTRA_SMALL: 10,
  SMALL: 12,
  MEDIUM: 15,
  LARGE: 17,
  EXTRA_LARGE: 20,
  EXTRA_EXTRA_LARGE: 25
};

export const DEBUG = {
  borderWidth: 1,
  borderColor: COLORS.RED
};

export const STATUS_BAR_HEIGHT =
  Platform.OS === "ios" ? getStatusBarHeight() : 0;

export const HEADER_HEIGHT =
  40 + (Platform.OS === "ios" ? STATUS_BAR_HEIGHT : 0);
