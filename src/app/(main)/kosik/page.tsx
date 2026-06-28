import { ChevronRightIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/server";
import { cookies } from "next/headers";
import { getCartItems } from "@/managers/getCartItems";
import ProductCard from "@/components/ui/productCard";
import { getCartTotalValue } from "@/managers/getCartTotal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { CountrySelect } from "@/components/ui/countrySelect";
import { Checkbox } from "@/components/ui/checkbox";
import { AddressForm } from "@/components/clients/addressForm";
import { processOrderAction } from "../../actions/checkout";

interface CartPageProps {
  user: string;
  adress: string;
}

export default async function CartPage({user, adress}: CartPageProps) {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cart_id")?.value;
  const cartItems = await getCartItems();

  const cartTotal = cartId ? await getCartTotalValue(cartId) : 0;

  return (
    <>
      <div className="flex flex-row gap-2 mt-8 mb-4 text-2xl w-full text-muted-foreground items-center justify-center">
        <h1 className="font-bold text-foreground">Košík</h1>
        <ChevronRightIcon className="h-10" />
        <h1 className="font">Platba</h1>
        <ChevronRightIcon className="h-10" />
        <h1 className="font">Objednávka</h1>
      </div>

      <div className="flex flex-row">
        {/***************************************************************
    
                            FORMS
    
    *****************************************************************/}

        <div className="flex flex-col basis-2/3 pl-20 mx-8 px-8 py-2">
        {!user ?
          (<a href='/login'className="mb-1"><span className="text-primary underline cursor-pointer hover:text-chart-5">Prihlásenie / Registrácia</span><span className="text-muted-foreground"> pre jednoduchšie objednávanie.</span></a>)
          :
          (<p className="mb-1"><span className="text-primary">{`Ahoj ${user}`}</span><span className="text-muted-foreground">, tvoju adresu sme za teba doplnili automaticky.</span></p>)  
          }
          {!user ?
          (<p className="text-muted-foreground mb-2">Ďakujeme, že od nás objednávate!</p>)
          :
          (<p className="text-muted-foreground mb-2">Ďakujeme, že od nás objednávaš!</p>)
          }
          
          <Separator
            orientation="horizontal"
            className="bg-secondary mb-6 w-full mx-auto min-h-[2px]"
          />
          <h2 className="mb-6 text-2xl">Dodacie údaje</h2>
          {/***************************************************************
                            FORM FOR ADRESS INPUT
         *****************************************************************/}
         <AddressForm formId='address'/>
          
        </div>
        <Separator orientation="vertical" className="bg-foreground" />

        {/***************************************************************
    
                            SUMARRY
    
    *****************************************************************/}

        <div className="mx-8 p-6 px-10 flex flex-col basis-1/3 gap-4 sticky top-24">
          <h2 className="font-bold text-lg bm-2">Produkty v košíku</h2>
          <div className="flex flex-col max-h-80  overflow-y-auto flex-shrink-0 gap-4">
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

          <Button 
          variant="default" 
          className="w-full py-2"
          type="submit" 
          form="address" 
          formAction={processOrderAction}>
            Zaplatiť a objednať
          </Button>
          <Button variant="outline" className="w-full py-2 -mt-1">
            Pokračovať v nakupovaní
          </Button>

          <Field orientation="horizontal">
        <Checkbox
          id="terms-checkbox"
          name="terms-checkbox"
          form='address'
          required
          defaultChecked={false}
        />
        <FieldContent>
          <FieldLabel>
            Súhlas s obchodnými podmienkami
          </FieldLabel>
          <FieldDescription>
           Zaškrtnutím vyhlasujem, že som si obchodné podmienky a podmienky spracovania osobných údajov prečítal a súhlasím s nimi v plnom rozsahu.
          </FieldDescription>
        </FieldContent>
      </Field>
        </div>
      </div>
    </>
  );
}
