import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const setNewTokens = async (refreshToken: string | null) => {
  try{
    await AsyncStorage.removeItem("apiToken");
    await AsyncStorage.removeItem("graphToken");
    const api_token = await refreshApiToken(refreshToken);
    console.log("api_token:", api_token.api_token);
    await AsyncStorage.setItem("apiToken", api_token.api_token as string);

    const tokens = await refreshGraphToken(refreshToken);
    console.log("graph_token:", tokens.graph_token);
    console.log("refresh_token:", tokens.refresh_token);
    await AsyncStorage.setItem("graphToken", tokens.graph_token as string);
    await AsyncStorage.setItem("refreshToken", tokens.refresh_token as string);
    return {api_token: api_token.api_token, graph_token: tokens.graph_token, refresh_token: tokens.refresh_token};
  } catch (error) {
    throw error;
  }
}

const removeCredentials = () => {
  AsyncStorage.removeItem("apiToken");
  AsyncStorage.removeItem("graphToken");
  AsyncStorage.removeItem("refreshToken");
  AsyncStorage.removeItem("userId");
}

export { refreshApiToken, refreshGraphToken, setNewTokens, removeCredentials };