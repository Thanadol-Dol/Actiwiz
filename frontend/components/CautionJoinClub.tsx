import * as React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../utils/GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export type CautionJoinClubType = {
  onClose?: () => void;
  onUpdate?: () => void;
  clubID: string;
};

const CautionJoinClub = ({ onClose, onUpdate, clubID }: CautionJoinClubType) => {
  const requestJoinClub = async () => {
    try {
      const apiToken = await AsyncStorage.getItem("apiToken");
      const userId = await AsyncStorage.getItem('userId');
      const response = await axios.post(`https://actiwizcpe.galapfa.ro/clubs/join/${clubID}`, null, {
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

  const joinClub = () => {
    if(onClose) onClose();
    if(onUpdate) onUpdate();
    requestJoinClub();
  }

  return (
    <View style={styles.cautionJoinClub}>
      <View style={styles.cautionJoinClubChild}>
        <Text style={styles.cautionText}>Are You Sure?</Text>
        <View style={styles.buttonContainer}>
          <Pressable style = {[styles.cautionButton,styles.yesButton]} onPress={joinClub}>
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
  cautionJoinClub: {
    width: 380,
    height: 175,
    overflow: "hidden",
    maxWidth: "85%",
    maxHeight: "100%",
  },
  cautionJoinClubChild: {
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

export default CautionJoinClub;