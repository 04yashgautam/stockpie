from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from jose import jwt
from passlib.hash import bcrypt
import time


SECRET = "SECRET_KEY"

router = APIRouter()

fake_user = {
    "username": "user",
    "password": bcrypt.hash("pass123"),
    "name": "Yash Gautam"
}

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(data: LoginRequest):
    if data.username != fake_user["username"] or not bcrypt.verify(data.password, fake_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = jwt.encode({"sub": data.username, "exp": time.time() + 3600}, SECRET)
    return {"access_token": token}
