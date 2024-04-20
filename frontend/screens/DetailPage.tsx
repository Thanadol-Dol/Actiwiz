import React, { useState, useCallback } from "react";
import {StyleSheet, View, Pressable, Text, Linking, Modal} from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import CautionJoinEvent from "../components/CautionJoinEvent";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";

const DetailPage = () => {
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
      <View style={[styles.detailPage, styles.iconLayout]}>
        <View style={[styles.detailPageChild, styles.image4IconPosition]} />
        <Image
          style={[styles.image4Icon, styles.image4IconPosition]}
          contentFit="cover"
          source={require("../assets/image-41.png")}
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
        <Pressable
          style={[styles.rectangleParent, styles.groupChildLayout]}
          onPress={openGroupContainer}
        >
          <View style={[styles.groupChild, styles.groupChildLayout]} />
          <Text style={styles.join}>Join</Text>
        </Pressable>
        <Text style={styles.descriptionBangmodContainer}>
          <Text style={styles.description}>{`Description : 
`}</Text>
          <Text style={styles.bangmodStreetBasketball3x3}>
            {`BANGMOD STREET BASKETBALL 3x3 2022
การแข่งขัน Basketball 3x3 ภายในมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี
จะจัดแข่งขันในวันที่ 26 พฤศจิกายน 2566
ชิงเงินรางวัลรวมมูลค่ากว่า 3,000 บาท มีทั้งทีมชายและทีมหญิงนะ
สามารถลงทะเบียนสมัครเข้าร่วมแข่งขันที่ :
`}
          </Text>
          <Text style={styles.bangmodStreetBasketball3x3}>
            <Text style={styles.httpsformsgleao8xrnosgm6d1}>
              https://forms.gle/ao8XrNosGM6dKSNF
            </Text>
          </Text>
          <Text style={styles.bangmodStreetBasketball3x3}>
            {`8
(หรือสแกน QR Code ด้านล่าง)
หมายเหตุ: มีค่าประกันทีม ทีมละ 200 บาท จะได้รับคืนหลังจากการแข่งขัน
สมัครได้ตั้งแต่วันนี้ ถึง วันที่ 22 พฤศจิกายน 2566 เวลา 23.59 น. รีบสมัครกันมาเยอะๆน้า
รับจำนวนจำกัด
หมายเหตุ : สงวนสิทธิ์ในการสมัครเฉพาะนักศึกษามหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรีเท่านั้น`}
          </Text>
        </Text>
      </View>

      <Modal animationType="fade" transparent visible={groupContainerVisible}>
        <View style={styles.groupContainerOverlay}>
          <Pressable
            style={styles.groupContainerBg}
            onPress={closeGroupContainer}
          />
          <CautionJoinEvent onClose={closeGroupContainer} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    overflow: "hidden",
  },
  image4IconPosition: {
    width: "100%",
    position: "absolute",
  },
  groupChildLayout: {
    height: 50,
    width: 359,
    position: "absolute",
  },
  detailPageChild: {
    backgroundColor: Color.colorDarkorange_100,
    height: 383,
    width: "100%",
  },
  image4Icon: {
    top: 64,
    height: 371,
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
    textAlign: "center",
    width: 106,
    position: "absolute",
  },
  rectangleParent: {
    top: 739,
    left: 18,
  },
  description: {
    fontSize: FontSize.size_sm,
    fontWeight: "700",
    fontFamily: FontFamily.ubuntuBold,
  },
  bangmodStreetBasketball3x3: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.ubuntuRegular,
  },
  httpsformsgleao8xrnosgm6d1: {
    textDecorationLine: "underline",
  },
  descriptionBangmodContainer: {
    top: 462,
    left: 24,
    textTransform: "uppercase",
    color: Color.colorBlack,
    textAlign: "left",
    width: 346,
    height: 251,
    position: "absolute",
  },
  detailPage: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.iOSFFFFFF,
    flex: 1,
    height: "100%",
    width: "100%",
  },
});

export default DetailPage;
