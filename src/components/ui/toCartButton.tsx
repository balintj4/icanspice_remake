import { createClient } from "@/lib/server";
import { cookies } from "next/headers";
import { ToCartButtonClient } from "../clients/toCartButtonClient";

const variantsDefault = {
  default: {
    container: "w-40 h-8 mx-auto",
    buttonVariant: "default",
  } as const,
  ghost: {
    container: "invisible",
    buttonVariant: "default",
  } as const,
};

const variantsActive = {
  default: {
    removeButton: "text-lg",
    text: "text-secondary text-lg font-mono",
    addButton: "text-xl",
    container:
      "w-40 h-8 flex flex-row justify-between items-center bg-chart-5 mx-auto",
    buttonVariant: "default",
  } as const,
  cartDropdown: {
    removeButton: "text-lg rounded-full",
    text: "text-md font-mono",
    addButton: "text-xl rounded-full",
    container:
      "w-18 h-8 flex flex-row justify-between items-center pb-2 text-muted-foreground",
    buttonVariant: "ghost",
  } as const,
};

export default async function ToCartButton({
  productId,
  path,
  variantDefault = "default",
  variantActive = "default",
}: {
  productId: number;
  path: string;
  variantDefault?: keyof typeof variantsDefault;
  variantActive?: keyof typeof variantsActive;
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
      <ToCartButtonClient
        count={0}
        productID={productId}
        validatePath={path}
        variantDefault={variantsDefault[variantDefault]}
        variantActive={variantsActive[variantActive]}
      />
    );
  }

  return (
    <ToCartButtonClient
      count={existingItem?.quantity}
      productID={productId}
      validatePath={path}
      variantDefault={variantsDefault[variantDefault]}
      variantActive={variantsActive[variantActive]}
    />
  );
}
