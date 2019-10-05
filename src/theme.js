/* eslint-disable import/prefer-default-export */
import { getStatusBarHeight } from "react-native-status-bar-height";

export const SPACING = {
  EXTRA_SMALL: 4,
  SMALL: 8,
  MEDIUM: 16,
  LARGE: 24,
  EXTRA_LARGE: 32
};

export const COLOR = {
  WHITE: "#fff",
  BLACK: "#000",
  RED: "#ff0000",
  BACKGROUND: "#fff",
  HORIZONTAL_LINE: "rgba(44, 44, 44, 0.2)"
};

export const FONT_SIZE = {
  EXTRA_EXTRA_SMALL: 8,
  EXTRA_SMALL: 10,
  SMALL: 12,
  MEDIUM: 15,
  LARGE: 17,
  EXTRA_LARGE: 20,
  EXTRA_EXTRA_LARGE: 25
};

export const FONT_FAMILY = {
  NUNITO_LIGHT: "Nunito-Light",
  NUNITO_LIGHT_ITALIC: "Nunito-LightItalic",
  NUNITO_REGULAR: "Nunito-Regular",
  NUNITO_SEMI_BOLD: "Nunito-SemiBold",
  NUNITO_BOLD: "Nunito-Bold"
};

export const DEBUG = {
  borderWidth: 1,
  borderColor: COLOR.RED
};

export const STATUS_BAR_HEIGHT = getStatusBarHeight(true);

export const HEADER_HEIGHT = 50 + STATUS_BAR_HEIGHT;

export const BOTTOM_NAVIGATOR_HEIGHT = 60;

export const LIST_ITEM_HEIGHT = 76;

export const AVATAR_ICON_SIZE = 38;
export const AVATAR_SIZE = 76;
