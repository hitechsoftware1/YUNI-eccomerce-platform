
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Building, Target, Eye } from 'lucide-react';
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="pt-16 md:pt-20">
        <div className="relative h-64 md:h-80 w-full">
            <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
                alt="Our Team"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h1 className="text-4xl md:text-6xl font-bold font-headline text-white drop-shadow-lg">
                    About YUNI
                </h1>
            </div>
        </div>

        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold font-headline text-primary">Connecting Uganda, One Click at a Time</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    YUNI is more than just an online marketplace; it's a bustling digital community built to empower Ugandan businesses and delight customers. We started with a simple idea: to create a reliable, convenient, and comprehensive online shopping platform that bridges the gap between local sellers and eager buyers across the country.
                </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                        <Target className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold font-headline">Our Mission</h3>
                    <p className="mt-2 text-muted-foreground">
                        To empower every Ugandan entrepreneur by providing a world-class platform to showcase their products, and to offer our customers unparalleled convenience, variety, and value.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                     <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                        <Eye className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold font-headline">Our Vision</h3>
                    <p className="mt-2 text-muted-foreground">
                        To become the digital heartbeat of commerce in Uganda, fostering economic growth, innovation, and a vibrant online community for everyone.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                     <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                        <Building className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold font-headline">Why YUNI?</h3>
                    <p className="mt-2 text-muted-foreground">
                        We are locally focused, technologically driven, and community-oriented. We understand the unique needs of the Ugandan market and are committed to building a platform that works for you.
                    </p>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
