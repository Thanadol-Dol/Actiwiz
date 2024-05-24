import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ActivityDetail, ActivityResponse } from "../interface/Activity";

const getRecommendActivities = async (page : number | null) : Promise<ActivityResponse> => {
    const apiToken = await AsyncStorage.getItem("apiToken");
    const userId = await AsyncStorage.getItem("userId");
    try{
        const response = await axios.get(`https://actiwizcpe.galapfa.ro/activities/v2/recommend/user/${userId}`,{
                headers: {
                    'Authorization': `Bearer ${apiToken}`
                },
                params: {
                    page_number: page,
                    results_size: 6,
                }
            }
        )
        return { "activities" : response.data.activities, "page" : response.data.next_page };
    } catch (error) {
        throw error;
    }
}

const getSearchActivities = async (page : number | null, nameToSearch: string) : Promise<ActivityResponse> => {
    const apiToken = await AsyncStorage.getItem("apiToken");
    try{
        const response = await axios.get(`https://actiwizcpe.galapfa.ro/activities/${nameToSearch}`,{
                headers: {
                    'Authorization': `Bearer ${apiToken}`
                },
                params: {
                    page_number: page,
                    results_size: 6
                }
            }
        )
        return { "activities" : response.data.activities, "page" : response.data.next_page };
    } catch (error) {
        throw error;
    }
}

const getActivityByID = async (ActivityID: number) : Promise<ActivityDetail> => {
    const apiToken = await AsyncStorage.getItem("apiToken");
    try{
        const response = await axios.get(`https://actiwizcpe.galapfa.ro/activities/id/${ActivityID}`,{
                headers: {
                    'Authorization': `Bearer ${apiToken}`
                }
            }
        )
        return response.data;
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

export { getRecommendActivities, getSearchActivities, getActivityByID, removeCredentials };