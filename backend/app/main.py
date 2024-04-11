# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers.user import userRouter
from .routers.activity import activityRouter
from .routers.club import clubRouter
from fastapi_microsoft_identity import initialize
import os

initialize(
    tenant_id_=os.environ.get('AZURE_AD_TENANT_ID'), 
    client_id_=os.environ.get('AZURE_AD_CLIENT_ID')
)

app = FastAPI()

# CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(userRouter)
app.include_router(activityRouter)
app.include_router(clubRouter)