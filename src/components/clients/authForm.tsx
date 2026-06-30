"use client";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { SiApple, SiFacebook, SiGoogle } from "react-icons/si";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { loginAction, registerAction } from "@/app/actions/auth";
import { useActionState, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function AuthForm({
  formId,
  formVariant,
}: {
  formId: string;
  formVariant: string;
}) {
  const selectedAction = formVariant === "login" ? loginAction : registerAction;

  const [state, action, isPending] = useActionState(selectedAction, {
    error: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <FieldGroup className="flex flex-row gap-8 justify-center mt-4">
        <SiGoogle className=" h-6 w-6" />
        <SiFacebook className="h-6 w-6" />
        <SiApple className=" h-6 w-6" />
      </FieldGroup>
      <div className="flex flex-row gap-4 justify-center items-center my-2">
        <Separator className="" />
        <p className="text-muted-foreground">ALEBO</p>
        <Separator className="" />
      </div>

      {formVariant === "login" ? (
        <form id={formId} className="w-full mb-6">
          <FieldGroup>
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="login-email">
                  Používateľský e-mail
                </FieldLabel>
                <Input
                  required
                  id="login-email"
                  name="email"
                  form={formId}
                  type="text"
                  placeholder="e-mail"
                  autoComplete="email"
                />
              </Field>
              <Field className="relative">
                <FieldLabel htmlFor="login-pswd">
                  Prihlasovacie heslo
                </FieldLabel>
                <Input
                  required
                  id="login-pswd"
                  name="login-pswd"
                  form={formId}
                  type={showPassword ? "text" : "password"}
                  placeholder="heslo"
                  autoComplete="password"
                />
                <Button
                  type="button"
                  variant={"ghost"}
                  className="absolute max-w-8 right-3 top-3/4 -translate-y-1/2 text-gray-500 hover:text-gray-700 hover:bg-background"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </Button>
              </Field>
            </FieldSet>
          </FieldGroup>
        </form>
      ) : formVariant === "register" ? (
        <form id={formId} className="w-full mb-6">
          <FieldGroup>
            <FieldSet>
              <div className="flex flex-row gap-4">
                <Field>
                  <FieldLabel htmlFor="reg-name">Meno</FieldLabel>
                  <Input
                    required
                    id="reg-name"
                    name="reg-name"
                    form={formId}
                    type="text"
                    placeholder="Meno"
                    autoComplete="given-name"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="reg-surname">Priezvisko</FieldLabel>
                  <Input
                    required
                    id="reg-surname"
                    name="reg-surname"
                    form={formId}
                    type="text"
                    placeholder="Priezvisko"
                    autoComplete="given-surname"
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="reg-email">
                  Používateľský e-mail
                </FieldLabel>
                <Input
                  required
                  id="reg-email"
                  name="reg-email"
                  form={formId}
                  type="text"
                  placeholder="E-mail"
                  autoComplete="email"
                />
              </Field>
            </FieldSet>
            <FieldSet>
              <Field className="relative">
                <FieldLabel htmlFor="reg-pswd">Prihlasovacie heslo</FieldLabel>
                <Input
                  required
                  id="reg-pswd"
                  name="reg-pswd"
                  form={formId}
                  type={showPassword ? "text" : "password"}
                  placeholder="Heslo"
                  autoComplete="password"
                />
                <Button
                  type="button"
                  variant={"ghost"}
                  className="absolute max-w-8 right-3 top-3/4 -translate-y-1/2 text-gray-500 hover:text-gray-700 hover:bg-background"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </Button>
              </Field>
            </FieldSet>
          </FieldGroup>
        </form>
      ) : (
        <h1>Neplatný formulár</h1>
      )}

      {state?.error && <p className="text-red-500">{state.error}</p>}

      <Button
        type="submit"
        form={formId}
        disabled={isPending}
        className="w-full"
        formAction={action}
      >
        {isPending
          ? "Spracovávam..."
          : formVariant === "login"
            ? "Prihlásiť sa"
            : "Zaregistrovať sa"}
      </Button>
    </>
  );
}
