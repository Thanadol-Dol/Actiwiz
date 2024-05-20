import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const removeTokens = async () => {
    try {
      await AsyncStorage.removeItem("apiToken");
      await AsyncStorage.removeItem("graphToken");
      await AsyncStorage.removeItem("refreshToken");
    } catch (error) {
      throw error;
    }
}

const refreshApiToken = async (refreshToken : string | null): Promise<any> => {
    try {
      const response = await axios.get('https://actiwizcpe.galapfa.ro/users/auth/refresh/api_token', {
        headers: {
          'Refresh': refreshToken
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
};
  
const refreshGraphToken = async (refreshToken : string | null): Promise<any> => {
    try {
      const response = await axios.get('https://actiwizcpe.galapfa.ro/users/auth/refresh/graph_token', {
        headers: {
          'Refresh': refreshToken
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
};

const setNewTokens = async () => {
  try{
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    await AsyncStorage.removeItem("apiToken");
    await AsyncStorage.removeItem("graphToken");
    const api_token = await refreshApiToken(refreshToken);
    console.log("api_token:", api_token.api_token);
    await AsyncStorage.setItem("apiToken", api_token.api_token)

    const tokens = await refreshGraphToken(refreshToken);
    console.log("graph_token:", tokens.graph_token);
    console.log("refresh_token:", tokens.refresh_token);
    await AsyncStorage.setItem("graphToken", tokens.graph_token);
    await AsyncStorage.setItem("refreshToken", tokens.refresh_token);
  } catch (error) {
    removeTokens();
    throw error;
  }
}

export { refreshApiToken, refreshGraphToken, setNewTokens, removeTokens };