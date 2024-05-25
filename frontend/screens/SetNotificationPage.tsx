import React, {  useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { usePushNotifications } from "../utils/usePushNotifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { setNewTokens, removeCredentials } from "../utils/credentialUtils";
import { Color } from "../utils/GlobalStyles";

const SetNotificationPage = ({navigation}: {navigation: any}) => {
    const { expoPushToken } = usePushNotifications();
    const [apiToken, setApiToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const setCredentials = async () => {
            const api_token = await AsyncStorage.getItem("apiToken");
            const user_id = await AsyncStorage.getItem("userId").then((value) => parseInt(value as string,10));
            if(api_token && user_id){
                setUserId(user_id);
                setApiToken(api_token);
            } else {
                removeCredentials();
                navigation.navigate("LoginPage", { refresh: true });
            }
        }
        setCredentials();
    }, []);

    useEffect(() => {
        if(apiToken && userId){
            const pushToken = expoPushToken?.data;
            if (pushToken) {
                const registerPushToken = async () => {
                    try{
                        const url = (userId : number) => `https://actiwizcpe.galapfa.ro/users/register/tokens/${userId}`;
                        await axios.post(url(userId), null, {
                            headers: {
                                'Authorization': `Bearer ${apiToken}`,
                                'Notification': pushToken
                            }
                        });
                        navigation.navigate("EventFeedPage");
                    } catch (error: any) {
                        if(error.response.status === 401 || error.response.data.detail.includes("401")){
                            try{
                                const refreshToken = await AsyncStorage.getItem("refreshToken");
                                const response = await setNewTokens(refreshToken);
                                setApiToken(response.api_token);
                            } catch (error) {
                                removeCredentials();
                                navigation.navigate("LoginPage", { refresh: true });
                            }
                        }
                    }
                };
                registerPushToken();
            } else {
                navigation.navigate("EventFeedPage");
            }
        }
    }, [apiToken]);

    return (
        <View style={styles.container}>
            <ActivityIndicator style={styles.loaderAnimation} size="large" color={Color.colorDarkorange_200} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    loaderAnimation: {
        flex: 1,
    },
});

export default SetNotificationPage;