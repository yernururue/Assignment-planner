"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddAssignmentModal } from "./AddAssignmentModal";

interface DashboardHeaderProps {
    assignmentCount: number;
}

export function DashboardHeader({ assignmentCount }: DashboardHeaderProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="font-serif text-3xl tracking-tight md:text-4xl">
                    My Assignments
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    {assignmentCount === 0
                        ? "No assignments yet"
                        : `${assignmentCount} assignment${assignmentCount !== 1 ? "s" : ""}`}
                </p>
            </div>
            <Button
                onClick={() => setOpen(true)}
                className="bg-amber-accent text-white hover:bg-amber-accent-hover"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                >
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                </svg>
                Add Assignment
            </Button>
            <AddAssignmentModal open={open} onOpenChange={setOpen} />
        </div>
    );
}
