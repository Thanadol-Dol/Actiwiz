export interface ClubDetail{
    "ClubID" : number,
    "ClubName" : string,
    "ClubNameENG" : string,
}

export interface SearchClubResponse {
    clubs: ClubDetail[];
    page: number | null;
}

export interface RecommendClubResponse extends SearchClubResponse {
    priority: number | null;
}

export type ClubCardType = {
    navigation: any;
    club: ClubDetail;
};