"use client";
import { createContext, useContext } from "react";

const CartContext = createContext<{ cartId: string | null }>({ cartId: null });

export function CartProvider({ cartId, children }: { cartId: string, children: React.ReactNode }) {
  return (
    <CartContext.Provider value={{ cartId }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);