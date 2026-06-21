import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default async function Page() {
  const { data: products } = await supabase.from("product").select("*");

  return (
    <>
      <section className="relative w-full overflow-hidden">
        <div
          className="h-[80dvh] bg-no-repeat bg-centre bg-cover px-6 py-20 bg-bottom-right sm:bg-bottom sm:py-[14dvh] sm:px-[10vw] xl:px-[6vw]"
          style={{
            backgroundImage: "url('/hero-bg.webp')",
          }}
        >
          <img src={"/ics-logo.svg"} className="mb-[4dvh] w-2xs" />
          <h1 className="text-background sm:text-6xl mb-[2dvh]">
            <strong className="text-8xl">Prémiová kvalita</strong>
            <br />
            <span className="text-6xl">jednoduchšie varenie</span>
          </h1>
          <p className="text-primary-foreground mb-[4dvh] text-lg">
            Výberové koreniny vysokej kvality pre kulinárske zážitky.
          </p>
          <Button
            variant="default"
            className="px-16 py-6 font-bold text-md min-w-60 mr-6"
          >
            Nakupovať
          </Button>
          <Button variant="secondary" className="px-16 py-6 text-md min-w-60">
            O nás
          </Button>
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
