"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldTitle,
} from "../ui/field";
import { Input } from "../ui/input";
import { useActionState, useEffect, useState } from "react";
import { processUpdateGeneral } from "@/app/actions/updateUser";

export function GeneralSettingsDialog({
  user,
  open,
  onOpenChange,
}: {
  user: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [state, action, isPending] = useActionState(processUpdateGeneral, {
    error: null,
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    if (!isPending && state?.error === null) {
      onOpenChange(false);
    }
  }, [isPending, state, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[40vw]">
        <DialogHeader>
          <DialogTitle>Nastavenia účtu</DialogTitle>
          <DialogDescription>Všeobecné nastavenia účtu</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <form action={action} className="space-y-4">
            <FieldGroup>
              <div className="flex flex-row gap-4">
                <Field>
                  <FieldLabel htmlFor="general-settings-name">
                    Krsné meno:
                  </FieldLabel>
                  <Input
                    id="general-settings-name"
                    name="general-settings-name"
                    autoComplete="given-name"
                    defaultValue={user.name}
                    placeholder="Krstné meno"
                    type="text"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="general-settings-surname">
                    Priezvisko:
                  </FieldLabel>
                  <Input
                    id="general-settings-surname"
                    name="general-settings-surname"
                    autoComplete="given-surname"
                    defaultValue={user.surname}
                    placeholder="Priezvisko"
                    type="text"
                  />
                </Field>
              </div>
              <div className="flex flex-row gap-4">
                <Field>
                  <FieldLabel htmlFor="general-settings-email">
                    E-mail:
                  </FieldLabel>
                  <Input
                    id="general-settings-email"
                    name="general-settings-email"
                    autoComplete="email"
                    defaultValue={user.email}
                    placeholder="E-mail"
                    type="email"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="general-settings-tel">
                    Telefónne číslo:
                  </FieldLabel>
                  <Input
                    id="general-settings-tel"
                    name="general-settings-tel"
                    autoComplete="tel"
                    defaultValue={user.phone}
                    placeholder="Telefónne číslo"
                    type="tel"
                  />
                </Field>
              </div>
              <Field className="relative">
                <FieldLabel htmlFor="general-settings-newPswd">
                  Zmena hesla:
                </FieldLabel>
                <Input
                  id="general-settings-newPswd"
                  name="general-settings-newPswd"
                  defaultValue={user.phone}
                  placeholder="Nové heslo"
                  type={showNewPassword ? "text" : "password"}
                />
                <Button
                  type="button"
                  variant={"ghost"}
                  className="absolute max-w-8 right-3 top-3/4 -translate-y-1/2 text-gray-500 hover:text-gray-700 hover:bg-background"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeIcon /> : <EyeOffIcon />}
                </Button>
              </Field>
            </FieldGroup>
            <FieldSeparator className="my-4" />
            <FieldLabel htmlFor="general-settings-pswd">
              Aktuálne heslo
            </FieldLabel>
            <FieldDescription className="mb-1">
              Pre potvrdenie zmien je nutné zadať aktuálne heslo.
            </FieldDescription>
            <FieldGroup>
              <Field className="relative">
                <Input
                  id="general-settings-pswd"
                  name="general-settings-pswd"
                  placeholder="Heslo pre potvrdenie"
                  type={showCurrentPassword ? "text" : "password"}
                  required
                />
                <Button
                  type="button"
                  variant={"ghost"}
                  className="absolute max-w-8 right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 hover:bg-background"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeIcon /> : <EyeOffIcon />}
                </Button>
              </Field>
            </FieldGroup>
            {state?.error && (
              <p className="text-sm text-red-500 font-medium">{state.error}</p>
            )}
            <Button
              type="submit"
              disabled={isPending}
              className={`w-full transition-all ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Ukladám...
                </span>
              ) : (
                "Uložiť zmeny"
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
