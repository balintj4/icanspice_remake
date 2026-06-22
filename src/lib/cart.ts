"use server";
import { createClient } from "@/lib/server";

export async function getOrCreateCart(cartId?: string) {
  const supabase = await createClient();

  // 1. Ak máme ID, skúsime ho nájsť
  if (cartId) {
    const { data: cart } = await supabase
      .from("carts")
      .select("id")
      .eq("id", cartId)
      .single();
    if (cart) return cart.id;
  }

  const { data: newCart } = await supabase
    .from("carts")
    .insert({})
    .select()
    .single();

  return newCart.id;
}
