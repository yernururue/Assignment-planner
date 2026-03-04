import Link from "next/link";
import { Button } from "@/components/ui/button";

/* ── Fake product mockup card ─────────────────── */
function ProductMockup() {
    const subtasks = [
        { label: "Read chapters 5–7 of textbook", time: "1.5 hrs", done: true },
        { label: "Outline thesis & key arguments", time: "2 hrs", done: true },
        { label: "Write introduction paragraph", time: "1 hr", done: false },
        { label: "Draft body sections (3×)", time: "3 hrs", done: false },
        { label: "Cite sources & format bibliography", time: "1 hr", done: false },
    ];

    return (
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
            {/* Header */}
            <div className="mb-5 flex items-start justify-between">
                <div>
                    <p className="text-xs font-medium tracking-wider text-amber-accent uppercase">
                        CS 301 — Software Engineering
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-card-foreground">
                        Research Paper: Agile vs Waterfall
                    </h3>
                </div>
                <span className="rounded-full bg-amber-accent/15 px-3 py-1 text-xs font-medium text-amber-accent">
                    Medium
                </span>
            </div>

            {/* Meta row */}
            <div className="mb-5 flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></svg>
                    Due Mar 15
                </span>
                <span className="flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    ~8.5 hrs total
                </span>
            </div>

            {/* Progress */}
            <div className="mb-4">
                <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>2 / 5 tasks</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-secondary">
                    <div
                        className="h-1.5 rounded-full bg-amber-accent transition-all"
                        style={{ width: "40%" }}
                    />
                </div>
            </div>

            {/* Subtasks */}
            <ul className="space-y-2.5">
                {subtasks.map((task, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                        <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${task.done
                                    ? "border-amber-accent bg-amber-accent text-white"
                                    : "border-border"
                                }`}
                        >
                            {task.done && (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            )}
                        </span>
                        <span
                            className={
                                task.done
                                    ? "text-muted-foreground line-through"
                                    : "text-card-foreground"
                            }
                        >
                            {task.label}
                        </span>
                        <span className="ml-auto whitespace-nowrap text-xs text-muted-foreground">
                            {task.time}
                        </span>
                    </li>
                ))}
            </ul>

            {/* AI badge */}
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs text-muted-foreground">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4" /><path d="m6.34 6.34 2.83 2.83" /><path d="M2 12h4" /><path d="m6.34 17.66 2.83-2.83" /><path d="M12 18v4" /><path d="m17.66 17.66-2.83-2.83" /><path d="M18 12h4" /><path d="m17.66 6.34-2.83 2.83" /></svg>
                AI-generated subtasks · Estimated 4 days
            </div>
        </div>
    );
}

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:gap-20">
                    {/* Left — copy */}
                    <div className="max-w-xl text-center lg:text-left">
                        <h1 className="font-serif text-5xl leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
                            Stop guessing how long&nbsp;it&nbsp;takes.
                        </h1>
                        <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
                            AssignMind uses AI to analyze your assignments, break them into
                            manageable subtasks, and build a realistic day-by-day plan — so
                            you never pull an all-nighter again.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                            <Button
                                asChild
                                size="lg"
                                className="bg-amber-accent text-white hover:bg-amber-accent-hover"
                            >
                                <Link href="/login">Start for free</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="#how-it-works">See how it works</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right — product mockup */}
                    <div className="relative flex shrink-0 justify-center">
                        <div className="absolute -top-8 -right-8 h-64 w-64 rounded-full bg-amber-accent/5 blur-3xl" />
                        <ProductMockup />
                    </div>
                </div>
            </div>
        </section>
    );
}
