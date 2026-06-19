import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default async function Page() {
  const { data: products } = await supabase.from("product").select("*");

  return (
    <div className="grid grid-cols-3 gap-4">
      {products?.map((product) => (
        <div key={product.id} className="border p-4">
          <h2>{product.name}</h2>
          <p>{product.price / 100} €</p>
        </div>
      ))}
    </div>
  );
}
