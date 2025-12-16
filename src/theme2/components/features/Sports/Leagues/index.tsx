import React from 'react';
import PlusImg from '@/theme2/assets/images/plus.svg';
import CheckedImg from '@/theme2/assets/images/check_circle.svg';
import { useSport } from '@/theme2/contexts';
import "./index.scss";
import { ImgList } from '@/theme2/utils/const';
import { useNavigate, useParams } from 'react-router-dom';


export const LeaguesItem: React.FC<{ img: string; league: any; onCompetitionClick?: (competitionId: string) => void; }> = ({ league, onCompetitionClick, img }) => {
    const { toggleLeagueInCoupon, isLeagueInCoupon } = useSport();
    const navigate = useNavigate();
    const { sportName } = useParams<{ sportName: string }>();
    const isChecked = isLeagueInCoupon(league.id);

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleLeagueInCoupon(league);
    };

    const handleLeagueClick = () => {
        if (onCompetitionClick) {
            onCompetitionClick(String(league.id));
        } else if (sportName && league.id) {
            navigate(`/sports/${sportName}/competitions/${league.id}`);
        }
    };

    return (
        <div className='league-item-container' onClick={handleLeagueClick}>
            <div className='flex items-center' >
                <div className='w-12 h-full flex items-center justify-center'>
                    <img src={ImgList[img] ? ImgList[img] : "Default"} alt="Default" width={24} height={24} className='rounded' />
                </div>
                <div className='flex flex-col justify-center flex-1'>
                    <div className='country-name'>
                        {league.name}
                    </div>
                    <div className='league-name'>
                        {league.name}
                    </div>
                </div>
            </div>
            <div className='plus-icon' onClick={handleToggle}>
                {
                    isChecked ? <img src={CheckedImg} alt="Checked" width={20} height={20} /> : <img src={PlusImg} alt="Plus" width={14} height={14} />
                }
            </div>
        </div>
    )
}
interface LeaguesProps {
    data?: any;
    onCompetitionClick?: (competitionId: string) => void;
    img?: any;
}

export const Leagues: React.FC<LeaguesProps> = ({ data, onCompetitionClick, img }) => {
    return (
        <div className='leagues-container'>
            {Object.values(data).map((league: any) => (
                <LeaguesItem key={league.id} league={league} img={img} onCompetitionClick={onCompetitionClick} />
            ))}
        </div>
    )
}