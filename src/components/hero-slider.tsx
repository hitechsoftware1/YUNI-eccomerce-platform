"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allHeroSlides } from "@/lib/banners";

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = allHeroSlides;

  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  React.useEffect(() => {
    if (slides.length <= 1) return;
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide, slides.length]);
  
  if (!slides || slides.length === 0) {
    return (
        <section className="relative h-[300px] w-full overflow-hidden md:h-[400px] lg:h-[500px] bg-secondary flex items-center justify-center">
            <p className="text-muted-foreground">No hero banners available.</p>
        </section>
    )
  }

  return (
    <section className="relative h-[300px] w-full overflow-hidden md:h-[400px] lg:h-[500px]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.title}
            fill
            className="object-cover"
            data-ai-hint={slide.dataAiHint}
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
            <h2 className="text-3xl font-bold font-headline md:text-5xl lg:text-6xl">
              {slide.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg md:text-xl">
              {slide.subtitle}
            </p>
            <Button asChild className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href={slide.link}>Shop Now</Link>
            </Button>
          </div>
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 text-white hover:bg-white/30 hover:text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 text-white hover:bg-white/30 hover:text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentSlide ? "w-4 bg-primary" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
