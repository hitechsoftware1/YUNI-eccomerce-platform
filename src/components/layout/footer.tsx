import Link from "next/link";
import { ShoppingBag, Twitter, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold font-headline text-primary">
                YUNI
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your one-stop shop for everything you need. Quality products,
              unbeatable prices.
            </p>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Flash Sales
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">About YUNI</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Contact Us</h3>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>123 Yuni Avenue, Commerce City, 12345</p>
              <p>Email: support@yuni.com</p>
              <p>Phone: +256740522738</p>
              <div className="flex space-x-4 mt-4">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} YUNI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
