import { createClient } from "@/lib/server";
import { HeaderClient } from "../clients/headerClient";

export default async function Header() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("*");

  return <HeaderClient categories={categories || []} />;
}
