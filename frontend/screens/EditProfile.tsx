import React, { useState, useCallback, useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Modal, Pressable, ActivityIndicator } from "react-native";
import EditProfilePopup from "../components/EditProfilePopup";
import DetailContainer from "../components/DetailContainer";
import CautionLogOut from "../components/CautionLogout";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

export type profileToBeShown = {
  Name: string;
  AcademicDegree: string;
  Year: number;
  Department: string;
}

const EditProfile = ({navigation}: {navigation: any}) => {
  const [shownProfile, setShownProfile] = useState<profileToBeShown | null>(null);
  const [groupContainerVisible, setGroupContainerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openGroupContainer = useCallback(() => {
    setGroupContainerVisible(true);
  }, []);

  const closeGroupContainer = useCallback(() => {
    setGroupContainerVisible(false);
  }, []);

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("apiToken");
      await AsyncStorage.removeItem("graphToken");
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("userId");
      navigation.navigate("LoginPage", { refresh: true });
    } catch (error) {
      console.error("Error removing apiToken or userID from AsyncStorage:", error);
    }
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
        setIsLoading(false);
        console.log(shownProfile);
      } catch (error) {
        console.error("Error fetching apiToken or userID from AsyncStorage:", error);
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, []);

  return (
    <>
    <StatusBar backgroundColor={Color.colorDarkorange_100}/>
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
            source={require("../assets/login-photo.png")}
          />
        </View>
        <View style={styles.lowerPart}>
          <View style={styles.profileArea}>
            <View style={styles.profileAreaChildContainer}>
            {isLoading ? (
                <ActivityIndicator size="large" color={Color.colorDarkorange_100} />
              ) : (
                <>
              <View style={styles.profileAreaChild}>
                <Text style={styles.dataHeader}>Name</Text>
                <Text style={styles.dataBody}>{shownProfile?.Name}</Text>
              </View>
              <View style={styles.profileAreaChild}>
                <Text style={styles.dataHeader}>Academic Degree</Text>
                <Text style={styles.dataBody}>{shownProfile?.AcademicDegree}</Text>
              </View>
              <View style={styles.profileAreaChild}>
                <Text style={styles.dataHeader}>Academic Year</Text>
                <Text style={styles.dataBody}>{shownProfile?.Year}</Text>
              </View>
              <View style={styles.profileAreaChild}>
                <Text style={styles.dataHeader}>Department</Text>
                <Text style={styles.dataBody}>{shownProfile?.Department}</Text>
              </View>
              <View style={styles.logOutButton}>
                <Pressable onPress={openGroupContainer}>
                  <Text style={styles.logOutButtonText}>LOG OUT</Text>
                </Pressable>
              </View>
              </>
              )}
            </View>
          </View>
        </View>

        <Modal animationType="fade" transparent visible={groupContainerVisible}>
          <View style={styles.groupContainerOverlay}>
            <Pressable
              style={styles.groupContainerBg}
              onPress={closeGroupContainer}
            />
            <CautionLogOut onClose={closeGroupContainer} onLogout={logOut} />
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  dataHeader: {
    width: "auto",
    textAlign: "left",
    color: Color.colorDimgray,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_xl,
    fontWeight: "bold",
  },
  editProfileChild: {
    flex: 2,
    height: "50%",
    width: "50%",
  },
  profileArea: {
    backgroundColor: Color.iOSFFFFFF,
    width: "100%",
    height: "100%",
    maxWidth: "80%",
    maxHeight: "80%",
    borderRadius: Border.br_3xs,
    flex: 1,
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
  },
  profileAreaChildContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: "10%",
  },
  logOutButton: {
    flex: 2,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    maxWidth: "50%",
    maxHeight: "12%",
    backgroundColor: Color.colorFirebrick,
    borderRadius: Border.br_3xs,
    marginTop: "5%",
    alignSelf: "center",
  },
  logOutButtonText: {
    color: Color.iOSFFFFFF,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
    padding: "5%",
    height: "100%",
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
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
});

export default EditProfile;
