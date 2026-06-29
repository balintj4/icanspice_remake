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
  user?: string;
}

export default async function Header({
  categories,
  cartItems,
  currentPath,
  cartId,
  user,
}: HeaderProps) {
  const total = cartId ? await getCartTotalValue(cartId) : 0;

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
