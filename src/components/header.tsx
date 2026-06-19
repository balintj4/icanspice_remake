import { supabase } from "@/lib/supabase";
import { HeaderClient } from "./headerClient";

export default async function Header() {
  const { data: categories } = await supabase.from("categories").select("*");

  return <HeaderClient categories={categories || []} />;
}
