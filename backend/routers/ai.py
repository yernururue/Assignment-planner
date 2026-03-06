from datetime import date, timedelta
from fastapi import APIRouter
from models import GeneratePlanRequest, GeneratePlanResponse
from services.groq_service import generate_plan
from database import get_db

router = APIRouter(prefix="/ai", tags=["ai"])


@router.post("/generate-plan", response_model=GeneratePlanResponse)
async def generate_assignment_plan(request: GeneratePlanRequest):
    """
    Generate an AI-powered study plan for an assignment.
    Calls Groq API, saves results to DB, and returns structured JSON.
    """
    result = await generate_plan(
        title=request.title,
        description=request.description,
        deadline=request.deadline,
    )

    db = get_db()

    # Save difficulty_score and estimated_hours back to the assignment
    db.table("assignments").update({
        "difficulty_score": result["difficulty_score"],
        "estimated_hours": result["estimated_hours"],
    }).eq("id", request.assignment_id).execute()

    # Delete any existing tasks for this assignment (re-generating is safe)
    db.table("tasks").delete().eq("assignment_id", request.assignment_id).execute()

    # Insert all subtasks into the tasks table
    today = date.today()
    tasks_to_insert = []
    for i, subtask in enumerate(result["subtasks"]):
        due_date = (today + timedelta(days=subtask["suggested_day_offset"])).isoformat()
        tasks_to_insert.append({
            "assignment_id": request.assignment_id,
            "title": subtask["title"],
            "due_date": due_date,
            "status": "pending",
            "estimated_hours": subtask["estimated_hours"],
            "order_index": i,
        })

    if tasks_to_insert:
        db.table("tasks").insert(tasks_to_insert).execute()

    return result
