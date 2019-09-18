import { createStackNavigator } from "react-navigation-stack";
import { Login, Register, ForgotPassword } from "../screens";
import {
  LOGIN_SCREEN,
  REGISTER_SCREEN,
  FORGOT_PASSWORD_SCREEN
} from "../constants";

export default createStackNavigator(
  {
    [LOGIN_SCREEN]: Login,
    [REGISTER_SCREEN]: Register,
    [FORGOT_PASSWORD_SCREEN]: ForgotPassword
  },
  { initialRouteName: LOGIN_SCREEN }
);
