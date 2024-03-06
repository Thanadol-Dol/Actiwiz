import React, { useState, useCallback } from "react";
import { StyleSheet, View, Pressable, Text, Modal, ScrollView } from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import AtomsFormFieldIconRi from "../components/AtomsFormFieldIconRi";
import DetailContainer from "../components/DetailContainer";
import CompetitionSection from "../components/CompetitionSection";
import EventDetailContainer from "../components/EventDetailContainer";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const FeedPage = () => {
  const [atomsFormFieldDefaultVisible, setAtomsFormFieldDefaultVisible] =
    useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const openAtomsFormFieldDefault = useCallback(() => {
    setAtomsFormFieldDefaultVisible(true);
  }, []);

  const closeAtomsFormFieldDefault = useCallback(() => {
    setAtomsFormFieldDefaultVisible(false);
  }, []);

  return (
    <>
      <View style={styles.feedPage}>
        <View style={[styles.feedPageChild, styles.childLayout]} />
        <Image
          style={[styles.feedPageItem, styles.childLayout]}
          contentFit="cover"
          source={require("../assets/frame-1.png")}
        />
        <Pressable
          style={[styles.notification, styles.notificationPosition]}
          onPress={() => navigation.navigate("NotificationPage")}
        >
          <Image
            style={styles.iconLayout}
            contentFit="cover"
            source={require("../assets/notification.png")}
          />
        </Pressable>
        <Text style={styles.clubThatU}>club that u may be interested in:</Text>
        <Text style={styles.event}>Event :</Text>
        <AtomsFormFieldIconRi
          atomsFormFieldIconRiPosition="absolute"
          atomsFormFieldIconRiWidth={350}
          atomsFormFieldIconRiHeight={35}
          atomsFormFieldIconRiLeft={24}
          atomsFormFieldIconRiTop={94}
          onAtomsFormFieldDefaultPress={openAtomsFormFieldDefault}
        />
        <Image
          style={[styles.feedPageInner, styles.notificationPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-88.png")}
        />
        <Pressable
          style={styles.c95fB49443379433Da37b8f9bc}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Image
            style={[styles.icon1, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/NongNhaoSmall.png")}
          />
        </Pressable>
        <View style={styles.event1}>
          <View style={[styles.event1Child, styles.image2IconPosition]} />
          <Image
            style={[styles.clockLightIcon, styles.iconPosition2]}
            contentFit="cover"
            source={require("../assets/clock-light.png")}
          />
          <Text style={[styles.everyTuesThus, styles.kfcTypo]}>
            every tues, thus
          </Text>
          <Image
            style={[styles.pinAltDuotoneLineIcon, styles.iconPosition2]}
            contentFit="cover"
            source={require("../assets/pin-alt-duotone-line.png")}
          />
          <Text style={[styles.kfc, styles.kfcTypo]}>KFC</Text>
          <Text
            style={[styles.text, styles.textTypo]}
          >{`ยูยิตสูและบราซิลเลี่ยนยูยิตสู : 
เย็นวันนี้ซ้อมกันจ้า`}</Text>
          <DetailContainer
            detailText="Detail"
            propTop="50%"
            propLeft="50%"
            propMarginTop={58.4}
            propMarginLeft={57}
            propWidth={100}
            propHeight={30}
            propBorderStyle="unset"
            propBorderColor="unset"
            propHeight1="100%"
            propWidth1="100%"
            propRight="0%"
            propBottom="0%"
            propBackgroundColor="unset"
            propBackgroundColor1="#000"
            propBorderRadius1={4}
            propBackgroundColor2="rgba(253, 116, 1, 0)"
            propMarginTop1={-6.5}
            propRight1={16}
            propMarginTop2={-6.5}
            propLeft1="21.62%"
            propFontSize={12}
            propColor="#fff"
            propFontFamily="Ubuntu-Regular"
            onButtonPress={() => navigation.navigate("DetailPage")}
          />
          <Image
            style={[styles.image2Icon, styles.iconPosition1]}
            contentFit="cover"
            source={require("../assets/image-2.png")}
          />
        </View>
        <View style={[styles.event2, styles.event2Layout]}>
          <View style={[styles.event2Child, styles.event2Layout]} />
          <Image
            style={[styles.image3Icon, styles.event2Layout]}
            contentFit="cover"
            source={require("../assets/image-3.png")}
          />
          <Text style={[styles.nov30, styles.nov30Typo]}>
            30 Nov - 30 Dec 23
          </Text>
          <Image
            style={[styles.pinAltDuotoneLineIcon1, styles.iconPosition]}
            contentFit="cover"
            source={require("../assets/pin-alt-duotone-line1.png")}
          />
          <Text style={[styles.n16LearningExchange, styles.nov30Typo]}>
            N16 Learning exchange
          </Text>
          <Text style={[styles.innovationForKmutt, styles.textTypo]}>
            โครงการประกวดนวัตกรรม Innovation For Kmutt...
          </Text>
          <DetailContainer
            detailText="Detail"
            propTop={155}
            propLeft={248}
            propMarginTop="unset"
            propMarginLeft="unset"
            propWidth={100}
            propHeight={30}
            propBorderStyle="unset"
            propBorderColor="unset"
            propHeight1="100%"
            propWidth1="100%"
            propRight="0%"
            propBottom="0%"
            propBackgroundColor="unset"
            propBackgroundColor1="#d8d8d8"
            propBorderRadius1={4}
            propBackgroundColor2="#000"
            propMarginTop1={-6.5}
            propRight1={16}
            propMarginTop2={-6.5}
            propLeft1="21.62%"
            propFontSize={12}
            propColor="#fff"
            propFontFamily="Ubuntu-Regular"
            onButtonPress={() => navigation.navigate("DetailPage")}
          />
          <Image
            style={[styles.clockLightIcon1, styles.iconPosition]}
            contentFit="cover"
            source={require("../assets/clock-light1.png")}
          />
        </View>
        <CompetitionSection />
        <DetailContainer
          detailText="Detail"
          propTop={919}
          propLeft={248}
          propMarginTop="unset"
          propMarginLeft="unset"
          propBorderRadius={10}
          propWidth={100}
          propHeight={30}
          propBorderStyle="unset"
          propBorderColor="unset"
          propHeight1="100%"
          propWidth1="100%"
          propRight="0%"
          propBottom="0%"
          propBackgroundColor="unset"
          propBackgroundColor1="#d8d8d8"
          propBorderRadius1={4}
          propBackgroundColor2="#000"
          propMarginTop1={-6.5}
          propRight1={16}
          propMarginTop2={-6.5}
          propLeft1="21.62%"
          propFontSize={12}
          propColor="#fff"
          propFontFamily="Ubuntu-Regular"
          onButtonPress={() => navigation.navigate("DetailPage")}
        />
        <EventDetailContainer />
        <View style={[styles.rectangleView, styles.childLayout]} />
        <View style={styles.feedPageChild1} />
        <View style={[styles.feedPageChild2, styles.feedChildLayout]} />
        <View style={[styles.feedPageChild3, styles.feedChildLayout]} />
        <View style={[styles.feedPageChild4, styles.feedChildLayout]} />
        <View style={[styles.feedPageChild5, styles.feedChildLayout]} />
        <View style={[styles.feedPageChild6, styles.feedChildLayout]} />
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={atomsFormFieldDefaultVisible}
      >
        <View style={styles.atomsFormFieldDefaultOverlay}>
          <Pressable
            style={styles.atomsFormFieldDefaultBg}
            onPress={closeAtomsFormFieldDefault}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  childLayout: {
    width: "100%",
    left: 0,
  },
  notificationPosition: {
    top: 40,
    position: "absolute",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  image2IconPosition: {
    marginTop: -100,
    height: 200,
    position: "absolute",
  },
  iconPosition2: {
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
    left: "50%",
    top: "50%",
    marginLeft: -195,
  },
  event2Layout: {
    height: 198,
    position: "absolute",
  },
  nov30Typo: {
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
  feedChildLayout: {
    backgroundColor: Color.colorSandybrown,
    height: 4,
    width: 390,
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
    left: 0,
    top: 0,
  },
  feedPageChild: {
    top: 574,
    height: 165,
    backgroundColor: Color.iOSFFFFFF,
    width: "100%",
    left: 0,
    position: "absolute",
  },
  feedPageItem: {
    top: 599,
    height: 140,
    left: 0,
    width: "390",
    position: "absolute",
  },
  notification: {
    left: 333,
    width: 39,
    height: 39,
  },
  clubThatU: {
    top: 577,
    left: 10,
    width: 353,
    height: 29,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.ubuntuRegular,
    textTransform: "uppercase",
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
  c95fB49443379433Da37b8f9bc: {
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
  everyTuesThus: {
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
    marginTop: -300,
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
    left: "50%",
    top: "50%",
    marginLeft: -170,
  },
  nov30: {
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
    top: 372,
    width: 390,
    left: 0,
  },
  rectangleView: {
    top: 1189,
    borderBottomRightRadius: Border.br_3xs,
    borderBottomLeftRadius: Border.br_3xs,
    height: 17,
    backgroundColor: Color.iOSFFFFFF,
    width: 390,
    left: 0,
    position: "absolute",
  },
  feedPageChild1: {
    top: 143,
    backgroundColor: "#f3c28f",
    height: 4,
    display: "none",
    width: 390,
    left: 0,
    position: "absolute",
  },
  feedPageChild2: {
    top: 368,
  },
  feedPageChild3: {
    top: 570,
  },
  feedPageChild4: {
    top: 739,
  },
  feedPageChild5: {
    top: 1184,
  },
  feedPageChild6: {
    top: 963,
  },
  feedPage: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorDarkorange_100,
    flex: 1,
    height: 1206,
    width: "100%",
  },
});

export default FeedPage;
