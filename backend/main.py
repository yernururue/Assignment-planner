from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import assignments, ai, tasks

# FastAPI auto-generates interactive API docs at http://localhost:8000/docs
app = FastAPI(
    title="AssignMind API",
    description="AI-powered academic assignment planner backend",
    version="0.1.0",
)

# CORS — allow requests from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(assignments.router)
app.include_router(ai.router)
app.include_router(tasks.router)


@app.get("/")
async def root():
    return {"message": "AssignMind API is running"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
