import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { timeFilterItems } from '@/theme2/utils/const'
import { useLiveSchedule } from '@/theme2/contexts'
import './index.scss'

export const TimeFilter = () => {
    const { selectedTimeFilter, handleTimeFilterChange } = useLiveSchedule()

    const getSelectedLabel = () => {
        const selectedItem = timeFilterItems.find(item => item.value === selectedTimeFilter)
        return selectedItem ? selectedItem.label : 'All'
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex items-center  justify-between  time-filter-btn ">
                    {({ open }) => (
                        <>
                            {getSelectedLabel()}
                            {open ? (
                                <ChevronUpIcon
                                    className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                                    aria-hidden="true"
                                />
                            ) : (
                                <ChevronDownIcon
                                    className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
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
                <Menu.Items className="absolute left-0 mt-2 p-2 gap-[1px] flex flex-col rounded-lg bg-white  shadow-lg ring-1 ring-black/5 focus:outline-none">

                    {timeFilterItems.map((item) => (
                        <Menu.Item key={item.value}>
                            {({ }) => (
                                <button
                                    className={`time-filter-item  ${selectedTimeFilter === item.value ? 'active' : ''
                                        }`}
                                    onClick={() => handleTimeFilterChange(item.value)}
                                >
                                    {item.label}
                                </button>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu >
    )
}

