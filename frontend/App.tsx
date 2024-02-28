const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import UserFunctionText from "./components/UserFunctionText";
import Rectangle from "./screens/Rectangle";
import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/RegisterPage";
import FeedPage from "./screens/FeedPage";
import DetailPage from "./screens/DetailPage";
import NotificationPage from "./screens/NotificationPage";
import EditProfile from "./screens/EditProfile";
import JoinPage from "./screens/JoinPage";
import NotificationJoinedPage from "./screens/NotificationJoinedPage";
import EvaluatePage from "./screens/EvaluatePage";
import ToSinfoPage from "./screens/ToSinfoPage";
import ClubPage from "./screens/ClubPage";
import JoinClubPage from "./screens/JoinClubPage";
import ComponentText from "./components/ComponentText";
import Rectangle1 from "./components/Rectangle1";
import CautionJoinEvent from "./components/CautionJoinEvent";
import CautionJoinClubCancel from "./components/CautionJoinClubCancel";
import CautionJoinEventCancel from "./screens/CautionJoinEventCancel";
import CautionJoinClub from "./components/CautionJoinClub";
import EditProfilePopup from "./components/EditProfilePopup";
import IOSAlphbeticKeyboardEngli from "./components/IOSAlphbeticKeyboardEngli";
import CircleBar from "./components/CircleBar";
import NavBar from "./components/NavBar";
import CircleBar1 from "./components/CircleBar1";
import AtomsFormFieldIconRi from "./components/AtomsFormFieldIconRi";
import AtomsButtonsLabelsWh from "./components/AtomsButtonsLabelsWh";
import AtomsButtonsResources1 from "./components/AtomsButtonsResources1";
import AtomsButtonsResources2 from "./components/AtomsButtonsResources2";
import AtomsMediaImage from "./components/AtomsMediaImage";
import DarkModeYesFirstItemActi from "./components/DarkModeYesFirstItemActi";
import KeysLayoutAlphabeticEng from "./components/KeysLayoutAlphabeticEng";
import TypeDefaultDarkModeYes from "./components/TypeDefaultDarkModeYes";
import TypeDefaultModeDarkModeY from "./components/TypeDefaultModeDarkModeY";
import DarkModeYes from "./components/DarkModeYes";
import AtomsIconsSystemCheck from "./components/AtomsIconsSystemCheck";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "Ubuntu-Regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-Bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
    "Unna-Regular": require("./assets/fonts/Unna-Regular.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Rectangle"
              component={Rectangle}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterPage"
              component={RegisterPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FeedPage"
              component={FeedPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DetailPage"
              component={DetailPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NotificationPage"
              component={NotificationPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="JoinPage"
              component={JoinPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NotificationJoinedPage"
              component={NotificationJoinedPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EvaluatePage"
              component={EvaluatePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ToSinfoPage"
              component={ToSinfoPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ClubPage"
              component={ClubPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="JoinClubPage"
              component={JoinClubPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CautionJoinEvent"
              component={CautionJoinEvent}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CautionJoinClubCancel"
              component={CautionJoinClubCancel}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CautionJoinEventCancel"
              component={CautionJoinEventCancel}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CautionJoinClub"
              component={CautionJoinClub}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
