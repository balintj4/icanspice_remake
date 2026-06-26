import { ChevronRightIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getCartItems } from "@/managers/getCartItems";
import ProductCard from "@/components/ui/productCard";
import { getCartTotalValue } from "@/managers/getCartTotal";
import { Button } from "@/components/ui/button";
import { getCachedProduct } from "@/lib/cache";

export default async function CartPage({params}: { params: Promise<{ slug: string }> }) {
const { slug } = await params;
const cookieData = await cookieStore.get("cart_id");
const cartId = cookieData?.value ?? "";

  const [product, cartItems, cartTotal] = await Promise.all([
    getCachedProduct(slug), 
    getCartItems(),
    getCartTotalValue(cartId)
  ]);

  

  return (
    <>
      <div className="flex flex-row gap-2 mt-8 mb-4 text-2xl w-full text-muted-foreground items-center justify-center">
        <h1 className="font-bold text-foreground">Košík</h1>
        <ChevronRightIcon className="h-10" />
        <h1 className="font">Platba</h1>
        <ChevronRightIcon className="h-10" />
        <h1 className="font">Objednávka</h1>
      </div>
      <Separator
        orientation="horizontal"
        className="bg-secondary mb-12 w-[85vw] max-w-[1350px] xl:max-w-[1500px] mx-auto min-h-[2px]"
      />
      <div className="flex flex-row">
        <div className="flex flex-col basis-2/3"></div>
        <Separator orientation="vertical" className="bg-foreground" />
        <div className="flex flex-col basis-1/3 px-8 gap-4 sticky top-24">
          <h2 className="font-bold text-lg bm-2">Produkty v košíku</h2>
          <div className="flex flex-col max-h-80 overflow-y-auto flex-shrink-0 gap-4">
            {cartItems.map((item) => (
              <ProductCard
                key={item.id}
                path="/kosik"
                productId={item.product_id}
                variant="cartShowcase"
              />
            ))}
          </div>
          <div className="flex flex-row gap-2 items-center">
            <h3 className="text-foreground font-bold text-sm">Medzisúčet:</h3>
            <p className="text-muted-foreground -mr-1 text-sm">{`${cartTotal / 100} €`}</p>
            <p className="text-muted-foreground text-[0.6rem] pt-1">
              vrátane DPH
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center -mt-4">
            <h3 className="text-foreground font-bold text-sm">Doprava:</h3>
            <p className="text-muted-foreground -mr-1 text-sm">{`${0} €`}</p>
            <p className="text-muted-foreground text-[0.6rem] pt-1">
              vrátane DPH
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center -mt-4">
            <h3 className="text-foreground font-bold text-sm">Zľava:</h3>
            <p className="text-muted-foreground -mr-1 text-sm">{`${0} €`}</p>
          </div>

          <div className="flex flex-row gap-4 items-center">
            <h3 className="text-foreground font-bold text-md">Spolu:</h3>
            <p className="text-muted-foreground text-md">{`${cartTotal / 100} €`}</p>
          </div>
          <Button variant="default" className="w-full py-2">
            Zaplatiť a objednať
          </Button>
          <Button variant="outline" className="w-full py-2 -mt-1">
            Pokračovať v nakupovaní
          </Button>
        </div>
      </div>
    </>
  );
}
