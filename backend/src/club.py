from fastapi import APIRouter

clubRouter = APIRouter(
    prefix="/clubs",
    tags=["clubs"],
    responses={404: {"description": "Not found"}}
)

@clubRouter.get("/")
async def read_root():
    return {"message": "This is all clubs"}

#Recommend clubs

#Search for clubs

#Select an club

#Join an club

#Leave an club