import { createClient } from "@/lib/server";

export async function getProdCat(slug_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_products_by_cat", {
    target_slug: slug_id,
  });

  if (error) {
    console.error("Database error:", error);
    return []; // Vráť prázdne pole, nie 0
  }

  return data || [];
}
