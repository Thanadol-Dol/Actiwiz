import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Searchbar } from 'react-native-paper';
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableWithoutFeedback, Keyboard, BackHandler } from 'react-native';
import Navbar from "../components/NavBar";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

interface DataItem {
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
}

const FeedPageEvent = ({navigation}: {navigation: any}) => {
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

    const backAction = () => {
      // Exit the application when back button is pressed
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);
  

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (!apiToken || !user_id) {
          console.error("apiToken or user_id is null or undefined");
          return;
        }
  
        const response = await axios.get(`https://actiwizcpe.galapfa.ro/activities/recommend/user/${user_id}`, {
          headers: {
            "Authorization": `Bearer ${apiToken}`
          }
        });
        setRecommendations(response.data.activities);
      } catch (error) {
        <Text>No recommend Event Now</Text>
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
        if (!apiToken || !user_id) {
          console.error("apiToken is null or undefined");
          return;
        }
    
        const nameToSearch = searchText.trim() ? searchText.trim() : 'all';
        const response = await axios.get(`https://actiwizcpe.galapfa.ro/activities/${nameToSearch}`, {
          headers: {
            "Authorization": `Bearer ${apiToken}`
          }
        });
        setData(response.data.activities);
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
    navigation.navigate('DetailPage', { "ActivityID": item.ActivityID ,"ActivityName": item.ActivityName, "Description": item.Description });
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
          <Text style={{ fontWeight: 'bold' }}>{item.ActivityName}</Text>
          <Text>{item.Description.length > 70 ? item.Description.substring(0, 70) + '...' : item.Description}</Text>
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
          />
          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle}>{item.ActivityName}</Text>
            <Text style={styles.cardHourTotal}>ชั่วโมงกิจกรรม: {item.HourTotal} ชั่วโมง</Text>
            <Text style={styles.cardHourTotal}>จำนวนวัน: {item.DayTotal} วัน</Text>
            <Text style={styles.cardDate}>วันที่จัด: {new Date(item.OpenDate).toLocaleDateString()}</Text>
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
            source={require("../assets/NongNhaoSmall.png")}
          />
        </TouchableOpacity>
        
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
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
          activePage={'FeedPageEvent'} 
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
    backgroundColor: '#ff8f00',
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#ff8f00',
  },
  profileIconContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    backgroundColor: '#fff',
    left: 10,
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
  contentContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 1,
    paddingVertical: 5,
  },
  feedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  feedItemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  feedItemText: {
    flex: 1,
  },
  feedItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedItemDescription: {
    fontSize: 14,
    color: '#555',
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

export default FeedPageEvent;