from fastapi import APIRouter

userRouter = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}}
)

@userRouter.get("/")
async def read_root():
    return {"message": "This is all users"}

#User login

#Create a new user

#Get user info

#User logout