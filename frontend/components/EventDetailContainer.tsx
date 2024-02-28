import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import DetailContainer from "./DetailContainer";
import { FontFamily, FontSize, Color } from "../GlobalStyles";

const EventDetailContainer = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.event4}>
      <View style={[styles.event4Child, styles.event4Position]} />
      <Image
        style={[styles.clockLightIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/clock-light3.png")}
      />
      <Text style={[styles.nov2023, styles.kfcTypo]}>6 - 10 nov 2023</Text>
      <Image
        style={[styles.pinAltDuotoneLineIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/pin-alt-duotone-line3.png")}
      />
      <Text style={[styles.kfc, styles.kfcTypo]}>KFC</Text>
      <Text
        style={styles.text}
      >{`และแล้ววันนี้ก็มาถึงแล้วววว วันนี้ทางชมรมจะมาแจ้งข่าวดีนั่นก็
คื้อออออ ทางชมรม...`}</Text>
      <DetailContainer
        detailText="Detail"
        onButtonPress={() => navigation.navigate("DetailPage")}
      />
      <View style={[styles.event4Item, styles.event4ItemPosition]} />
      <View style={styles.image5} />
      <Image
        style={[styles.image6Icon, styles.event4ItemPosition]}
        contentFit="cover"
        source={require("../assets/image-6.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  event4Position: {
    top: 0,
    height: 217,
  },
  iconLayout: {
    height: 23,
    width: 24,
    left: 196,
    position: "absolute",
  },
  kfcTypo: {
    height: 14,
    fontFamily: FontFamily.unnaRegular,
    fontSize: FontSize.size_3xs,
    left: 234,
    textAlign: "left",
    color: Color.colorBlack,
    textTransform: "uppercase",
    position: "absolute",
  },
  event4ItemPosition: {
    width: 159,
    left: 0,
    position: "absolute",
  },
  event4Child: {
    backgroundColor: Color.iOSFFFFFF,
    width: 390,
    top: 0,
    left: 0,
    position: "absolute",
  },
  clockLightIcon: {
    top: 76,
  },
  nov2023: {
    top: 81,
    width: 105,
  },
  pinAltDuotoneLineIcon: {
    top: 102,
  },
  kfc: {
    top: 107,
    width: 156,
  },
  text: {
    top: 24,
    left: 201,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.ubuntuRegular,
    width: 176,
    height: 44,
    textAlign: "left",
    color: Color.colorBlack,
    textTransform: "uppercase",
    position: "absolute",
  },
  event4Item: {
    backgroundColor: Color.colorBlack,
    top: 0,
    height: 217,
  },
  image5: {
    top: 30,
    width: 175,
    height: 159,
    left: 0,
    position: "absolute",
  },
  image6Icon: {
    top: 33,
    height: 144,
  },
  event4: {
    top: 967,
    height: 217,
    width: 390,
    left: 0,
    position: "absolute",
  },
});

export default EventDetailContainer;
