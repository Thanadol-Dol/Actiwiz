import React, { memo } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { EventCardType } from "../interface/Activity";

const RecommendEventCard = ({ navigation, event }: EventCardType) => {
  return (
    <TouchableOpacity
      key={event.ActivityID}
      style={styles.cardContainer}
      onPress={() => navigation.navigate('DetailPage', { 
        "ActivityID": event.ActivityID ,
        "ActivityName": event.ActivityName,
        "ActivityNameENG": event.ActivityNameENG, 
        "Description": event.Description,
        "HourTotal": event.HourTotal,
        "DayTotal": event.DayTotal,
        "Semester": event.Semester,
        "Organizer": event.Organizer,
        "OpenDate": event.OpenDate,
        "CloseDate": event.CloseDate,
        "AcademicYear": event.AcademicYear,
      })}
    >
      <Image
        style={styles.cardImagerec}
        source={require("../assets/image-41.png")}
      />
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{event.ActivityName}</Text>
        <Text style={styles.cardHourTotal}>ชั่วโมงกิจกรรม: {event.HourTotal} ชั่วโมง</Text>
        <Text style={styles.cardHourTotal}>จำนวนวัน: {event.DayTotal} วัน</Text>
        <Text style={styles.cardDate}>สมัครได้ถึง: {new Date(event.OpenDate).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
    margin: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImagerec: {
    width: 170,
    height: 200,
    marginRight: 10,
    left: -10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardHourTotal: {
    fontSize: 14,
    color: '#555',
  },
  cardDetails: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardDate: {
    fontSize: 14,
    color: '#555',
  },
});

export default memo(RecommendEventCard);