from fastapi import APIRouter, Depends, HTTPException
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
SECRET = "SECRET_KEY"

@router.get("/me")
def get_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET)
        return {"username": payload["sub"], "full_name": "Yash Gautam", "email": "user@example.com"}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
