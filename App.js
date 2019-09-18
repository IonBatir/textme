import { createAppContainer } from "react-navigation";
import MainNavigator from "./src/navigation";

export default createAppContainer(MainNavigator);

// eslint-disable-next-line no-console
console.disableYellowBox = true;
