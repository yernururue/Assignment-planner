from fastapi import APIRouter
from models import GeneratePlanRequest, GeneratePlanResponse
from services.groq_service import generate_plan

router = APIRouter(prefix="/ai", tags=["ai"])


@router.post("/generate-plan", response_model=GeneratePlanResponse)
async def generate_assignment_plan(request: GeneratePlanRequest):
    """
    Generate an AI-powered study plan for an assignment.
    Calls Groq API and returns structured JSON.
    Does not save to DB yet — just returns the AI response.
    """
    result = await generate_plan(
        title=request.title,
        description=request.description,
        deadline=request.deadline,
    )
    return result
