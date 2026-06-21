import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default async function Page() {
  const { data: products } = await supabase.from("product").select("*");

  return (
    <>
      <section className="relative w-full bg-[#F9F7F2] overflow-hidden h-[80dvh]">
        <div
          className="absolute inset-0 z-0 bg-no-repeat bg-contain bg-size-[100vw] bg-bottom-left invisible xl:visible"
          style={{
            backgroundImage: "url('/wave.svg')",
          }}
        />

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 relative z-10">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-6xl sm:pt-[16dvh]">
              <strong className="text-primary">Better choices.</strong>
              <br />
              Beautiful living.
            </h1>
            <p className="text-gray-600">
              Curated products for a sustainable lifestyle.
            </p>
            <Button variant="default" className="px-8">
              Shop the Collection
            </Button>
          </div>

          <div className="relative h-[40dvh] xl:h-[80dvh] lg:h-[120dvh]">
            <Image
              src="/hero-img.webp"
              alt="Product"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>
      <div className="grid grid-cols-3 gap-4">
        {products?.map((product) => (
          <div key={product.id} className="border p-4">
            <h2>{product.name}</h2>
            <p>{product.price / 100} €</p>
          </div>
        ))}
      </div>
    </>
  );
}
