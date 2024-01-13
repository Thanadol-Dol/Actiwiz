from pydantic import BaseModel

class SearchClub(BaseModel):
    club_name: str
    club_name_eng: str