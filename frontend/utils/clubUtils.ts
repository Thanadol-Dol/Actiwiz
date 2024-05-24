import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ClubDetail, ClubResponse } from "../interface/Club";

const getRecommendClubs = async (page : number | null) : Promise<ClubResponse> => {
    const apiToken = await AsyncStorage.getItem("apiToken");
    const userId = await AsyncStorage.getItem("userId");
    try{
        const response = await axios.get(`https://actiwizcpe.galapfa.ro/clubs/v2/recommend/user/${userId}`,{
                headers: {
                    'Authorization': `Bearer ${apiToken}`
                },
                params: {
                    page_number: page,
                    results_size: 6
                }
            }
        )
        return { "clubs" : response.data.clubs, "page" : response.data.next_page };
    } catch (error: any) {
        throw error;
    }
}

const getSearchClubs = async (page : number | null, nameToSearch: string) : Promise<ClubResponse> => {
    const apiToken = await AsyncStorage.getItem("apiToken");
    try{
        const response = await axios.get(`https://actiwizcpe.galapfa.ro/clubs/${nameToSearch}`,{
                headers: {
                    'Authorization': `Bearer ${apiToken}`
                },
                params: {
                    page_number: page,
                    results_size: 6
                }
            }
        )
        return { "clubs" : response.data.clubs, "page" : response.data.next_page};
    } catch (error) {
        throw error;
    }
}

const getClubByID = async (ClubID: string) : Promise<ClubDetail> => {
    const apiToken = await AsyncStorage.getItem("apiToken");
    try{
        const response = await axios.get(`https://actiwizcpe.galapfa.ro/clubs/id/${ClubID}`,{
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

export { getRecommendClubs, getSearchClubs, getClubByID };