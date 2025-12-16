import React from 'react';
import { LiveMatchSelect } from '../../common';
import { livePanelIcons } from '@/theme2/utils/const';
import './index.scss';
import { OddItem } from '@/theme2/components/common/MatchTable';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { ImgList } from '@/theme2/utils/const';

export const LivePanel: React.FC = () => {
    return (
        <div className='live-panel-container'>
            <LiveMatchSelect />
            <div className='live-panel-icons'>
                {livePanelIcons.map((icon) => (
                    <div key={icon.id} className='live-panel-icon'>
                        <img src={icon.img} alt={icon.id} style={{ filter: 'brightness(0) invert(1)' }} />
                    </div>
                ))}
            </div>
            <div className='w-full h-[160px] bg-transparent flex items-center justify-center'>
                <img src={ImgList["Loading"]} alt="Loading" className='w-20 h-20' />
            </div>
            <div className='w-full flex gap-2 items-center'>
                <div className='w-full grid grid-cols-3 gap-0.5'>
                    <OddItem label="1" value="1.20" />
                    <OddItem label="x" value="5.80" />
                    <OddItem label="2" value="1.20" />

                </div>
                <div className='cursor-pointer rounded-md bg-[var(--bg-card-hover)] w-9 h-9 flex items-center justify-center'>
                    <ChevronRightIcon className='w-3 h-3' />

                </div>
            </div>
        </div>
    );
};