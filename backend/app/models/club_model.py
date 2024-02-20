from typing import Optional
from pydantic import BaseModel

class ClubDetail(BaseModel):
    club_id: str
    club_name: str
    club_name_eng: Optional[str]