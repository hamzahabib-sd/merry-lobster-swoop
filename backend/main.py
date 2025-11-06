import os
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from pymongo import MongoClient
from auth import (
    create_access_token,
    get_password_hash,
    verify_password,
    oauth2_scheme,
    SECRET_KEY,
    ALGORITHM,
)
from models import User, UserInDB, Token, TokenData
from jose import JWTError, jwt
from datetime import timedelta
from pymongo.errors import ConnectionFailure
import restaurants
import chatbot

load_dotenv()

app = FastAPI()

# CORS Middleware
origins = [
    "http://localhost:5173",
    "https://merry-lobster-swoop.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# APIRouter
router = APIRouter(prefix="/api/v1")
auth_router = APIRouter(prefix="/api/v1/auth")
chatbot_router = APIRouter(prefix="/api/v1/chatbot")

from database import get_db

@auth_router.post("/signup", response_model=User)
def signup(user: User, db=Depends(get_db)):
    db_user = db.users.find_one({"email": user.email})
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    hashed_password = get_password_hash(user.password)
    user_in_db = UserInDB(**user.dict(), hashed_password=hashed_password)
    db.users.insert_one(user_in_db.dict())
    return user

@auth_router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db=Depends(get_db)):
    user = db.users.find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@auth_router.post("/logout")
def logout():
    # This is a simple implementation. A more robust solution would involve token blacklisting.
    return {"message": "Successfully logged out"}

def get_current_user(token: str = Depends(oauth2_scheme), db=Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = db.users.find_one({"email": token_data.email})
    if user is None:
        raise credentials_exception
    return user

@auth_router.get("/me", response_model=User)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/")
def read_root():
    return {"message": "Server is running"}

@router.get("/healthz")
def health_check():
    try:
        # MongoDB connection
        client = MongoClient(os.getenv("MONGODB_URI"))
        # The ismaster command is cheap and does not require auth.
        client.admin.command('ismaster')
        return {"status": "ok", "database": "connected"}
    except ConnectionFailure:
        return {"status": "ok", "database": "disconnected"}

app.include_router(router)
app.include_router(auth_router)
app.include_router(restaurants.router)
app.include_router(chatbot.router, prefix="/api/v1/chatbot")