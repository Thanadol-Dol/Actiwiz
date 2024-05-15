import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Text, FlatList, ActivityIndicator, Pressable } from "react-native";
import { Searchbar } from 'react-native-paper';
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableWithoutFeedback, Keyboard, BackHandler } from 'react-native';
import Navbar from "../components/NavBar";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ActivityDetail, RecommendActivityResponse } from "../interface/Activity";
import RecommendEventCard  from "../components/RecommendEventCard";
import SearchEventCard from "../components/SearchEventCard";
import { getRecommendActivities, getSearchActivities } from "../utils/activityUtils";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const FeedPageEvent = ({navigation}: {navigation: any}) => {
  const [searchData, setSearchData] = useState<ActivityDetail[]>([]);
  const [searchText, setSearchText] = useState('');
  const [user_id, setUser_id] = useState('');
  const [apiToken, setApiToken] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<ActivityDetail[]>([]);
  const [canLoad, setCanLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number | null>(1);
  const [offset, setOffset] = useState<number | null>(null);
  const [priority, setPriority] = useState<number | null>(1);
  const [searchPage, setSearchPage] = useState<number | null>(1);
  const [hasMore, setHasMore] = useState(true);

  //Utils Methods
  useEffect(() => {
    const fetchApiTokenAndUserID = async () => {
      try {
        const token = await AsyncStorage.getItem("apiToken");
        const storedUserID = await AsyncStorage.getItem('userId');

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

  const handleProfilePress = () => {
    navigation.navigate('EditProfile');
  };
  
  const checkLoading = () => {
    if(!loading){
      setCanLoad(true);
    }
  }

  const hasMoreData = () => {
    if(searchText.trim() !== ''){
      if(page && priority){
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } else {
      setHasMore(true);
    }
  }

  // Recommendations Methods
  const fetchRecommendations = async () => {
    setCanLoad(false);
    setLoading(true);
    try {
      if (!apiToken || !user_id) {
        console.error("apiToken or user_id is null or undefined");
        return;
      }

      const response = await getRecommendActivities(page, priority);
      if (page === 1 && priority === 1) {
        setRecommendations(response.activities);
      } else {
        setRecommendations(prevRecommendations => [...prevRecommendations, ...response.activities]);
      }

      if(response.page === null && response.priority === null){
        setHasMore(false);
      } 
      setPage(response.page);
      setPriority(response.priority);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  useEffect(() => {
    if (apiToken && user_id) {
      fetchRecommendations();
    }
  }, [apiToken, user_id]);

  const renderRecommendationItem = ({ item }: { item: ActivityDetail }) => (
    <RecommendEventCard key={item.ActivityID} navigation={navigation} event={item}/>
  );

  const loadMoreRecommend = () => {
    if(page && priority) {
      console.log("Recommendations:", recommendations.length)
      fetchRecommendations();
    }
  };

  // Search Methods
  const fetchSearchData = async () => {
    setCanLoad(false);
    setLoading(true);
    try {
      if (!apiToken || !user_id) {
        console.error("apiToken is null or undefined");
        return;
      }
  
      const nameToSearch = searchText.trim() ? searchText.trim() : 'all';

      const response = await getSearchActivities(searchPage, nameToSearch);
      if (searchPage === 1) {
        setSearchData(response.activities);
      } else {
        setSearchData(prevSearch => [...prevSearch, ...response.activities]);
      }

      if(response.page === null){
        setHasMore(false);
      }
      setSearchPage(response.page);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setSearchPage(1);
    
    hasMoreData();
    if (searchText.trim() !== '') {
      fetchSearchData();
    }
  }, [apiToken, searchText]);

  const onChangeSearch = (query: string) => {
    setSearchText(query);
  };
  
  const navigateToDetailPage = (item: DataItem) => {
    navigation.navigate('DetailPage', { 
      "ActivityID": item.ActivityID ,
      "ActivityName": item.ActivityName,
      "ActivityNameENG": item.ActivityNameENG, 
      "Description": item.Description,
      "HourTotal": item.HourTotal,
      "DayTotal": item.DayTotal,
      "Semester": item.Semester,
      "Organizer": item.Organizer,
      "OpenDate": item.OpenDate,
      "CloseDate": item.CloseDate,
      "AcademicYear": item.AcademicYear,
    });
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
            <Text style={styles.cardDate}>วันเริ่มกิจกรรม: {new Date(item.OpenDate).toLocaleDateString()}</Text>
          </View>
        </TouchableOpacity>
      ));

  const renderSearchItem = ({ item }: { item: ActivityDetail }) => (
    <SearchEventCard key={item.ActivityID} navigation={navigation} event={item}/>
  );

  const loadMoreSearch = () => {
    if(searchPage){
      fetchSearchData();
    }
  };

  return (
    <>
    <StatusBar backgroundColor={Color.colorDarkorange_100}/>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileIconContainer}>
          <Image
            style={styles.profileIcon}
            source={require("../assets/login-photo.png")}
          />
        </TouchableOpacity>
        
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchText}
          style={[styles.searchbar, {zIndex: 1}]}
        />

        <FlatList
          data={searchText.trim() !== '' ? searchData : recommendations}
          renderItem={searchText.trim() !== '' ? renderSearchItem : renderRecommendationItem}
          keyExtractor={(item,index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
          onEndReached={ hasMore ? checkLoading : null}
          onEndReachedThreshold={0.5}
          ListFooterComponent={ hasMore ?
            canLoad ?
            <Pressable
              style={styles.rectangleGroup}
              onPress={searchText.trim() !== '' ? loadMoreSearch : loadMoreRecommend}
            >
              <Text style={[styles.login, styles.textTypo]}>Load More</Text>
            </Pressable> : <ActivityIndicator size="large" color={'#f0f0f0'} /> 
            : null}
          windowSize={12}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
        />

        <Navbar 
          activePage={'FeedPageEvent'} 
          setActivePage={(page) => navigation.navigate(page)} 
          zIndex={2}
        />
      </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
    </>
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
    marginHorizontal: 10,
    marginVertical: 10,
  },
  flatListContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  textTypo: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "700",
    fontSize: FontSize.size_base_2,
  },
  rectangleGroup: {
    padding: 20,
    margin: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  login: {
    flex: 1,
    textAlignVertical: "center",
    color: Color.colorDarkorange_200,
  },
});

export default FeedPageEvent;
