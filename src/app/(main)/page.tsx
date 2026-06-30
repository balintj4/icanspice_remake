import { FeatureIcon } from "@/components/ui/FeatureIcon";
import Cookies from "js-cookie";
import ProductCard from "@/components/ui/productCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/server";
import { WheatIcon, SaladIcon } from "lucide-react";
import CategoryHeader from "@/components/ui/categoryHeader";

export default async function Page() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("product").select("*");

  return (
    <>
      {/***************************************************************
    
                            HERO SECTION
    
    *****************************************************************/}
      <section className="relative w-full overflow-hidden z-1">
        <div
          className="min-h-[80dvh] bg-no-repeat bg-centre bg-cover px-6 py-20 bg-bottom-right sm:bg-bottom sm:py-[12dvh] sm:px-[10vw] xl:px-[6vw]"
          style={{
            backgroundImage: "url('/auth-bg.webp')",
          }}
        >
          <img src={"/ics-logo.svg"} className="mb-[4dvh] w-60" />
          <h1 className="text-background sm:text-6xl mb-[12dvh]">
            <span className="text-6xl font-bold uppercase">
              Prémiová kvalita
            </span>
            <br />
            <span className="text-4xl font-light">jednoduchšie varenie</span>
          </h1>
          {/* <p className="text-primary-foreground mb-[4dvh] text-md">
            Výberové koreniny vysokej kvality pre kulinárske zážitky.
          </p> */}
          <Button
            variant="default"
            className="px-16 py-6 font-bold text-md min-w-60 mr-6"
          >
            Nakupovať
          </Button>
          <Button variant="secondary" className="px-16 py-6 text-md min-w-60">
            O nás
          </Button>
          <div className="flex mt-8 gap-8">
            <span className="flex items-center gap-2 text-background text-nowrap">
              <WheatIcon className="w-5 h-5" />
              Bez pridaných aditív
            </span>
            <span className="flex items-center gap-2 text-background text-nowrap">
              <SaladIcon className="w-5 h-5" />
              Starostlivo vyberané suroviny
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
