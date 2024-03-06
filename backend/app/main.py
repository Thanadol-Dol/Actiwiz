# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .user import userRouter
from .activity import activityRouter
from .club import clubRouter

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