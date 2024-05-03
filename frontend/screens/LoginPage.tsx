import React, {  useEffect, useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../GlobalStyles";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import FeedPage from "./FeedPage";

const LoginPage = ({navigation}: {navigation: any}) => {
  const [webviewVisible, setWebviewVisible] = useState(false);
  const webviewSource = 'https://actiwizcpe.galapfa.ro/users/auth/url';
  const [loginUrl, setLoginUrl] = useState<string>('');
  const [loginFlag, setLoginFlag] = useState<boolean>(false);

  const fetchLoginUrl = async () => {
    try {
      const response = await axios.get(webviewSource);
      const { data } = response;
      if (data && data.auth_url) {
        setLoginUrl(data.auth_url);
      }
    } catch (error) {
      throw error;
    }
  };
  
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

  const checkUser = async (apiToken : string | null, graphToken : string | null) : Promise<any> => {
    try{
      const response = await axios.get('https://actiwizcpe.galapfa.ro/users/login', {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Graph': graphToken
        }
      });
      const checkData = response.data || null;
      if(checkData.login_success){
        const userId = checkData.user_id;
        await AsyncStorage.setItem("userId", userId.toString(10));
        navigateToNextScreen('SetNotification');
      } else {
        navigateToNextScreen('RequestDataUser',
          {
            "student_name": checkData.student_name, 
            "academic_email": checkData.academic_email
          }
        );
      }
    } catch (error) {
      return error;
    }
  }

  const checkTokens = async (apiToken : string | null, graphToken : string | null, refreshToken : string | null) => {
    const checkResult = await checkUser(apiToken, graphToken) || null;
    const errorData = checkResult?.response.data || null;
    if(errorData){
      const api_token = await refreshApiToken(refreshToken);
      await AsyncStorage.setItem("apiToken", api_token.api_token);

      const tokens = await refreshGraphToken(refreshToken);
      await AsyncStorage.setItem("graphToken", tokens.graph_token);
      await AsyncStorage.setItem("refreshToken", tokens.refresh_token);

      await checkUser(api_token, tokens.graph_token);
    }
  }

  useEffect(() => {
    const getTokens = async () => {
      try {
        const apiToken = await AsyncStorage.getItem("apiToken");
        const graphToken = await AsyncStorage.getItem("graphToken");
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if(refreshToken){
          await checkTokens(apiToken, graphToken, refreshToken);
        } 
        else {
          fetchLoginUrl();
          setLoginFlag(!loginFlag);
        }
      } catch (error) {
        fetchLoginUrl();
        setLoginFlag(!loginFlag);
      }
    };
    getTokens();
  }, []);

  const navigateToNextScreen = (screenName : string, parameters : any | null = null ) => {
    navigation.navigate(screenName);
  };

  const getQueryParams = (url: string) => {
    const queryParams: { [key: string]: string } = {};
    const queryString = url.split('?')[1];
    if (queryString) {
      queryString.split('&').forEach((param) => {
        const [key, value] = param.split('=');
        queryParams[key] = decodeURIComponent(value);
      });
    }
    return queryParams;
  };

  const handleWebViewNavigation = async (event: { url: any; }) => {
    const { url } = event;

    if (url.includes("auth/callback")) {
      // Parse the URL to extract query parameters
      const params = getQueryParams(url);
      
      // Extract the code parameter
      const code = params["code"];

      axios.get('https://actiwizcpe.galapfa.ro/users/auth/get/tokens', {
          params: {
            code: code,
          },
      }).then((response) => {
        const tokens = response.data;
        const apiToken = tokens.api_token;
        const graphToken = tokens.graph_token;
        const refreshToken = tokens.refresh_token;
        AsyncStorage.setItem("apiToken", apiToken as string);
        AsyncStorage.setItem("graphToken", graphToken as string);
        AsyncStorage.setItem("refreshToken", refreshToken as string);
        checkUser(apiToken, graphToken);
      }).catch((error) => {
        setWebviewVisible(!webviewVisible);
        setLoginFlag(!loginFlag);
      });
  };
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
        {webviewVisible && loginUrl && loginFlag && (
          <WebView
          source={{ uri: loginUrl }}
          incognito={true}
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