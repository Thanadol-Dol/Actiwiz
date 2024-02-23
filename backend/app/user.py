from fastapi import APIRouter
from .models.user_model import UserDetail, UserLogin

userRouter = APIRouter(
    prefix="/users",
    tags=["users"],
)

#Create a new user
@userRouter.post("/register/")
async def user_register(user: UserDetail):
    return {"message": user.student_id}

#User login
@userRouter.post("/login/")
async def user_login(user: UserLogin):
    return {"message": user.academic_email}