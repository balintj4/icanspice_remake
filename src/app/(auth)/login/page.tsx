import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronLeftIcon } from "lucide-react";
import { SiApple, SiFacebook, SiGoogle } from "react-icons/si";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { AuthForm } from "@/components/clients/authForm";

export default function LoginPage() {
  return (
    <div
      className="flex flex-row h-screen bg-no-repeat bg-centre bg-cover"
      style={{
        backgroundImage: "url('/auth-bg.webp')",
      }}
    >
      {/*************************** HEADER ****************************/}
      <div className="basis-1/2 flex justify-center items-center">
        <Card className="my-auto mx-auto w-130 p-12 items-center">
          <img src={"/logo-black.svg"} className="mt-12 mb-2 w-40" />
          <CardTitle className="text-3xl font-bold -mb-2">
            Prihlásenie
          </CardTitle>
          <CardDescription className="text-lg">
            Vitaj späť! Prihlás sa do svojho účtu.
          </CardDescription>

          {/*************************** FORM ****************************/}
          <AuthForm formId="login" formVariant="login" />

          {/********************** ACTION BUTTONS ***********************/}
          <Link
            className={
              buttonVariants({ variant: "secondary", size: "lg" }) +
              " text-xs text-muted-foreground w-full"
            }
            href={`/`}
          >
            <ChevronLeftIcon /> Späť do obchodu
          </Link>

          {/*************************** REGISTER ****************************/}
          <a href="/register" className="text-muted-foreground">
            Nemáš ešte u nás účet?{" "}
            <span className="text-primary underline cursor-pointer hover:text-chart-5">
              Zaregistruj sa!
            </span>
          </a>
        </Card>
      </div>
    </div>
  );
}
