from pydantic import BaseModel
from typing import Optional

class UserDetail(BaseModel):
    user_id: int
    student_name: str
    academic_degree: str
    academic_year: int
    academic_email: str
    faculty: str
    department: str