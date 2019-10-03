import { createStackNavigator } from "react-navigation-stack";
import { Login, Register, ForgotPassword } from "../screens";
import {
  LOGIN_SCREEN,
  REGISTER_SCREEN,
  FORGOT_PASSWORD_SCREEN
} from "../constants";

export default createStackNavigator(
  {
    [LOGIN_SCREEN]: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    [REGISTER_SCREEN]: {
      screen: Register,
      navigationOptions: { headerTitle: "Register" }
    },
    [FORGOT_PASSWORD_SCREEN]: {
      screen: ForgotPassword,
      navigationOptions: { headerTitle: "Forgot Password" }
    }
  },
  { initialRouteName: LOGIN_SCREEN }
);
