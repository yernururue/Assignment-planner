const features = [
    {
        title: "AI difficulty scoring",
        description:
            "Every assignment is scored for complexity so you can prioritize effectively and avoid nasty surprises the night before.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20v-6M6 20V10M18 20V4" />
            </svg>
        ),
    },
    {
        title: "Auto subtask breakdown",
        description:
            "Paste your assignment and AI instantly generates a clear list of subtasks — each with a time estimate you can trust.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" />
                <path d="M15 3v4a2 2 0 0 0 2 2h4" />
                <path d="m9 15 2 2 4-4" />
            </svg>
        ),
    },
    {
        title: "Deadline warnings",
        description:
            "Get notified when your workload is stacking up or a deadline is approaching faster than your plan allows.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
        ),
    },
    {
        title: "Weekly workload view",
        description:
            "See your entire week at a glance — hours committed per day, open slots, and how much breathing room you have left.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M16 2v4" />
                <path d="M8 2v4" />
                <path d="M3 10h18" />
                <path d="M8 14h.01" />
                <path d="M12 14h.01" />
                <path d="M16 14h.01" />
                <path d="M8 18h.01" />
                <path d="M12 18h.01" />
                <path d="M16 18h.01" />
            </svg>
        ),
    },
];

export default function Features() {
    return (
        <section id="features" className="border-t border-border py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                {/* Heading */}
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <p className="mb-3 text-sm font-medium tracking-wider text-amber-accent uppercase">
                        Features
                    </p>
                    <h2 className="font-serif text-3xl tracking-tight md:text-4xl">
                        Everything you need to plan smarter
                    </h2>
                </div>

                {/* Cards */}
                <div className="grid gap-6 sm:grid-cols-2">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="group rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-amber-accent/10 text-amber-accent">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold">{feature.title}</h3>
                            <p className="mt-2 leading-relaxed text-muted-foreground">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
