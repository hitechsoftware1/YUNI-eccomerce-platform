import Link from "next/link";
import Image from "next/image";
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
                  <div className="relative h-14 w-14 overflow-hidden rounded-full transition-all group-hover:ring-2 group-hover:ring-primary/80 md:h-20 md:w-20">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      data-ai-hint={category.dataAiHint}
                      sizes="(max-width: 768px) 14vw, 80px"
                    />
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
