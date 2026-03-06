from pydantic import BaseModel
from typing import Optional


class AssignmentCreate(BaseModel):
    title: str
    description: Optional[str] = None
    deadline: str  # ISO date string, e.g. "2026-03-15"
    user_id: str


class AssignmentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[str] = None


class SubTask(BaseModel):
    title: str
    estimated_hours: float
    suggested_day_offset: int


class GeneratePlanRequest(BaseModel):
    assignment_id: str
    title: str
    description: Optional[str] = None
    deadline: str


class GeneratePlanResponse(BaseModel):
    difficulty_score: int
    estimated_hours: float
    reasoning: str
    subtasks: list[SubTask]
