import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Image, FlatList, TouchableWithoutFeedback, Keyboard, Pressable, Text, ActivityIndicator } from "react-native";
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "../components/NavBar";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import RecommendClubCard from "../components/RecommendClubCard";
import SearchClubCard from "../components/SearchClubCard";
import { ClubDetail } from "../interface/Club";
import { getRecommendClubs, getSearchClubs } from "../utils/clubUtils";

const FeedPageClub = ({navigation}: {navigation: any}) => {
  const [searchData, setSearchData] = useState<ClubDetail[]>([]);
  const [searchText, setSearchText] = useState('');
  const [user_id, setUser_id] = useState('');
  const [apiToken, setApiToken] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<ClubDetail[]>([]);
  const [canLoad, setCanLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number | null>(1);
  const [priority, setPriority] = useState<number | null>(1);
  const [searchPage, setSearchPage] = useState<number | null>(1);
  const [hasMore, setHasMore] = useState(true);

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

      const response = await getRecommendClubs(page, priority);
      if (page === 1 && priority === 1) {
        setRecommendations(response.clubs);
      } else {
        setRecommendations(prevRecommendations => [...prevRecommendations, ...response.clubs]);
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

  const renderRecommendationItem = ({ item }: { item: ClubDetail }) => (
    <RecommendClubCard key={item.ClubID} navigation={navigation} club={item}/>
  );

  const loadMoreRecommend = () => {
    if(page && priority) {
      console.log("Recommendations:", recommendations.length)
      fetchRecommendations();
    }
  };

  const fetchSearchData = async () => {
    try {
      if (!apiToken) {
        console.error("apiToken is null or undefined");
        return;
      }
  
      const nameToSearch = searchText.trim() ? searchText.trim() : 'all';
      const response = await getSearchClubs(searchPage, nameToSearch);
      if (searchPage === 1) {
        setSearchData(response.clubs);
      } else {
        setSearchData(prevSearch => [...prevSearch, ...response.clubs]);
      }

      if(response.page === null){
        setHasMore(false);
      }
      setSearchPage(response.page);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching searchData:", error);
    }
  };

  // Search Methods
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

  const renderSearchItem = ({ item }: { item: ClubDetail }) => (
    <SearchClubCard key={item.ClubID} navigation={navigation} club={item}/>
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
          activePage={'FeedPageClub'} 
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

export default FeedPageClub;