export interface ClubDetail{
    "ClubID" : string,
    "ClubName" : string,
    "ClubNameENG" : string | null,
}

export interface ClubResponse {
    clubs: ClubDetail[];
    page: number | null;
}

export type ClubCardType = {
    navigation: any;
    club: ClubDetail;
};