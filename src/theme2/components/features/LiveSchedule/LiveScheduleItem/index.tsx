import React from 'react';
import './index.scss';
import StatImg from '@/theme2/assets/images/stats.svg';
interface ScoreItemProps {
    score: string;
    label: string;
}
interface LiveScheduleItemProps {
    GameImg: string;
    TeamName1: string;
    TeamName2: string;
}

export const ScoreItem: React.FC<ScoreItemProps> = ({ score, label }) => {
    return (
        <div className='score-item flex flex-col '>
            <div className='score-item-label'>{label}</div>
            <div className='score-item-score'>{score}</div>
        </div>
    )
}

export const LiveScheduleItem: React.FC<LiveScheduleItemProps> = ({ GameImg, TeamName1, TeamName2 }) => {
    return (
        <div className='live-schedule-item'>
            <div className='left-section flex items-center gap-6 justify-start'>
                <div className='time-column'>
                    in 12'

                </div>
                <div className='flex items-center justify-center w-[18px] h-[18px]'>
                    <img src={GameImg} alt='GameImg' className='w-[18px] h-[18px]' />
                </div>
                <div className='team-name flex flex-col gap-1'>
                    <div className='team-name'>{TeamName1}</div>
                    <div className='team-name'>{TeamName2}</div>
                </div>
                <div className='flex justify-end flex-1'>
                    <img src={StatImg} alt='StatImg' className='w-[18px] h-[18px] stats-icon' />
                </div>
            </div>
            <div className='right-section '>
                <ScoreItem label='1' score='2.40' />
                <ScoreItem label='x' score='2.89' />
                <ScoreItem label='2' score='3.40' />
            </div>
        </div>
    )
}
