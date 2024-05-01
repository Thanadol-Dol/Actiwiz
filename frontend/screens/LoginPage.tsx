import React, {  useEffect, useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../GlobalStyles";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import queryString from 'query-string'; 
import FeedPage from "./FeedPage";
import RequestDataUser from "./RequestDataUser";

const LoginPage = () => {
  const [webviewVisible, setWebviewVisible] = useState(false);
  const webviewSource = "https://actiwizcpe.galapfa.ro/users/auth/url";
  const [loginUrl, setLoginUrl] = useState("");
  const [apiToken, setAPIToken] = useState<string | null>(null);
  const [graphToken, setGraphToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const navigation = useNavigation();
  
  useEffect(() => {
    const fetchLoginUrl = async () => {
      try {
        const response = await axios.get(webviewSource);
        const { data } = response;
        if (data && data.auth_url) {
          setLoginUrl(data.auth_url);
        } else {
          console.error('Error: Invalid response from server');
        }
      } catch (error) {
        console.error('Error fetching login URL:', error);
      }
    };

    fetchLoginUrl();
  }, []);

  const storeTokens = async (
    apiToken: string | null,
    refreshToken: string | null,
    graphToken: string | null
  ) => {
    try {
      if (apiToken !== null && refreshToken !== null && graphToken !== null) {
        await AsyncStorage.setItem("apiToken", apiToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        await AsyncStorage.setItem("graphToken", graphToken);
        setAPIToken(apiToken);
        setRefreshToken(refreshToken);
        setGraphToken(graphToken);
        navigation.navigate("FeedPage" as never); // Fix: Pass the screen name as a string
      } else {
        console.error(
          "Invalid tokens: apiToken, refreshToken, or graphToken is null"
        );
      }
    } catch (error) {
      console.error("Error storing tokens:", error);
    }
  };
  
  const handleWebViewNavigationStateChange = async (newState: { loading: boolean; url: string; title: string; }) => {
    try {
      if (
        newState.loading === false &&
        newState.url === "https://actiwizcpe.galapfa.ro/users/auth/callback" &&
        newState.title === "Success"
      ) {
        const { api_token, graph_token, refresh_token } = queryString.parse(
          newState.url.split("?")[1]
        );
  
        if (api_token && graph_token && refresh_token) {
          console.log("API Token:", api_token);
          console.log("Graph Token:", graph_token);
          console.log("Refresh Token:", refresh_token);
  
          await storeTokens(api_token.toString(), refresh_token.toString(), graph_token.toString());
          setWebviewVisible(false);
          alert("Success Tokens received successfully");
        } else {
          console.error("Invalid tokens received");
        }
      }
    } catch (error) {
      console.error("Error handling WebView navigation:", error);
    }
  };
  


const getTokens = async () => {
  try {
    const apiToken = await AsyncStorage.getItem("apiToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const graphToken = await AsyncStorage.getItem("graphToken");
    if (apiToken && refreshToken && graphToken) {
      return { apiToken, refreshToken, graphToken };
    } else {
      throw new Error("Tokens not found in AsyncStorage");
    }
  } catch (error) {
    console.error("Error getting tokens:", error);
    return { apiToken: null, refreshToken: null, graphToken: null };
  }
};

  const refreshApiToken = async (refreshToken: string): Promise<any> => {
  try {
    const response = await axios.post('https://actiwizcpe.galapfa.ro/users/auth/refresh/api_token', null, {
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error refreshing API token:', error);
    throw error;
  }
};

const refreshGraphToken = async (refreshToken: string): Promise<any> => {
  try {
    const response = await axios.post('https://actiwizcpe.galapfa.ro/users/auth/refresh/graph_token', null, {
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error refreshing Graph token:', error);
    throw error;
  }
};

return (
    <>
      <View style={[styles.loginPage, styles.loginPageBorder]}>
        <Image
          style={[styles.loginPageChild, styles.loginPosition]}
          contentFit="cover"
          source={require("../assets/ActiwizPic.png")}
        />

        <Text style={[styles.loginIntoYour, styles.loginTypo]}>
          Login into your account
        </Text>

        <Pressable
          style={[styles.rectangleGroup, styles.rectangleLayout]}
          onPress={() => setWebviewVisible(!webviewVisible)}
        >
          <View style={[styles.rectangleView, styles.groupChildLayout]} />
          <Text style={[styles.login, styles.loginTypo]}>Login</Text>
        </Pressable>
        {webviewVisible && loginUrl && (
          <WebView
          source={{ uri: loginUrl }}
          style={{ flex: 1, marginTop: 30 }}
          javaScriptEnabled={true}
          startInLoadingState={true}
          onError={(error) => console.error('WebView error:', error)}
          onLoadStart={() => console.log('WebView loading started')}
          onLoadEnd={() => console.log('WebView loading ended')}
          onNavigationStateChange={handleWebViewNavigationStateChange}
        />
      )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loginPage: {
    backgroundColor: Color.iOSFFFFFF,
    borderColor: Color.colorBlack,
    flex: 1,
    width: "100%",
    height: 900,
    overflow: "hidden",
  },
  loginPageBorder: {
    borderWidth: 1,
    borderStyle: "solid",
  },
loginPageChild: {
    height: 200,
    width: "100%",
    top: 230,
  },
loginPosition: {
    width: "100%",
    left: 0,
    position: "absolute",
  },
  loginIntoYour: {
    top: 500,
    left: 120,
    color: Color.colorDimgray,
  },
  loginTypo: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "700",
    fontSize: FontSize.size_base_2,
    position: "absolute",
  },
  rectangleGroup: {
    top: 550,
  },
  rectangleLayout: {
    height: 50,
    left: 24,
    width: 359,
    position: "absolute",
  },
 rectangleView: {
    backgroundColor: Color.colorDarkorange_200,
    shadowColor: "rgba(253, 116, 1, 0.3)",
    shadowOffset: {
      width: 0,
      height: 12.116715431213379,
    },
    shadowRadius: 24.23,
    elevation: 24.23,
    shadowOpacity: 1,
  },
  groupChildLayout: {
    borderRadius: 15,
    height: 50,
    width: 359,
    position: "absolute",
  },
  login: {
    top: 14,
    left: 4,
    color: Color.iOSFFFFFF,
    width: "100%",
  },
});

export default LoginPage;
function storeTokens(apiToken: string | null, refreshToken: string | null, graphToken: string | null) {
  throw new Error("Function not implemented.");
}