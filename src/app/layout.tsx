import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from '@/contexts/cart-context';
import { AuthProvider } from '@/contexts/auth-context';
import { InstallPwaBanner } from '@/components/install-pwa-banner';
import { WishlistProvider } from '@/contexts/wishlist-context';

export const metadata: Metadata = {
  title: 'YUNI - Your Online Marketplace',
  description: 'Your one-stop shop for everything you need.',
  manifest: '/manifest.json',
  themeColor: '#FBBF24',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" href="/icon.svg"></link>
      </head>
      <body className="font-body antialiased overflow-x-hidden">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="relative flex min-h-screen flex-col">
                {children}
              </div>
              <Toaster />
              <InstallPwaBanner />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
