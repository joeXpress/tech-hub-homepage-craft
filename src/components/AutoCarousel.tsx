
import { useEffect, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface AutoCarouselProps {
  images: string[];
  alt: string;
  interval?: number;
  className?: string;
}

const AutoCarousel = ({ images, alt, interval = 6000, className = "" }: AutoCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let currentIndex = 0;
    const totalImages = images.length;

    const autoSlide = () => {
      const emblaApi = (carousel as any).__embla__;
      if (emblaApi) {
        currentIndex = (currentIndex + 1) % totalImages;
        emblaApi.scrollTo(currentIndex);
      }
    };

    const intervalId = setInterval(autoSlide, interval);

    return () => clearInterval(intervalId);
  }, [images.length, interval]);

  return (
    <div ref={carouselRef}>
      <Carousel className={`w-full h-full ${className}`}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <img
                src={image}
                alt={`${alt} ${index + 1}`}
                className="w-full h-48 object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default AutoCarousel;
