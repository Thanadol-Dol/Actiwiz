import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Image, FlatList, TouchableWithoutFeedback, Keyboard, Pressable, Text, ActivityIndicator } from "react-native";
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "../components/NavBar";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import RecommendClubCard from "../components/RecommendClubCard";
import SearchClubCard from "../components/SearchClubCard";
import { ClubDetail } from "../interface/Club";
import { getRecommendClubs, getSearchClubs } from "../utils/clubUtils";
import { setNewTokens, removeCredentials } from "../utils/credentialUtils";

const FeedPageClub = ({navigation}: {navigation: any}) => {
  const [searchData, setSearchData] = useState<ClubDetail[]>([]);
  const [searchText, setSearchText] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [apiToken, setApiToken] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<ClubDetail[]>([]);
  const [canLoad, setCanLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number | null>(1);
  const [searchPage, setSearchPage] = useState<number | null>(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const setCredentials = async () => {
      const api_token = await AsyncStorage.getItem("apiToken");
      const user_id = await AsyncStorage.getItem("userId").then((value) => parseInt(value as string,10));
      if (api_token && user_id) {
        setUserId(user_id);
        setApiToken(api_token);
      } else {
        removeCredentials();
        navigation.navigate("LoginPage", { refresh: true });
      }
    };
    setCredentials();
  }, []);

  const handleProfilePress = () => {
    navigation.navigate('EditProfile');
  };

  const checkLoading = () => {
    if(!loading){
      setCanLoad(true);
    }
  }

  useEffect(() => {
    if (apiToken && userId) {
      if (searchText.trim() !== '') {
        fetchSearchData();
      } else {
        fetchRecommendations();
      }
    }
  }, [apiToken]);

  // Recommendations Methods
  const fetchRecommendations = async () => {
    try {
      setCanLoad(false);
      setLoading(true);

      const response = await getRecommendClubs(page);
      if (page === 1) {
        setRecommendations(response.clubs);
      } else {
        setRecommendations(prevRecommendations => [...prevRecommendations, ...response.clubs]);
      }

      if(response.page === null){
        setHasMore(false);
      } 
      setPage(response.page);
    } catch (error: any) {
      if(error.response.status === 401 || error.response.data.detail.includes("401")){
        try{
            const refreshToken = await AsyncStorage.getItem("refreshToken");
            const response = await setNewTokens(refreshToken);
            setApiToken(response.api_token);
        } catch (error) {
            removeCredentials();
            navigation.navigate("LoginPage", { refresh: true });
            alert("Token Expired. Please login again.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const renderRecommendationItem = ({ item }: { item: ClubDetail }) => (
    <RecommendClubCard key={item.ClubID} navigation={navigation} club={item}/>
  );

  const loadMoreRecommend = () => {
    if(page) {
      console.log("Recommendations:", recommendations.length)
      fetchRecommendations();
    }
  };

  // Search Methods
  const fetchSearchData = async () => {
    try {
      setCanLoad(false);
      setLoading(true);

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
    } catch (error: any) {
      if(error.response.status === 401 || error.response.data.detail.includes("401")){
        try{
          const refreshToken = await AsyncStorage.getItem("refreshToken");
          const response = await setNewTokens(refreshToken);
          setApiToken(response.api_token);
        } catch (error) {
          removeCredentials();
          navigation.navigate("LoginPage", { refresh: true });
          alert("Token Expired. Please login again.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchText.trim() !== '') {
      if(apiToken){
        setSearchPage(1);
        setSearchData([]);
        fetchSearchData();
      }
    } else {
      if(page){
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    }
  }, [searchText]);

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