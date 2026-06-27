import { createClient } from "@/lib/server";

import CategoryHeader from "@/components/ui/categoryHeader";
import ProductCard from "@/components/ui/productCard";
import { getProdCat } from "@/managers/getProductsByCategory";
import { Separator } from "@/components/ui/separator";

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
  const { data: catName } = await supabase
    .from("categories")
    .select("name")
    .eq("slug", slug)
    .single();

  if (!products) {
    return (
      <>
        <div>Žiadne produkty v tejto kategórii.</div>;
      </>
    );
  }

  return (
    <>
      <CategoryHeader />
      {catName ? (
        <div className="ml-12 mt-6 mb-2 flex flex-row gap-2 items-center">
          <h1 className="text-3xl">Obchod:</h1>
          <h2 className="text-2xl font-bold">{catName.name}</h2>
        </div>
      ) : (
        <h1 className="">Obchod</h1>
      )}
      <Separator
        orientation="horizontal"
        className="bg-secondary mb-2 max-w-[1350px] xl:max-w-[1500px] mx-auto min-h-[2px]"
      />
      <div className="p-12 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8">
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
