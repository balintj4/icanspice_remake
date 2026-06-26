// /lib/cart.ts
"use server";
import { createClient } from "@/lib/server";

export async function getOrCreateCart(cartId: string) {
  const supabase = await createClient();

  // 1. Skús nájsť
  const { data: cart } = await supabase
    .from("carts")
    .select("id")
    .eq("id", cartId)
    .single();
  if (cart) return cart.id;

  // 2. Ak neexistuje, vytvor
  const { data: newCart } = await supabase
    .from("carts")
    .insert({ id: cartId })
    .select()
    .single();
  return newCart.id;
}
