import React, { useState } from 'react';
import "./index.scss";
import { gameFilterItems } from '@/theme2/utils/const';
import { GameFilterItem } from '@/theme2/types';

interface GameFilterProps {
    onFilterChange?: (selectedFilter: string) => void;
    initialFilter?: string;
}

export const GameFilter: React.FC<GameFilterProps> = ({ 
    onFilterChange, 
    initialFilter = 'soccer' 
}) => {
    const [activeFilter, setActiveFilter] = useState<string>(initialFilter);

    const handleFilterClick = (filterValue: string) => {
        setActiveFilter(filterValue);
        onFilterChange?.(filterValue);
    };

    return (
        <div className="betting-filter">
            {gameFilterItems.map((item: GameFilterItem) => {
                const isActive = activeFilter === item.value;
                return (
                    <div 
                        className={`betting-filter-item ${isActive ? 'active' : ''}`}
                        key={item.value}
                        onClick={() => handleFilterClick(item.value)}
                    >
                        <div className='img-div'>
                            <img src={item.img} alt={item.label} />
                            <div className='badge'>2</div>
                        </div>
                        <div className='label'>{item.label}</div>
                    </div>
                );
            })}
        </div>
    );
};