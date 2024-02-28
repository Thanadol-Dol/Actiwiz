import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const NotificationJoinedPage = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={[styles.notificationJoinedPage, styles.iconLayout]}>
      <Image
        style={styles.checkRingRoundIcon}
        contentFit="cover"
        source={require("../assets/check-ring-round.png")}
      />
      <Text style={styles.youHaveA}>
        You have a Basketball competition tmr at 6.00 AM. Prepare yourself and
        let’s fight 🤜.
      </Text>
      <View
        style={[
          styles.notificationJoinedPageChild,
          styles.notificationPosition,
        ]}
      />
      <Pressable
        style={styles.arrowBackIos}
        onPress={() => navigation.navigate("FeedPage")}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/arrow-back-ios1.png")}
        />
      </Pressable>
      <Image
        style={[styles.notificationJoinedPageItem, styles.notificationPosition]}
        contentFit="cover"
        source={require("../assets/rectangle-40.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    overflow: "hidden",
    width: "100%",
  },
  notificationPosition: {
    width: 390,
    left: 0,
    position: "absolute",
  },
  checkRingRoundIcon: {
    top: 451,
    left: 175,
    width: 39,
    height: 39,
    position: "absolute",
  },
  youHaveA: {
    top: 494,
    left: 52,
    fontSize: FontSize.iOSMediumBody_size,
    textTransform: "uppercase",
    fontFamily: FontFamily.ubuntuRegular,
    color: Color.colorBlack,
    textAlign: "center",
    width: 302,
    height: 57,
    position: "absolute",
  },
  notificationJoinedPageChild: {
    top: 0,
    backgroundColor: Color.colorDarkorange_100,
    height: 383,
  },
  icon: {
    height: "100%",
  },
  arrowBackIos: {
    left: 14,
    top: 31,
    width: 24,
    height: 24,
    position: "absolute",
  },
  notificationJoinedPageItem: {
    top: 64,
    height: 371,
  },
  notificationJoinedPage: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.iOSFFFFFF,
    flex: 1,
    height: 844,
  },
});

export default NotificationJoinedPage;
