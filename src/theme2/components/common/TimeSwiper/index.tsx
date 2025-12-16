import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getDaysFromTodayToSunday } from '@/theme2/utils/fns';
import ClockImg from '@/theme2/assets/images/clock-new.svg';
import CalendarImg from '@/theme2/assets/images/calendar-new.svg';
import 'swiper/css';
import './index.scss';

interface TimeSwiperProps {
    onTimeSelect?: (selectedTime: string) => void;
}

export const TimeSwiper: React.FC<TimeSwiperProps> = ({ onTimeSelect }) => {
    const days = getDaysFromTodayToSunday();
    const [selectedTime, setSelectedTime] = useState<string>('3 hours');

    const handleTimeSelect = (timeValue: string) => {
        setSelectedTime(timeValue);
        onTimeSelect?.(timeValue);
    };

    return (
        <div className='time-swiper-container'>
            <Swiper
                spaceBetween={10}
                breakpoints={{
                    320: { slidesPerView: 1.2 },
                    640: { slidesPerView: 2.5 },
                    768: { slidesPerView: 3.5 },
                    1024: { slidesPerView: 4.5 },
                    1368: { slidesPerView: 5.5 },
                }}
                freeMode={true}
            >
                <SwiperSlide>
                    <button
                        type='button'
                        onClick={() => handleTimeSelect('3 hours')}
                        className={`rounded-3xl h-9 px-4 text-[#333333] py-2 flex items-center gap-2 justify-center text-[13px] transition-colors ${selectedTime === '3 hours'
                                ? 'bg-[#29a8ac26]'
                                : ' bg-[#0d38590f] hover:bg-[#0d38591a]'
                            }`}
                    >
                        <img src={ClockImg} width={16} height={16} />
                        3 hours
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button
                        type='button'
                        onClick={() => handleTimeSelect('12 hours')}
                        className={`rounded-3xl h-9 text-[#333333] px-4 py-2 flex items-center gap-2 justify-center text-[13px] transition-colors ${selectedTime === '12 hours'
                                ? 'bg-[#29a8ac26]'
                                : ' bg-[#0d38590f] hover:bg-[#0d38591a]'
                            }`}
                    >
                        <img src={ClockImg} width={16} height={16} />
                        12 hours
                    </button>
                </SwiperSlide>
                {days.map((day, index) => {
                    const dayValue = day.isToday ? 'Today' : day.isTomorrow ? 'Tomorrow' : `${day.day} ${day.date}`;
                    return (
                        <SwiperSlide key={index}>
                            <button
                                onClick={() => handleTimeSelect(dayValue)}
                                className={`rounded-3xl text-[#333333]  h-9 px-4 py-2 flex items-center gap-2 justify-center text-[13px] transition-colors ${selectedTime === dayValue
                                        ? 'bg-[#29a8ac26] text-white font-bold'
                                        : ' bg-[#0d38590f] hover:bg-[#0d38591a]'
                                    }`}
                            >
                                <img src={CalendarImg} width={16} height={16} />
                                <div>
                                    {day.day} {day.isToday || day.isTomorrow ? '' : day.date}
                                </div>
                            </button>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};