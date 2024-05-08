import React, { useState, useCallback, useEffect } from "react";
import {StyleSheet, View, ScrollView, Pressable, Text, Linking, Modal} from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import CautionJoinEvent from "../components/CautionJoinEvent";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const DetailPage = ({navigation, route}: {navigation: any, route:any}) => {
  const activityName = route.params.ActivityName;
  const activityDescription = route.params.Description;
  const [groupContainerVisible, setGroupContainerVisible] = useState(false);

  const openGroupContainer = useCallback(() => {
    setGroupContainerVisible(true);
  }, []);

  const closeGroupContainer = useCallback(() => {
    setGroupContainerVisible(false);
  }, []);

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
          <Text style={styles.detailBody}>{activityDescription}</Text>
        </View>
        <Pressable
          style={[styles.rectangleParent]}
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
            <CautionJoinEvent onClose={closeGroupContainer} />
          </View>
        </Modal>
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
    fontSize: 18,
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
    color: Color.iOSFFFFFF
  },
  rectangleParent: {
    bottom: 20, // Adjust as needed
    alignSelf: "center", // Center horizontally
    paddingHorizontal: "40%", // Add padding for touch area
    paddingVertical: 15, // Add padding for touch area
    backgroundColor: Color.colorDarkorange_200,
    borderRadius: 8,
    flexDirection: "row", // Ensure children are aligned horizontally
    alignItems: "center", // Center children vertically
    elevation: 3, // Add elevation for shadow
    marginTop: 20, // Adjust as needed
  }
});

export default DetailPage;