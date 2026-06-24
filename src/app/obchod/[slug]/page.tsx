import { createClient } from "@/lib/server";

import CategoryHeader from "@/components/ui/categoryHeader";
import ProductCard from "@/components/ui/productCard";
import { getProdCat } from "@/managers/getProductsByCategory";

export interface Product {
  id: number;
}
export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const products = await getProdCat(slug);
  console.log(products);

  if (!products) {
    return (
      <>
        <CategoryHeader />
        <div>Žiadne produkty v tejto kategórii.</div>;
      </>
    );
  }

  return (
    <>
      <CategoryHeader />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            path={`/obchod/${slug}`}
            productId={product.id}
          />
        ))}
      </div>
    </>
  );
}
