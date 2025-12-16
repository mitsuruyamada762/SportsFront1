import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import './index.scss';

import ArrowLeftImg from '@/theme2/assets/images/arrow-left-new.svg';
import ArrowRightImg from '@/theme2/assets/images/arrow-right-new.svg';

export interface NavigableSwiperProps<T> {
  items: T[];
  variant: string;
  renderSlide: (item: T, index: number) => React.ReactNode;
  spaceBetween?: number;
  slidesPerView?: 'auto' | number;
  className?: string;
  keyExtractor?: (item: T, index: number) => string | number;
  showNavigation?: boolean;
  onSlideChange?: (swiper: SwiperType) => void;
}

export function NavigableSwiper<T>({
  items,
  renderSlide,
  variant = "default",
  spaceBetween = 4,
  slidesPerView = 'auto',
  keyExtractor = (_, index) => index,
  showNavigation = true,
  onSlideChange,
}: NavigableSwiperProps<T>) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const handleSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    onSlideChange?.(swiper);
  };

  return (
    <div className={`navigable-swiper-container ${variant}`}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        onSwiper={handleSwiper}
        onSlideChange={handleSlideChange}
      >
        {items.map((item, index) => (
          <SwiperSlide key={String(keyExtractor(item, index))} style={{ width: 'auto' }}>
            {renderSlide(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>
      {showNavigation && !(isBeginning && isEnd) && (
        <div className={`swiper-navigation-buttons ${variant}`}>
          <button
            type='button'
            className='swiper-btn-prev'
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous"
            disabled={isBeginning}
          >
            <img src={ArrowLeftImg} alt="Previous" />
          </button>
          <button
            type='button'
            className='swiper-btn-next'
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next"
            disabled={isEnd}
          >
            <img src={ArrowRightImg} alt="Next" />
          </button>
        </div>
      )
      }
    </div >
  );
}

