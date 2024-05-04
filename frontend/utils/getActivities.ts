import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Unofficial function to get activities from the API
export const getActivities = async (page : number, resultSize:number = 10, extraSkip: number | null, priority: number) => {
    const apiToken = await AsyncStorage.getItem("apiToken");
    const userId = await AsyncStorage.getItem("userId");
    const activities : any = [];
    let queryPage = page;
    let querySize = resultSize;
    let queryPriority = priority;
    let nextExtraSkip = extraSkip;
    while(activities.length < resultSize){
        try{
            const response = await axios.get(`https://actiwizcpe.galapfa.ro/activities/recommend/user/${userId}`,{
                    headers: {
                        'Authorization': `Bearer ${apiToken}`
                    },
                    params: {
                        page_number: queryPage,
                        results_size: querySize,
                        priority: queryPriority
                    }
                }
            )
            const data = response.data;
            const newActivitiesData = data.activities;
            activities.push(...newActivitiesData);
            querySize = resultSize - activities.length;
            if(data.has_next_page){
                queryPage++;
            } else {
                if(data.has_next_class){
                    queryPriority++;
                    queryPage = 1;
                    if(querySize > 0){
                        nextExtraSkip = querySize;
                    } else {
                        nextExtraSkip = null;
                    }
                }
            }
        } catch (error) {
            throw error;
        }
    }
    return { "activities" : activities, "extraSkip" : nextExtraSkip, "priority" : queryPriority, "page" : queryPage};
}