from fastapi import APIRouter, Request, HTTPException, Depends, Path
from ..models.user_model import UserDetail
from msal import ConfidentialClientApplication
from ..utils.database import Neo4j, get_neo4j
from fastapi_microsoft_identity import initialize, requires_auth, AuthError, validate_scope
import os, requests
import json

userRouter = APIRouter(
    prefix="/users",
    tags=["users"],
)

auth_app = ConfidentialClientApplication(
    client_id=os.environ.get('AZURE_AD_CLIENT_ID'),
    client_credential=os.environ.get('AZURE_AD_CREDENTIAL'),
    authority=os.environ.get('AZURE_AD_AUTHORITY'),
)

initialize(
    tenant_id_=os.environ.get('AZURE_AD_TENANT_ID'), 
    client_id_=os.environ.get('AZURE_AD_CLIENT_ID')
)

api_scopes = []
api_scopes.append(os.environ.get('AZURE_AD_SCOPES'))
graph_scopes = []
graph_scopes.append(os.environ.get('GRAPH_SCOPE'))
token_scp = os.environ.get('AZURE_AD_ACCESS_TOKEN_SCP')

@userRouter.get("/auth/url")
async def user_login(request: Request):
    auth_url = auth_app.get_authorization_request_url(
        scopes=api_scopes,
        redirect_uri=os.environ.get('AZURE_AD_REDIRECT_URI'),
    )
    return {"auth_url": auth_url}

@userRouter.get("/auth/callback")
async def auth_callback(request: Request, code: str):
    result_api = auth_app.acquire_token_by_authorization_code(
        code,
        scopes=api_scopes,
        redirect_uri=os.environ.get('AZURE_AD_REDIRECT_URI'),
    )
    if "error" in result_api:
        raise HTTPException(status_code=400, detail=result_api["error_description"])
    api_token = result_api["access_token"]
    refresh_token = result_api["refresh_token"]

    result_graph = auth_app.acquire_token_by_refresh_token(
        refresh_token,
        scopes=graph_scopes,
    )
    if "error" in result_graph:
        raise HTTPException(status_code=400, detail=result_graph["error_description"])
    graph_token = result_graph["access_token"]
    refresh_token = result_graph["refresh_token"]
    return {"api_token": api_token, "graph_token": graph_token, "refresh_token": refresh_token}

@userRouter.get("/auth/refresh/api_token")
async def refresh_graph_token(request: Request):
    result = auth_app.acquire_token_by_refresh_token(
        request.headers.get('Refresh_Token'),
        scopes=api_scopes,
    )
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error_description"])

    api_token = result["access_token"]
    refresh_token = result["refresh_token"]
    return {"api_token": api_token, "refresh_token": refresh_token}

@userRouter.get("/auth/refresh/graph_token")
async def refresh_api_token(request: Request):
    result = auth_app.acquire_token_by_refresh_token(
        request.headers.get('Refresh_Token'),
        scopes=graph_scopes,
    )
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error_description"])

    graph_token = result["access_token"]
    refresh_token = result["refresh_token"]
    return {"graph_token": graph_token, "refresh_token": refresh_token}

@userRouter.get("/login")
@requires_auth
async def user_login(
    request: Request,
    neo4j: Neo4j = Depends(get_neo4j)
):
    try:
        validate_scope(token_scp,request)
        graph_headers = {
            "Authorization": f"Bearer {request.headers.get('Graph_Authorization')}",
            "Content-Type": "application/json"   
        }
        response = requests.get('https://graph.microsoft.com/v1.0/me?$select=displayName,mail', headers = graph_headers)
        response_json = response.json()
        student_name = response_json.get('displayName')
        academic_email = response_json.get('mail')
        if student_name is None or academic_email is None:
            raise HTTPException(status_code=401, detail="Invalid Graph token")
        
        user_params = {"student_name": student_name, "academic_email": academic_email} 
        user_query = f"""MATCH (userNode:User) WHERE userNode.StudentName CONTAINS $student_name AND 
        userNode.AcademicEmail CONTAINS $academic_email RETURN userNode.UserID AS user_id"""
        result = await neo4j.query(user_query, user_params)
        if result is None:
            return {"login_success": False, "student_name": student_name, "academic_email": academic_email , "message": "User not found in the database"}
        return {"login_success": True, "user_id": result['user_id'], "message": "User logged in successfully"}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@userRouter.post("/create")
@requires_auth
async def create_user(
    request: Request,
    user: UserDetail,
    neo4j: Neo4j = Depends(get_neo4j)
):
    try:
        validate_scope(token_scp,request)
        
        user_max_id = await neo4j.user_max_id()
        user_detail = {
            "UserID": user_max_id,
            "StudentName": user.student_name, 
            "AcademicEmail": user.academic_email,
            "AcademicDegree": user.academic_degree,
            "AcademicYear": user.academic_year,
            "Faculty": user.faculty,
            "Department": user.department
        }
        user_params = {"user_params": user_detail}
        user_query = f"""CREATE (userNode:User $user_params)"""
        await neo4j.run(user_query, user_params)
        
        department_relationship_query = f"""MATCH (userNode:User), (departmentNode:Department) 
        WHERE userNode.Department = departmentNode.DepartmentName 
        MERGE (userNode)-[:IN_DEPARTMENT_OF]->(departmentNode)"""
        await neo4j.run(department_relationship_query)

        faculty_relationship_query = f"""MATCH (userNode:User), (facultyNode:Faculty)
        WHERE userNode.Faculty = facultyNode.FacultyName
        MERGE (userNode)-[:IN_FACULTY_OF]->(facultyNode)"""
        await neo4j.run(faculty_relationship_query)

        return {"message": "User created successfully"}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@userRouter.get("/{user_id}", response_model=UserDetail)
@requires_auth
async def get_user(
    request: Request,
    user_id: int = Path(...,description="The ID of the user to retrieve"),
    neo4j: Neo4j = Depends(get_neo4j)
):
    try:
        validate_scope(token_scp,request)
        user_params = {"user_id": user_id}
        user_query = f"""MATCH (userNode:User) WHERE userNode.UserID = $user_id RETURN userNode"""
        result = await neo4j.query(user_query, user_params)
        user_node = result['userNode']
        user_data = {
            'user_id': user_node['UserID'],
            'student_name': user_node['StudentName'],
            'academic_degree': user_node['AcademicDegree'],
            'academic_year': user_node['AcademicYear'],
            'academic_email': user_node['AcademicEmail'],
            'faculty': user_node['Faculty'],
            'department': user_node['Department']
        }
        return UserDetail(**user_data)
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))