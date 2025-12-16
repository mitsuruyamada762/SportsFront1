import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Team1Img from '@/theme2/assets/images/team1.png';
import { OddItem, TeamInfo } from '@/theme2/components/common/MatchTable';
import FraImg from '@/theme2/assets/images/france.png';
import Team2Img from '@/theme2/assets/images/team2.png';
import LiveImg from '@/theme2/assets/images/stream.svg';
import StatImg from '@/theme2/assets/images/stats.svg';
import './index.scss';

export const SportRightAccordionItem: React.FC = () => {
    return (
        <div className='flex flex-col acc-item items-start gap-2 w-full bg-[#ffffff14] p-3'>
            <TeamInfo logoSrc={FraImg} teamName={"France - Pro"} />
            <div className='grid grid-cols-[6fr_1fr_2fr] w-full '>
                <div className='text-[12px] text-white flex gap-1 items-center font-bold'>
                    <img src={Team1Img} alt="Team 1" className='w-4 h-4' />
                    Millonarios FC
                </div>
                <div className='text-[12px] text-white'>
                    1
                </div>
                <div className='text-[12px] text-white flex gap-1 items-center'>
                    <img src={LiveImg} alt="Live" className='w-4 h-4' style={{ filter: 'brightness(0) invert(1)' }} />
                    <img src={StatImg} alt="Stats" className='w-4 h-4' style={{ filter: 'brightness(0) invert(1)' }} />
                </div>
            </div>
            <div className='grid grid-cols-[6fr_1fr_2fr] w-full'>
                <div className='text-[12px] text-white flex gap-1 items-center font-bold'>
                    <img src={Team2Img} alt="Team 1" className='w-4 h-4' />
                    CRAB AL
                </div>
                <div className='text-[12px] text-white'>
                    1
                </div>
                <div className='text-[12px] text-white'>
                    45:00
                </div>
            </div>
            <div className='w-full grid gap-0.5 grid-cols-3' >
                <OddItem label="1" value="1" />
                <OddItem label="X" value="X" />
                <OddItem label="2" value="2" />

            </div>
        </div>
    )
}

export const SportRightAccordion: React.FC<{title: string}> = ({title}) => {
    return (
        <Disclosure defaultOpen={true}>
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-transparent px-4 py-2 text-left text-sm font-medium text-white hover:bg-transparent focus:outline-none focus-visible:ring">
                        <span className='opacity-50 text-[12px]'>{title}</span>
                        <ChevronUpIcon
                            className={`${open ? 'rotate-180 transform' : ''
                                } h-5 w-5 text-white`}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pb-2 pt-4  flex flex-col gap-0.5 rounded-xl overflow-hidden">
                        <SportRightAccordionItem />
                        <SportRightAccordionItem />
                        <SportRightAccordionItem />
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>


    )
}
