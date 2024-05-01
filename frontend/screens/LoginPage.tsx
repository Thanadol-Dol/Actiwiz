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
  const navigation = useNavigation();
  const [webviewVisible, setWebviewVisible] = useState(false);
  const webviewSource = "https://actiwizcpe.galapfa.ro/users/auth/url";
  const [loginUrl, setLoginUrl] = useState<string>("");
  const [apiToken, setAPIToken] = useState<string | null>(null);
  const [graphToken, setGraphToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  
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

  const navigateToNextScreen = (RequestDataUser: () => JSX.Element) => {
    navigation.navigate('FeedPage' as never);
  };

  const storeTokens = async (
    apiToken: string | null,
    refreshToken: string | null,
    graphToken: string | null
  ) => {
    try {
      if (apiToken && refreshToken && graphToken) {
        await AsyncStorage.setItem("apiToken", apiToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        await AsyncStorage.setItem("graphToken", graphToken);
        setAPIToken(apiToken);
        setRefreshToken(refreshToken);
        setGraphToken(graphToken);
      } else {
        console.error(
          "Invalid tokens: apiToken, refreshToken, or graphToken is null"
        );
      }
    } catch (error) {
      console.error("Error storing tokens:", error);
    }
  };
  
  const handleWebViewNavigation = async (event: { url: string }) => {
    const { url } = event;
  
    try {
      if (url.includes('auth/callback')) {
        const urlParams = queryString.parse(url.split('?')[1]);
        const apiToken = Array.isArray(urlParams?.api_token) ? urlParams.api_token[0] : urlParams?.api_token;
        const graphToken = Array.isArray(urlParams?.graph_token) ? urlParams.graph_token[0] : urlParams?.graph_token;
        const refreshToken = Array.isArray(urlParams?.refresh_token) ? urlParams.refresh_token[0] : urlParams?.refresh_token;
  
        // ตรวจสอบค่าที่ได้จาก URL Parameters ก่อนเก็บลงใน AsyncStorage
        if (apiToken && graphToken && refreshToken) {
          await storeTokens(apiToken, refreshToken, graphToken);
          setWebviewVisible(false);
        } else {
          console.error("Invalid tokens: apiToken, refreshToken, or graphToken is null");
        }
      }
    } catch (error) {
      console.error('Error handling WebView navigation:', error);
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
          onNavigationStateChange={handleWebViewNavigation}
          storetokens={storeTokens}
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