import AsyncStorage from "@react-native-async-storage/async-storage"
import { ActivityDetail } from "../interface/Activity";

export type RootStackParamList = {
  Notification: undefined;
  LoginPage: { refresh: boolean }
  SetNotificationPage: undefined;
  EventDetailPage: ActivityDetail;
  ClubDetailPage: { ClubID: string; ClubName: string };
};