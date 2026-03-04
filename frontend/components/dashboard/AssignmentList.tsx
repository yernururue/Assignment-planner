import { AssignmentCard } from "./AssignmentCard";

interface Assignment {
    id: string;
    title: string;
    description: string | null;
    deadline: string;
    difficulty_score: number | null;
    estimated_hours: number | null;
    created_at: string;
}

interface AssignmentListProps {
    assignments: Assignment[];
}

export function AssignmentList({ assignments }: AssignmentListProps) {
    // Sort by deadline ascending (soonest first)
    const sorted = [...assignments].sort(
        (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    );

    if (assignments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24">
                {/* Empty state illustration */}
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-secondary">
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                    >
                        <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" />
                        <path d="M15 3v4a2 2 0 0 0 2 2h4" />
                        <path d="M12 11v6" />
                        <path d="M9 14h6" />
                    </svg>
                </div>
                <h3 className="font-serif text-lg">No assignments yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    Add your first one to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((assignment) => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
        </div>
    );
}
