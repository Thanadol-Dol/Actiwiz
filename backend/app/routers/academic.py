from fastapi import APIRouter, Request, HTTPException, Depends, Path
from typing import List
from ..models.academic_model import DegreeDetail, FacultyDetail, DepartmentDetail
from ..utils.database import Database, get_database
from ..utils.academic_util import degree_sort, extract_degree_thai

academicRouter = APIRouter(
    prefix="/academics",
    tags=["academics"]
)

@academicRouter.get("/degrees", response_model=List[DegreeDetail])
async def get_degrees(
    request: Request,
    database: Database = Depends(get_database),
):
    try:
        # Query to get all degrees
        degree_query = f"""MATCH (departmentNode:Department) RETURN DISTINCT departmentNode.DegreeTH, departmentNode.DegreeENG"""
        results = await database.query(degree_query, fetch_all=True)
        sorted_results = sorted(results, key=degree_sort)
        degree_thai = extract_degree_thai(sorted_results)
        return degree_thai
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@academicRouter.get("/{degree_name}/faculties", response_model=List[FacultyDetail])
async def get_faculties(
    request: Request,
    degree_name: str = Path(...,description="The name of the degree to retrieve", example="ปริญญาตรี"),
    database: Database = Depends(get_database)
):
    try:
        # Query to get all faculties
        faculty_query = f"""MATCH (departmentNode:Department) WHERE departmentNode.DegreeTH = $degree_name 
        RETURN DISTINCT departmentNode.Faculty AS FacultyName"""
        faculty_params = {"degree_name": degree_name}
        results = await database.query(faculty_query,faculty_params, fetch_all=True)
        if results is None:
            raise HTTPException(status_code=404, detail="Faculty not found")
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@academicRouter.get("/{degree_name}/{faculty_name}/departments", response_model=List[DepartmentDetail])
async def get_departments(
    request: Request,
    degree_name: str = Path(...,description="The name of the degree to retrieve", example="ปริญญาตรี"),
    faculty_name: str = Path(...,description="The name of the faculty to retrieve", example="คณะวิศวกรรมศาสตร์"),
    database: Database = Depends(get_database)
):
    try:
        # Query to get all departments of a faculty
        department_query = f"""MATCH (departmentNode:Department)
        WHERE departmentNode.DegreeTH = $degree_name AND departmentNode.Faculty = $faculty_name
        RETURN DISTINCT departmentNode.DepartmentName AS DepartmentName"""
        department_params = {"degree_name": degree_name, "faculty_name": faculty_name}
        results = await database.query(department_query, department_params, fetch_all=True)
        if results is None:
            raise HTTPException(status_code=404, detail="Faculty not found")
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))