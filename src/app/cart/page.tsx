'use client';

import { useCart } from '@/contexts/cart-context';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, itemCount, cartTotal } = useCart();

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Your Cart</h1>

        {itemCount === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center text-center">
            <ShoppingCart className="h-24 w-24 text-muted-foreground" />
            <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="mt-6">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-3">
            <section className="lg:col-span-2">
              <ul role="list" className="divide-y divide-border">
                {cartItems.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover object-center"
                        data-ai-hint={product.dataAiHint}
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium">
                          <h3>
                            <Link href={`/products/${product.id}`}>{product.name}</Link>
                          </h3>
                          <p className="ml-4">UGX {product.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(product.id, product.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-4 font-bold text-base">{product.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(product.id, product.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex">
                          <Button
                            variant="ghost"
                            type="button"
                            className="font-medium text-primary hover:text-primary/80"
                            onClick={() => removeFromCart(product.id)}
                          >
                             <Trash2 className="h-4 w-4 mr-1" /> Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section className="rounded-lg bg-secondary p-6 lg:col-span-1 h-fit">
              <h2 className="text-lg font-medium">Order summary</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Subtotal</p>
                  <p className="text-sm font-medium">UGX {cartTotal.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Shipping estimate</p>
                  <p className="text-sm font-medium">UGX 5,000</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-base font-medium">
                  <p>Order total</p>
                  <p>UGX {(cartTotal + 5000).toLocaleString()}</p>
                </div>
              </div>
              <Button asChild className="mt-6 w-full" size="lg">
                <Link href="/checkout">Checkout</Link>
              </Button>
            </section>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
