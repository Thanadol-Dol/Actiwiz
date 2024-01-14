from typing import Optional, List
from pydantic import BaseModel

class SearchClub(BaseModel):
    club_name: str
    club_name_eng: Optional[str]
    club_id: str