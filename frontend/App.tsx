const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import LoginPage from "./screens/LoginPage";
import FeedPageEvent from "./screens/FeedPageEvent";
import FeedPageClub from "./screens/FeedPageClub";
import DetailPage from "./screens/DetailPage";
import NotificationPage from "./screens/NotificationPage";
import EditProfile from "./screens/EditProfile";
import JoinPage from "./screens/JoinPage";
import NotificationJoinedPage from "./screens/NotificationJoinedPage";
import EvaluatePage from "./screens/EvaluatePage";
import ToSinfoPage from "./screens/ToSinfoPage";
import ClubPage from "./screens/ClubPage";
import JoinClubPage from "./screens/JoinClubPage";
import CautionJoinEvent from "./components/CautionJoinEvent";
import CautionJoinClubCancel from "./components/CautionJoinClubCancel";
import CautionJoinEventCancel from "./screens/CautionJoinEventCancel";
import CautionJoinClub from "./components/CautionJoinClub";
import SetNotification from "./screens/SetNotification";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RequestDataUser from "./screens/RequestDataUser";

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
              name="LoginPage"
              component={LoginPage}
              options={{ headerShown: false }}
              />
            <Stack.Screen
              name="RequestDataUser"
              component={RequestDataUser}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SetNotification"
              component={SetNotification}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FeedPage"
              component={FeedPageClub}
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
