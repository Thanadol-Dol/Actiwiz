import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RequestDataUser = () => {
  const [userData, setUserData] = useState(null);
  const [apiToken, setApiToken] = useState(null);
  const [graphToken, setGraphToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedRefreshToken = await AsyncStorage.getItem("refreshToken");
        if (!storedRefreshToken) {
          console.error("Refresh token is missing");
          return;
        }
  
        const refreshApiTokenResponse = await refreshApiToken(storedRefreshToken);
        if (refreshApiTokenResponse && refreshApiTokenResponse.api_token && refreshApiTokenResponse.graph_token) {
          setApiToken(refreshApiTokenResponse.api_token);
          setGraphToken(refreshApiTokenResponse.graph_token);
  
          const userId = refreshApiTokenResponse.user_id;
          const userDataResponse = await fetchUserDataById(userId, refreshApiTokenResponse.api_token);
          setUserData(userDataResponse);
        } else {
          console.error("Error fetching API token");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const refreshApiToken = async (refreshToken) => {
    try {
      const response = await axios.post(
        "https://your-api-url.com/users/auth/refresh/api_token",
        { refresh_token: refreshToken }
      );
      return response.data;
    } catch (error) {
      console.error("Error refreshing API token:", error);
      throw error;
    }
  };

  const fetchUserDataById = async (userId, apiToken) => {
    try {
      const response = await axios.get(`https://your-api-url.com/users/${userId}`, {
        headers: { Authorization: `Bearer ${apiToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  return (
    <View>
      {userData ? (
        <View>
          <Text>User ID: {userData.id}</Text>
          <Text>Name: {userData.name}</Text>
          <Text>Email: {userData.email}</Text>
        </View>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </View>
  );
};

export default RequestDataUser;
