import React from 'react';
import { Fragment, useState, useRef } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import FootballImg from '../../../assets/images/football.svg';
import Team1Img from '../../../assets/images/team1.png';
import Team2Img from '../../../assets/images/team2.png';
import StreamImg from '../../../assets/images/stream.svg';
import StatsImg from '../../../assets/images/stats.svg';
import './index.scss';
import { TeamInfo } from '../MatchTable';

const people = [
    { name: 'Wade Cooper' },
    { name: 'Arlene Mccoy' },
    { name: 'Devon Webb' },
    { name: 'Tom Cook' },
    { name: 'Tanya Fox' },
    { name: 'Hellen Schmidt' },
]

export const LiveMatchSelectItem: React.FC = () => {
    return (
        <div className="relative mt-1 w-full">
            <Listbox.Button className="relative w-full cursor-default p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75   sm:text-sm">
                <div className="grid grid-cols-[1fr_6fr_1fr_3fr] gap-1 items-center justify-between">
                    <div className='flex items-center justify-start'>
                        <img src={FootballImg} alt="Football" className="w-4 h-4" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='flex items-center gap-2'>
                            <img src={Team1Img} alt="Team    1" className="w-4 h-4" />
                            <span className='text-xs'>FC Barcelona</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <img src={Team2Img} alt="Team 2" className="w-4 h-4" />
                            <span className='text-xs'>Real Madrid</span>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-1'>
                        <div className='text-xs'>0</div>
                        <div className='text-xs'>0</div>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-1'>
                        <div className='flex items-center justify-center gap-1'>
                            <img src={StreamImg} alt="Stream" className="w-4 h-4" style={{ filter: 'brightness(1) invert(0)' }} />
                            <img src={StatsImg} alt="Stats" className="w-4 h-4" style={{ filter: 'brightness(1) invert(0)' }} />
                        </div>
                        <div className='flex items-center text-xs justify-center'>
                            10:00
                        </div>
                    </div>
                </div>
            </Listbox.Button>
        </div>
    )
}

export const LiveMatchSelect: React.FC = () => {
    const [selected, setSelected] = useState(people[0])
    const buttonRef = useRef<HTMLButtonElement>(null)

    const handleButtonClick = (open: boolean) => {
        if (open && buttonRef.current) {
            // If the listbox is open, blur the button to close it
            buttonRef.current.blur()
        }
    }
    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <div className="relative mt-1 w-full">
                    <Listbox.Button
                        ref={buttonRef}
                        onClick={() => handleButtonClick(open)}
                        className="relative w-full cursor-default p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75   sm:text-sm">
                        <div className="grid grid-cols-[1fr_6fr_1fr_3fr] gap-1 items-center justify-between">
                            <div className='flex items-center justify-start'>
                                <img src={FootballImg} alt="Football" className="w-4 h-4" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <TeamInfo logoSrc={Team1Img} teamName="FC Barcelona" />
                                <TeamInfo logoSrc={Team2Img} teamName="Real Madrid" />
                            </div>
                            <div className='flex flex-col items-center justify-center gap-1'>
                                <div>0</div>
                                <div>0</div>

                            </div>
                            <div className='flex flex-col items-center justify-center gap-1'>
                                <div className='flex items-center justify-center gap-1'>
                                    <img src={StreamImg} alt="Stream" className="w-4 h-4" style={{ filter: 'brightness(0) invert(1)' }} />
                                    <img src={StatsImg} alt="Stats" className="w-4 h-4" style={{ filter: 'brightness(0) invert(1)' }} />
                                </div>
                                <div className='flex items-center text-xs justify-center'>
                                    10:00
                                </div>

                            </div>
                        </div>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            {open ? (
                                <ChevronUpIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            ) : (
                                <ChevronDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            )}
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-[530px] w-full overflow-auto rounded-2xl bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {people.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none  ${active ? 'bg-gray-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                >
                                    <LiveMatchSelectItem />
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            )}
        </Listbox>
    )
}

