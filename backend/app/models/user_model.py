from pydantic import BaseModel
from enum import Enum

class AcademicDegree(str, Enum):
    bachelor = "Bachelor"
    master = "Master"
    doctor = "Doctor"

class UserDetail(BaseModel):
    student_id: int
    student_name: str
    password: str
    academic_email: str
    academic_degree: AcademicDegree
    year: int

class UserLogin(BaseModel):
    academic_email: str
    password: str