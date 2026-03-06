// ─── API Client ─────────────────────────────────────────────
// Single source of truth for all backend API calls.
// Base URL comes from NEXT_PUBLIC_API_URL environment variable.
// ────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ─── Types (mirror backend Pydantic models) ────────────────

export interface AssignmentCreate {
    title: string;
    description?: string | null;
    deadline: string;
    user_id: string;
}

export interface AssignmentUpdate {
    title?: string;
    description?: string;
    deadline?: string;
}

export interface SubTask {
    title: string;
    estimated_hours: number;
    suggested_day_offset: number;
}

export interface GeneratePlanRequest {
    assignment_id: string;
    title: string;
    description?: string | null;
    deadline: string;
}

export interface GeneratePlanResponse {
    difficulty_score: number;
    estimated_hours: number;
    reasoning: string;
    subtasks: SubTask[];
}

export interface Assignment {
    id: string;
    user_id: string;
    title: string;
    description: string | null;
    deadline: string;
    difficulty_score: number | null;
    estimated_hours: number | null;
    created_at: string;
}

// ─── API Functions ─────────────────────────────────────────

export async function createAssignment(
    data: AssignmentCreate
): Promise<Assignment> {
    const res = await fetch(`${BASE_URL}/assignments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const detail = await res.text();
        throw new Error(`Failed to create assignment: ${detail}`);
    }
    return res.json();
}

export async function getAssignments(userId: string): Promise<Assignment[]> {
    const res = await fetch(
        `${BASE_URL}/assignments/?user_id=${encodeURIComponent(userId)}`
    );
    if (!res.ok) {
        const detail = await res.text();
        throw new Error(`Failed to fetch assignments: ${detail}`);
    }
    return res.json();
}

export async function deleteAssignment(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/assignments/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        const detail = await res.text();
        throw new Error(`Failed to delete assignment: ${detail}`);
    }
}

export async function updateAssignment(
    id: string,
    data: AssignmentUpdate
): Promise<Assignment> {
    const res = await fetch(`${BASE_URL}/assignments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const detail = await res.text();
        throw new Error(`Failed to update assignment: ${detail}`);
    }
    return res.json();
}

export async function generatePlan(
    data: GeneratePlanRequest
): Promise<GeneratePlanResponse> {
    const res = await fetch(`${BASE_URL}/ai/generate-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const detail = await res.text();
        throw new Error(`Failed to generate plan: ${detail}`);
    }
    return res.json();
}
