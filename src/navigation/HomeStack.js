import { createStackNavigator } from "react-navigation-stack";
import ChatStack from "./ChatStack";
import { Chat } from "../screens/app";
import { CHAT_STACK, CHAT_SCREEN } from "../constants";

const HomeStack = createStackNavigator(
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

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default HomeStack;
