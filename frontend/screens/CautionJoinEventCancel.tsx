import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import CancelButtonContainer from "../components/CancelButtonContainer";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const CautionJoinEventCancel = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.cautionJoinEventCancel}>
      <View style={styles.cautionJoinEventCancelChild} />
      <CancelButtonContainer
        answerOption="Yes"
        onButtonPress={() => navigation.navigate("DetailPage")}
      />
      <CancelButtonContainer
        answerOption="No"
        maskLeft={213}
        viewBackgroundColor="#230101"
        textBackgroundColor="#e8e8e8"
        propLeft="34.21%"
        propColor="#000"
        onButtonPress={() => navigation.navigate("JoinPage")}
      />
      <Text style={styles.areUSure}>Are u sure to cancel?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cautionJoinEventCancelChild: {
    height: "100%",
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
    width: "100%",
  },
  areUSure: {
    top: 20,
    left: 51,
    fontSize: FontSize.size_5xl,
    textTransform: "uppercase",
    fontFamily: FontFamily.ubuntuRegular,
    color: Color.colorBlack,
    textAlign: "left",
    width: 277,
    height: 39,
    position: "absolute",
  },
  cautionJoinEventCancel: {
    flex: 1,
    height: 175,
    overflow: "hidden",
    width: "100%",
  },
});

export default CautionJoinEventCancel;
