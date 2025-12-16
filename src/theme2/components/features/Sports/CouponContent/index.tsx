import React, { useState } from 'react';
import { SwitchComponent, TimeSwiper, Filter } from '@/theme2/components/common';
import "./index.scss";
import FrFlagImg from '@/theme2/assets/images/france.png';
import StreamImg from '@/theme2/assets/images/stream.svg';
import { CouponOrder } from '@/theme2/components';
import { FilterProvider } from '@/theme2/contexts';
import { CouponDataItem } from './CouponDataItem';


export const CouponContent: React.FC = () => {
    const [liveStreamEnabled, setLiveStreamEnabled] = useState(false);
    return (
        <FilterProvider>

            <div className='coupon-content-container bg-white'>
                <TimeSwiper />
                <div className="flex justify-between gap-2 pl-3 pr-2">
                    <div className='flex items-center gap-2'>
                        <div className={`w-6 h-6 ${liveStreamEnabled ? 'bg-[#53a5aa]' : 'bg-[#0d385933]'}`}
                            style={{ mask: `url(${StreamImg}) no-repeat center center / contain` }} />
                        <SwitchComponent enabled={liveStreamEnabled} setEnabled={() => setLiveStreamEnabled(!liveStreamEnabled)} enabledBgColor='#53a5aa' disabledBgColor='#0d385933' enabledBallColor='#fff' disabledBallColor='#fff' />
                        <CouponOrder />

                    </div>
                    <div>
                        <Filter variant='white' />
                    </div>
                </div>
                <CouponDataItem
                    flagImage={FrFlagImg}
                    flagAlt="France"
                    leagueName="Czech Republic - Liga Pro"
                    marketLabels={[
                        'Match Winner',
                        'Match Total Points',
                        'Asian Handicap - Match Games'
                    ]}
                    comp="other"
                    variant="white"
                />
                <CouponDataItem
                    flagImage={FrFlagImg}
                    flagAlt="France"
                    leagueName="Czech Republic - Liga Pro"
                    marketLabels={[
                        'Match Winner',
                        'Match Total Points',
                        'Asian Handicap - Match Games'
                    ]}
                    comp="other"
                    variant="white"
                />
                <CouponDataItem
                    flagImage={FrFlagImg}
                    flagAlt="France"
                    leagueName="Czech Republic - Liga Pro"
                    marketLabels={[
                        'Match Winner',
                        'Match Total Points',
                        'Asian Handicap - Match Games'
                    ]}
                    comp="other"
                    variant="white"
                />
            </div>
        </FilterProvider>
    );
};