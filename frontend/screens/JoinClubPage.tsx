import React, { useState, useCallback } from "react";
import { Text, StyleSheet, View, Pressable, Modal } from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import CautionJoinClubCancel from "../components/CautionJoinClubCancel";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const JoinClubPage = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [groupContainerVisible, setGroupContainerVisible] = useState(false);

  const openGroupContainer = useCallback(() => {
    setGroupContainerVisible(true);
  }, []);

  const closeGroupContainer = useCallback(() => {
    setGroupContainerVisible(false);
  }, []);

  return (
    <>
      <View style={[styles.joinClubPage, styles.iconLayout]}>
        <Text style={[styles.basketballClubKmutt, styles.basketballTypo]}>
          Basketball club kmutt
        </Text>
        <Image
          style={styles.checkRingRoundIcon}
          contentFit="cover"
          source={require("../assets/check-ring-round1.png")}
        />
        <Text style={[styles.youHaveAlready, styles.cancleFlexBox]}>
          You have already joined Basketball club
        </Text>
        <View style={[styles.joinClubPageChild, styles.joinPosition]} />
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
          style={[styles.joinClubPageItem, styles.joinPosition]}
          contentFit="cover"
          source={require("../assets/rectangle-40.png")}
        />
        <Text style={[styles.basketballClubKmutt1, styles.descriptionTypo]}>
          Basketball club kmutt
        </Text>
        <Text style={[styles.description, styles.descriptionTypo]}>
          Description : ชมรมบาสเก็ตบอล มหาวิทยาลัยเทคโนโลยี
        </Text>
        <Pressable
          style={[styles.rectangleParent, styles.groupChildLayout]}
          onPress={openGroupContainer}
        >
          <View style={[styles.groupChild, styles.groupChildLayout]} />
          <Text style={[styles.cancle, styles.cancleFlexBox]}>Cancle</Text>
        </Pressable>
      </View>

      <Modal animationType="fade" transparent visible={groupContainerVisible}>
        <View style={styles.groupContainerOverlay}>
          <Pressable
            style={styles.groupContainerBg}
            onPress={closeGroupContainer}
          />
          <CautionJoinClubCancel onClose={closeGroupContainer} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    overflow: "hidden",
    width: "100%",
  },
  basketballTypo: {
    width: 368,
    fontSize: FontSize.size_5xl,
    textAlign: "center",
  },
  cancleFlexBox: {
    textAlign: "center",
    color: Color.iOSFFFFFF,
    position: "absolute",
  },
  joinPosition: {
    width: 390,
    left: 0,
    position: "absolute",
  },
  descriptionTypo: {
    color: Color.colorBlack,
    fontFamily: FontFamily.ubuntuRegular,
    textTransform: "uppercase",
    position: "absolute",
  },
  groupChildLayout: {
    height: 50,
    width: 359,
    position: "absolute",
  },
  basketballClubKmutt: {
    top: 491,
    left: 16,
    height: 56,
    color: Color.iOSFFFFFF,
    width: 368,
    fontFamily: FontFamily.ubuntuRegular,
    textTransform: "uppercase",
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  checkRingRoundIcon: {
    top: 451,
    left: 179,
    width: 39,
    height: 39,
    position: "absolute",
  },
  youHaveAlready: {
    top: 529,
    left: 65,
    fontSize: FontSize.iOSMediumBody_size,
    width: 260,
    height: 57,
    fontFamily: FontFamily.ubuntuRegular,
    textTransform: "uppercase",
    textAlign: "center",
  },
  joinClubPageChild: {
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
  joinClubPageItem: {
    top: 64,
    height: 371,
  },
  basketballClubKmutt1: {
    top: 449,
    left: 11,
    height: 30,
    width: 368,
    fontSize: FontSize.size_5xl,
    textAlign: "center",
    color: Color.colorBlack,
  },
  description: {
    top: 492,
    left: 29,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    width: 302,
    height: 56,
  },
  groupContainerOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  groupContainerBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  groupChild: {
    borderRadius: 8,
    backgroundColor: Color.colorFirebrick,
    shadowColor: "rgba(249, 73, 34, 0.49)",
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
  cancle: {
    marginTop: -11.75,
    marginLeft: -52.65,
    top: "50%",
    left: "50%",
    fontSize: FontSize.size_base_2,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    width: 106,
  },
  rectangleParent: {
    top: 639,
    left: 15,
  },
  joinClubPage: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.iOSFFFFFF,
    flex: 1,
    height: 844,
  },
});

export default JoinClubPage;
