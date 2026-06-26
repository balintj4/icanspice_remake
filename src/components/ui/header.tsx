import { createClient } from "@/lib/server";
import { cookies } from "next/headers";
import { headers } from "next/headers";
import { HeaderClient } from "../clients/headerClient";
import { getCartItems } from "@/managers/getCartItems";
import ProductCard from "./productCard";
import { getCartTotalValue } from "@/managers/getCartTotal";

export default async function Header() {
  const supabase = await createClient();
  const cookieStore = await cookies();

  const headersList = await headers();
  const host = headersList.get("host");
  const referer = headersList.get("referer");

  const currentPath = referer ? new URL(referer).pathname : "/";

  const { data: categories } = await supabase.from("categories").select("*");

  const cartId = cookieStore.get("cart_id")?.value;
  const cartItems = await getCartItems();

  const total = cartId ? await getCartTotalValue(cartId) : 0;

  return (
    <HeaderClient
      categories={categories || []}
      cartItemsCount={cartItems.length}
      cartTotal={total}
    >
      {cartItems.map((item) => (
        <ProductCard
          key={item.id}
          path={currentPath}
          productId={item.product_id}
          variant="cartDropdown"
        />
      ))}
    </HeaderClient>
  );
}
