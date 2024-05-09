import React, { useState, useCallback, useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Modal, Pressable } from "react-native";
import EditProfilePopup from "../components/EditProfilePopup";
import DetailContainer from "../components/DetailContainer";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export type profileToBeShown = {
  Name: string;
  AcademicDegree: string;
  Year: number;
  Department: string;
}

const EditProfile = ({navigation, route}: {navigation: any, route:any}) => {
  const [shownProfile, setShownProfile] = useState<profileToBeShown | null>(null);

  const renderProfileData = () => {
    if (!shownProfile) return null;

    return Object.keys(shownProfile).map((key, index) => (
      <View key={key}>
        <Text style={styles.dataHeader}>{key}</Text>
        <Text style={styles.dataBody}>{shownProfile ? (shownProfile as any)[key] : ''}</Text>
      </View>
    ));
  };

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const apiToken = await AsyncStorage.getItem("apiToken");
        const userId = await AsyncStorage.getItem('userId');
        const response = await axios.get(`https://actiwizcpe.galapfa.ro/users/${userId}`, {
            headers: {
              'Authorization': `Bearer ${apiToken}`
            }
        })
        console.log(response.data);
        const userProfile = response.data;
        const shownProfile: profileToBeShown = {
          Name: userProfile.StudentName,
          AcademicDegree: userProfile.AcademicDegree,
          Year: userProfile.AcademicYear,
          Department: userProfile.Department
        };
        setShownProfile(shownProfile);
        console.log(shownProfile);
      } catch (error) {
        console.error("Error fetching apiToken or userID from AsyncStorage:", error);
      }
    };

    getUserProfile();
  }, []);

  return (
    <>
      <View style={styles.editProfile}>
        <View style={styles.upperPart}>
          <Pressable
            style={styles.arrowBackIos}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={[styles.icon1, styles.iconLayout]}
              contentFit="scale-down"
              source={require("../assets/arrow-back-ios1.png")}
            />
          </Pressable>
          <Image
            style={styles.editProfileChild}
            contentFit="fill"
            source={require("../assets/ellipse-87.png")}
          />
        </View>
        <View style={styles.lowerPart}>
          <View style={styles.profieArea}>
            <View style={styles.profileAreaChild}>
              {renderProfileData()}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  editChildLayout: {
    height: 43,
    width: 307,
    borderWidth: 2,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    backgroundColor: Color.colorDarkgray,
    left: 44,
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  dataHeader: {
    width: "auto",
    textAlign: "left",
    color: Color.colorDimgray,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base_2,
  },
  editProfileChild: {
    flex: 2,
    height: "50%",
    width: "50%",
  },
  profieArea: {
    backgroundColor: Color.iOSFFFFFF,
    width: "100%",
    height: "100%",
    maxWidth: "80%",
    maxHeight: "80%",
    borderRadius: Border.br_3xs,
    flex: 1,
  },
  rectangle1Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  rectangle1Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  editProfileInner: {
    top: 572,
  },
  rectangle2Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  rectangle2Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  rectangleView: {
    top: 494,
  },
  rectangle3Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  rectangle3Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  editProfileChild1: {
    top: 416,
  },
  WinterImageOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  WinterImageBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  icon: {
    borderRadius: Border.br_341xl,
  },
  Winter: {
    left: 133,
    top: 105,
    width: 124,
    height: 130,
    position: "absolute",
  },
  name: {
    top: 314,
  },
  year: {
    top: 470,
  },
  academicId: {
    top: 548,
  },
  studentId: {
    top: 392,
  },
  icon1: {
    overflow: "hidden",
  },
  arrowBackIos: {
    flex: 1,
    height: "10%",
    width: "10%",
    left: "5%",
    top: "5%",
    alignSelf: "flex-start",
  },
  rectangle5Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  rectangle5Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  editProfileChild2: {
    top: 338,
  },
  editProfile: {
    backgroundColor: Color.colorDarkorange_100,
    flex: 1,
    overflow: "hidden",
    width: "100%",
    height: "100%"
  },
  upperPart: {
    flex: 2,
    alignItems: "center",
  },
  lowerPart: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  dataBody: {
    width: "auto",
    textAlign: "left",
    color: Color.colorDimgray,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
  },
  profileAreaChild: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  }
});

export default EditProfile;
