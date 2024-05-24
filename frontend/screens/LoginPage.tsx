import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { ActivityIndicator, StyleSheet, View, Text, Pressable} from "react-native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setNewTokens, removeCredentials } from "../utils/credentialUtils";

const LoginPage = ({navigation, route}: {navigation: any, route:any}) => {
  const [webviewVisible, setWebviewVisible] = useState(false);
  const webviewSource = 'https://actiwizcpe.galapfa.ro/users/auth/url';
  const [loginUrl, setLoginUrl] = useState<string>('');
  const [loginFlag, setLoginFlag] = useState<boolean>(false);
  const [apiToken, setApiToken] = useState<string | null>(null);
  const [graphToken, setGraphToken] = useState<string | null>(null);

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
      const params = getQueryParams(url);
      const code = params["code"];
      if(code){
        setWebviewVisible(false);
        setLoginFlag(false);
        try {
          const response = await axios.get('https://actiwizcpe.galapfa.ro/users/auth/get/tokens', {
              params: { code: code }
            }
          );
          const tokens = response.data;
          const api_token = tokens.api_token;
          const graph_token = tokens.graph_token;
          const refresh_token = tokens.refresh_token;
  
          await AsyncStorage.setItem("apiToken", api_token as string);
          await AsyncStorage.setItem("graphToken", graph_token as string);
          await AsyncStorage.setItem("refreshToken", refresh_token as string);
  
          setGraphToken(graph_token);
          setApiToken(api_token);
        } catch(error) {
        }
      }
    };
  };

  const setLogin = async () => {
    removeCredentials();
    fetchLoginUrl();
    setLoginFlag(true);
  }

  const checkUser = async () : Promise<any> => {
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
      }
    } catch (error: any) {
      if(error.response.status === 401 || error.response.data.detail.includes("401")){
        try{
          const refreshToken = await AsyncStorage.getItem("refreshToken");
          const response = await setNewTokens(refreshToken);
          setGraphToken(response.graph_token);
          setApiToken(response.api_token);
        } catch (error) {
          setLogin();
        }
      }
    }
  }  

  useEffect(() => {
    const handleLogin = async () => {
      if(apiToken && graphToken){
        await checkUser();
      }
    }
    handleLogin();
  }, [apiToken]);

  useFocusEffect(
    React.useCallback(() => {
      if(route.params?.refresh){
        const setCredential = async () => {
          try {
            const api_token = await AsyncStorage.getItem("apiToken");
            const graph_token = await AsyncStorage.getItem("graphToken");
            if(api_token && graph_token){
              setGraphToken(graph_token);
              setApiToken(api_token);
            } else {
              setLogin();
            }
          } catch (error) {
            setLogin();
          }
        };
        setCredential();
        navigation.setParams({ refresh: false });
      }
    }, [route.params?.refresh])
  );

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