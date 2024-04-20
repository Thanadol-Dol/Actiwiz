import * as React from "react";
import { StyleSheet, View, Pressable, Linking, Text, ImageStyle } from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";

const JoinPage = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={[styles.joinPage, styles.iconLayout]}>
      <View style={[styles.joinPageChild, styles.image4IconPosition]} />
      <Pressable
        style={styles.arrowBackIos}
        onPress={() => navigation.navigate("FeedPage")}
      >
        <Image
          style={[styles.icon, styles.iconLayout] as ImageStyle} // Change the type of the style prop to ImageStyle
          source={require("../assets/arrow-back-ios1.png")}
        />
      </Pressable>
      <Image
        style={[styles.image4Icon, styles.image4IconPosition] as ImageStyle} // Change the type of the style prop to ImageStyle
        source={require("../assets/image-41.png")}
      />
      <Text style={[styles.descriptionBangmodContainer, styles.joinedClr]}>
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
      <View style={[styles.rectangleParent, styles.groupChildLayout]}>
        <View style={[styles.groupChild, styles.groupChildLayout]} />
        <Text style={[styles.joined, styles.joinedClr]}>Joined</Text>
        <Image
          style={styles.checkRingRoundIcon as ImageStyle}
          source={require("../assets/check-ring-round.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    overflow: "hidden",
    width: "100%",
  },
  image4IconPosition: {
    width: 390,
    left: 0,
    position: "absolute",
  },
  joinedClr: {
    color: Color.colorBlack,
    position: "absolute",
  },
  groupChildLayout: {
    height: 50,
    width: 359,
    position: "absolute",
  },
  joinPageChild: {
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
    textAlign: "left",
    width: 346,
    height: 251,
  },
  groupChild: {
    borderRadius: 8,
    backgroundColor: "#61f9cb",
    shadowColor: "#76dbbd",
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
  joined: {
    marginTop: -12.75,
    marginLeft: -42.65,
    top: "50%",
    left: "50%",
    fontSize: FontSize.size_base_2,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    textAlign: "center",
    width: 106,
  },
  checkRingRoundIcon: {
    top: 5,
    left: 118,
    width: 39,
    height: 39,
    position: "absolute",
  },
  rectangleParent: {
    top: 739,
    left: 18,
  },
  joinPage: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.iOSFFFFFF,
    flex: 1,
    height: 844,
  },
});

export default JoinPage;
