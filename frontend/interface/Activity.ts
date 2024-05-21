export interface ActivityDetail {
    ActivityID: number;
    ActivityName: string;
    ActivityNameENG: string | null;
    Description: string;
    HourTotal: number;
    DayTotal: number;
    Semester: number;
    Organizer: string;
    OpenDate: Date;
    CloseDate: Date;
    AcademicYear: number;
}

export interface SearchActivityResponse {
    activities: ActivityDetail[];
    page: number | null;
}

export interface RecommendActivityResponse extends SearchActivityResponse {
    priority: number | null;
}

export type EventCardType = {
    navigation: any;
    event: ActivityDetail;
};