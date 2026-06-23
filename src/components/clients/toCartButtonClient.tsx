"use client";
import { useOptimistic, useTransition } from "react";
import Cookies from "js-cookie";
import { Button } from "../ui/button";
import { updateCartItem } from "@/app/actions/cartActions";

interface ToCartButtonClientProps {
  count?: number;
  productID: number;
  validatePath: string;
  variantDefault: { container: string };
  variantActive: {
    container: string;
    addButton: string;
    removeButton: string;
    text: string;
  };
}

export function ToCartButtonClient({
  count = 0,
  productID,
  validatePath,
  variantDefault,
  variantActive,
}: ToCartButtonClientProps) {
  const [isPending, startTransition] = useTransition();

  const [optimisticCount, addOptimisticCount] = useOptimistic(
    count,
    (state, amount: number) => state + amount,
  );

  const handleAdd = async (amount: number) => {
    const cartId = Cookies.get("cart_id");
    if (!cartId) return;

    startTransition(() => {
      addOptimisticCount(amount);
    });

    await updateCartItem(cartId, productID, amount, validatePath);
  };

  return (
    <>
      {optimisticCount > 0 ? (
        <div className={variantActive.container}>
          <Button
            className={variantActive.removeButton}
            onClick={() => handleAdd(-1)}
            disabled={isPending}
          >
            -
          </Button>
          <p className={variantActive.text}>{optimisticCount}</p>
          <Button
            className={variantActive.addButton}
            onClick={() => handleAdd(1)}
            disabled={isPending}
          >
            +
          </Button>
        </div>
      ) : (
        <Button
          className={variantDefault.container}
          onClick={() => handleAdd(1)}
          disabled={isPending}
        >
          Pridať do košíka
        </Button>
      )}
    </>
  );
}
