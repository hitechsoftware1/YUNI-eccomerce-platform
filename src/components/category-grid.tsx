import Link from "next/link";
import { categories } from "@/lib/categories";
import { Card, CardContent } from "@/components/ui/card";

export function CategoryGrid() {
  return (
    <section>
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-11">
            {categories.map((category) => (
              <Link
                href={`/category/${category.id}`}
                key={category.id}
                className="group"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-primary/20 md:h-20 md:w-20">
                    <category.icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary md:h-10 md:w-10" />
                  </div>
                  <p className="text-center text-xs font-medium transition-colors group-hover:text-primary md:text-sm">
                    {category.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
