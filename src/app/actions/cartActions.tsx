"use server";
import { createClient } from "@/lib/server";
import { revalidatePath } from "next/cache";

export async function updateCartItem(
  cartId: string,
  productId: number,
  change: number,
  validatePath: string = "/",
) {
  const supabase = await createClient();

  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cartId)
    .eq("product_id", productId)
    .single();

  if (existingItem) {
    const newQuantity = existingItem.quantity + change;
    await supabase
      .from("carts")
      .update({ updated_at: "now()" })
      .eq("id", cartId);

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
  revalidatePath(validatePath, "layout");
}
