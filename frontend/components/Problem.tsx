const painPoints = [
    {
        title: "Underestimating complexity",
        description:
            "Most students eyeball how long an assignment will take and get it wrong. A \"quick paper\" turns into a 10-hour marathon.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
    },
    {
        title: "Last-minute panic",
        description:
            "Without a plan, everything piles up into the final 48 hours. Stress spikes, quality drops, and sleep disappears.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                <line x1="12" x2="12" y1="9" y2="13" />
                <line x1="12" x2="12.01" y1="17" y2="17" />
            </svg>
        ),
    },
    {
        title: "No visibility into workload",
        description:
            "You have five courses, twelve deadlines, and zero clarity on which week will bury you — until it's too late.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
                <path d="m2 2 20 20" />
            </svg>
        ),
    },
];

export default function Problem() {
    return (
        <section className="border-t border-border py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                {/* Heading */}
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <p className="mb-3 text-sm font-medium tracking-wider text-amber-accent uppercase">
                        The problem
                    </p>
                    <h2 className="font-serif text-3xl tracking-tight md:text-4xl">
                        Academic planning is broken
                    </h2>
                </div>

                {/* Pain points */}
                <div className="grid gap-8 md:grid-cols-3 md:gap-6">
                    {painPoints.map((point, i) => (
                        <div
                            key={i}
                            className="rounded-xl border border-border bg-card p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-amber-accent/10 text-amber-accent">
                                {point.icon}
                            </div>
                            <h3 className="text-lg font-semibold">{point.title}</h3>
                            <p className="mt-2 leading-relaxed text-muted-foreground">
                                {point.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
