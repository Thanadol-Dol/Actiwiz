import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Color } from './utils/GlobalStyles';
import LoginPage from "./screens/LoginPage";
import EventFeedPage from "./screens/EventFeedPage";
import ClubFeedPage from "./screens/ClubFeedPage";
import EventDetailPage from "./screens/EventDetailPage";
import ProfilePage from "./screens/ProfilePage";
import ClubDetailPage from "./screens/ClubDetailPage";
import SetNotificationPage from "./screens/SetNotificationPage";
import RequestDataPage from "./screens/RequestDataPage";

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
              backgroundColor: Color.colorDarkorange_100
            }
           }}>
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              initialParams={{ refresh: true }}
            />
            <Stack.Screen
              name="RequestDataPage"
              component={RequestDataPage}
            />
            <Stack.Screen
              name="SetNotificationPage"
              component={SetNotificationPage}
            />
            <Stack.Screen
              name="EventFeedPage"
              component={EventFeedPage}
            />
            <Stack.Screen
              name="ClubFeedPage"
              component={ClubFeedPage}
            />
            <Stack.Screen
              name="EventDetailPage"
              component={EventDetailPage}
            />
            <Stack.Screen
              name="ClubDetailPage"
              component={ClubDetailPage}
            />
            <Stack.Screen
              name="ProfilePage"
              component={ProfilePage}
            />
          </Stack.Navigator>
      </NavigationContainer>
  );
};
export default App;
