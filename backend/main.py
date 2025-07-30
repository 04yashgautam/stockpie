from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import auth, users
import uvicorn
from app import chart



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(chart.router)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)