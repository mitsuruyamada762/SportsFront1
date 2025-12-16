import React, { useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import TeamImg from '@/theme2/assets/images/team1.png';
import "./index.scss"
import { MatchEventRow, TeamInfo } from '../MatchTable';

interface BettingAccordionProps {
    variant?: 'default' | 'white';
    title?: string;
    isOpen?: boolean;
    onToggle?: (isOpen: boolean) => void;
    controlled?: boolean;
}

const BettingAccordion: React.FC<BettingAccordionProps> = ({
    variant = 'default',
    isOpen = false,
    onToggle,
    controlled = false,
}) => {
    const [internalOpen, setInternalOpen] = useState(false);

    // Use controlled state if provided, otherwise use internal state
    const isAccordionOpen = controlled ? isOpen : internalOpen;

    const handleToggle = () => {
        const newState = !isAccordionOpen;
        if (controlled && onToggle) {
            onToggle(newState);
        } else {
            setInternalOpen(newState);
        }
    };

    return (
        <div className={`betting-accordion-container ${variant === 'white' ? 'white-variant' : ''}`}>
            <div className="betting-accordion-wrapper">
                <button
                    className="betting-accordion-button"
                    onClick={handleToggle}
                    style={{ gridTemplateColumns: isAccordionOpen ? '2fr 1fr 1fr 1fr auto' : '1fr auto' }}
                >
                    <div className='betting-accordion-content' >
                        <div className='betting-accordion-title'>
                            <TeamInfo logoSrc={TeamImg} teamName={"Mexico - Liga MX"} />
                        </div>
                    </div>
                    {
                        isAccordionOpen && <>
                            <div className='betting-accordion-spacer'>
                                Full Time Result
                            </div>
                            <div className='betting-accordion-spacer'>
                                Goals Over/Under
                            </div>
                            <div className='betting-accordion-spacer'>
                                Both teams to score
                            </div>
                        </>
                    }

                    <ChevronUpIcon
                        className={`betting-accordion-chevron ${isAccordionOpen ? 'rotate-180 transform' : ''}`}
                    />
                </button>
                <div className={`betting-accordion-panel ${isAccordionOpen ? 'open' : ''}`}>
                    <div className="betting-accordion-main-content flex flex-col gap-0.5">
                        <MatchEventRow />
                        <MatchEventRow />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BettingAccordion;