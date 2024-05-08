import * as React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import DetailContainer from "./DetailContainer";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

export type CautionJoinEventType = {
  onClose?: () => void;
};

const CautionJoinEvent = ({ onClose }: CautionJoinEventType) => {
  const joinEvent = () => {
    if(onClose) onClose();
    console.log("Join Event");
  }

  return (
    <View style={styles.cautionJoinEvent}>
      <View style={styles.cautionJoinEventChild}>
        <Text style={styles.cautionText}>Are You Sure?</Text>
        <View style={styles.buttonContainer}>
          <Pressable style = {[styles.cautionButton,styles.yesButton]} onPress={joinEvent}>
            <Text style={styles.buttonText}>Yes</Text>
          </Pressable>
          <Pressable style = {[styles.cautionButton,styles.noButton]} onPress={onClose}>
            <Text style={styles.buttonText}>No</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cautionJoinEvent: {
    width: 380,
    height: 175,
    overflow: "hidden",
    maxWidth: "85%",
    maxHeight: "100%",
  },
  cautionJoinEventChild: {
    height: "100%",
    width: "100%",
    borderRadius: Border.br_3xs,
    backgroundColor: Color.iOSFFFFFF,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 2,
  },
  cautionText: {
    fontSize: FontSize.size_5xl,
    textTransform: "uppercase",
    fontFamily: FontFamily.ubuntuRegular,
    color: Color.colorBlack,
    textAlign: "center",
    textAlignVertical: "center",
    flex: 3
  },
  buttonContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  cautionButton: {
    height: "70%",
    width: "40%",
    borderRadius: Border.br_9xs,
    borderWidth: 2
  },
  buttonText:{
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.ubuntuRegular,
    color: Color.colorWhitesmoke_100,
  },
  yesButton: {
    backgroundColor: Color.colorForestgreen
  },
  noButton: {
    backgroundColor: Color.colorFirebrick
  },
});

export default CautionJoinEvent;