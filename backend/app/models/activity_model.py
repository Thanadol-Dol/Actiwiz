from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class ActivityDetail(BaseModel):
    activity_id: int
    activity_name: str
    activity_name_eng: Optional[str]
    description: str
    hour_total: int
    day_total: int
    semester: int
    organizer: str
    open_date: datetime
    close_date: datetime
    academic_year: int