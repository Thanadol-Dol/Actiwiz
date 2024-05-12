from pydantic import BaseModel
from typing import Optional
from enum import Enum

class DegreeDetail(BaseModel):
    DegreeName: str

class FacultyDetail(BaseModel):
    FacultyName: str

class DepartmentDetail(BaseModel):
    DepartmentName: str

class DegreeEnum(Enum):
    Bachelor = 10
    Master = 20
    Doctor = 30