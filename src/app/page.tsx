import { FeatureIcon } from "@/components/ui/FeatureIcon";
import Cookies from "js-cookie";
import ProductCard from "@/components/ui/productCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/server";
import {
  WheatIcon,
  SaladIcon,
  TruckIcon,
  RotateCwIcon,
  ShieldCheckIcon,
  PackageOpenIcon,
} from "lucide-react";

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

      {/* **************************************************************
    
                            FEATURES SECTION
    
    **************************************************************** */}
      <div className="relative shadow-2xl z-20 flex flex-row justify-around bg-background w-[90vw] max-w-[1200px] mx-auto min-h-[16dvh] -mt-[3dvh] xl:-mt-[10dvh] rounded-md px-10 py-8">
        <FeatureIcon
          icon={TruckIcon}
          label="Rýchla a spoľahlivá doprava"
          iconBgColor="bg-chart-5"
        />
        <Separator orientation="vertical" className="bg-secondary" />
        <FeatureIcon
          icon={RotateCwIcon}
          label="Vrátenie v prípade nespokojnosti"
          iconBgColor="bg-chart-2"
        />
        <Separator orientation="vertical" className="bg-secondary" />
        <FeatureIcon
          icon={ShieldCheckIcon}
          label="Bezpečná platba vďaka službe Stripe"
          iconBgColor="bg-chart-3"
        />
        <Separator orientation="vertical" className="bg-secondary" />
        <FeatureIcon
          icon={PackageOpenIcon}
          label="Kvalitné balenie a trvanlivosť"
          iconBgColor="bg-chart-4"
        />
      </div>
      <section className="p-20">
        <div className="flex flex-row gap-12">
          <ProductCard path="/" productId={1} />
          <ProductCard path="/" productId={2} />
        </div>
      </section>
    </>
  );
}
