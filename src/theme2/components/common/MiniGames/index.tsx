import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './index.scss';
import { ImgList } from '@/theme2/utils';

const miniGames = [
    { id: 1, name: 'Aviator', color: '#FF6B6B' },
    { id: 2, name: 'Mines', color: '#4ECDC4' },
    { id: 3, name: 'Dice', color: '#FFD93D' },
    { id: 4, name: 'Plinko', color: '#A8E6CF' },
    { id: 5, name: 'Crash', color: '#FF8B94' },
    { id: 6, name: 'Wheel', color: '#95E1D3' },
];

export const MiniGames: React.FC = () => {
    return (
        <div className='mini-games-container'>
            <div className='mini-games-header'>
                <h2 className='text-[13px] font-bold'>Mini Games</h2>
            </div>
            <div className="w-full h-[240px] bg-gradient-to-b from-[#333333] to-[#000000] rounded-md game-preview flex items-center justify-center">
                <img src={ImgList["Loading"]} alt="Loading" className='w-20 h-20' />
            </div>

            <div className="mini-games-swiper">
                
                <Swiper
                    spaceBetween={12}
                    breakpoints={{
                        320: { slidesPerView: 2.5 },
                        640: { slidesPerView: 3.5 },
                        768: { slidesPerView: 4.5 },
                        1024: { slidesPerView: 5.5 },
                    }}
                    freeMode={true}
                >
                    {miniGames.map((game) => (
                        <SwiperSlide key={game.id}>
                            <div className="game-card">
                                <div
                                    className="game-card-preview"
                                    style={{ backgroundColor: game.color }}
                                >
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
