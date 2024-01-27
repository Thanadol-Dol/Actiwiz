from fastapi import APIRouter

activityRouter = APIRouter(
    prefix="/activities",
    tags=["activities"],
    responses={404: {"description": "Not found"}}
)

@activityRouter.get("/")
async def read_root():
    return {"message": "This is all activities"}

#Recommend activities

#Search for activities

#Select an activity

#Join an activity

#Leave an activity

#Activity evaluation

#New activity notification

#Club event notification