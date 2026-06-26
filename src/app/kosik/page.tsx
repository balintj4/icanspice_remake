import { ChevronRightIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/server";
import { cookies } from "next/headers";
import { getCartItems } from "@/managers/getCartItems";
import ProductCard from "@/components/ui/productCard";

export default async function CartPage() {
    const supabase = await createClient();
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cart_id")?.value;
    const cartItems = await getCartItems();

    return (
        <>
        <div className="flex flex-row gap-2 mt-8 mb-4 text-4xl w-full text-muted-foreground items-center justify-center">
        <h1 className="font-bold text-foreground">Košík</h1>
        <ChevronRightIcon className="h-10"/>
        <h1 className="font">Platba</h1>
        <ChevronRightIcon className="h-10"/>
        <h1 className="font">Objednávka</h1>
        </div>
        <Separator orientation="horizontal" className="bg-secondary mb-12 w-[85vw] max-w-[1350px] xl:max-w-[1500px] mx-auto min-h-[2px]" />
        <div className="flex flex-row">
            <div className="flex flex-col basis-2/3"></div>
            <div className="flex flex-col basis-1/3 bg-primary p-4"> {cartItems.map((item) => <ProductCard key={item.id} path="/kosik" productId={item.product_id} variant="cartDropdown"/>)}</div>
        </div>
        </>
    )
    
}