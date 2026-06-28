import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronLeftIcon } from "lucide-react";
import { SiApple, SiFacebook, SiGoogle } from "react-icons/si";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  
  return (
    <div className="flex flex-row h-screen bg-no-repeat bg-centre bg-cover" style={{
            backgroundImage: "url('/auth-bg.webp')",
          }}>
      <div className="basis-1/2 flex justify-center items-center">
  <Card className="my-auto mx-auto w-130 p-12 items-center">
    <img src={"/logo-black.svg"} className="mt-12 mb-2 w-40" />
    <CardTitle className="text-3xl font-bold -mb-2">Prihlásenie</CardTitle>
    <CardDescription className="text-lg">Vitaj späť! Prihlás sa do svojho účtu.</CardDescription>
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
    <form className="w-full mb-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="login-email">Používateľský e-mail</FieldLabel>
          <Input 
          required 
          id='login-email'
          name="email" 
          form="login-mail" 
          type="text" 
          placeholder="e-mail" 
          autoComplete="email"/>
        </Field>
        <Field>
        <FieldLabel htmlFor="login-pswd">Prihlasovacie heslo</FieldLabel>
          <Input 
          required 
          id='login-pswd'
          name="login-pswd" 
          form="login-mail" 
          type="password" 
          placeholder="heslo" 
          autoComplete="password"/>
        </Field>
      </FieldGroup>
    </form>
    <Button className="w-full" variant='default'>Prihlásiť sa</Button>
    <Link
          className={
            buttonVariants({ variant: "secondary", size: "lg" }) +
            " text-xs text-muted-foreground w-full"
          }
          href={`/`}
        ><ChevronLeftIcon/> Späť do obchodu
        </Link>
        <a href="/register" className="text-muted-foreground">Nemáš ešte u nás účet? <span className="text-primary underline cursor-pointer hover:text-chart-5">Zaregistruj sa!</span></a>
  </Card>
  </div>
  </div>);
}
