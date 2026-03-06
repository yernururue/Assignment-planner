"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format, differenceInCalendarDays } from "date-fns";
import { toast } from "sonner";
import {
    deleteAssignment,
    generatePlan,
    type GeneratePlanResponse,
} from "@/lib/api";
import { removeAssignment } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";

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
        label = `${Math.abs(daysRemaining)} days overdue`;
    } else if (daysRemaining === 0) {
        color = "text-red-500";
        label = "Due today";
    } else if (daysRemaining <= 2) {
        color = "text-red-500";
        label = `in ${daysRemaining} days`;
    } else if (daysRemaining <= 6) {
        color = "text-amber-accent";
        label = `in ${daysRemaining} days`;
    } else {
        color = "text-emerald-600 dark:text-emerald-400";
        label = `in ${daysRemaining} days`;
    }

    return { color, label, daysRemaining };
}

export function AssignmentCard({ assignment }: AssignmentCardProps) {
    const router = useRouter();
    const [expanded, setExpanded] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [plan, setPlan] = useState<GeneratePlanResponse | null>(null);

    const deadlineDate = new Date(assignment.deadline + "T00:00:00");
    const { color, label } = getDeadlineInfo(assignment.deadline);

    async function handleDelete(e: React.MouseEvent) {
        e.stopPropagation();
        setDeleting(true);
        try {
            const result = await removeAssignment(assignment.id);
            if (result.error) {
                toast.error(result.error);
            }
        } catch {
            toast.error("Could not connect to server");
        } finally {
            setDeleting(false);
        }
    }

    async function handleGeneratePlan(e: React.MouseEvent) {
        e.stopPropagation();
        setGenerating(true);
        try {
            const result = await generatePlan({
                assignment_id: assignment.id,
                title: assignment.title,
                description: assignment.description,
                deadline: assignment.deadline,
            });
            setPlan(result);
        } catch {
            toast.error("AI generation failed, try again");
        } finally {
            setGenerating(false);
        }
    }

    return (
        <div className="group relative w-full rounded-xl border border-border bg-card p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Delete button — visible on hover */}
            <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="absolute right-3 top-3 rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                title="Delete assignment"
            >
                {deleting ? (
                    <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M21 12a9 9 0 1 1-6.22-8.56" />
                    </svg>
                ) : (
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                )}
            </button>

            {/* Clickable card body */}
            <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="w-full text-left"
            >
                {/* Top row */}
                <div className="flex items-start justify-between gap-3 pr-8">
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
                    {format(deadlineDate, "MMM d")}
                </p>

                {/* Description preview */}
                {assignment.description && (
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {assignment.description}
                    </p>
                )}
            </button>

            {/* Expanded area */}
            {expanded && (
                <div className="mt-4 rounded-lg bg-secondary px-4 py-4 text-sm">
                    {plan ? (
                        /* AI plan result */
                        <div className="space-y-3">
                            {/* Summary bar */}
                            <div className="flex items-center gap-4 text-xs">
                                <span className="rounded-full bg-amber-accent/15 px-2.5 py-0.5 font-medium text-amber-accent">
                                    Difficulty: {plan.difficulty_score}/10
                                </span>
                                <span className="text-muted-foreground">
                                    ~{plan.estimated_hours}h total
                                </span>
                            </div>

                            {/* Reasoning */}
                            <p className="text-xs italic text-muted-foreground">
                                {plan.reasoning}
                            </p>

                            {/* Subtasks list */}
                            <ul className="space-y-1.5">
                                {plan.subtasks.map((task, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2"
                                    >
                                        <span className="text-sm text-card-foreground">
                                            {task.title}
                                        </span>
                                        <span className="shrink-0 text-xs text-muted-foreground">
                                            {task.estimated_hours}h
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        /* Generate plan prompt */
                        <div className="flex flex-col items-center gap-3 py-2">
                            <p className="flex items-center gap-2 text-xs text-muted-foreground">
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
                                No tasks yet — generate a plan
                            </p>
                            <Button
                                size="sm"
                                onClick={handleGeneratePlan}
                                disabled={generating}
                                className="bg-amber-accent text-white hover:bg-amber-accent-hover"
                            >
                                {generating ? (
                                    <span className="flex items-center gap-2">
                                        <svg
                                            className="h-3.5 w-3.5 animate-spin"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M21 12a9 9 0 1 1-6.22-8.56" />
                                        </svg>
                                        Generating…
                                    </span>
                                ) : (
                                    "Generate Plan"
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
