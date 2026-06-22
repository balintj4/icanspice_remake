import { supabase } from "@/lib/supabase";
import { getSupabaseServer as createClient } from "@/lib/supabase";
import { ToCartButtonClient } from "./addToCartButtonClient";

export default async function ToCartButton(productId: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Neautorizovaný prístup");

  let { data: cart, error: cartError } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!cart) {
    throw new Error("Nepodarilo sa získať ani vytvoriť košík");
  }

  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cart.id)
    .eq("product_id", productId)
    .single();

  return <ToCartButtonClient count={existingItem?.quantity} />;
}
