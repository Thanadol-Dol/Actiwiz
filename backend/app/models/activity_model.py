from typing import Optional, List
from pydantic import BaseModel, Field
from datetime import datetime

class ActivityDetail(BaseModel):
    ActivityID: int = Field(..., description="The ID of the activity", example=1)
    ActivityName: str = Field(..., description="The name of the activity", example="กิจกรรมทดสอบ")
    ActivityNameENG: Optional[str] = Field(None, description="The name of the activity in English", example="Test Activity")
    Description: str = Field(..., description="The description of the activity", example="กิจกรรมทดสอบการใช้งาน")
    HourTotal: int = Field(..., description="The total hours of the activity", example=10)
    DayTotal: int = Field(..., description="The total days of the activity", example=5)
    Semester: int = Field(..., description="The semester of the activity", example=1)
    Organizer: str = Field(..., description="The organizer of the activity", example="คณะวิศวกรรมศาสตร์")
    OpenDate: datetime = Field(..., description="The open date of the activity", example="2021-01-01T00:00:00+07:00")
    CloseDate: datetime = Field(..., description="The close date of the activity", example="2021-01-05T23:59:59+07:00")
    AcademicYear: int = Field(..., description="The academic year of the activity", example=2564)

class BaseActivitiesResponse(BaseModel):
    activities: List[ActivityDetail]
    next_page: Optional[int]= Field(..., description="The next page of the activity", example=2)

class RecommendActivitiesV1(BaseActivitiesResponse):
    next_priority: Optional[int] = Field(..., description="The next priority of the activity", example=1)

class RecommendActivitiesV2(BaseActivitiesResponse):
    pass

class SearchActivities(BaseActivitiesResponse):
    pass

class CheckJoinActivityStatus(BaseModel):
    joined: bool = Field(..., description="The status of the user joined the activity", example=True)
    message: str = Field(..., description="The message of the user joined the activity", example="User already joined the activity.")

class ReadActivityStatus(BaseModel):
    message: str = Field(..., description="The message of the user read the activity", example="User have read the activity.")

class JoinActivityStatus(BaseModel):
    message: str = Field(..., description="The message of the user joined the activity", example="User joined the activity successfully.")