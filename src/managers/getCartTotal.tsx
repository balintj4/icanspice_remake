import { createClient } from "@/lib/server";

export async function getCartTotalValue(cartId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_cart_total", {
    input_cart_id: cartId,
  });
  console.log(error);

  if (error) return 0;
  return data[0]?.total_sum || 0;
}
