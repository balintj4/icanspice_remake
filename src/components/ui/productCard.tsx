import { createClient } from "@/lib/server";
import ToCartButton from "@/components/ui/addToCartButton";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

export default async function ProductCard({
  path,
  productId,
}: {
  path: string;
  productId: number;
}) {
  const supabase = await createClient();
  const { data: productDisplay } = await supabase
    .from("products")
    .select("id, price, name")
    .eq("id", productId)
    .eq("hidden", false)
    .single();

  if (!productDisplay) return;

  const { data: productThumbnail } = await supabase
    .from("product_imgs")
    .select("url")
    .eq("product_id", productId)
    .eq("thumbnail", true)
    .single();

  return (
    <Card className="relative w-full w-50 shadow-xl">
      <img
        src={productThumbnail?.url}
        alt="Event cover"
        className="relative z-20 w-full object-cover h-50 w-50"
      />
      <div className="pb-2">
        <CardTitle className="ml-6 text-[1rem]">
          {productDisplay.name}
        </CardTitle>
        <CardDescription className="ml-6 text-[0.9rem]">
          {productDisplay.price / 100} €
        </CardDescription>
      </div>
      <ToCartButton productId={productId} path={path} />
    </Card>
  );
}
