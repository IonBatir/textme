import { createStackNavigator } from "react-navigation-stack";
import ChatStack from "./ChatStack";
import { Chat } from "../screens";
import { CHAT_STACK, CHAT_SCREEN } from "../constants";

export default createStackNavigator(
  {
    [CHAT_STACK]: {
      screen: ChatStack,
      navigationOptions: {
        header: null
      }
    },
    [CHAT_SCREEN]: Chat
  },
  {
    initialRouteName: CHAT_STACK
  }
);
