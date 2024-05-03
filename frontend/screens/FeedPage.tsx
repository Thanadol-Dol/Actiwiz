import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import DetailContainer from "../components/DetailContainer";
import CompetitionSection from "../components/CompetitionSection";
import EventDetailContainer from "../components/EventDetailContainer";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Searchbar } from 'react-native-paper';
import { usePushNotifications } from "../usePushNotifications";

const FeedPage = ({navigation}: {navigation: any}) => {
  const [apiToken, setApiToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      const apiToken = await AsyncStorage.getItem("apiToken");
      const userId = await AsyncStorage.getItem("userId");
      setApiToken(apiToken);
      setUserId(parseInt(userId as string));
    }
    fetchResources();
  }, []);
  
  return (
    <ScrollView>
      <Text>API Token: {apiToken}</Text>
      <Text>User Id: {userId}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  WhiteBoxLayout: {
    width: "100%",
  },
  notificationPosition: {
    top: 40,
    position: "absolute",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  WhiteFrame: {
    marginTop: -100,
    left : 195,
    height: 200,
    width: "100%",
    position: "absolute",
  },
  IconLocation: {
    height: 21,
    width: 22,
    marginLeft: 4,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  kfcTypo: {
    height: 13,
    fontFamily: FontFamily.unnaRegular,
    fontSize: FontSize.size_3xs,
    marginLeft: 39,
    left: "50%",
    top: "50%",
    textAlign: "left",
    color: Color.colorBlack,
    textTransform: "uppercase",
    position: "absolute",
  },
  textTypo: {
    height: 28,
    width: 172,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.ubuntuRegular,
    textTransform: "uppercase",
    position: "absolute",
  },
  iconPosition1: {
    width: 162,
    top: "50%",
  },
  event2Layout: {
    height: 198,
    position: "absolute",
  },
  Place: {
    left: 232,
    height: 13,
    fontFamily: FontFamily.unnaRegular,
    fontSize: FontSize.size_3xs,
    textAlign: "left",
    color: Color.colorBlack,
    textTransform: "uppercase",
    position: "absolute",
  },
  iconPosition: {
    left: 197,
    height: 21,
    width: 22,
    position: "absolute",
  },
  SpaceBetweenEvent: {
    backgroundColor: Color.colorSandybrown,
    height: 4,
    width: "100%",
    left: 0,
    position: "absolute",
  },
  atomsFormFieldDefaultOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  atomsFormFieldDefaultBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  WhiteBoxIG: {
    top: 556,
    height: 165,
    backgroundColor: Color.iOSFFFFFF,
    width: "100%",
    left: 0,
    position: "absolute",
  },
  feedPageItem: {
    top: 580,
    height: 140,
    left: 0,
    width: 390,
    position: "absolute",
  },
  notification: {
    left: 333,
    width: 39,
    height: 39,
  },
  TabSuggestClub: {
    top: 560,
    left: 10,
    width: 353,
    height: 29,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: FontSize.size_xl,
    position: "absolute",
  },
  event: {
    top: 158,
    left: 12,
    width: 78,
    height: 23,
    display: "none",
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.ubuntuRegular,
    textTransform: "uppercase",
    fontSize: FontSize.size_xl,
    position: "absolute",
  },
  feedPageInner: {
    left: 15,
    width: 42,
    height: 42,
  },
  icon1: {
    borderRadius: Border.br_341xl,
  },
  profilePics: {
    left: 18,
    top: 42,
    width: 36,
    height: 38,
    position: "absolute",
  },
  event1Child: {
    left: "50%",
    top: "50%",
    marginLeft: -195,
    marginTop: -100,
    width: 390,
    backgroundColor: Color.iOSFFFFFF,
  },
  clockLightIcon: {
    marginTop: -27.6,
  },
  TextTime: {
    marginTop: -23.1,
    width: 97,
  },
  pinAltDuotoneLineIcon: {
    marginTop: -3.2,
  },
  kfc: {
    marginTop: 1.4,
    width: 144,
  },
  text: {
    marginTop: -77.4,
    marginLeft: 8,
    left: "50%",
    top: "50%",
  },
  image2Icon: {
    marginTop: -100,
    height: 200,
    position: "absolute",
  },
  event1: {
    marginTop: -450,
    height: 200,
    left: "50%",
    top: "50%",
    marginLeft: -206,
    width: "100%",
    position: "absolute",
  },
  event2Child: {
    top: 0,
    width: "100%",
    left: 0,
    backgroundColor: Color.iOSFFFFFF,
  },
  image3Icon: {
    marginTop: -100,
    width: 162,
    top: "50%",
  },
  TimeText: {
    top: 73,
    width: 97,
  },
  pinAltDuotoneLineIcon1: {
    top: 92,
  },
  n16LearningExchange: {
    top: 97,
    width: 144,
  },
  innovationForKmutt: {
    top: 23,
    left: 202,
  },
  clockLightIcon1: {
    top: 68,
  },
  event2: {
    top: 358,
    width: "100%",
    left: 0,
  },
  SpaceBar1: {
    top: 353,
    width: "100%",
  },
  SpaceBar2: {
    top: 555,
    width: "100%",
  },
  SpaceBar3: {
    top: 722,
    width: "100%",
  },
  SpaceBar4: {
    top: 945,
    width: "100%",
  },
  SpaceBar5: {
    top: 963,
  },
  feedPage: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorDarkorange_100,
    flex: 1,
    height: 1206,
    width: "100%",
  },
  Searchbar: {
    top: 90,
    width: "90%",
    left: "2%",
    height: 40,
    position: "relative",
  },
});

export default FeedPage;
