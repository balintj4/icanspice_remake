"use client";

import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Card, CardFooter, CardTitle, CardDescription } from "../ui/card";
import { logoutAction } from "@/app/actions/auth";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Category {
  id: number;
  name: string;
  hidden: boolean;
}

interface HeaderClientProps {
  categories: Category[];
  cartTotal: number;
  user?: string | null;
  cartItemsCount: number;
  children: React.ReactNode;
}

export function HeaderClient({
  categories,
  user,
  cartItemsCount,
  children,
  cartTotal,
}: HeaderClientProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className="sticky hidden sm:flex items-center justify-between p-4 border-b text-secondary-foreground top-0 relative z-50 bg-background shadow-xs">
        <div className="flex items-center gap-6">
          <h1
            className="font-bold text-nowrap text-2xl"
            onClick={() => (window.location.href = "/")}
            style={{ cursor: "pointer" }}
          >
            I CAN SPICE
          </h1>

          {/***************************************************************
    
                                    MENU
    
           *****************************************************************/}

          <Button variant="ghost" asChild>
            <Link
              href="/"
              className={cn(
                "transition-colors",
                isActive("/") ? "text-primary" : "text-secondary-foreground",
              )}
            >
              Domov
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "transition-colors",
                  isActive("/obchod") || pathname.startsWith("/obchod")
                    ? "text-primary"
                    : "text-secondary-foreground",
                )}
              >
                Obchod
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((cat) => (
                <DropdownMenuItem key={cat.name} asChild>
                  <Link href={`/obchod/${cat.name}`}>{cat.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" asChild>
            <Link
              href="/kontakt"
              className={cn(
                "transition-colors",
                isActive("/kontakt")
                  ? "text-primary"
                  : "text-secondary-foreground",
              )}
            >
              Kontakt
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-4">
          {/***************************************************************
    
                                    USER
    
           *****************************************************************/}

          {user ? (
            <>
              <HoverCard openDelay={0} closeDelay={100}>
                <HoverCardTrigger>
                  <Button variant="ghost">
                    <UserIcon /> {user}
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent
                  className="w-40 flex flex-col gap-2 justify-center"
                  collisionPadding={20}
                  sideOffset={10}
                >
                  <h3>Nastavenia účtu</h3>
                  <Separator />
                  <Button variant={"ghost"} className="text-left justify-start">
                    Všeobecné <ChevronRightIcon />
                  </Button>
                  <Button variant={"ghost"} className="text-left justify-start">
                    Adresa <ChevronRightIcon />
                  </Button>
                  <Button variant={"ghost"} className="text-left justify-start">
                    Objednávky <ChevronRightIcon />
                  </Button>
                  <Button
                    variant={"destructive"}
                    onClick={() => logoutAction()}
                  >
                    <LogOutIcon />
                    Odhlásiť sa
                  </Button>
                </HoverCardContent>
              </HoverCard>
            </>
          ) : (
            /* Neprihlásený užívateľ */
            <Button variant="secondary" asChild>
              <Link href="/login">
                <UserIcon /> Prihlásenie
              </Link>
            </Button>
          )}

          {/***************************************************************
    
                                    CART
    
           *****************************************************************/}

          {cartItemsCount ? (
            <HoverCard openDelay={0} closeDelay={100}>
              <HoverCardTrigger>
                <Button variant="default">Košík</Button>
              </HoverCardTrigger>
              <HoverCardContent
                className="min-w-80"
                collisionPadding={20}
                sideOffset={10}
              >
                <Card className="w-full">
                  <div className="flex flex-col gap-2 py-2 mx-auto max-h-70 overflow-y-auto flex-shrink-0">
                    {children}
                  </div>
                  <CardFooter className="flex flex-col gap-2 p-2">
                    <div className="w-65 flex flex-row items-center gap-4">
                      <CardTitle className="ml-2">Spolu v košíku:</CardTitle>
                      <CardDescription className="font-mono mr-2">
                        {cartTotal / 100} €
                      </CardDescription>
                    </div>
                    <Button
                      className="mx-auto w-65 items-center"
                      variant={"default"}
                    >
                      <Link href={"/kosik"}>
                        Prejsť do košíka
                        <ChevronRightIcon className="inline ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <HoverCard openDelay={0} closeDelay={100}>
              <HoverCardTrigger>
                <Button variant="default">Košík</Button>
              </HoverCardTrigger>
              <HoverCardContent
                className="min-w-80"
                collisionPadding={20}
                sideOffset={10}
              >
                <Card className="w-full">
                  <div className="flex flex-col gap-2 py-2 mx-auto max-h-70 overflow-y-auto flex-shrink-0">
                    {user ? (
                      <CardDescription className="my-6 text-center">
                        {user}, tvoj košík je prázdny, <br />
                        <span className="text-chart-5">tlačítko nižšie</span> ťa
                        prevediev na náš výber!
                      </CardDescription>
                    ) : (
                      <CardDescription className="my-6 text-center">
                        Váš košík je prázdny, <br />
                        <span className="text-chart-5">
                          tlačítko nižšie
                        </span>{" "}
                        Vás prevediev na náš výber!
                      </CardDescription>
                    )}
                  </div>
                  <CardFooter className="flex flex-col gap-2 p-2">
                    <Button
                      className=" mx-auto w-65 mt-2 items-center"
                      variant={"default"}
                    >
                      <Link href={"/obchod"}>
                        <ChevronLeftIcon className="inline mr-2" />
                        Do obchodu
                      </Link>
                    </Button>
                    <Button
                      className="mx-auto w-65 items-center"
                      variant={"secondary"}
                    >
                      <Link href={"/kosik"}>
                        Prejsť do košíka
                        <ChevronRightIcon className="inline ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
      </header>
    </>
  );
}
