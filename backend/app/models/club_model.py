from typing import Optional, List
from pydantic import BaseModel, Field
from datetime import datetime

class ClubDetail(BaseModel):
    ClubID: str = Field(..., description="The ID of the club", example="SO0001")
    ClubName: str = Field(..., description="The name of the club", example="ชมรมคอมพิวเตอร์")
    ClubNameEng: Optional[str] = Field(..., description="The name of the club in English", example="Computer Club")

class BaseClubsResponse(BaseModel):
    clubs: List[ClubDetail]
    next_page: Optional[int] = Field(..., description="The next page of the club", example=2)

class RecommendClubsV1(BaseClubsResponse):
    next_priority: Optional[int] = Field(..., description="The next priority of the club", example=1)

class RecommendClubsV2(BaseClubsResponse):
    pass

class SearchClubs(BaseClubsResponse):
    pass

class CheckJoinClubStatus(BaseModel):
    joined: bool = Field(..., description="The status of the user joined the club", example=True)
    message: str = Field(..., description="The message of the user joined the club", example="User already joined the club.")

class ReadClubStatus(BaseModel):
    message: str = Field(..., description="The message of the user read the club", example="User have read the club.")

class JoinClubStatus(BaseModel):
    message: str = Field(..., description="The message of the user joined the club", example="User joined the club successfully.")

class LeaveClubStatus(BaseModel):
    message: str = Field(..., description="The message of the user left the club", example="User left the club successfully.")