import React, { useState, useRef, useEffect } from 'react';
import { CarouselCard } from '@/theme2/types';
import MatchCard from '../ui/MatchCard';
import PromoCard from '../ui/PromoCard';
import './Carousel.scss';


interface CarouselProps {
  cards: CarouselCard[];
}

export const Carousel: React.FC<CarouselProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const cardWidth = 400;
  const gap = 16;
  const visibleCards = 3;

  const maxIndex = Math.max(0, cards.length - visibleCards);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => {
      // If at the end, loop back to the beginning
      if (prev >= maxIndex) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => {
      // If at the beginning, loop to the end
      if (prev <= 0) {
        return maxIndex;
      }
      return prev - 1;
    });
  };

  // Auto-slide functionality
  useEffect(() => {
    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 3000); // Auto-slide every 3 seconds
    };

    const stopAutoSlide = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, [currentIndex, maxIndex, isTransitioning]);

  // Pause auto-slide on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const translateX = -(currentIndex * (cardWidth + gap) * 0.75);

  return (
    <div
      className="carousel-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="carousel-wrapper">
        <button
          className="carousel-nav carousel-nav-left"
          onClick={prevSlide}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="carousel-track" ref={carouselRef}>
          <div
            className="carousel-slides"
            style={{
              transform: `translateX(${translateX}px)`,
              transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none'
            }}
          >
            {cards.map((card) => (
              <div key={card.id} className="carousel-card">
                {card.type === 'match' ? (
                  <MatchCard card={card} />
                ) : (
                  <PromoCard card={card} />
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          className="carousel-nav carousel-nav-right"
          onClick={nextSlide}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};




