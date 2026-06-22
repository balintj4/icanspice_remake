"use client";
import { useEffect } from "react";
import { getOrCreateCart } from "@/lib/cart";

export default function CartManager() {
  useEffect(() => {
    const initCart = async () => {
      const cartId = document.cookie.replace(
        /(?:(?:^|.*;\s*)cart_id\s*=\s*([^;]*).*$)|^.*$/,
        "$1",
      );
      const newCartId = await getOrCreateCart(cartId || undefined);

      if (cartId !== newCartId) {
        document.cookie = `cart_id=${newCartId}; path=/; max-age=604800`;
      }
    };
    initCart();
  }, []);

  return null;
}
