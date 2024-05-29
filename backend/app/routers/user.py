from fastapi import APIRouter, Request, HTTPException, Depends, Path, Security, Query
from ..models.user_model import (
    AuthUrlResponse,
    AuthGetTokensResponse,
    RefreshAPITokenResponse,
    RefreshGraphTokenResponse,
    LoginResponse,
    LogoutResponse,
    UserDetail,
    CreateUserResponse,
    RegisterTokenResponse
)
from ..utils.database import Database, get_database
from fastapi_microsoft_identity import requires_auth, AuthError, validate_scope
import os, requests
from ..utils.user_util import extract_user_data, get_user_next_id
from ..config.auth import (
    auth_app, 
    api_scopes, 
    graph_scopes, 
    token_scp, 
    api_token_header, 
    graph_token_header, 
    refresh_token_header,
    notification_token_header
)

userRouter = APIRouter(
    prefix="/users",
    tags=["users"],
)

@userRouter.get("/auth/url", response_model=AuthUrlResponse)
async def user_login(request: Request):
    auth_url = auth_app.get_authorization_request_url(
        scopes=api_scopes + graph_scopes,
        redirect_uri=os.environ.get('AZURE_AD_REDIRECT_URI'),
    )
    return {"auth_url": auth_url}

@userRouter.get("/auth/callback", include_in_schema=False)
async def auth_callback(request: Request, code: str):
    return {"code": code}

@userRouter.get("/auth/get/tokens", response_model=AuthGetTokensResponse)
async def auth_callback(
    request: Request, 
    code: str = Query(...,description="The code from the callback URL", example="0.AQABAAAAAAAm-06blBE1TpVMil8KPQ41KzZ2X6j9n1k3...")
):
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

@userRouter.get("/auth/refresh/api_token", response_model=RefreshAPITokenResponse)
async def refresh_graph_token(
    request: Request, 
    refresh_token = Security(refresh_token_header)
):
    try:
        result = auth_app.acquire_token_by_refresh_token(
            request.headers.get('Refresh'),
            scopes=api_scopes,
        )
        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error_description"])

        api_token = result["access_token"]
        refresh_token = result["refresh_token"]
        return {"api_token": api_token, "refresh_token": refresh_token}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@userRouter.get("/auth/refresh/graph_token", response_model=RefreshGraphTokenResponse)
async def refresh_api_token(
    request: Request, 
    refresh_token = Security(refresh_token_header)
):
    try:
        result = auth_app.acquire_token_by_refresh_token(
            request.headers.get('Refresh'),
            scopes=graph_scopes,
        )
        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error_description"])
        
        graph_token = result["access_token"]
        refresh_token = result["refresh_token"]
        return {"graph_token": graph_token, "refresh_token": refresh_token}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@userRouter.get("/login", response_model=LoginResponse)
@requires_auth
async def user_login(
    request: Request,
    database: Database = Depends(get_database),
    api_token = Security(api_token_header),
    graph_token = Security(graph_token_header)
):
    try:
        validate_scope(token_scp,request)
        graph_headers = {
            "Authorization": f"Bearer {request.headers.get('Graph')}",
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
        result = await database.query(user_query, user_params)
        if result is None:
            return {"login_success": False, "student_name": student_name, "academic_email": academic_email , "message": "User not found in the database"}
        return {"login_success": True, "user_id": result['user_id'], "message": "User logged in successfully"}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@userRouter.get("/logout/{user_id}", response_model=LogoutResponse)
@requires_auth
async def user_logout(
    request: Request,
    user_id: int = Path(...,description="The ID of the user to retrieve"),
    database: Database = Depends(get_database),
    api_token = Security(api_token_header)
):
    try:
        validate_scope(token_scp,request)

        query = f"""MATCH (tokenNode:Token) WHERE tokenNode.UserID = $user_id DETACH DELETE tokenNode"""
        params = {"user_id": user_id}
        await database.run(query, params)
        return {"message": "User logged out successfully"}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@userRouter.post("/create", response_model=CreateUserResponse)
@requires_auth
async def create_user(
    request: Request,
    user: UserDetail,
    database: Database = Depends(get_database),
    api_token = Security(api_token_header)
):
    try:
        validate_scope(token_scp,request)
        
        user_next_id = await get_user_next_id()
        new_user = user.model_dump()
        new_user['UserID'] = user_next_id
        user_params = {"user_params": new_user}
        user_query = f"""CREATE (userNode:User $user_params)"""
        await database.run(user_query, user_params)
        
        department_relationship_query = f"""MATCH (userNode:User), (departmentNode:Department) 
        WHERE userNode.Department = departmentNode.DepartmentName 
        AND userNode.Faculty = departmentNode.Faculty 
        AND userNode.AcademicDegree = departmentNode.DegreeTH
        MERGE (userNode)-[:IN_DEPARTMENT_OF]->(departmentNode)"""
        await database.run(department_relationship_query)

        faculty_relationship_query = f"""MATCH (userNode:User), (facultyNode:Faculty)
        WHERE userNode.Faculty = facultyNode.FacultyName
        MERGE (userNode)-[:IN_FACULTY_OF]->(facultyNode)"""
        await database.run(faculty_relationship_query)

        return {"user_id": user_next_id, "message": "User created successfully"}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@userRouter.post("/register/tokens/{user_id}", response_model=RegisterTokenResponse)
@requires_auth
async def register_tokens(
    request: Request,
    user_id: int = Path(...,description="The user's ID", example=1234),
    database: Database = Depends(get_database),
    api_token = Security(api_token_header),
    notification_token = Security(notification_token_header)
):
    try:
        validate_scope(token_scp,request)
        
        notification_token = request.headers.get('Notification')
        delete_query = f"""MATCH (tokenNode:Token) WHERE tokenNode.UserID = $user_id DETACH DELETE tokenNode"""
        delete_params = {"user_id": user_id}
        result = await database.query(delete_query, delete_params)
        if result is not None:
            return {"message": "Tokens already registered"}
        
        register_query = f"""MERGE (tokenNode:Token {{UserID: $user_id, ExpoPushToken: $notification_token}}) WITH tokenNode
        MATCH (userNode:User) WHERE userNode.UserID = $user_id
        MERGE (userNode)-[:HAVE_TOKENS]->(tokenNode)"""
        register_params = {"user_id": user_id, "notification_token": notification_token}
        await database.run(register_query, register_params)
        return {"message": "Tokens registered successfully"}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@userRouter.get("/{user_id}", response_model=UserDetail)
@requires_auth
async def get_user(
    request: Request,
    user_id: int = Path(...,description="The ID of the user to retrieve"),
    database: Database = Depends(get_database),
    api_token = Security(api_token_header)
):
    try:
        validate_scope(token_scp,request)
        user_params = {"user_id": user_id}
        user_query = f"""MATCH (userNode:User) WHERE userNode.UserID = $user_id RETURN userNode"""
        result = await database.query(user_query, user_params)
        user_data = extract_user_data(result)
        return user_data
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))