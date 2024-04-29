import React, {  useEffect, useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../GlobalStyles";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import FeedPage from "./FeedPage";

const LoginPage = () => {
  const navigation = useNavigation();
  const [webviewVisible, setWebviewVisible] = useState(false);
  const webviewSource = 'https://actiwizcpe.galapfa.ro/users/auth/url';
  const [loginUrl, setLoginUrl] = useState<string>('');
  
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

  const navigateToNextScreen = () => {
    navigation.navigate('FeedPage' as never);
  };

  const handleWebViewNavigation = async (event: { url: any; }) => {
    const { url } = event;

    if (url.includes("api_token")) {
      const newAPIToken = url.match(/api_token=([^&]*)/)[1];
      const newRefreshToken = url.match(/refresh_token=([^&]*)/)[1];
      const newGraphToken = url.match(/graph_token=([^&]*)/)[1];

      try {
        // Store tokens in state
        await AsyncStorage.setItem("apiToken", newAPIToken);
        console.log("API token stored");
        await AsyncStorage.setItem("refreshToken", newRefreshToken);
        console.log("Refresh token stored");
        await AsyncStorage.setItem("graphToken", newGraphToken);
        console.log("Graph token stored");

        // Send API token, refresh token, and graph token in request header
        const tokens = await getTokens();
        const { accessToken, refreshToken, graphToken } = tokens;

        const loginResponse = await axios.post('https://actiwizcpe.galapfa.ro/users/login', {
          api_token: accessToken,
          graph_token: graphToken,
        });

        // Check the login response and act accordingly
        if (loginResponse.data.login_success) {
          console.log("User logged in successfully");
          navigateToNextScreen();
        } else {
          console.error("User not logged in");
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
            'Graph': newGraphToken, // Graph token from refresh
          },
        });

        if (response.data.message === "User created successfully") {
          console.log("User created successfully");        
          // Navigate to the desired screen after successful login
          navigation.navigate('FeedPage' as never);
        }else {
          console.error("Tokens are not valid");
        }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    
  };
};

const getTokens = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const graphToken = await AsyncStorage.getItem("graphToken");
    return { accessToken, refreshToken, graphToken };
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