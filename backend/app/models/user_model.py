from pydantic import BaseModel
from typing import Optional

class UserDetail(BaseModel):
    UserID: int
    StudentName: str
    AcademicDegree: str
    AcademicYear: int
    AcademicEmail: str
    Faculty: str
    Department: str