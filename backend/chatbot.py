from fastapi import APIRouter, Depends, HTTPException
from models import HealthProfile, ChatMessage, User
from auth import oauth2_scheme
from database import get_db
from jose import jwt
from auth import SECRET_KEY, ALGORITHM
from pymongo.database import Database

router = APIRouter()

@router.put("/profile")
async def save_health_profile(profile: HealthProfile, db: Database = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except jwt.JWTError:
        raise credentials_exception
    
    db.users.find_one_and_update(
        {"email": email},
        {"$set": profile.dict(exclude_unset=True)},
        upsert=True
    )
    
    return {"message": "Health profile saved successfully"}

@router.get("/profile")
async def get_health_profile(db: Database = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except jwt.JWTError:
        raise credentials_exception
    
    user = db.users.find_one({"email": email})
    
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Return only the profile fields
    profile_data = {
        "weight": user.get("weight"),
        "height": user.get("height"),
        "age": user.get("age"),
        "fitness_goal": user.get("fitness_goal"),
        "gender": user.get("gender"),
        "dietary_preferences": user.get("dietary_preferences"),
    }
    return profile_data


@router.post("/")
async def chat_with_bot(message: ChatMessage):
    return {"response": "Based on your health profile, I recommend looking for meals high in protein and low in carbohydrates."}