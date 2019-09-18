import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { Messages, Contacts } from "../screens";
import { MESSAGES_SCREEN, CONTACTS_SCREEN } from "../constants";
import { COLORS, FONT_SIZES, STATUS_BAR_HEIGHT } from "../theme";

export default createMaterialTopTabNavigator(
  {
    [MESSAGES_SCREEN]: Messages,
    [CONTACTS_SCREEN]: Contacts
  },
  {
    initialRouteName: MESSAGES_SCREEN,
    tabBarOptions: {
      style: {
        backgroundColor: COLORS.WHITE,
        marginTop: STATUS_BAR_HEIGHT
      },
      labelStyle: {
        fontFamily: "Nunito-Regular",
        fontSize: FONT_SIZES.EXTRA_LARGE,
        color: "#0E2A47"
      },
      indicatorStyle: { backgroundColor: "#3DBA91" }
    }
  }
);
