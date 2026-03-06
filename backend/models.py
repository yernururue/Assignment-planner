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


class TaskResponse(BaseModel):
    id: str
    assignment_id: str
    title: str
    due_date: Optional[str] = None
    status: str
    estimated_hours: Optional[float] = None
    order_index: int


class TaskStatusUpdate(BaseModel):
    status: str  # "pending" or "done"
