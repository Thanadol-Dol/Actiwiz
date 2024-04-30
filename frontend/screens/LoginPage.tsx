import React, {  useEffect, useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../GlobalStyles";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
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

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const tokens = await getTokens();
        console.log("Tokens:", tokens); // ตรวจสอบ tokens ที่ได้จาก getTokens()
  
        const { accessToken, refreshToken, graphToken } = tokens;
        if (!accessToken || !refreshToken || !graphToken) {
          console.error("Tokens are missing");
          return;
        }
  
        // ต่อไปทำงานเช่นเดิม
        const { data } = await axios.get('https://actiwizcpe.galapfa.ro/users/login', {
          headers: {
            'api_token': accessToken,
            'graph_token': graphToken
          }
        });
  
        // ตรวจสอบ response และทำงานต่อไป
      } catch (error) {
        console.error('Error fetching tokens:', error);
      }
    };
  
    fetchTokens();
  }, []);

  const navigateToNextScreen = (RequestDataUser: () => JSX.Element) => {
    navigation.navigate('FeedPage' as never);
  };

  const storeTokens = async (
    accessToken: string | null,
    refreshToken: string | null,
    graphToken: string | null
  ) => {
    try {
      if (accessToken && refreshToken && graphToken) {
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        await AsyncStorage.setItem("graphToken", graphToken);
      } else {
        console.error(
          "Invalid tokens: accessToken, refreshToken, or graphToken is null"
        );
      }
    } catch (error) {
      console.error("Error storing tokens:", error);
    }
  };

  const handleWebViewNavigation = async (event: { url: any; }) => {
    const { url } = event;

    try {
      const tokens = await getTokens();
      if (!tokens.accessToken || !tokens.refreshToken || !tokens.graphToken) {
        console.error("Tokens are missing");
        return;
      }

      const { accessToken, refreshToken, graphToken } = tokens;
      
      const loginResponse = await axios.get('https://actiwizcpe.galapfa.ro/users/login',
        {
          headers: {
            'api_token': accessToken,
            'graph_token': graphToken
          }
        }
      );

      if (!loginResponse || !loginResponse.data) {
        console.error("Error in login response");
        return;
      }

      // Check the login response and act accordingly
      if (loginResponse.data.login_success) {
        console.log("User logged in successfully");
        navigateToNextScreen(FeedPage)
      } else {
        console.error("User not logged in");
      }

    // Check if accessToken is expired and refresh it
    if (loginResponse.data.access_token_expired && refreshToken) {
      const refreshedTokens = await refreshApiToken(refreshToken);
      if (refreshedTokens && refreshedTokens.accessToken && refreshedTokens.refreshToken) {
        const newAccessToken = refreshedTokens.accessToken;
        const newRefreshToken = refreshedTokens.refreshToken;
        setAPIToken(newAccessToken);
        setRefreshToken(newRefreshToken);
      } else {
        console.error("Failed to refresh tokens");
      }
    } else if (!refreshToken) {
      console.error("Refresh token is null");
    }
    
        const response = await axios.post('https://actiwizcpe.galapfa.ro/users/create', {
          user_id: 0,
          student_name: "String",
          academic_degree: "String",
          academic_year: 0,
          academic_email: "String",
          faculty: "String",
          department: "String",
        }, {
          headers: {
            'Authorization': `Bearer ${accessToken}`, // Bearer token from login
            'Refresh': refreshToken, // Refresh token from login
            'Graph': graphToken, // Graph token from refresh
          },
        });

        if (response.data.message === "User created successfully") {
          console.log("User created successfully");        
          // Navigate to the desired screen after successful login
          navigateToNextScreen(FeedPage);
        }else if (response.data.message === "User already exists") {
          console.error("Tokens are not valid");
          navigateToNextScreen(RequestDataUser);
        }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      
};

const getTokens = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const graphToken = await AsyncStorage.getItem("graphToken");
    if (accessToken && refreshToken && graphToken) {
      return { accessToken, refreshToken, graphToken };
    } else {
      throw new Error("Tokens not found in AsyncStorage");
    }
  } catch (error) {
    console.error("Error getting tokens:", error);
    return { accessToken: null, refreshToken: null, graphToken: null };
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
            domStorageEnabled={true}
            startInLoadingState={true}
            onError={(error) => console.error('WebView error:', error)}
            onLoadStart={() => console.log('WebView loading started')}
            onLoadEnd={() => console.log('WebView loading ended')}
            onNavigationStateChange={handleWebViewNavigation}
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
function storeTokens(accessToken: string | null, refreshToken: string | null, graphToken: string | null) {
  throw new Error("Function not implemented.");
}