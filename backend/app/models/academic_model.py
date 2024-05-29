from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

class DegreeDetail(BaseModel):
    DegreeName: str = Field(..., description="The name of the degree", example="ปริญญาตรี")

class FacultyDetail(BaseModel):
    FacultyName: str = Field(..., description="The name of the faculty", example="คณะวิศวกรรมศาสตร์")

class DepartmentDetail(BaseModel):
    DepartmentName: str = Field(..., description="The name of the department", example="วิศวกรรมคอมพิวเตอร์")

class DegreeEnum(Enum):
    Bachelor = 10
    Master = 20
    Doctor = 30