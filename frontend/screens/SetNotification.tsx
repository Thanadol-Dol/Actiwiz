import React, {  useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { usePushNotifications } from "../utils/usePushNotifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const SetNotification = ({navigation}: {navigation: any}) => {
    const { expoPushToken } = usePushNotifications();
    const [api_token, setApiToken] = useState<string | null>(null);
    const [user_Id, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const pushToken = expoPushToken?.data;
        if (pushToken !== null && pushToken !== undefined) {
          const registerPushToken = async () => {
            const apiToken = await AsyncStorage.getItem("apiToken");
            const userId = await AsyncStorage.getItem("userId").then((value) => parseInt(value as string));
            if(userId !== null && apiToken !== null){
                setUserId(userId);
                setApiToken(apiToken);
                try{
                    const url = (userId : number) => `https://actiwizcpe.galapfa.ro/users/register/tokens/${userId}`;
                    await axios.post(url(userId), null, {
                        headers: {
                            'Authorization': `Bearer ${apiToken}`,
                            'Notification': pushToken
                        }
                    });
                } catch (error) {
                    throw error;
                }
            }
          };
          registerPushToken();
        }
        navigation.navigate("FeedPage");
    }, [expoPushToken?.data]);

    return (
        <View style={styles.container}>
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
});

export default SetNotification;