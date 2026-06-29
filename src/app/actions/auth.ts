"use server";

import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";

export type AuthState = { error: string | null };

export async function loginAction(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("login-pswd") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}

export async function registerAction(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient();
  const email = formData.get("reg-email") as string;
  const password = formData.get("reg-pswd") as string;
  const name = formData.get("reg-name") as string;
  const surname = formData.get("reg-surname") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
        surname: surname,
      },
    },
  });

  if (error) return { error: error.message };
  redirect("/login");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
