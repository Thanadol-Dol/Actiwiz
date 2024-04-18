from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class ActivityDetail(BaseModel):
    ActivityID: int
    ActivityName: str
    ActivityNameENG: Optional[str]
    Description: str
    HourTotal: int
    DayTotal: int
    Semester: int
    Organizer: str
    OpenDate: datetime
    CloseDate: datetime
    AcademicYear: int