import React, { Fragment } from 'react';
import "./index.scss";
import { Menu } from '@headlessui/react';
import { Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useSport } from '../../../contexts/SportContext';
import FilterImg from '@/theme2/assets/images/button-filter-new.svg';


export const CouponOrder: React.FC = () => {
    const { sportState, setCouponOrder } = useSport();
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex items-center text-[#333333] w-full justify-center  game-filter-btn ">
                    {({ open }) => (
                        <>
                            <img src={FilterImg} alt="Filter" className='w-4 h-4' />
                            {sportState.couponOrder === 'time' ? 'Time First' : 'Popular First'}
                            {open ? (
                                <ChevronUpIcon
                                    className="-mr-1 h-4 w-4 text-[#333333] "
                                    aria-hidden="true"
                                />
                            ) : (
                                <ChevronDownIcon
                                    className="-mr-1 h-4 w-4 text-[#333333] "
                                    aria-hidden="true"
                                />
                            )}
                        </>
                    )}

                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 p-2 gap-[2px] flex flex-col rounded-lg bg-white  shadow-lg ring-1 ring-black/5 focus:outline-none w-[125px]">
                    <Menu.Item>
                        {() => (
                            <button 
                                className={`rounded-lg text-[12px] text-[#333333] ${sportState.couponOrder === 'time' ? 'bg-[#29a8ac26]' : 'bg-white'} hover:bg-[#29a8ac26] py-3 px-2 flex justify-start items-center h-[36px]`}
                                type='button' 
                                onClick={() => setCouponOrder('time')}
                            >
                                Time First
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {() => (
                            <button 
                                className={`rounded-lg text-[12px] text-[#333333] ${sportState.couponOrder === 'popular' ? 'bg-[#29a8ac26]' : 'bg-white'} hover:bg-[#29a8ac26] py-3 px-2 flex justify-start items-center h-[36px]`}
                                type='button' 
                                onClick={() => setCouponOrder('popular')}
                            >
                                Popular First
                            </button>
                        )}
                    </Menu.Item>

                </Menu.Items>
            </Transition>
        </Menu >
    )
}