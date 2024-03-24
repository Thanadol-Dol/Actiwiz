import React, { useState, useCallback } from "react";
import { Text, StyleSheet, View, Pressable, Modal } from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import CautionJoinClub from "../components/CautionJoinClub";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const ClubPage = () => {
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
      <View style={[styles.clubPage, styles.iconLayout]}>
        <Text style={[styles.basketballClubKmutt, styles.joinFlexBox]}>
          Basketball club kmutt
        </Text>
        <Text style={[styles.description, styles.descriptionTypo]}>
          Description : ชมรมบาสเก็ตบอล มหาวิทยาลัยเทคโนโลยี
        </Text>
        <View style={[styles.clubPageChild, styles.clubPosition]} />
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
          style={[styles.clubPageItem, styles.clubPosition]}
          contentFit="cover"
          source={require("../assets/rectangle-40.png")}
        />
        <Pressable
          style={[styles.rectangleParent, styles.groupChildLayout]}
          onPress={openGroupContainer}
        >
          <View style={[styles.groupChild, styles.groupChildLayout]} />
          <Text style={[styles.join, styles.joinFlexBox]}>Join</Text>
        </Pressable>
      </View>

      <Modal animationType="fade" transparent visible={groupContainerVisible}>
        <View style={styles.groupContainerOverlay}>
          <Pressable
            style={styles.groupContainerBg}
            onPress={closeGroupContainer}
          />
          <CautionJoinClub onClose={closeGroupContainer} />
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
  joinFlexBox: {
    textAlign: "center",
    position: "absolute",
  },
  descriptionTypo: {
    color: Color.colorBlack,
    fontFamily: FontFamily.ubuntuRegular,
    textTransform: "uppercase",
  },
  clubPosition: {
    width: 390,
    left: 0,
    position: "absolute",
  },
  groupChildLayout: {
    height: 50,
    width: 359,
    position: "absolute",
  },
  basketballClubKmutt: {
    top: 449,
    left: 11,
    fontSize: FontSize.size_5xl,
    width: 368,
    height: 30,
    color: Color.colorBlack,
    fontFamily: FontFamily.ubuntuRegular,
    textTransform: "uppercase",
  },
  description: {
    top: 492,
    left: 29,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    width: 302,
    height: 56,
    position: "absolute",
  },
  clubPageChild: {
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
  clubPageItem: {
    top: 64,
    height: 371,
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
    backgroundColor: Color.colorDarkorange_200,
    shadowColor: "rgba(253, 116, 1, 0.3)",
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
  join: {
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
  clubPage: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.iOSFFFFFF,
    flex: 1,
    height: 844,
  },
});

export default ClubPage;
