import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTA() {
    return (
        <section className="py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-serif text-3xl tracking-tight md:text-4xl">
                        Ready to take control of your semester?
                    </h2>
                    <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
                        Join thousands of students who plan smarter — not harder.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="mt-8 bg-amber-accent text-white hover:bg-amber-accent-hover"
                    >
                        <Link href="/login">Start free, no credit card</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
