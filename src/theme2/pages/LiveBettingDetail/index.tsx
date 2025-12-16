import React from 'react';
import './index.scss';
import { LivePanel, MiniGames, LiveBettingMatchList, LiveBettingMainContent } from '@/theme2/components';

export const LiveBettingDetailPage: React.FC = () => {

    return (
        <div className='live-betting-detail-page'>
            <div className="left-section">
                <div className="left-section-content">
                    <LiveBettingMatchList />
                </div>
            </div>
            <div className="main-content">
                <LiveBettingMainContent />
            </div>
            <div className="right-section">
                <div className="right-section-content">
                    <LivePanel />
                    <MiniGames />
                </div>
            </div>
        </div>
    )
}