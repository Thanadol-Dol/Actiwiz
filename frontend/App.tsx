import React, { useState } from 'react';
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
import Navbar from "./components/NavBar";

const Stack = createNativeStackNavigator();

const App = () => {
  const [activePage, setActivePage] = useState<'FeedPageEvent' | 'FeedPageClub'>('FeedPageEvent');

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
          <Stack.Navigator 
            screenOptions={{ headerShown: false }}
            initialRouteName="FeedPageEvent"
          >
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              />
            <Stack.Screen
              name="RequestDataUser"
              component={RequestDataUser}
            />
            <Stack.Screen
              name="SetNotification"
              component={SetNotification}
            />
            <Stack.Screen
              name="FeedPageEvent"
              component={FeedPageEvent}
            />
            <Stack.Screen
              name="FeedPage"
              component={FeedPageEvent}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DetailPage"
              component={DetailPage}
            />
            <Stack.Screen
              name="NotificationPage"
              component={NotificationPage}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
            />
            <Stack.Screen
              name="JoinPage"
              component={JoinPage}
            />
            <Stack.Screen
              name="NotificationJoinedPage"
              component={NotificationJoinedPage}
            />
            <Stack.Screen
              name="EvaluatePage"
              component={EvaluatePage}
            />
            <Stack.Screen
              name="ToSinfoPage"
              component={ToSinfoPage}
            />
            <Stack.Screen
              name="ClubPage"
              component={ClubPage}
            />
            <Stack.Screen
              name="JoinClubPage"
              component={JoinClubPage}
            />
            <Stack.Screen
              name="CautionJoinClubCancel"
              component={CautionJoinClubCancel}
            />
            <Stack.Screen
              name="CautionJoinEventCancel"
              component={CautionJoinEventCancel}
            />
            <Stack.Screen
              name="CautionJoinClub"
              component={CautionJoinClub}
            />
          </Stack.Navigator>
          <Navbar activePage={activePage} setActivePage={setActivePage} />
      </NavigationContainer>
    </>
  );
};
export default App;
