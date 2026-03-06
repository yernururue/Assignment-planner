from fastapi import APIRouter, HTTPException, status
from models import AssignmentCreate, AssignmentUpdate
from database import get_db

router = APIRouter(prefix="/assignments", tags=["assignments"])


@router.get("/")
async def get_assignments(user_id: str):
    """Fetch all assignments for a given user."""
    db = get_db()
    response = (
        db.table("assignments")
        .select("*")
        .eq("user_id", user_id)
        .order("deadline", desc=False)
        .execute()
    )
    return response.data


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_assignment(assignment: AssignmentCreate):
    """Create a new assignment."""
    db = get_db()
    response = (
        db.table("assignments")
        .insert(assignment.model_dump())
        .execute()
    )
    return response.data[0]


@router.delete("/{assignment_id}")
async def delete_assignment(assignment_id: str):
    """Delete an assignment by ID."""
    db = get_db()
    response = (
        db.table("assignments")
        .delete()
        .eq("id", assignment_id)
        .execute()
    )
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assignment not found",
        )
    return {"message": "Assignment deleted"}


@router.patch("/{assignment_id}")
async def update_assignment(assignment_id: str, assignment: AssignmentUpdate):
    """Update an assignment's title, description, or deadline."""
    # Only include fields that were actually provided
    update_data = assignment.model_dump(exclude_unset=True)
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields to update",
        )

    db = get_db()
    response = (
        db.table("assignments")
        .update(update_data)
        .eq("id", assignment_id)
        .execute()
    )
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assignment not found",
        )
    return response.data[0]


@router.get("/{assignment_id}/tasks")
async def get_assignment_tasks(assignment_id: str):
    """Fetch all tasks for an assignment, ordered by order_index."""
    db = get_db()
    response = (
        db.table("tasks")
        .select("*")
        .eq("assignment_id", assignment_id)
        .order("order_index", desc=False)
        .execute()
    )
    return response.data
