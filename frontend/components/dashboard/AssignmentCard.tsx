"use client";

import { useState } from "react";
import { format, differenceInCalendarDays } from "date-fns";

interface Assignment {
    id: string;
    title: string;
    description: string | null;
    deadline: string;
    difficulty_score: number | null;
    estimated_hours: number | null;
    created_at: string;
}

interface AssignmentCardProps {
    assignment: Assignment;
}

function getDeadlineInfo(deadline: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline + "T00:00:00");
    const daysRemaining = differenceInCalendarDays(deadlineDate, today);

    let color: string;
    let label: string;

    if (daysRemaining < 0) {
        color = "text-red-500";
        label = `${Math.abs(daysRemaining)}d overdue`;
    } else if (daysRemaining === 0) {
        color = "text-red-500";
        label = "Due today";
    } else if (daysRemaining <= 2) {
        color = "text-red-500";
        label = `in ${daysRemaining}d`;
    } else if (daysRemaining <= 6) {
        color = "text-amber-accent";
        label = `in ${daysRemaining}d`;
    } else {
        color = "text-emerald-600 dark:text-emerald-400";
        label = `in ${daysRemaining}d`;
    }

    return { color, label, daysRemaining };
}

export function AssignmentCard({ assignment }: AssignmentCardProps) {
    const [expanded, setExpanded] = useState(false);
    const deadlineDate = new Date(assignment.deadline + "T00:00:00");
    const { color, label } = getDeadlineInfo(assignment.deadline);

    return (
        <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="group w-full rounded-xl border border-border bg-card p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold leading-snug text-card-foreground">
                    {assignment.title}
                </h3>
                <span
                    className={`shrink-0 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium ${color}`}
                >
                    {label}
                </span>
            </div>

            {/* Deadline */}
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M16 2v4" />
                    <path d="M8 2v4" />
                    <path d="M3 10h18" />
                </svg>
                {format(deadlineDate, "MMM d, yyyy")}
            </p>

            {/* Description preview */}
            {assignment.description && (
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {assignment.description}
                </p>
            )}

            {/* Expanded area — tasks placeholder */}
            {expanded && (
                <div className="mt-4 rounded-lg bg-secondary px-4 py-3 text-xs text-muted-foreground">
                    <p className="flex items-center gap-2">
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 2v4" />
                            <path d="m6.34 6.34 2.83 2.83" />
                            <path d="M2 12h4" />
                            <path d="m6.34 17.66 2.83-2.83" />
                            <path d="M12 18v4" />
                            <path d="m17.66 17.66-2.83-2.83" />
                            <path d="M18 12h4" />
                            <path d="m17.66 6.34-2.83 2.83" />
                        </svg>
                        AI subtasks coming soon — this will show task breakdown once
                        generated.
                    </p>
                </div>
            )}
        </button>
    );
}
