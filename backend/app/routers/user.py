from fastapi import APIRouter, Request, HTTPException
from ..models.user_model import UserDetail, UserLogin
from msal import ConfidentialClientApplication
import os

userRouter = APIRouter(
    prefix="/users",
    tags=["users"],
)

auth_app = ConfidentialClientApplication(
    client_id=os.environ.get('AZURE_AD_CLIENT_ID'),
    client_credential=os.environ.get('AZURE_AD_CREDENTIAL'),
    authority=os.environ.get('AZURE_AD_AUTHORITY'),
)

scopes = []
scopes.append(os.environ.get('AZURE_AD_SCOPES'))

#User login
@userRouter.get("/login")
async def user_login(request: Request):
    auth_url = auth_app.get_authorization_request_url(
        scopes=scopes,
        redirect_uri=os.environ.get('AZURE_AD_REDIRECT_URI'),
    )
    return {"auth_url": auth_url}

@userRouter.get("/auth/callback")
async def auth_callback(request: Request, code: str):
    result = auth_app.acquire_token_by_authorization_code(
        code,
        scopes=scopes,
        redirect_uri=os.environ.get('AZURE_AD_REDIRECT_URI'),
    )
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error_description"])

    access_token = result["access_token"]
    # Now you can use the access token to make requests to protected resources
    return {"access_token": access_token}