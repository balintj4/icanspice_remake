import { createClient } from "@/lib/server";
import { cookies } from "next/headers";

export async function getCartItems() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cart_id")?.value;
  const supabase = await createClient();

  if (!cartId) return [];

  const { data } = await supabase
    .from("cart_items")
    .select("id, product_id")
    .eq("cart_id", cartId);

  return data || [];
}
