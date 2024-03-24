import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import DetailContainer from "./DetailContainer";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

export type CautionJoinClubCancelType = {
  onClose?: () => void;
};

const CautionJoinClubCancel = ({ onClose }: CautionJoinClubCancelType) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.cautionJoinClubCancel}>
      <View style={styles.cautionJoinClubCancelChild} />
      <DetailContainer
        detailText="Yes"
        propTop={95}
        propLeft={20}
        propMarginTop="unset"
        propMarginLeft="unset"
        propWidth={150}
        propHeight={44}
        propBorderStyle="solid"
        propBorderColor="#000"
        propBorderWidth={2}
        propHeight1="90.91%"
        propWidth1="97.33%"
        propRight="2.67%"
        propBottom="9.09%"
        propBackgroundColor="unset"
        propBackgroundColor1="#d8d8d8"
        propBorderRadius1={4}
        propBackgroundColor2="#be2828"
        propMarginTop1={-8.5}
        propRight1={20}
        propMarginTop2={-13.5}
        propLeft1="32.46%"
        propFontSize={24}
        propColor="#fff"
        propFontFamily="Ubuntu-Regular"
        onButtonPress={() => navigation.navigate("ClubPage")}
      />
      <DetailContainer
        detailText="No"
        propTop={95}
        propLeft={213}
        propMarginTop="unset"
        propMarginLeft="unset"
        propWidth={150}
        propHeight={44}
        propBorderStyle="solid"
        propBorderColor="#000"
        propBorderWidth={2}
        propHeight1="90.91%"
        propWidth1="97.33%"
        propRight="2.67%"
        propBottom="9.09%"
        propBackgroundColor="unset"
        propBackgroundColor1="#d8d8d8"
        propBorderRadius1={4}
        propBackgroundColor2="#e8e8e8"
        propMarginTop1={-8.5}
        propRight1={20}
        propMarginTop2={-13.5}
        propLeft1="34.21%"
        propFontSize={24}
        propColor="#000"
        propFontFamily="Ubuntu-Regular"
        onButtonPress={() => navigation.navigate("JoinClubPage")}
      />
      <Text style={styles.areUSure}>Are u sure to cancel?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cautionJoinClubCancelChild: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_3xs,
    backgroundColor: Color.iOSFFFFFF,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 2,
    position: "absolute",
  },
  areUSure: {
    top: 20,
    left: 51,
    fontSize: FontSize.size_5xl,
    textTransform: "uppercase",
    fontFamily: FontFamily.ubuntuRegular,
    color: Color.colorBlack,
    textAlign: "left",
    width: 280,
    height: 39,
    position: "absolute",
  },
  cautionJoinClubCancel: {
    width: 380,
    height: 175,
    overflow: "hidden",
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

export default CautionJoinClubCancel;
