"use client";
import { useOptimistic, useTransition } from "react";
import { Button } from "../ui/button";
import { updateCartItem } from "@/app/actions/cartActions";
import { useCart } from "@/context/cartContext";

interface ToCartButtonClientProps {
  count?: number;
  productID: number;
  validatePath: string;
  variantDefault: {
    container: string;
    buttonVariant?:
      | "default"
      | "outline"
      | "ghost"
      | "secondary"
      | "destructive"
      | "link";
  };
  variantActive: {
    container: string;
    addButton: string;
    removeButton: string;
    text: string;
    buttonVariant?:
      | "default"
      | "outline"
      | "ghost"
      | "secondary"
      | "destructive"
      | "link";
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
  const { cartId } = useCart();

  const handleAdd = async (amount: number) => {
    
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
            variant={variantActive.buttonVariant}
          >
            -
          </Button>
          <p className={variantActive.text}>{optimisticCount}</p>
          <Button
            className={variantActive.addButton}
            onClick={() => handleAdd(1)}
            disabled={isPending}
            variant={variantActive.buttonVariant}
          >
            +
          </Button>
        </div>
      ) : (
        <Button
          className={variantDefault.container}
          variant={variantDefault.buttonVariant}
          onClick={() => handleAdd(1)}
          disabled={isPending}
        >
          Pridať do košíka
        </Button>
      )}
    </>
  );
}
