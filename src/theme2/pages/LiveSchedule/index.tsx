import React, { useState } from 'react';
import "./index.scss";
import { TimeFilter, LiveStreamSwitch, GameSelect } from '@/theme2/components/common';
import { LiveScheduleProvider } from '@/theme2/contexts';
import { LiveScheduleItem } from '@/theme2/components/features';
import FootballImg from '@/theme2/assets/images/football.svg';
import { LivePanel, MiniGames } from '@/theme2/components';

const LiveScheduleContent: React.FC = () => {
    // const { getTimeFilterLabel } = useLiveSchedule();
    const [enabled, setEnabled] = useState(false);

    // Mock data array for live schedule matches
    const matchesData = [
        { id: 1, gameImg: FootballImg, teamName1: 'Bohemians Prague (Srl)', teamName2: 'SCR Altach SRL' },
        { id: 2, gameImg: FootballImg, teamName1: 'Bohemians Prague (Srl)', teamName2: 'SCR Altach SRL' },
        { id: 3, gameImg: FootballImg, teamName1: 'Bohemians Prague (Srl)', teamName2: 'SCR Altach SRL' },
        { id: 4, gameImg: FootballImg, teamName1: 'Bohemians Prague (Srl)', teamName2: 'SCR Altach SRL' },
        { id: 5, gameImg: FootballImg, teamName1: 'Bohemians Prague (Srl)', teamName2: 'SCR Altach SRL' },
        { id: 6, gameImg: FootballImg, teamName1: 'Bohemians Prague (Srl)', teamName2: 'SCR Altach SRL' },
        { id: 7, gameImg: FootballImg, teamName1: 'Bohemians Prague (Srl)', teamName2: 'SCR Altach SRL' },
        { id: 8, gameImg: FootballImg, teamName1: 'Bohemians Prague (Srl)', teamName2: 'SCR Altach SRL' },
        { id: 9, gameImg: FootballImg, teamName1: 'Bohemians Prague (Srl)', teamName2: 'SCR Altach SRL' },
        { id: 10, gameImg: FootballImg, teamName1: 'Bohemians Prague (Srl)', teamName2: 'SCR Altach SRL' },
        { id: 11, gameImg: FootballImg, teamName1: 'Bohemians Prague (Srl)', teamName2: 'SCR Altach SRL' },
        { id: 12, gameImg: FootballImg, teamName1: 'Bohemians Prague (Srl)', teamName2: 'SCR Altach SRL' },
        { id: 13, gameImg: FootballImg, teamName1: 'Bohemians Prague (Srl)', teamName2: 'SCR Altach SRL' },
        { id: 14, gameImg: FootballImg, teamName1: 'Bohemians Prague (Srl)', teamName2: 'SCR Altach SRL' },
        { id: 15, gameImg: FootballImg, teamName1: 'Bohemians Prague (Srl)', teamName2: 'SCR Altach SRL' },
        { id: 16, gameImg: FootballImg, teamName1: 'Bohemians Prague (Srl)', teamName2: 'SCR Altach SRL' },
    ];

    return (

        <div className='live-schedule-page'>
            <div className='left-content-section'>
                <div className="left-section-content">
                    <div className='live-schedule-page-header flex justify-between items-center'>
                        <div className='left-header-section flex items-center gap-6'>
                            <div className='title'>
                                Live Schedule
                            </div>
                            <TimeFilter />
                        </div>
                        <div className='right-header-section flex items-center gap-4'>
                            <LiveStreamSwitch enabled={enabled} setEnabled={setEnabled} />
                            <GameSelect />
                        </div>
                    </div>
                    <div className='live-schedule-page-content flex flex-col mt-6'>
                        {matchesData.map((match) => (
                            <LiveScheduleItem
                                key={match.id}
                                GameImg={match.gameImg}
                                TeamName1={match.teamName1}
                                TeamName2={match.teamName2}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="right-content-section">
                <div className="right-section-content">
                    <LivePanel />
                    <MiniGames />
                </div>

            </div>

        </div>
    )
}

export const LiveSchedulePage: React.FC = () => {
    return (
        <LiveScheduleProvider>
            <LiveScheduleContent />
        </LiveScheduleProvider>
    )
}