"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
    createAssignment as apiCreateAssignment,
    deleteAssignment as apiDeleteAssignment,
} from "@/lib/api";

export async function addAssignment(formData: FormData) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Not authenticated" };
    }

    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || null;
    const deadline = formData.get("deadline") as string;

    if (!title || !title.trim()) {
        return { error: "Title is required" };
    }

    if (!deadline) {
        return { error: "Deadline is required" };
    }

    try {
        await apiCreateAssignment({
            user_id: user.id,
            title: title.trim(),
            description: description?.trim() || null,
            deadline,
        });
    } catch {
        return { error: "Could not connect to server" };
    }

    revalidatePath("/dashboard");
    return { success: true };
}

export async function removeAssignment(id: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Not authenticated" };
    }

    try {
        await apiDeleteAssignment(id);
    } catch {
        return { error: "Could not connect to server" };
    }

    revalidatePath("/dashboard");
    return { success: true };
}
