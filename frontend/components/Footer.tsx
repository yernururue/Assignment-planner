import Link from "next/link";

const columns = [
    {
        title: "Product",
        links: [
            { label: "Features", href: "#features" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Pricing", href: "#pricing" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
            { label: "Contact", href: "#" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="border-t border-border py-16">
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex flex-col gap-12 md:flex-row md:justify-between">
                    {/* Logo + tagline */}
                    <div className="max-w-xs">
                        <Link href="/" className="font-serif text-xl tracking-tight">
                            AssignMind
                        </Link>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            AI-powered academic planning so you can focus on learning, not
                            stressing.
                        </p>
                    </div>

                    {/* Link columns */}
                    <div className="grid grid-cols-3 gap-8">
                        {columns.map((col) => (
                            <div key={col.title}>
                                <p className="mb-3 text-sm font-semibold">{col.title}</p>
                                <ul className="space-y-2">
                                    {col.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} AssignMind. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
