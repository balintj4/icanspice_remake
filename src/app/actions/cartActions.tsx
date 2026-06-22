"use server";
import { createClient } from "@/lib/server";

export async function updateCartItem(
  cartId: string,
  productId: number,
  change: number,
) {
  const supabase = await createClient();

  // 1. Kontrola, či produkt v košíku existuje
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cartId)
    .eq("product_id", productId)
    .single();

  if (existingItem) {
    const newQuantity = existingItem.quantity + change;
    if (newQuantity <= 0) {
      await supabase.from("cart_items").delete().eq("id", existingItem.id);
    } else {
      await supabase
        .from("cart_items")
        .update({ quantity: newQuantity })
        .eq("id", existingItem.id);
    }
  } else if (change > 0) {
    await supabase
      .from("cart_items")
      .insert({ cart_id: cartId, product_id: productId, quantity: change });
  }
}
