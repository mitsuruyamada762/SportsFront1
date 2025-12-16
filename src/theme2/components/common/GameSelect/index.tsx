import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { gameSelectItems } from '@/theme2/utils/const'
import { useLiveSchedule } from '@/theme2/contexts'
import './index.scss'


export const GameSelect: React.FC = () => {

    const { selectedGame, handleGameFilterChange } = useLiveSchedule()

    const getSelectedGame = () => {
        const selectedItem = gameSelectItems.find(item => item.value === selectedGame)
        return selectedItem
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex items-center w-full justify-center  game-filter-btn ">
                    {({ open }) => (
                        <>
                            {selectedGame !== 'all' && (
                                <img src={getSelectedGame()?.img} alt={getSelectedGame()?.label} className='w-4 h-4' />
                            )}
                            <div className=''>
                                {getSelectedGame()?.label}
                            </div>
                            <div className='badge rounded-full bg-[#ffffff14] opacity-70 min-w-[27px] aspect-square flex items-center justify-center'>
                                {getSelectedGame()?.badge}
                            </div>
                            {open ? (
                                <ChevronUpIcon
                                    className="-mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                    aria-hidden="true"
                                />
                            ) : (
                                <ChevronDownIcon
                                    className="-mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
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
                <Menu.Items className="absolute right-0 mt-2 p-2 gap-[1px] flex flex-col rounded-lg bg-white  shadow-lg ring-1 ring-black/5 focus:outline-none w-[190px]">

                    {gameSelectItems.map((item) => (
                        <Menu.Item key={item.value}>
                            {({ }) => (
                                <button
                                    className={`game-filter-item justify-between   ${selectedGame === item.value ? 'active' : ''
                                        }`}
                                    onClick={() => handleGameFilterChange(item.value)}
                                >
                                    <div className='flex items-center gap-2'>
                                        {
                                            item.img != '' && (
                                                <img src={item.img} alt={item.label} className='w-4 h-4' />)
                                        }
                                        {item.label}
                                    </div>
                                    <div className='badge rounded-full bg-[#20273514] font-bold text-[13px] opacity-70 min-w-[27px] aspect-square flex items-center justify-center'>
                                        {item.badge}
                                    </div>
                                </button>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu >
    )
}