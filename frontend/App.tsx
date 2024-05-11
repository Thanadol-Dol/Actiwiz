import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import LoginPage from "./screens/LoginPage";
import FeedPageEvent from "./screens/FeedPageEvent";
import FeedPageClub from "./screens/FeedPageClub";
import DetailPage from "./screens/DetailPage";
import NotificationPage from "./screens/NotificationPage";
import EditProfile from "./screens/EditProfile";
import NotificationJoinedPage from "./screens/NotificationJoinedPage";
import EvaluatePage from "./screens/EvaluatePage";
import ToSinfoPage from "./screens/ToSinfoPage";
import ClubPage from "./screens/ClubPage";
import SetNotification from "./screens/SetNotification";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RequestDataUser from "./screens/RequestDataUser";
import {Color} from "./GlobalStyles";

const Stack = createNativeStackNavigator();

const App = () => {

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
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ 
            headerShown: false,
            headerStyle: {
              backgroundColor: Color.colorDarkorange_100,
            }
           }}>
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              initialParams={{ refresh: true }}
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
              name="FeedPageClub"
              component={FeedPageClub}
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
          </Stack.Navigator>
      </NavigationContainer>
  );
};
export default App;
