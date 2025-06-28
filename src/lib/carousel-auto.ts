
import { useEffect, useRef } from 'react';

export const useAutoCarousel = (intervalMs: number = 6000) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const nextButton = carousel.querySelector('[data-carousel="next"]') as HTMLButtonElement;
    if (!nextButton) return;

    const interval = setInterval(() => {
      nextButton.click();
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return carouselRef;
};
