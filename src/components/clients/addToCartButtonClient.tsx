"use client";
import { useOptimistic, useTransition } from "react";
import Cookies from "js-cookie";
import { Button } from "../ui/button";
import { updateCartItem } from "@/app/actions/cartActions";

interface ToCartButtonClientProps {
  count?: number;
  productID: number;
  validatePath: string;
}

export function ToCartButtonClient({
  count = 0,
  productID,
  validatePath,
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
        <div className="w-40 h-8 flex flex-row justify-between items-center bg-chart-5 mx-auto">
          <Button
            className="text-lg"
            onClick={() => handleAdd(-1)}
            disabled={isPending}
          >
            -
          </Button>
          <p className="text-secondary text-lg">{optimisticCount}</p>
          <Button
            className="text-xl"
            onClick={() => handleAdd(1)}
            disabled={isPending}
          >
            +
          </Button>
        </div>
      ) : (
        <Button
          className="w-40 h-8 mx-auto"
          onClick={() => handleAdd(1)}
          disabled={isPending}
        >
          Pridať do košíka
        </Button>
      )}
    </>
  );
}
