import React from 'react';
import "./index.scss";
import { SportProvider } from '@/theme2/contexts/SportContext';
import { Competitions } from '@/theme2/components/features';
import { useWebSocket } from '@/theme2/contexts/WebSocketContext';
import { useParams } from 'react-router-dom';

interface SportPageContentProps {
    sportName: string;
    sportType?: (name: string) => void;
    onCompetitionClick?: (competitionId: string) => void;
}

export const SportPageContent: React.FC<SportPageContentProps> = ({ sportName, sportType }) => {
    const { sportsData } = useWebSocket();


    return (
        <div className='sport-page'>
            <div className='sport-left-section p-4 gap-6 flex flex-col'>
                <Competitions data={sportsData} sportName={sportName} type="sport" sportType={sportType} />
            </div>
        </div>
    );
};

interface SportPageProps {
    sportName?: string;
    sportType?: (name: string) => void;
    onCompetitionClick?: (competitionId: string) => void;
}

export const SportPage: React.FC<SportPageProps> = ({ sportName: propSportName, sportType, onCompetitionClick }) => {
    const { sportName: paramSportName } = useParams<{ sportName?: string }>();
    const sportName = propSportName || paramSportName;

    if (!sportName) {
        return <div>Sport not found</div>;
    }

    return (
        <SportProvider>
            <SportPageContent sportName={sportName} sportType={sportType} onCompetitionClick={onCompetitionClick} />
        </SportProvider>
    );
};

