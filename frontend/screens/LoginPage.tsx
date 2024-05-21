import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { ActivityIndicator, StyleSheet, View, Text, Pressable} from "react-native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = ({navigation, route}: {navigation: any, route:any}) => {
  const [webviewVisible, setWebviewVisible] = useState(false);
  const webviewSource = 'https://actiwizcpe.galapfa.ro/users/auth/url';
  const [loginUrl, setLoginUrl] = useState<string>('');
  const [loginFlag, setLoginFlag] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const fetchLoginUrl = async () => {
    try {
      const response = await axios.get(webviewSource);
      const { data } = response;
      if (data && data.auth_url) {
        setLoginUrl(data.auth_url);
      }
    } catch (error) {
      console.log(error);
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
    console.log("apiToken:", apiToken);
    console.log("graphToken:", graphToken);
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
        navigation.navigate('SetNotification');
      } else {
        navigation.navigate('RequestDataUser', {
            "student_name": checkData.student_name, 
            "academic_email": checkData.academic_email

        });
        console.log("student_name:", checkData.student_name);
        console.log("academic_email:", checkData.academic_email);
      }
    } catch (error) {
      return error;
    }
  }

  const checkTokens = async (apiToken : string | null, graphToken : string | null, refreshToken : string | null) => {
    const checkResult = await checkUser(apiToken, graphToken) || null;
    const errorData = checkResult?.response.data || null;
    if(errorData){
      await AsyncStorage.removeItem("apiToken");
      await AsyncStorage.removeItem("graphToken");
      const api_token = await refreshApiToken(refreshToken);
      await AsyncStorage.setItem("apiToken", api_token.api_token);

      const tokens = await refreshGraphToken(refreshToken);
      await AsyncStorage.setItem("graphToken", tokens.graph_token);
      await AsyncStorage.setItem("refreshToken", tokens.refresh_token);
      await checkUser(api_token.api_token, tokens.graph_token);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      if(route.params?.refresh){
        const getTokens = async () => {
          try {
            const apiToken = await AsyncStorage.getItem("apiToken");
            const graphToken = await AsyncStorage.getItem("graphToken");
            const refreshToken = await AsyncStorage.getItem("refreshToken");
            if(refreshToken){
              await checkTokens(apiToken, graphToken, refreshToken);
            } 
            else {
              await AsyncStorage.removeItem("apiToken");
              await AsyncStorage.removeItem("graphToken");
              await AsyncStorage.removeItem("refreshToken");
              fetchLoginUrl();
              setLoginFlag(true);
            }
          } catch (error) {
            await AsyncStorage.removeItem("apiToken");
            await AsyncStorage.removeItem("graphToken");
            await AsyncStorage.removeItem("refreshToken");
            fetchLoginUrl();
            setLoginFlag(true);
          }
        };
        getTokens();
        navigation.setParams({ refresh: false });
      }
    }, [route.params?.refresh])
  );

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

      setLoading(true);

      // Parse the URL to extract query parameters
      const params = getQueryParams(url);
      
      // Extract the code parameter
      const code = params["code"];
      try {
        const response = await axios.get('https://actiwizcpe.galapfa.ro/users/auth/get/tokens', {
          params: { code: code },
      });

        const tokens = response.data;
        const apiToken = tokens.api_token;
        const graphToken = tokens.graph_token;
        const refreshToken = tokens.refresh_token;

        AsyncStorage.setItem("apiToken", apiToken as string);
        AsyncStorage.setItem("graphToken", graphToken as string);
        AsyncStorage.setItem("refreshToken", refreshToken as string);

        await checkUser(apiToken, graphToken);
      } catch(error) {
        console.log(error);
      }
      finally {
        setLoading(false);
        setWebviewVisible(false);
      }
  };
};

return (
    <>
      {
        webviewVisible
        ?
          <WebView
            source={{ uri: loginUrl }}
            incognito={true}
            onNavigationStateChange={handleWebViewNavigation}
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}
          />
        :
          <View style={styles.loginPage}>
            <View style={styles.imageContainer}>
              <View style={styles.block} />
              <Image
                style={styles.appBanner}
                contentFit="cover"
                source={require("../assets/ActiwizPic.png")}
              />
            </View>
          {
            loginFlag
            ?
            <View style={styles.loginArea}>
              <Text style={[styles.textHeader, styles.textTypo]}>
                Login into your account
              </Text>
              <Pressable
                style={styles.rectangleGroup}
                onPress={() => setWebviewVisible(!webviewVisible)}
              >
                <Text style={[styles.login, styles.textTypo]}>Login</Text>
              </Pressable>
            </View>
            :
              <ActivityIndicator style={styles.loaderAnimation} size="large" color={Color.colorDarkorange_200} />
          }
          </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  loginPage: {
    backgroundColor: Color.iOSFFFFFF,
    borderColor: Color.colorBlack,
    flex: 1,
    width: "100%",
    height: "50%",
    overflow: "hidden",
    justifyContent: "center",
  },
  appBanner: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
  loginArea:{
    flex: 1,
    height: "100%",
    maxHeight: "50%",
    width: "100%",
  },
  textHeader: {
    color: Color.colorBlack,
    textAlignVertical: "center",
    flex: 1,
    height: "100%",
    width: "100%",
    maxHeight: "25%",
    marginTop: "5%",
  },
  textTypo: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "700",
    fontSize: FontSize.size_base_2,
  },
  rectangleGroup: {
    flex: 4,
    height: "100%",
    maxHeight: "15%",
    width: "90%",
    backgroundColor: Color.colorDarkorange_200,
    shadowColor: "rgba(253, 116, 1, 0.3)",
    shadowOffset: {
      width: 0,
      height: 12.116715431213379,
    },
    shadowRadius: 24.23,
    elevation: 24.23,
    shadowOpacity: 1,
    borderRadius: Border.br_3xl_5,
    alignSelf: "center",
  },
  login: {
    flex: 1,
    textAlignVertical: "center",
    color: Color.iOSFFFFFF,
  },
  loaderAnimation: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  block: {
    flex: 1,
    width: "100%",
    height: "100%",
  }
});

export default LoginPage;