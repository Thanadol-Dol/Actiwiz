# main.py
from fastapi import FastAPI, HTTPException
from neo4j import GraphDatabase
from .user import userRouter
from .activity import activityRouter
from .club import clubRouter

app = FastAPI()

app.include_router(userRouter)
app.include_router(activityRouter)
app.include_router(clubRouter)