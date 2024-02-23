from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class ActivityDetail(BaseModel):
    activity_id: Optional[str]
    activity_name: str
    activity_name_eng: Optional[str]
    description: Optional[str]
    hour_total: Optional[int]
    day_total: Optional[int]
    semester: Optional[int]
    organizer: Optional[str]
    open_date: Optional[datetime]
    close_date: Optional[datetime]
    academic_year: Optional[int]