import { createStackNavigator } from "react-navigation-stack";
import { Messages, Chat, Contacts } from "../screens/app";
import { MESSAGES_SCREEN, CHAT_SCREEN, CONTACTS_SCREEN } from "../constants";

export default createStackNavigator(
  {
    [MESSAGES_SCREEN]: {
      screen: Messages,
      navigationOptions: {
        header: null
      }
    },
    [CHAT_SCREEN]: Chat,
    [CONTACTS_SCREEN]: Contacts
  },
  {
    initialRouteName: MESSAGES_SCREEN,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: navigation.state.index === 0
    })
  }
);
