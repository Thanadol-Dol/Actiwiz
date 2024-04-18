from typing import Optional
from pydantic import BaseModel

class ClubDetail(BaseModel):
    ClubID: str
    ClubName: str
    ClubNameEng: Optional[str]