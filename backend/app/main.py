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
        {"name": "Virat Kohli", "jersey_no": 18, "runs": 973, "wickets": 0},
        {"name": "AB de Villiers", "jersey_no": 17, "runs": 600, "wickets": 0}
    ]
    return {"data": tab_data}
