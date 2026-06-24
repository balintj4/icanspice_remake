"use client";

/**********************************************************************************
 * Chýba doimplementácia logiky konta a košíku.
 *
 * Košík: ten by mal zobrazovať dropdown 3 vecí v ňom aj s náhladovým obrázkom (to
 * znamená prepojenie rovno niekoľkých tabuliek z databázy - možno to vyžaduje prerobenie samotnej databázy)
 *
 * Konto/prihlásenie treba doplniť logiku akou sa dostáva na login screen alebo je uzivatel prihlasený
 *
 ***********************************************************************************/

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Card, CardFooter, CardTitle, CardDescription } from "../ui/card";

interface Category {
  id: number;
  name: string;
  hidden: boolean;
}

interface HeaderClientProps {
  categories: Category[];
  cartTotal: number;
  user?: { name: string } | null;
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
          <Input
            placeholder="Hľadať..."
            className="w-64 lg:visible invisible"
          />

          {user ? (
            /* Prihlásený užívateľ */
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{user.name}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profil</DropdownMenuItem>
                <DropdownMenuItem>Odhlásiť</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* Neprihlásený užívateľ */
            <Button variant="secondary" asChild>
              <Link href="/login">Prihlásenie</Link>
            </Button>
          )}

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
                    <Button className="mx-auto w-65">Prejsť do košíka</Button>
                  </CardFooter>
                </Card>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <Button variant="default">Košík</Button>
          )}
        </div>
      </header>
    </>
  );
}
