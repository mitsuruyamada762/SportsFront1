import { Popover, Transition } from '@headlessui/react'
import SwitchIcon from '@/theme2/assets/images/coupon-switch.svg'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSport } from '@/theme2/contexts'
import { sportItems } from '@/theme2/utils/const'

export const SportCatSelect = () => {
    const navigate = useNavigate()
    const { sportState, setIsCategorySelectOpen } = useSport()
    const { isCategorySelectOpen, selectedSport } = sportState

    const handleSportSelect = (sportId: string) => {
        setIsCategorySelectOpen(false)
        // Navigate to the sport page
        navigate(`/sports/${sportId}`)
    }

    return (

        <Popover className="relative">
            <Popover.Button
                onMouseEnter={() => setIsCategorySelectOpen(true)}
                onMouseLeave={() => setIsCategorySelectOpen(false)}
                className={` flex items-center gap-4 hover:bg-[#29A8AC26] rounded-lg py-1 px-3
                ${isCategorySelectOpen ? 'text-white' : 'text-white/90'}
                group inline-flex items-center rounded-md bg-transparent`}
            >
                <div className='flex items-center text-[22px] gap-2 font-extrabold '>
                    <img src={sportItems.find(s => s.id === selectedSport)?.img} alt={sportItems.find(s => s.id === selectedSport)?.name} className="w-5 h-5" />
                    {selectedSport
                        ? sportItems.find(s => s.id === selectedSport)?.name || 'Select Sport'
                        : 'Select Sport'
                    }
                </div>
                <div className='flex items-center gap-1'>
                    <div className='text-[11px]  font-medium'>Change</div>
                    <img src={SwitchIcon} alt="Switch Icon" className="w-6 h-6" />
                </div>

            </Popover.Button>
            <Transition
                show={isCategorySelectOpen}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >

                <Popover.Panel className="absolute left-0 z-10 mt-[2px]  w-[600px] transform px-4 sm:px-0" onMouseLeave={() => setIsCategorySelectOpen(false)} onMouseEnter={() => setIsCategorySelectOpen(true)} >
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 w-full ring-black/5">
                        <div className="bg-white grid grid-cols-3 gap-2 p-2 w-full">
                            {sportItems.map((sport: any, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => handleSportSelect(sport.id)}
                                    className={`flex w-[168px] items-center gap-2 p-2 hover:bg-[#29A8AC26] rounded ${selectedSport === sport.id ? 'bg-[#29A8AC] text-white' : 'text-[#333333]'}`}
                                >

                                    <img src={sport.img} alt={sport.name} className="w-6 h-6" />
                                    <span className="text-[13px]  font-medium">{sport.name}</span>

                                </button>
                            ))}
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}


