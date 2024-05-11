import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet, Text, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "../components/NavBar";
import {Color} from "../GlobalStyles";
import axios from "axios";

interface DataItem {
  "ClubID" : number,
  "ClubName" : string,
  "ClubNameENG" : string,
}

const FeedPageClub = ({navigation}: {navigation: any}) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [searchText, setSearchText] = useState('');
  const [user_id, setUser_id] = useState('');
  const [apiToken, setApiToken] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchApiTokenAndUserID = async () => {
      try {
        const token = await AsyncStorage.getItem("apiToken");
        const storedUserID = await AsyncStorage.getItem('userId');
  
        console.log("Fetched apiToken:", token);
        console.log('Stored User ID:', storedUserID);
  
        if (token && storedUserID) {
          setApiToken(token);
          setUser_id(storedUserID);
        } else {
          console.error("apiToken or userID is null or undefined");
        }
      } catch (error) {
        console.error("Error fetching apiToken or userID from AsyncStorage:", error);
      }
    };
  
    fetchApiTokenAndUserID();
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (!apiToken || !user_id) {
          console.error("apiToken or user_id is null or undefined");
          return;
        }
  
        const response = await axios.get(`https://actiwizcpe.galapfa.ro/clubs/recommend/user/${user_id}`, {
          headers: {
            "Authorization": `Bearer ${apiToken}`
          }
        });
        setRecommendations(response.data.clubs);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
  
    if (apiToken && user_id) {
      fetchRecommendations();
    }
  }, [apiToken, user_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!apiToken) {
          console.error("apiToken is null or undefined");
          return;
        }
    
        const nameToSearch = searchText.trim() ? searchText.trim() : 'all';
        const response = await axios.get(`https://actiwizcpe.galapfa.ro/clubs/${nameToSearch}`, {
          headers: {
            "Authorization": `Bearer ${apiToken}`
          }
        });
        setData(response.data.clubs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    if (searchText.trim()) {
      fetchData();
    }
  }, [apiToken, searchText]);

  const handleProfilePress = () => {
    navigation.navigate('EditProfile');
  };

  const onChangeSearch = (query: string) => {
    setSearchText(query);
  };
  
  const navigateToDetailPage = (item: DataItem) => {
    navigation.navigate('ClubPage', {"ClubID": item.ClubID ,"ClubName": item.ClubName});
  };
  
  const renderData = () => {
    if (searchText.trim() !== '') {
      return data.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.cardContainer}
          onPress={() => navigateToDetailPage(item)}
        >
           <Image
            style={styles.cardImagesearch}
            source={require("../assets/image-41.png")}
          />
          <View style={styles.cardDetails}>
          <Text style={{ fontWeight: 'bold' }}>{item.ClubName}</Text>
          <Text style={{ fontWeight: 'bold' }}>{item.ClubNameENG}</Text>
          </View>
        </TouchableOpacity>
      ));
    } else {
      return recommendations.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.cardContainer}
          onPress={() => navigateToDetailPage(item)}
        >
          <Image
            style={styles.cardImagerec}
            source={require("../assets/image-41.png")}
            resizeMode="cover"
          />
          <View style={styles.cardDetails}>
          <Text style={{ fontWeight: 'bold' }}>{item.ClubName}</Text>
          <Text style={{ fontWeight: 'bold' }}>{item.ClubNameENG}</Text>
          </View>
        </TouchableOpacity>
      ));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileIconContainer}>
          <Image
            style={styles.profileIcon}
            source={require("../assets/login-photo.png")}
          />
        </TouchableOpacity>
        
        <ScrollView
          contentContainerStyle={{paddingVertical: 10}}
          keyboardShouldPersistTaps="handled"
          stickyHeaderIndices={[0]}
        >
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchText}
            style={[styles.searchbar, {zIndex: 1}]}
          />
          <View style={styles.scrollContainer}>
          {renderData()}
          </View>
        </ScrollView>
        <Navbar 
        activePage={'FeedPageClub'} 
        setActivePage={(page) => navigation.navigate(page)} 
        zIndex={2}
        />
      </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorDarkorange_100,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: Color.colorDarkorange_100,
  },
  profileIconContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    backgroundColor: '#fff',
    left: 15,
  },
  profileIcon: {
    width: 70,
    height: 70,
    borderRadius: 40,
    resizeMode: 'cover',
  },
  searchbar: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  scrollContainer: {
    paddingHorizontal: 1,
    paddingVertical: 5,
  },
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
  cardImagesearch: {
    width: 50,
    height: 50,
    marginRight: 10,
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

export default FeedPageClub;
