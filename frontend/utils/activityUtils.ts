import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ActivityDetail, RecommendActivityResponse, SearchActivityResponse } from "../interface/Activity";

const getRecommendActivities = async (page : number | null, priority: number | null) : Promise<RecommendActivityResponse> => {
    const apiToken = await AsyncStorage.getItem("apiToken");
    const userId = await AsyncStorage.getItem("userId");
    try{
        const response = await axios.get(`https://actiwizcpe.galapfa.ro/activities/recommend/user/${userId}`,{
                headers: {
                    'Authorization': `Bearer ${apiToken}`
                },
                params: {
                    page_number: page,
                    results_size: 6,
                    priority: priority
                }
            }
        )
        return { "activities" : response.data.activities, "page" : response.data.next_page, "priority" : response.data.next_priority };
    } catch (error) {
        throw error;
    }
}

const getSearchActivities = async (page : number | null, nameToSearch: string) : Promise<SearchActivityResponse> => {
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

export { getRecommendActivities, getSearchActivities, getActivityByID };