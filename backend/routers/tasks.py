from fastapi import APIRouter, HTTPException, status
from models import TaskStatusUpdate
from database import get_db

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.patch("/{task_id}")
async def update_task_status(task_id: str, body: TaskStatusUpdate):
    """Update a task's status (pending or done)."""
    if body.status not in ("pending", "done"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Status must be 'pending' or 'done'",
        )

    db = get_db()
    response = (
        db.table("tasks")
        .update({"status": body.status})
        .eq("id", task_id)
        .execute()
    )
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found",
        )
    return response.data[0]
