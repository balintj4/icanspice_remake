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
    card: "relative w-full w-50 shadow-xl flex-shrink-0",
    img: "relative z-20 w-full object-cover h-50 w-50",
    textArea: "pb-2",
    heading: "ml-2 text-[1rem] max-w-40 truncate",
    price: "ml-2 text-[0.8rem] font-mono",
    content: "mx-auto",
    buttonDefault: "default",
    buttonActive: "default",
  } as const,
  cartDropdown: {
    card: "relative w-full h-20 w-70 flex-row shadow-md mx-auto flex-shrink-0",
    img: "relative z-20 object-cover h-20 w-20",
    textArea: "pb-2",
    heading: "mt-1 ml-2 text-sm max-w-40 truncate",
    price: "ml-2 text-xs font-mono",
    content: "",
    buttonDefault: "ghost",
    buttonActive: "cartDropdown",
  } as const,
  cartShowcase: {
    card: "relative w-full h-25 w-90% flex-row shadow-md mx-auto flex-shrink-0",
    img: "relative z-20 object-cover h-25 w-25",
    textArea: "pb-4",
    heading: "mt-1 ml-2 text-sm max-w-80 truncate",
    price: "ml-2 text-xs font-mono",
    content: "",
    buttonDefault: "ghost",
    buttonActive: "cartDropdown",
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
      <div className={style.content}>
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
      </div>
    </Card>
  );
}
