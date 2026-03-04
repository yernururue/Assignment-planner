const steps = [
    {
        number: "01",
        title: "Paste your assignment",
        description:
            "Drop in the assignment brief, syllabus link, or just describe what's due. AssignMind takes it from there.",
    },
    {
        number: "02",
        title: "AI analyzes it",
        description:
            "Our AI scores difficulty, estimates time, and breaks the work into clear, actionable subtasks automatically.",
    },
    {
        number: "03",
        title: "Get a day-by-day plan",
        description:
            "Receive a personalized schedule that fits your deadlines and workload — no more guessing, no more cramming.",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                {/* Heading */}
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <p className="mb-3 text-sm font-medium tracking-wider text-amber-accent uppercase">
                        How it works
                    </p>
                    <h2 className="font-serif text-3xl tracking-tight md:text-4xl">
                        Three steps to academic clarity
                    </h2>
                </div>

                {/* Steps */}
                <div className="grid gap-8 md:grid-cols-3 md:gap-6">
                    {steps.map((step, i) => (
                        <div key={i} className="relative text-center md:text-left">
                            {/* Connector line (desktop) */}
                            {i < steps.length - 1 && (
                                <div className="absolute top-6 left-[calc(50%+2rem)] hidden h-px w-[calc(100%-4rem)] bg-border md:block" />
                            )}

                            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border text-sm font-semibold text-amber-accent">
                                {step.number}
                            </span>
                            <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                            <p className="mt-2 leading-relaxed text-muted-foreground">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
