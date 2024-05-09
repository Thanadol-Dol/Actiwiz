import * as React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export type CautionLeaveClubType = {
  onClose?: () => void;
  onUpdate?: () => void;
  clubID: string;
};

const CautionLeaveClub = ({ onClose, onUpdate, clubID }: CautionLeaveClubType) => {
  const requestLeaveClub = async () => {
    try {
      const apiToken = await AsyncStorage.getItem("apiToken");
      const userId = await AsyncStorage.getItem('userId');
      const response = await axios.delete(`https://actiwizcpe.galapfa.ro/clubs/leave/${clubID}`, {
          headers: {
            'Authorization': `Bearer ${apiToken}`
          },
          params: {
            user_id: userId
          }
      })
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching apiToken or userID from AsyncStorage:", error);
    }
  };

  const leaveClub = () => {
    if(onClose) onClose();
    if(onUpdate) onUpdate();
    requestLeaveClub();
  }

  return (
    <View style={styles.cautionLeaveClub}>
      <View style={styles.cautionLeaveClubChild}>
        <Text style={styles.cautionText}>Are You Sure?</Text>
        <View style={styles.buttonContainer}>
          <Pressable style = {[styles.cautionButton,styles.yesButton]} onPress={leaveClub}>
            <Text style={[styles.buttonText,styles.yesButtonText]}>Yes</Text>
          </Pressable>
          <Pressable style = {[styles.cautionButton,styles.noButton]} onPress={onClose}>
            <Text style={[styles.buttonText,styles.noButtonText]}>No</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cautionLeaveClub: {
    width: 380,
    height: 175,
    overflow: "hidden",
    maxWidth: "85%",
    maxHeight: "100%",
  },
  cautionLeaveClubChild: {
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
    fontFamily: FontFamily.ubuntuRegular
  },
  yesButtonText: {
    color: Color.colorWhitesmoke_100
  },
  noButtonText: {
    color: Color.colorBlack
  },
  yesButton: {
    backgroundColor: Color.colorFirebrick
  },
  noButton: {
    backgroundColor: Color.colorGainsboro_100
  },
});

export default CautionLeaveClub;