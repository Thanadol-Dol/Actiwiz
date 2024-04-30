from fastapi import APIRouter, Request, HTTPException, Depends, Path
from ..models.user_model import UserDetail
from msal import ConfidentialClientApplication
from ..utils.database import Database, get_database
from fastapi_microsoft_identity import requires_auth, AuthError, validate_scope
import os, requests
from ..utils.user_util import extract_user_data, get_user_next_id

userRouter = APIRouter(
    prefix="/users",
    tags=["users"],
)

auth_app = ConfidentialClientApplication(
    client_id=os.environ.get('AZURE_AD_CLIENT_ID'),
    client_credential=os.environ.get('AZURE_AD_CREDENTIAL'),
    authority=os.environ.get('AZURE_AD_AUTHORITY'),
)

api_scopes = []
api_scopes.append(os.environ.get('AZURE_AD_SCOPES'))
graph_scopes = ["User.Read","User.ReadBasic.All"]
token_scp = os.environ.get('AZURE_AD_ACCESS_TOKEN_SCP')

@userRouter.get("/auth/url")
async def user_login(request: Request):
    auth_url = auth_app.get_authorization_request_url(
        scopes=api_scopes + graph_scopes,
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

@userRouter.get("/auth/refresh/graph_token")
async def refresh_api_token(request: Request):
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

@userRouter.get("/login")
@requires_auth
async def user_login(
    request: Request,
    database: Database = Depends(get_database)
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
    
@userRouter.get("/logout/{user_id}")
@requires_auth
async def user_logout(
    request: Request,
    user_id: int = Path(...,description="The ID of the user to retrieve"),
    database: Database = Depends(get_database)
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

@userRouter.post("/create")
@requires_auth
async def create_user(
    request: Request,
    user: UserDetail,
    database: Database = Depends(get_database)
):
    try:
        validate_scope(token_scp,request)
        
        user_next_id = await get_user_next_id()
        new_user = user.model_dump()
        new_user['UserID'] = user_next_id
        user_params = {"user_params": new_user}
        user_query = f"""MERGE (userNode:User $user_params)"""
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

        return {"message": "User created successfully"}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@userRouter.post("/register/tokens/{user_id}")
@requires_auth
async def register_tokens(
    request: Request,
    user_id: int = Path(...,description="The ID of the user to retrieve"),
    database: Database = Depends(get_database)
):
    try:
        validate_scope(token_scp,request)
        
        notification_token = request.headers.get('Notification')
        token_params = {"user_id": user_id, "notification_token": notification_token}
        search_query = f"""MATCH (tokenNode:Token) WHERE tokenNode.UserID = $user_id AND tokenNode.ExpoPushToken = $notification_token
        RETURN tokenNode"""
        result = await database.query(search_query, token_params)
        if result is not None:
            return {"message": "Tokens already registered"}
        
        register_query = f"""MERGE (tokenNode:Token {{UserID: $user_id, ExpoPushToken: $notification_token}}) WITH tokenNode
        MATCH (userNode:User) WHERE userNode.UserID = $user_id
        MERGE (userNode)-[:HAVE_TOKENS]->(tokenNode)"""
        await database.run(register_query, token_params)
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
    database: Database = Depends(get_database)
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