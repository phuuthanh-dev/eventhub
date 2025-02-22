import { registerRootComponent } from "expo";

import App from "./App";
import messaging from "@react-native-firebase/messaging";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
messaging().setBackgroundMessageHandler(async (mess) => {
  console.log("Message handled in the background!", mess);
});

messaging().onNotificationOpenedApp((mess) => {
  console.log(
    "Notification caused app to open from background state:",
    mess
  );
});

registerRootComponent(App);
