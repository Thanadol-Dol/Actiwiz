import AsyncStorage from "@react-native-async-storage/async-storage"
import { ActivityDetail } from "../interface/Activity";

export type RootStackParamList = {
  Notification: undefined;
  LoginPage: { refresh: boolean }
  SetNotification: undefined;
  DetailPage: ActivityDetail;
  ClubPage: { ClubID: string; ClubName: string };
};