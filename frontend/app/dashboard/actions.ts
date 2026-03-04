"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

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

    const { error } = await supabase.from("assignments").insert({
        user_id: user.id,
        title: title.trim(),
        description: description?.trim() || null,
        deadline,
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/dashboard");
    return { success: true };
}
