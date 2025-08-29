from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    version="1.0.1",
    docs_url="/",
    redoc_url="/redoc",
)

# Allow React frontend to call API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/hello")
def hello():
    return {"message": "Hello from FastAPI in Docker using AWS EC2!"}

@app.get("/api/cricket-table")
def cricket_table():
    """
    table to display cricket player's stats
    """
    tab_data = [
        {"name": "Player 1", "matches": 10, "runs": 500, "wickets": 5},
        {"name": "Player 2", "matches": 12, "runs": 600, "wickets": 8},
        {"name": "Player 3", "matches": 8, "runs": 300, "wickets": 2},
    ]
    return {"data": tab_data}