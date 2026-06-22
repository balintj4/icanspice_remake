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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  HomeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";

interface Category {
  id: number;
  name: string;
  hidden: boolean;
}

interface HeaderClientProps {
  categories: Category[];
  user?: { name: string } | null;
}

export function HeaderClient({ categories, user }: HeaderClientProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className="sticky hidden sm:flex items-center justify-between p-4 border-b text-secondary-foreground top-0 relative z-100 bg-background">
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

          <Button variant="default">Košík</Button>
        </div>
      </header>
      <nav className="sm:hidden fixed bottom-6  left-5/10 -translate-x-5/10 top-auto w-9/10 bg-white border-t p-2 rounded-full flex max-w-xs justify-around z-100">
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center text-xs transition-colors",
            isActive("/") ? "text-primary" : "text-secondary-foreground",
          )}
        >
          <HomeIcon className="w-4" /> <span>Domov</span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-xs transition-colors h-auto py-0",
                isActive("/obchod") || pathname.startsWith("/obchod")
                  ? "text-primary"
                  : "text-secondary-foreground",
              )}
            >
              <ShoppingBagIcon className="w-4" /> <span>Obchod</span>
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
        <Link
          href="/kosik"
          className={cn(
            "flex flex-col items-center text-xs transition-colors",
            isActive("/kosik") ? "text-primary" : "text-secondary-foreground",
          )}
        >
          <ShoppingCartIcon className="w-4" /> <span>Košík</span>
        </Link>
        <Link
          href="/konto"
          className={cn(
            "flex flex-col items-center text-xs transition-colors",
            isActive("/konto") || pathname.startsWith("/konto")
              ? "text-primary"
              : "text-secondary-foreground",
          )}
        >
          <UserIcon className="w-4" />
          <span>Konto</span>
        </Link>
      </nav>
    </>
  );
}
