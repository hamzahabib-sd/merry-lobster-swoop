from pydantic import BaseModel, EmailStr
from typing import List, Optional

class MenuItem(BaseModel):
    id: str
    name: str
    description: str
    calories: int

class Restaurant(BaseModel):
    id: str
    name: str
    distance: int
    menu: List[MenuItem]

class RestaurantCreate(BaseModel):
    name: str
    cuisine: str
    location: str

class User(BaseModel):
    email: EmailStr
    password: str
    weight: Optional[int] = None
    height: Optional[int] = None
    age: Optional[int] = None
    fitness_goal: Optional[str] = None
    gender: Optional[str] = None
    dietary_preferences: Optional[List[str]] = None

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None


class HealthProfile(BaseModel):
    age: int
    weight: int
    height: int
    gender: str
    activity_level: Optional[str] = None
    dietary_preferences: Optional[List[str]] = None
    fitness_goal: Optional[str] = None

class ChatMessage(BaseModel):
    message: str