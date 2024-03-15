import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { FontFamily, FontSize, Color } from "../GlobalStyles";

const CompetitionSection = () => {
  return (
    <View style={styles.rectangleParent}>
      <View style={[styles.groupChild, styles.groupPosition]} />
      <Image
        style={[styles.clockLightIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/clock-light2.png")}
      />
      <Text style={[styles.TimeText, styles.kfcTypo]}>
        every tues, thus
      </Text>
      <Image
        style={[styles.pinAltDuotoneLineIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/pin-alt-duotone-line2.png")}
      />
      <Text style={[styles.kfc, styles.kfcTypo]}>KFC</Text>
      <Text style={styles.basketball3x3}>
        การแข่งขัน Basketball 3x3 ภายในมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี...
      </Text>
      <View style={[styles.groupItem, styles.groupItemPosition]} />
      <Image
        style={[styles.image4Icon, styles.groupItemPosition]}
        contentFit="cover"
        source={require("../assets/image-4.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupPosition: {
    top: 0,
    height: 220,
  },
  iconLayout: {
    height: 23,
    width: 22,
    left: 200,
    position: "absolute",
  },
  kfcTypo: {
    height: 14,
    fontFamily: FontFamily.unnaRegular,
    fontSize: FontSize.size_3xs,
    left: 235,
    textAlign: "left",
    color: Color.colorBlack,
    textTransform: "uppercase",
    position: "absolute",
  },
  groupItemPosition: {
    width: 162,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.iOSFFFFFF,
    width: "100%",
    position: "absolute",
    top: 0,
  },
  clockLightIcon: {
    top: 69,
  },
  TimeText: {
    top: 75,
    width: 97,
  },
  pinAltDuotoneLineIcon: {
    top: 98,
  },
  kfc: {
    top: 102,
    width: 144,
  },
  basketball3x3: {
    top: 23,
    left: 205,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.ubuntuRegular,
    width: 172,
    height: 31,
    textAlign: "left",
    color: Color.colorBlack,
    textTransform: "uppercase",
    position: "absolute",
  },
  groupItem: {
    backgroundColor: Color.colorBlack,
    top: 0,
    height: 220,
  },
  image4Icon: {
    top: 30,
    height: 161,
  },
  rectangleParent: {
    top: 726,
    height: 220,
    width: "100%",
    position: "absolute",
  },
});

export default CompetitionSection;
