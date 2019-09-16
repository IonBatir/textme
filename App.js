import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Home, Groups, Settings } from "./src/screens";
import { HOME_SCREEN, GROUPS_SCREEN, SETTINGS_SCREEN } from "./src/constants";

const MainNavigator = createBottomTabNavigator(
  {
    [HOME_SCREEN]: Home,
    [GROUPS_SCREEN]: Groups,
    [SETTINGS_SCREEN]: Settings
  },
  { initialRouteName: HOME_SCREEN }
);

export default createAppContainer(MainNavigator);

// eslint-disable-next-line no-console
console.disableYellowBox = true;
