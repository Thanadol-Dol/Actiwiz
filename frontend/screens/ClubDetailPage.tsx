import React, { useState, useCallback, useEffect } from "react";
import { Text, StyleSheet, View, ScrollView, Pressable, Modal, ImageStyle, ActivityIndicator} from "react-native";
import { Image } from "expo-image";
import CautionJoinClub from "../components/CautionJoinClub";
import CautionLeaveClub from "../components/CautionLeavClub";
import { Color, FontFamily, FontSize, Border } from "../utils/GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { setNewTokens, removeCredentials } from "../utils/credentialUtils";


const ClubDetailPage = ({navigation, route}: {navigation: any, route:any}) => {
  const clubID = route.params.ClubID;
  const clubName = route.params.ClubName;

  const [apiToken, setApiToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [joinedClub, setJoinedClub] = useState(false);
  const [groupContainerVisible, setGroupContainerVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const openGroupContainer = useCallback(() => {
    setGroupContainerVisible(true);
  }, []);

  const closeGroupContainer = useCallback(() => {
    setGroupContainerVisible(false);
  }, []);

  const toggleJoinClub = useCallback(() => {
    setJoinedClub(!joinedClub);
  }, [joinedClub]);

  useEffect(() => {
    const setCredentials = async () => {
      const api_token = await AsyncStorage.getItem("apiToken");
      const user_id = await AsyncStorage.getItem("userId").then((value) => parseInt(value as string));
      if (api_token && user_id) {
        setUserId(user_id);
        setApiToken(api_token);
      } else {
        removeCredentials();
        navigation.navigate("LoginPage", { refresh: true });
      }
    };
  
    setCredentials();

    const readDetail = async () => {
      try {
        const apiToken = await AsyncStorage.getItem("apiToken");
        const userId = await AsyncStorage.getItem('userId');
        const response = await axios.post(`https://actiwizcpe.galapfa.ro/clubs/read/${clubID}`, null, {
            headers: {
              'Authorization': `Bearer ${apiToken}`
            },
            params: {
              user_id: parseInt(userId as string, 10),
            }
        });
      } catch (error: any) {
        if(error.response.status === 401 || error.response.data.detail.includes("401")){
          try{
              alert("Token expired, please wait a moment and try again.")
              const refreshToken = await AsyncStorage.getItem("refreshToken");
              const response = await setNewTokens(refreshToken);
              setApiToken(response.api_token);
          } catch (error) {
              alert("Please login again")
              removeCredentials();
              navigation.navigate("LoginPage", { refresh: true });
            }
        } else {
          console.error("Error fetching recommendations:", error);
          }
        } finally{
          setLoading(false);
        }
    }

    const checkJoinedClub = async () => {
      try {
        const apiToken = await AsyncStorage.getItem("apiToken");
        const userId = await AsyncStorage.getItem('userId');
        const response = await axios.get(`https://actiwizcpe.galapfa.ro/clubs/check/joined/${clubID}`, {
            headers: {
              'Authorization': `Bearer ${apiToken}`
            },
            params: {
              user_id: parseInt(userId as string, 10)
            }
        })
        console.log(response.data);
        setJoinedClub(response.data.joined);
      } catch (error: any) {
          if(error.response.status === 401 || error.response.data.detail.includes("401")){
            try{
                alert("Token expired, please wait a moment and try again.")
                const refreshToken = await AsyncStorage.getItem("refreshToken");
                const response = await setNewTokens(refreshToken);
                setApiToken(response.api_token);
            } catch (error) {
                alert("Please login again")
                removeCredentials();
                navigation.navigate("LoginPage", { refresh: true });
            }
          } else{
            console.error("Error fetching data from API:", error);
          }
        } finally{
          setLoading(false);
        }
    };

    readDetail();
    checkJoinedClub();
  }, [apiToken]);

  return (
    <>
    <StatusBar backgroundColor={Color.colorDarkorange_100}/>
      <View style={[styles.screenHeader]}>
        <Pressable
          style={styles.backArrow}
          onPress={() => navigation.goBack()}
        >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/back-arrow.png")}
        />
        </Pressable>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fd7401" />
        </View>
      ) : (
      <ScrollView>
        <Image
          style={styles.image4IconPosition}
          contentFit="cover"
          source={require("../assets/club-image.png")}
        />
        <View style={styles.detailContainer}>
          <Text style={styles.detailHeader}>{clubName}</Text>
        </View>

            {joinedClub
              ? 
              <Pressable
                style={[styles.rectangleParent,styles.rectangleParentJoined]}
                onPress={openGroupContainer}
              >
                <Text style={styles.join}>Leave</Text>
              </Pressable>
              : 
              <Pressable
                style={[styles.rectangleParent,styles.rectangleParentNormal]}
                onPress={openGroupContainer}
              >
                <Text style={styles.join}>Join</Text>
              </Pressable>
            }
        
          <Modal animationType="fade" transparent visible={groupContainerVisible}>
            <View style={styles.groupContainerOverlay}>
              <Pressable
                style={styles.groupContainerBg}
                onPress={closeGroupContainer}
              />
              {joinedClub
                ? <CautionLeaveClub onClose={closeGroupContainer} onUpdate={toggleJoinClub} clubID={clubID}/>
                : <CautionJoinClub onClose={closeGroupContainer} onUpdate={toggleJoinClub} clubID={clubID}/>
              }
            </View>
          </Modal>
      </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  screenHeader: {
    backgroundColor: Color.colorDarkorange_100,
    height: "8%",
    width: "100%",
  },
  backArrow: {
    left: 14,
    top: 31,
    width: 24,
    height: 24,
    position: "absolute",
  },
  detailContainer: {
    textAlign: 'left',
    padding: 30,
    width: "100%",
    color: Color.colorBlack,
    marginBottom: "30%",
  },
  detailHeader: {
    fontSize: 30,
    fontWeight: "700",
    fontFamily: FontFamily.ubuntuBold,
    textAlign: "left",
  },
  detailBody: {
    fontSize: 15,
    fontFamily: FontFamily.ubuntuRegular,
  },
  iconLayout: {
    overflow: "hidden",
  },
  image4IconPosition: {
    height: 371,
    width: "100%",
  },
  icon: {
    height: "100%",
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
    fontSize: FontSize.size_base_2,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.iOSFFFFFF,
  },
  rectangleParent: {
    bottom: 20, // Adjust as needed
    alignSelf: "center", // Center horizontally
    borderRadius: 8,
    elevation: 3, // Add elevation for shadow
    marginTop: 20, // Adjust as needed
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "38%", // Add padding for touch area
    paddingVertical: 12, // Add padding for touch area
  },
  rectangleParentNormal:{
    backgroundColor: Color.colorDarkorange_200
  },
  rectangleParentJoined:{
    backgroundColor: Color.colorFirebrick
  },
  checkRingRoundIcon: {
    width: 39,
    height: 39,
  },
  bottomPart:{
    flex: 1,
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},
});

export default ClubDetailPage;
