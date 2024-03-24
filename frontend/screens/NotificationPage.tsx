import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";

const NotificationPage = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <LinearGradient
      style={styles.notificationPage}
      locations={[0, 1]}
      colors={["rgba(255, 166, 84, 0.9)", "rgba(243, 44, 0, 0.77)"]}
    >
      <Pressable
        style={styles.notification}
        onPress={() => navigation.navigate("FeedPage")}
      >
        <Image
          style={styles.iconLayout}
          contentFit="cover"
          source={require("../assets/notification1.png")}
        />
      </Pressable>
      <Image
        style={styles.notificationPageChild}
        contentFit="cover"
        source={require("../assets/rectangle-13.png")}
      />
      <Pressable
        style={[styles.wrapper, styles.frameLayout]}
        onPress={() => navigation.navigate("NotificationJoinedPage")}
      >
        <Image
          style={[styles.icon1, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-12.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.container, styles.frameLayout]}
        onPress={() => navigation.navigate("EvaluatePage")}
      >
        <Image
          style={[styles.icon1, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-14.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.frame, styles.frameLayout]}
        onPress={() => navigation.navigate("DetailPage")}
      >
        <Image
          style={[styles.icon1, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-15.png")}
        />
      </Pressable>
      <Text style={styles.basketballClub}>{`Basketball club `}</Text>
      <Text
        style={[styles.footballClub, styles.nowYouCanTypo]}
      >{`football club `}</Text>
      <Text
        style={[styles.nowYouCan, styles.nowYouCanTypo]}
      >{`Now you can evaluate Event from Yueyitsu club `}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  frameLayout: {
    height: 43,
    width: 43,
    left: 37,
    position: "absolute",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  nowYouCanTypo: {
    fontFamily: FontFamily.ubuntuRegular,
    height: 19,
    textAlign: "left",
    color: Color.colorBlack,
    textTransform: "uppercase",
    fontSize: FontSize.size_xs,
    left: 94,
    position: "absolute",
  },
  notification: {
    left: 333,
    top: 40,
    width: 39,
    height: 39,
    position: "absolute",
  },
  notificationPageChild: {
    top: 114,
    left: 30,
    width: 330,
    height: 153,
    borderRadius: Border.br_xl,
    position: "absolute",
  },
  icon1: {
    borderRadius: Border.br_xl,
  },
  wrapper: {
    top: 119,
  },
  container: {
    top: 217,
  },
  frame: {
    top: 168,
  },
  basketballClub: {
    top: 131,
    fontFamily: FontFamily.poppinsRegular,
    height: 19,
    textAlign: "left",
    color: Color.colorBlack,
    textTransform: "uppercase",
    fontSize: FontSize.size_xs,
    left: 94,
    width: 115,
    position: "absolute",
  },
  footballClub: {
    top: 181,
    width: 115,
    fontFamily: FontFamily.ubuntuRegular,
  },
  nowYouCan: {
    top: 224,
    width: 232,
  },
  notificationPage: {
    borderRadius: Border.br_3xs,
    flex: 1,
    height: 844,
    overflow: "hidden",
    backgroundColor: "transparent",
    width: "100%",
  },
});

export default NotificationPage;
