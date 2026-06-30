import { getUserData } from "@/managers/getUserData";
import { HeaderClient } from "../clients/headerClient";
import ProductCard from "./productCard";
import { getCartTotalValue } from "@/managers/getCartTotal";

interface Category {
  id: number;
  name: string;
  slug: string;
  hidden: boolean;
}

interface CartItem {
  id: string;
  product_id: number;
}

interface HeaderProps {
  categories: Category[];
  cartItems: CartItem[];
  currentPath: string;
  cartId: string;
}

export default async function Header({
  categories,
  cartItems,
  currentPath,
  cartId,
}: HeaderProps) {
  const total = cartId ? await getCartTotalValue(cartId) : 0;
  const user = await getUserData();

  return (
    <HeaderClient
      categories={categories || []}
      cartItemsCount={cartItems.length}
      cartTotal={total}
      user={user}
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
