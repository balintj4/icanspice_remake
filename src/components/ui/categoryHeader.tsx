import { buttonVariants } from "./button";
import Link from "next/link";
import { createClient } from "@/lib/server";

const headerVariants = {};
export default async function CategoryHeader() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("name, slug")
    .is("deleted_at", null);

  if (!categories) return;

  return (
    <nav className="flex flex-row justify-around min-h-10 px-10 py-2 bg-secondary mt-0 sticky items-center">
      {categories.map((cat) => (
        <Link
          className={
            buttonVariants({ variant: "secondary", size: "sm" }) +
            " text-xs text-muted-foreground hover:bg-secondary hover:text-sidebar-primary"
          }
          key={cat.name}
          href={`/obchod/${cat.slug}`}
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  );
}
