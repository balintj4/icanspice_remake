import { createClient, getUserSession } from "@/lib/server";

export async function getUserData() {
  const supabase = await createClient();

  const user = await getUserSession();
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", user?.id)
    .single();

  return data || [];
}
