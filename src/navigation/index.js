import { createSwitchNavigator } from "react-navigation";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { APP_STACK, AUTH_STACK } from "../constants";

export default createSwitchNavigator(
  { [APP_STACK]: AppStack, [AUTH_STACK]: AuthStack },
  { initialRouteName: APP_STACK }
);
