import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const EvaluatePage = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={[styles.evaluatePage, styles.iconLayout]}>
      <Image
        style={styles.checkRingRoundIcon}
        contentFit="cover"
        source={require("../assets/check-ring-round.png")}
      />
      <Text
        style={[styles.congratulationsYouAlready, styles.goEvaluateFlexBox]}
      >
        Congratulations you already have passed this event. Now you can evaluate
        that. thank you for your response.
      </Text>
      <View style={[styles.evaluatePageChild, styles.image4IconPosition]} />
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
        style={[styles.image4Icon, styles.image4IconPosition]}
        contentFit="cover"
        source={require("../assets/image-41.png")}
      />
      <Pressable
        style={[styles.rectangleParent, styles.groupChildLayout]}
        onPress={() => navigation.navigate("ToSinfoPage")}
      >
        <View style={[styles.groupChild, styles.groupChildLayout]} />
        <Text style={[styles.goEvaluate, styles.goEvaluateFlexBox]}>
          Go Evaluate
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    overflow: "hidden",
    width: "100%",
  },
  goEvaluateFlexBox: {
    textAlign: "center",
    position: "absolute",
  },
  image4IconPosition: {
    width: 390,
    left: 0,
    position: "absolute",
  },
  groupChildLayout: {
    height: 50,
    width: 359,
    position: "absolute",
  },
  checkRingRoundIcon: {
    top: 451,
    left: 179,
    width: 39,
    height: 39,
    position: "absolute",
  },
  congratulationsYouAlready: {
    top: 494,
    left: 12,
    fontSize: FontSize.iOSMediumBody_size,
    textTransform: "uppercase",
    fontFamily: FontFamily.ubuntuRegular,
    color: Color.colorBlack,
    width: 366,
    height: 57,
  },
  evaluatePageChild: {
    backgroundColor: Color.colorDarkorange_100,
    height: 383,
    top: 0,
    width: 390,
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
  image4Icon: {
    top: 64,
    height: 371,
  },
  groupChild: {
    borderRadius: 8,
    backgroundColor: "#0870a8",
    shadowColor: "rgba(1, 117, 253, 0.3)",
    shadowOffset: {
      width: 0,
      height: 12.116715431213379,
    },
    shadowRadius: 24.23,
    elevation: 24.23,
    shadowOpacity: 1,
    left: 0,
    width: 359,
    top: 0,
  },
  goEvaluate: {
    marginTop: -11.75,
    marginLeft: -52.65,
    top: "50%",
    left: "50%",
    fontSize: FontSize.size_base_2,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.iOSFFFFFF,
    width: 106,
  },
  rectangleParent: {
    top: 639,
    left: 15,
  },
  evaluatePage: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.iOSFFFFFF,
    flex: 1,
    height: 844,
  },
});

export default EvaluatePage;
