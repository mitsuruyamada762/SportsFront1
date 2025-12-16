import React, { useState } from "react";
import { LivePanel, GameFilter, Filter, BettingAccordion, LiveStreamSwitch, MiniGames } from "../../components";
import { FilterProvider } from "../../contexts";
import AllCollapseImg from "../../assets/images/all-collapse.svg";
import AllExpandImg from "../../assets/images/all-expand.svg";

import "./index.scss";

export const LiveBettingPage: React.FC = () => {
    const [selectedGame, setSelectedGame] = useState<string>('soccer');
    const [enabled, setEnabled] = useState(false)
    const [allCollapse, setAllCollapse] = useState(false)
    const [accordionStates, setAccordionStates] = useState<boolean[]>([false, false, false, false, false, false])

    const handleGameFilterChange = (filterValue: string) => {
        setSelectedGame(filterValue);
        console.log('Selected game filter:', filterValue);
        // Here you can add logic to filter matches based on the selected game
    };

    const handleToggleAllAccordions = () => {
        const newCollapseState = !allCollapse;
        setAllCollapse(newCollapseState);
        setAccordionStates(accordionStates.map(() => newCollapseState));
    };

    const handleAccordionToggle = (index: number, isOpen: boolean) => {
        const newStates = [...accordionStates];
        newStates[index] = isOpen;
        setAccordionStates(newStates);

        // Update allCollapse state based on individual accordion states
        const allOpen = newStates.every(state => state === true);
        const allClosed = newStates.every(state => state === false);
        if (allOpen) {
            setAllCollapse(true);
        } else if (allClosed) {
            setAllCollapse(false);
        }
    };

    return (
        <FilterProvider>
            <div className="live-betting-container">
                <div className="absolute top-4 right-4 z-50">
                    {/* <LanguageSelector variant="minimal" /> */}
                </div>
                <div className="left-section">
                    <div className="left-section-content">
                        <GameFilter
                            onFilterChange={handleGameFilterChange}
                            initialFilter={selectedGame}
                        />
                        <div className="header mt-8 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="title">Live Betting</div>
                                <LiveStreamSwitch enabled={enabled} setEnabled={setEnabled} />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="mt-2">
                                    <Filter variant="default" />
                                </div>
                                <div onClick={handleToggleAllAccordions} className={`opacity-60  hover:opacity-100 cursor-pointer ${allCollapse ? 'active' : ''}`}>
                                    <img src={allCollapse ? AllCollapseImg : AllExpandImg} alt="all collapse" />
                                </div>
                            </div>
                        </div>
                        {accordionStates.map((isOpen, index) => (
                            <BettingAccordion
                                key={index}
                                controlled={true}
                                isOpen={isOpen}
                                onToggle={(open) => handleAccordionToggle(index, open)}
                            />
                        ))}
                    </div>
                </div>
                <div className="right-section">
                       <div className="right-section-content pl-2">
                            <LivePanel />
                            <MiniGames />   
                       </div>
                </div>

            </div>
        </FilterProvider>
    );
};
