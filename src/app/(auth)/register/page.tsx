import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronLeftIcon } from "lucide-react";
import { SiApple, SiFacebook, SiGoogle } from "react-icons/si";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage() {
  
  return (
    <div className="flex flex-row h-screen bg-no-repeat bg-centre bg-cover" style={{
            backgroundImage: "url('/register-bg.webp')",
          }}>
      <div className="basis-1/2 flex justify-center items-center">
  <Card className="my-auto mx-auto w-130 py-8 px-12  items-center">
    <img src={"/logo-black.svg"} className="mt-6 mb-2 w-40" />
    <CardTitle className="text-3xl font-bold -mb-2">Registrácia</CardTitle>
    <CardDescription className="text-lg">Vytvor si u nás účet zadarmo.</CardDescription>
    <FieldGroup className="flex flex-row gap-8 justify-center mt-4">
        <SiGoogle className=" h-6 w-6"/>
        <SiFacebook className=" h-6 w-6"/>
        <SiApple className=" h-6 w-6"/>
      </FieldGroup>
      <div className="flex flex-row gap-4 justify-center items-center my-2">
      <Separator className=""/>
      <p className="text-muted-foreground">ALEBO</p>
      <Separator className=""/>
      </div>
    <form className="w-full mb-4">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="reg-name">Používateľské meno</FieldLabel>
          <Input 
          required 
          id='reg-name'
          name="reg-name" 
          form="register" 
          type="text" 
          placeholder="Meno a Priezvisko" 
          autoComplete="given-name"/>
        </Field>
        <Field>
          <FieldLabel htmlFor="reg-email">Používateľský e-mail</FieldLabel>
          <Input 
          required 
          id='reg-email'
          name="reg-email" 
          form="register" 
          type="text" 
          placeholder="E-mail" 
          autoComplete="email"/>
        </Field>
        <Field>
        <FieldLabel htmlFor="reg-pswd">Prihlasovacie heslo</FieldLabel>
          <Input 
          required 
          id='reg-pswd'
          name="reg-pswd" 
          form="register" 
          type="password" 
          placeholder="Heslo" 
          autoComplete="password"/>
        </Field>
        <Field>
        <FieldLabel htmlFor="reg-pswd2">Zopakovať heslo</FieldLabel>
          <Input 
          required 
          id='reg-pswd2'
          name="reg-pswd2" 
          form="register" 
          type="password" 
          placeholder="Zopakovať heslo" 
          autoComplete="password"/>
        </Field>
      </FieldGroup>
    </form>
    <Button className="w-full" variant='default'>Zaregistrovať sa</Button>
    <Link
          className={
            buttonVariants({ variant: "secondary", size: "lg" }) +
            " text-xs text-muted-foreground w-full"
          }
          href={`/`}
        ><ChevronLeftIcon/> Späť do obchodu
        </Link>
        <a href="/login" className="text-muted-foreground">Už máš u nás účet? <span className="text-primary underline cursor-pointer hover:text-chart-5">Prihlás sa!</span></a>
  </Card>
  </div>
  </div>);
}
