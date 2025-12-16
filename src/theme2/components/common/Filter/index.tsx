import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Market_tunerSVG from '@/theme2/assets/images/market_tuner.svg'
import { useClickOutside } from '@/theme2/hooks/useClickOutside'
import { useFilter } from '@/theme2/contexts/FilterContext'
import ResetSVG from '@/theme2/assets/images/reset.svg'
import './index.scss'
import { filterItems1, filterItems2, filterItems3 } from '@/theme2/utils/const'

const FilterItem = ({
    children,
    className,
    isActive,
    onClick
}: {
    children: React.ReactNode,
    className?: string,
    isActive?: boolean,
    onClick?: () => void
}) => {
    return (
        <button
            type='button'
            className={`flex items-center justify-center filter-btn gap-2 ${isActive ? 'active' : ''} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export interface FilterProps {
  variant?: 'default' | 'white';
}

export default function Filter({ variant = 'default' }: FilterProps) {
    const { selectedFilters, handleFilterToggle, resetToDefault } = useFilter()
    const [isOpen, setIsOpen] = useState(false)

    const menuRef = useClickOutside<HTMLDivElement>(() => {
        setIsOpen(false)
    })

    const handleMenuButtonClick = () => {
        setIsOpen(!isOpen)
    }

    const handlePredefinedClick = () => {
        resetToDefault()
    }

    // Check if any filter has changed from default state
    const defaultFilters = {
        column1: 'full_time_result',
        column2: 'goals_over_under',
        column3: 'both_teams_to_score'
    }

    const hasFiltersChanged = 
        selectedFilters.column1 !== defaultFilters.column1 ||
        selectedFilters.column2 !== defaultFilters.column2 ||
        selectedFilters.column3 !== defaultFilters.column3

    return (
        <Menu as="div" className=" inline-block text-left relative">
            <Menu.Button
                type="button"
                className='market-tuner-button inline-flex w-full relative'
                onClick={handleMenuButtonClick}
            >
                <img 
                    src={Market_tunerSVG} 
                    style={{ filter: variant === 'white' ? 'brightness(0) invert(0)' : 'brightness(0) invert(1)' }}
                />
                {hasFiltersChanged && (
                    <div className="filter-badge">
                        <div className="filter-badge-dot"></div>
                    </div>
                )}
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                show={isOpen}
            >
                <div
                    ref={menuRef}
                    className='bg-white absolute mt-2 z-[50] w-max right-0 min-w-[400px] shadow-xl  rounded-2xl'
                >
                    <div className='flex flex-col  '>
                        <div className="grid grid-cols-3 gap-2 p-4 pb-2">
                            <div className='border-r border-gray-200 gap-4 flex flex-col pr-2'>
                                {filterItems1.map((item) => (
                                    <FilterItem
                                        key={item.value}
                                        isActive={selectedFilters.column1 === item.value}
                                        onClick={() => handleFilterToggle(item.value, 'column1')}
                                    >
                                        {item.label}
                                    </FilterItem>
                                ))}
                            </div>
                            <div className='border-r border-gray-200 gap-4 flex flex-col pr-2'>
                                {filterItems2.map((item) => (
                                    <FilterItem
                                        key={item.value}
                                        isActive={selectedFilters.column2 === item.value}
                                        onClick={() => handleFilterToggle(item.value, 'column2')}
                                    >
                                        {item.label}
                                    </FilterItem>
                                ))}
                            </div>
                            <div className='gap-4 flex flex-col'>
                                {filterItems3.map((item) => (
                                    <FilterItem
                                        key={item.value}
                                        isActive={selectedFilters.column3 === item.value}
                                        onClick={() => handleFilterToggle(item.value, 'column3')}
                                    >
                                        {item.label}
                                    </FilterItem>
                                ))}
                            </div>
                        </div>
                        <div className='bg-[#0d38590f] flex justify-end p-4'>
                            <button 
                                type='button' 
                                className='predefined-filters-button'
                                onClick={handlePredefinedClick}
                            >
                                Predefined Options 
                                <img src={ResetSVG} width={16} height={16} />
                            </button>
                        </div>

                    </div>

                </div>
            </Transition>
        </Menu>
    )
}
