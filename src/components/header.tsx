import { createClient } from "@/lib/server";
import { HeaderClient } from "./headerClient";

export default async function Header() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("*");

  return <HeaderClient categories={categories || []} />;
}
