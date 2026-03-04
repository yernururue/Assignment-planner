"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    async function handleSignIn() {
        setLoading(true);
        setError(null);
        setMessage(null);

        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        router.push("/dashboard");
        router.refresh();
    }

    async function handleSignUp() {
        setLoading(true);
        setError(null);
        setMessage(null);

        const supabase = createClient();
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        setMessage("Check your email for a confirmation link.");
        setLoading(false);
    }

    function resetState() {
        setError(null);
        setMessage(null);
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6">
            {/* Back link */}
            <div className="mb-12 text-center">
                <Link href="/" className="font-serif text-2xl tracking-tight">
                    AssignMind
                </Link>
            </div>

            {/* Auth card */}
            <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm">
                <Tabs defaultValue="signin" onValueChange={resetState}>
                    <TabsList className="mb-6 grid w-full grid-cols-2">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    {/* Sign In */}
                    <TabsContent value="signin">
                        <div className="space-y-4">
                            <h2 className="font-serif text-xl">Welcome back</h2>
                            <p className="text-sm text-muted-foreground">
                                Sign in to your account to continue.
                            </p>

                            <div className="space-y-2">
                                <Label htmlFor="signin-email">Email</Label>
                                <Input
                                    id="signin-email"
                                    type="email"
                                    placeholder="you@university.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="signin-password">Password</Label>
                                <Input
                                    id="signin-password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-destructive">{error}</p>
                            )}

                            <Button
                                onClick={handleSignIn}
                                disabled={loading}
                                className="w-full bg-amber-accent text-white hover:bg-amber-accent-hover"
                            >
                                {loading ? "Signing in…" : "Sign In"}
                            </Button>
                        </div>
                    </TabsContent>

                    {/* Sign Up */}
                    <TabsContent value="signup">
                        <div className="space-y-4">
                            <h2 className="font-serif text-xl">Create an account</h2>
                            <p className="text-sm text-muted-foreground">
                                Start planning smarter — it&apos;s free.
                            </p>

                            <div className="space-y-2">
                                <Label htmlFor="signup-email">Email</Label>
                                <Input
                                    id="signup-email"
                                    type="email"
                                    placeholder="you@university.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="signup-password">Password</Label>
                                <Input
                                    id="signup-password"
                                    type="password"
                                    placeholder="At least 6 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-destructive">{error}</p>
                            )}
                            {message && (
                                <p className="text-sm text-amber-accent">{message}</p>
                            )}

                            <Button
                                onClick={handleSignUp}
                                disabled={loading}
                                className="w-full bg-amber-accent text-white hover:bg-amber-accent-hover"
                            >
                                {loading ? "Creating account…" : "Sign Up"}
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
                By continuing you agree to our{" "}
                <Link href="#" className="underline hover:text-foreground">
                    Terms
                </Link>{" "}
                and{" "}
                <Link href="#" className="underline hover:text-foreground">
                    Privacy Policy
                </Link>
                .
            </p>
        </div>
    );
}
