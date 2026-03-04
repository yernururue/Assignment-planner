import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AssignmentList } from "@/components/dashboard/AssignmentList";
import { SignOutButton } from "./sign-out-button";

export default async function DashboardPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: assignments } = await supabase
        .from("assignments")
        .select("*")
        .eq("user_id", user.id)
        .order("deadline", { ascending: true });

    return (
        <div className="min-h-screen">
            {/* Top bar */}
            <header className="border-b border-border">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                    <span className="font-serif text-lg tracking-tight">AssignMind</span>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">{user.email}</span>
                        <SignOutButton />
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="mx-auto max-w-6xl px-6 py-10">
                <DashboardHeader assignmentCount={assignments?.length ?? 0} />
                <AssignmentList assignments={assignments ?? []} />
            </main>
        </div>
    );
}
