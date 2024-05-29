from pydantic import BaseModel, Field
from typing import Optional

class AuthUrlResponse(BaseModel):
    auth_url: str = Field(..., 
        description="The URL to redirect to for authentication", 
        example="https://login.microsoftonline.com/..."
    )

class RefreshTokenResponse(BaseModel):
    refresh_token: str = Field(..., 
        description="The refresh token for the user", 
        example="0.AQABAAAAAAAm-06blBE1TpVMil8KPQ41KzZ2X6j9n1k3..."
    )

class RefreshAPITokenResponse(RefreshTokenResponse):
    api_token: str = Field(..., 
        description="The API token for the user", 
        example="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik5HVEZ2ZEstZnl0a..."
    )

class RefreshGraphTokenResponse(RefreshTokenResponse):
    graph_token: str = Field(..., 
        description="The Graph token for the user", 
        example="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik5HVEZ2ZEstZnl0a..."
    )

class AuthGetTokensResponse(RefreshAPITokenResponse):
    graph_token: str = Field(..., 
        description="The Graph token for the user", 
        example="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik5HVEZ2ZEstZnl0a..."
    )

class LoginResponse(BaseModel):
    login_success: bool = Field(..., 
        description="Whether the login was successful", 
        example=True
    ),
    user_id: int = Field(..., 
        description="The user's ID",
        example=1234
    )
    message: str = Field(..., 
        description="A status message", 
        example="User logged in successfully"
    )

class LogoutResponse(BaseModel):
    message: str = Field(..., 
        description="A status message", 
        example="User logged out successfully"
    )

class UserDetail(BaseModel):
    UserID: int = Field(...,
        description="The user's ID (This could be any number as real id will be calculated by backend system)",
        example=1234
    )
    StudentName: str = Field(...,
        description="The user's name",
        example="John Doe"
    )
    AcademicDegree: str = Field(...,
        description="The user's academic degree",
        example="ปริญญาตรี"
    )
    AcademicYear: int = Field(...,
        description="The user's academic year",
        example=4
    )
    AcademicEmail: str = Field(...,
        description="The user's academic email",
        example="John.Doe@mail.kmutt.ac.th"
    )
    Faculty: str = Field(...,
        description="The user's faculty",
        example="คณะวิศวกรรมศาสตร์"
    )
    Department: str = Field(...,
        description="The user's department",
        example="วิศวกรรมคอมพิวเตอร์"
    )

class CreateUserResponse(BaseModel):
    user_id: int = Field(..., 
        description="The user's ID",
        example=1234
    )
    message: str = Field(...,
        description="A status message", 
        example="User created successfully"
    )

class RegisterTokenResponse(BaseModel):
    message: str = Field(..., 
        description="A status message", 
        example="Token registered successfully"
    )