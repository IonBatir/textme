import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { Messages, Contacts } from "../screens";
import { MESSAGES_SCREEN, CONTACTS_SCREEN } from "../constants";
import { COLOR, FONT_SIZE, FONT_FAMILY, STATUS_BAR_HEIGHT } from "../theme";

export default createMaterialTopTabNavigator(
  {
    [MESSAGES_SCREEN]: Messages,
    [CONTACTS_SCREEN]: Contacts
  },
  {
    initialRouteName: MESSAGES_SCREEN,
    tabBarOptions: {
      style: {
        backgroundColor: COLOR.WHITE,
        marginTop: STATUS_BAR_HEIGHT
      },
      labelStyle: {
        fontFamily: FONT_FAMILY.NUNITO_REGULAR,
        fontSize: FONT_SIZE.EXTRA_LARGE,
        color: "#0E2A47"
      },
      indicatorStyle: { backgroundColor: "#3DBA91" }
    }
  }
);
