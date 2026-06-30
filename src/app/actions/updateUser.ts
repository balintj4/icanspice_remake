"use server";

import { createAdminClient } from "@/lib/admin";
import { refresh, revalidatePath } from "next/cache";

export async function processUpdateGeneral(prevState: any, formData: FormData) {
  const supabase = await createAdminClient();

  const updates: Record<string, any> = {
    name: formData.get("general-settings-name"),
    surname: formData.get("general-settings-surname"),
    email: formData.get("general-settings-email"),
    phone: formData.get("general-settings-tel"),
  };

  const filteredUpdates = Object.fromEntries(
    Object.entries(updates).filter(([_, value]) => value && value !== ""),
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Neprihlásený" };

  const { error: publicError } = await supabase
    .from("users")
    .update(filteredUpdates)
    .eq("id", user.id);

  if (publicError) return { error: publicError.message };

  if (filteredUpdates.email) {
    const { error: authError } = await supabase.auth.admin.updateUserById(
      user.id,
      {
        email: filteredUpdates.email,
      },
    );
    if (authError) return { error: authError.message };
  }

  const newPswd = formData.get("general-settings-newPswd") as string;
  const currentPassword = formData.get("general-settings-pswd") as string;
  console.log(newPswd);
  console.log(currentPassword);

  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: currentPassword,
  });

  if (verifyError) return { error: "Aktuálne heslo je nesprávne." };

  if (newPswd) {
    const { error: pswdError } = await supabase.auth.admin.updateUserById(
      user.id,
      {
        password: newPswd,
      },
    );
    if (pswdError) return { error: pswdError.message };
  }

  refresh();
  return { error: null };
}
