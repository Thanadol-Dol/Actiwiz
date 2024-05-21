import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import Constants from "expo-constants";

import { Platform } from "react-native";
import { getActivityByID } from "../utils/activityUtils";
import { getClubByID } from "../utils/clubUtils";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityDetail } from "../interface/Activity";

export interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken;
  notification?: Notifications.Notification;
}

export type RootStackParamList = {
  Notification: undefined;
  DetailPage: ActivityDetail;
  ClubPage: { ClubID: string; ClubName: string };
};

type NotificationNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Notification'>;

export const usePushNotifications = (): PushNotificationState => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const navigation = useNavigation<NotificationNavigationProp>();

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification");
        return;
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      });
    } else {
      alert("Must be using a physical device for Push notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const ActivityID = response.notification.request.content.data.ActivityID;
        const ClubID = response.notification.request.content.data.ClubID;
        if(ActivityID){
          getActivityByID(ActivityID).then((activity) => {
              navigation.navigate('DetailPage', { 
                "ActivityID": activity.ActivityID ,
                "ActivityName": activity.ActivityName,
                "ActivityNameENG": activity.ActivityNameENG, 
                "Description": activity.Description,
                "HourTotal": activity.HourTotal,
                "DayTotal": activity.DayTotal,
                "Semester": activity.Semester,
                "Organizer": activity.Organizer,
                "OpenDate": activity.OpenDate,
                "CloseDate": activity.CloseDate,
                "AcademicYear": activity.AcademicYear,
              })
            }
          ).catch((error) => {
            throw error;
          });
        } else if(ClubID){
          getClubByID(ClubID).then((club) => {
              navigation.navigate('ClubPage', {"ClubID": club.ClubID ,"ClubName": club.ClubName});
            }
          ).catch((error) => {
            throw error;
          });;
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );

      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
};