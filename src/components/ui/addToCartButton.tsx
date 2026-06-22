import { createClient } from "@/lib/server";
import { cookies } from "next/headers";
import { ToCartButtonClient } from "../clients/addToCartButtonClient";

export default async function ToCartButton({
  productId,
  path,
}: {
  productId: number;
  path: string;
}) {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cart_id")?.value;

  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cartId)
    .eq("product_id", productId)
    .single();

  if (!existingItem) {
    return (
      <ToCartButtonClient count={0} productID={productId} validatePath={path} />
    );
  }

  return (
    <ToCartButtonClient
      count={existingItem?.quantity}
      productID={productId}
      validatePath={path}
    />
  );
}
