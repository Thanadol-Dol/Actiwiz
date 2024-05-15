import { memo } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { ClubCardType } from "../interface/Club";

const RecommendClubCard = ({ navigation, club }: ClubCardType) => {
  return (
    <TouchableOpacity
      key={club.ClubID}
      style={styles.cardContainer}
      onPress={() => navigation.navigate('ClubPage', {"ClubID": club.ClubID ,"ClubName": club.ClubName})}
    >
      <Image
        style={styles.cardImagerec}
        source={require("../assets/image-41.png")}
        resizeMode="cover"
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
  cardImagerec: {
    width: 170,
    height: 200,
    marginRight: 10,
    left : -10,
  },
  cardDetails: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default memo(RecommendClubCard);