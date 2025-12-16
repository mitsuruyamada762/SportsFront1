import React from 'react';
import { MatchEventRow } from '@/theme2/components/common/MatchTable';
import "./index.scss";
interface CouponDataItemProps {
    flagImage: string;
    flagAlt: string;
    leagueName: string;
    marketLabels: string[];
    comp?: 'other' | string;
    variant?: 'white' | 'default';
}

export const CouponDataItem: React.FC<CouponDataItemProps> = ({
    flagImage,
    flagAlt,
    leagueName,
    marketLabels,
    comp = 'other',
    variant = 'white'
}) => {
    return (
        <div className='coupon-data-item pt-3 w-full '>
            <div className='coupon-data-header mb-3 px-3'>
                <div className='coupon-data-header-left !justify-start flex'>
                    <img src={flagImage} alt={flagAlt} width={16} height={16} />
                    <div className='text-[13px] text-[#333333]'>{leagueName}</div>
                </div>
                {marketLabels.map((label, index) => (
                    <div
                        key={index}
                        className='text-[13px] text-[#333333] opacity-70 flex items-center justify-center'
                    >
                        {label}
                    </div>
                ))}
            </div>
            <div className='flex coupon-data-items'>
                <MatchEventRow comp={comp} variant={variant} />
            </div>
        </div>
    );
};

