"use client";

import { Button } from "./ui/button";

interface ToCartButtonClientProps {
  count?: number;
}
export function ToCartButtonClient({ count = 0 }: ToCartButtonClientProps) {
  return (
    <Button>{count > 0 ? `Pridané (${count})` : "Pridať do košíka"}</Button>
  );
}
