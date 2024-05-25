import { memo } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { ClubCardType } from "../interface/Club";

const SearchClubCard = ({ navigation, club }: ClubCardType) => {
  return (
    <TouchableOpacity
      key={club.ClubID}
      style={styles.cardContainer}
      onPress={() => navigation.navigate('ClubDetailPage', {"ClubID": club.ClubID ,"ClubName": club.ClubName})}
    >
        <Image
            style={styles.cardImagesearch}
            source={require("../assets/club-image.png")}
        />
        <View style={styles.cardDetails}>
            <Text style={{ fontWeight: 'bold' }}>{club.ClubName}</Text>
            <Text style={{ fontWeight: 'bold' }}>{club.ClubNameENG}</Text>
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
  cardDetails: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardImagesearch: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export default memo(SearchClubCard);