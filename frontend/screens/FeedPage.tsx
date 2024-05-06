import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Searchbar } from 'react-native-paper';
import { Image } from "expo-image";
import { useNavigation } from '@react-navigation/native';
import navigateToNextScreen from "/Users/zknnz/Desktop/Actiwiz/frontend/screens/LoginPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface IDataItem {
  ActivityID: number;
  ActivityName: string;
  ActivityNameENG: string;
  Description: string;
  HourTotal: number;
  DayTotal: number;
  Semester: number;
  Organizer: string;
  OpenDate: string;
  CloseDate: string;
  AcademicYear: number;
}

const FeedPage = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<IDataItem[]>([]);
  const [searchText, setSearchText] = useState('');
  const [user_id, setUser_id] = useState('');

  const [apiToken, setApiToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchApiToken = async () => {
      try {
        const token = await AsyncStorage.getItem("apiToken");
        setApiToken(token);
      } catch (error) {
        console.error("Error fetching apiToken from AsyncStorage:", error);
      }
    };

    fetchApiToken();
  }, []);

  useEffect(() => {
    fetchData(searchText);
    getUserIDFromStorage();
  }, [apiToken]);

  const fetchData = async (activityName: any) => {
    try {
      if (!apiToken) {
        console.error("apiToken is null or undefined");
        return;
      }
  
      const nameToSearch = activityName.trim() ? activityName.trim() : 'all';
      const response = await axios.get(`https://actiwizcpe.galapfa.ro/activities/${nameToSearch}`, {
        headers: {
          "Authorization": `Bearer ${apiToken}`
        }
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const getUserIDFromStorage = async () => {
    try {
      const storedUserID = await AsyncStorage.getItem('userId');
      console.log('Stored User ID:', storedUserID);
      if (storedUserID !== null) {
        setUser_id(storedUserID);
      }
    } catch (error) {
      console.error("Error fetching user ID from AsyncStorage:", error);
    }
  };

  const handleProfilePress = () => {
    navigateToNextScreen({ navigation: 'DetailPage' });
  };

  const onChangeSearch = (query: string) => {
    setSearchText(query);
    fetchData(query);
  };

  const navigateToDetailPage = (item: IDataItem) => {
    navigation.navigate('DetailPage', { item });
  };

  const renderData = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <Text>No data available</Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleProfilePress} style={styles.profileIconContainer}>
        <Image
          style={styles.profileIcon}
          source={require("../assets/NongNhaoSmall.png")}
        />
      </TouchableOpacity>

      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchText}
        style={styles.searchbar}
      />
      
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {renderData()}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileIconContainer: {
    padding: 10,
  },
  profileIcon: {
    width: 30,
    height: 30,
  },
  searchbar: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
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
});

export default FeedPage;
