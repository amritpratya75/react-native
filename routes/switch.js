import { createSwitchNavigator, createAppContainer } from "react-navigation";
import SignedIn from "../routes/drawer";
import SignedOut from "../routes/authStack";
import Loading from "../screens/loading";

const switchNavigator = createSwitchNavigator({
  Loading: {
    screen: Loading,
  },
  SignedOut: {
    screen: SignedOut,
  },
  SignedIn: {
    screen: SignedIn,
  },
});

export default createAppContainer(switchNavigator);
