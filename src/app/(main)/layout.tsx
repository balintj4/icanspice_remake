import Header from "@/components/ui/header";
import { createClient, getUserSession } from "@/lib/server";
import { cookies, headers } from "next/headers";
import { getCartItems } from "@/managers/getCartItems";
import { getOrCreateCart } from "@/lib/cart";
import { CartProvider } from "@/context/cartContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const headersList = await headers();

  const [categoriesRes, cartItemsRes] = await Promise.all([
    supabase.from("categories").select("*"),

    getCartItems(),
  ]);

  const cartId = cookieStore.get("cart_id")?.value ?? "";
  if (cartId) {
    await getOrCreateCart(cartId);
  }
  const currentPath = headersList.get("referer")
    ? new URL(headersList.get("referer")!).pathname
    : "/";

  const user = await getUserSession();
  const { data: userPublic } = await supabase
    .from("users")
    .select("name")
    .eq("id", user?.id)
    .single();

  return (
    <CartProvider cartId={cartId}>
      <div className="w-full max-w-[1920px]  flex shadow-2xl flex-col">
        <Header
          categories={categoriesRes.data || []}
          cartItems={cartItemsRes}
          currentPath={currentPath}
          cartId={cartId}
          user={userPublic?.name}
        />
        {children}
      </div>
    </CartProvider>
  );
}
