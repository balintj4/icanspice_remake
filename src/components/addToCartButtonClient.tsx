"use client";
import Cookies from "js-cookie";
import { Button } from "./ui/button";
import { updateCartItem } from "@/app/actions/cartActions";

interface ToCartButtonClientProps {
  count?: number;
  productID: number;
}
export function ToCartButtonClient({
  count = 0,
  productID,
}: ToCartButtonClientProps) {
  const handleAdd = async (productID: number, count: number) => {
    const cartId = Cookies.get("cart_id");
    if (!cartId) {
      return;
    }
    await updateCartItem(cartId, productID, count);
  };

  return (
    <>
      {count > 0 ? (
        <Button onClick={() => handleAdd(productID, 1)}>
          V kosiku {productID}
        </Button>
      ) : (
        <Button>Nie v kosiku {productID}</Button>
      )}
    </>
  );
}

{
  /* onClick={() => updateCartItem(product, 1)} */
}
