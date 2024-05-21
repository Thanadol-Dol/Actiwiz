export interface ClubDetail{
    "ClubID" : string,
    "ClubName" : string,
    "ClubNameENG" : string | null,
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