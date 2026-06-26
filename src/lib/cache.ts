import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/server";

export const getCategories = unstable_cache(
  async () => {
    const supabase = await createClient();
    const { data } = await supabase.from("categories").select("*");
    return data;
  },
  ["categories"],
  { revalidate: 3600 },
);

export const getCachedProduct = async (slug: string) => {
  return await unstable_cache(
    async () => {
      const supabase = await createClient();
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();
      return data;
    },
    ['product', slug], 
    { 
      revalidate: 3600, 
      tags: [`product-${slug}`] 
    }
  )();
};