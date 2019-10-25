import { StyleSheet } from "react-native";
import { FONT_FAMILY, FONT_SIZE } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontFamily: FONT_FAMILY.NUNITO_LIGHT_ITALIC,
    fontSize: FONT_SIZE.LARGE
  }
});
