from pydantic import BaseModel
from typing import Optional

class DegreeDetail(BaseModel):
    DegreeName: str

class FacultyDetail(BaseModel):
    FacultyName: str

class DepartmentDetail(BaseModel):
    DepartmentName: str