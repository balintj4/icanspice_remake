import { createClient } from "@/lib/server";
import ToCartButton from "@/components/ui/toCartButton";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const cardVariants = {
  default: {
    card: "relative w-full w-50 shadow-xl",
    img: "relative z-20 w-full object-cover h-50 w-50",
    textArea: "pb-2",
    heading: "ml-6 text-[1rem]",
    price: "ml-6 text-[0.9rem]",
    buttonDefault: "default",
    buttonActive: "default",
  } as const,
};

export default async function ProductCard({
  path,
  productId,
  variant = "default",
}: {
  path: string;
  productId: number;
  variant?: keyof typeof cardVariants;
}) {
  const supabase = await createClient();
  const style = cardVariants[variant];

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
    <Card className={style.card}>
      <img
        src={productThumbnail?.url}
        alt="Event cover"
        className={style.img}
      />
      <div className={style.textArea}>
        <CardTitle className={style.heading}>{productDisplay.name}</CardTitle>
        <CardDescription className={style.price}>
          {productDisplay.price / 100} €
        </CardDescription>
      </div>
      <ToCartButton
        productId={productId}
        path={path}
        variantDefault={style.buttonDefault}
        variantActive={style.buttonActive}
      />
    </Card>
  );
}
