import React, { useState, useCallback, useEffect } from "react";
import {StyleSheet, View, ScrollView, Pressable, Text, Linking, Modal, ImageStyle, ActivityIndicator} from "react-native";
import { Image } from "expo-image";
import CautionJoinEvent from "../components/CautionJoinEvent";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface ActivityDetails {
  ActivityID: number;
  ActivityName: string;
  ActivityNameENG: string;
  Description: string;
  HourTotal: number;
  DayTotal: number;
  Semester: number;
  Organizer: string;
  OpenDate: Date;
  CloseDate: Date;
  AcademicYear: number;
};

const DetailPage = ({navigation, route}: {navigation: any, route:any}) => {
  const activityID = route.params.ActivityID;
  const activityName = route.params.ActivityName;
  const activityNameENG = route.params.ActivityNameENG;
  const activityDescription = route.params.Description;
  const activityHourTotal = route.params.HourTotal;
  const activityDayTotal = route.params.DayTotal;
  const activityOpenDate = new Date(route.params.OpenDate);
  const activityCloseDate = new Date(route.params.CloseDate);
  const activityAcademicYear = route.params.AcademicYear;
  const [ReadDetails, setReadDetails] = useState<ActivityDetails | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [joinedEvent, setJoinedEvent] = useState(false);
  const [groupContainerVisible, setGroupContainerVisible] = useState(false);
  
  const openGroupContainer = useCallback(() => {
    setGroupContainerVisible(true);
  }, []);

  const closeGroupContainer = useCallback(() => {
    setGroupContainerVisible(false);
  }, []);

  const toggleJoinEvent = useCallback(() => {
    setJoinedEvent(!joinedEvent);
  }, [joinedEvent]);

  useEffect(() => {
    const ReadDetails = async () => {
      try {
        const apiToken = await AsyncStorage.getItem("apiToken");
        const userId = await AsyncStorage.getItem('userId');
        const activityID = route.params.ActivityID;
        const response = await axios.post(`https://actiwizcpe.galapfa.ro/activities/read/${activityID}`, {
          headers: {
            'Authorization': `Bearer ${apiToken}`
          }
        });
        console.log("activityID:", activityID);
        setReadDetails(response.data);
      } catch (error) {
        console.error("Error fetching activity details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const checkJoinedEvent = async () => {
      try {
        const apiToken = await AsyncStorage.getItem("apiToken");
        const userId = await AsyncStorage.getItem('userId');
        const response = await axios.get(`https://actiwizcpe.galapfa.ro/activities/check/joined/${activityID}`, {
          headers: {
            'Authorization': `Bearer ${apiToken}`
          },
          params: {
            user_id: parseInt(userId as string, 10)
          }
        });
        setJoinedEvent(response.data.joined);
      } catch (error) {
        console.error("Error fetching apiToken or userID from AsyncStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    ReadDetails();
    checkJoinedEvent();
  }, [activityID]);

  return (
    <>
      <View style={[styles.screenHeader]}>
        <Pressable
          style={styles.backArrow}
          onPress={() => navigation.goBack()}
        >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/arrow-back-ios1.png")}
        />
        </Pressable>
      </View>
      <ScrollView>
        <Image
          style={styles.image4IconPosition}
          contentFit="cover"
          source={require("../assets/image-41.png")}
        />
        <View style={styles.detailContainer}>
          <Text style={styles.detailHeader}>{activityName + '\n'}</Text>
          <Text style={styles.detailHeader}>{activityNameENG + '\n'}</Text>
          <Text style={styles.detailBody}>{activityDescription + '\n'}</Text>
          <Text style={styles.detailBody}> ชั่วโมงกิจกรรม: {activityHourTotal} ชั่วโมง </Text>
          <Text style={styles.detailBody}> จำนวนวัน: {activityDayTotal} วัน</Text>
          <Text style={styles.detailBody}> วันเริ่มกิจกรรม: {activityOpenDate.toLocaleDateString()}</Text>
          <Text style={styles.detailBody}> วันสิ้นสุดกิจกรรม: {activityCloseDate.toLocaleDateString() }</Text>
          <Text style={styles.detailBody}> ปีการศึกษาที่: {activityAcademicYear + '\n'}</Text>
        </View>

        {
          isLoading ? (
            <ActivityIndicator size="large" color={Color.colorDarkorange_100} style={styles.loadingIndicator} />
          ) : (
            joinedEvent 
            ?
              <View
                style={[styles.rectangleParent,styles.rectangleParentJoined]}
              >
                <Image
                  style={styles.checkRingRoundIcon as ImageStyle}
                  source={require("../assets/check-ring-round.png")}
                />
                <Text style={styles.join}>Joined</Text>
              </View>
            :
              <>
                <Pressable
                  style={[styles.rectangleParent,styles.rectangleParentNormal]}
                  onPress={openGroupContainer}
                >
                  <Text style={styles.join}>Join</Text>
                </Pressable>
            
                <Modal animationType="fade" transparent visible={groupContainerVisible}>
                  <View style={styles.groupContainerOverlay}>
                    <Pressable
                      style={styles.groupContainerBg}
                      onPress={closeGroupContainer}
                    />
                    <CautionJoinEvent onClose={closeGroupContainer} onUpdate={toggleJoinEvent} activityID={activityID}/>
                  </View>
               </Modal>
             </>
          )
        }
      </ScrollView>
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
  },
  detailHeader: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: FontFamily.ubuntuBold,
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
  },
  rectangleParentNormal:{
    paddingHorizontal: "38%", // Add padding for touch area
    paddingVertical: 12, // Add padding for touch area
    backgroundColor: Color.colorDarkorange_200
  },
  rectangleParentJoined:{
    paddingHorizontal: "30%", // Add padding for touch area
    paddingVertical: 8, // Add padding for touch area
    backgroundColor: "#61f9cb"
  },
  checkRingRoundIcon: {
    width: 39,
    height: 39,
  },
  loadingIndicator: {
    marginVertical: 20,
  }
});

export default DetailPage;