import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PlusCircle } from 'lucide-react';
import { ProductsTable } from "./components/products-table";
import { allProducts } from "@/lib/products";

export default function ProductsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductsTable products={allProducts} />
        </CardContent>
      </Card>
    </div>
  )
}
