import { memo } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { EventCardType } from "../interface/Activity";

const SearchEventCard = ({ navigation, event }: EventCardType) => {

  return (
    <TouchableOpacity
      key={event.ActivityID}
      style={styles.cardContainer}
      onPress={() => navigation.navigate('EventDetailPage', { 
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
        style={styles.cardImagesearch}
        source={require("../assets/event-image.png")}
      />
      <View style={styles.cardDetails}>
      <Text style={{ fontWeight: 'bold' }}>{event.ActivityName}</Text>
      <Text>{event.Description.length > 70 ? event.Description.substring(0, 70) + '...' : event.Description}</Text>
      </View>
    </TouchableOpacity>
  )
}

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
      left : -10,
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
    cardImagesearch: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
});

export default memo(SearchEventCard);