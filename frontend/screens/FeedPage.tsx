import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { Searchbar } from 'react-native-paper';
import { Image } from "expo-image";
import axios from "axios";

const FeedPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://example.com/api/data");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProfilePress = () => {
    // Navigate to EditProfile screen
    console.log("Navigate to EditProfile screen");
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
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <View style={styles.feedItem}>
            <Image style={styles.feedItemImage} source={{ uri: item.image }} />
            <View style={styles.feedItemText}>
              <Text style={styles.feedItemTitle}>{item.title}</Text>
              <Text style={styles.feedItemDescription}>{item.description}</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFA500",
    padding: 20,
  },
  searchbar: {
    top: 70,
    marginBottom: 20,
    borderRadius: 10,
    height: 50,
  },
  feedItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  feedItemImage: {
    width: 100,
    height: 100,
    marginRight: 20,
    borderRadius: 10,
  },
  feedItemText: {
    flex: 1,
  },
  feedItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  feedItemDescription: {
    fontSize: 16,
  },
  profileIconContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    top: 20,
  },
});

export default FeedPage;