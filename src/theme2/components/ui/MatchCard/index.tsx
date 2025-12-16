import React from "react";
import { CarouselCard } from "@/theme2/types";
import TennisBg from '@/theme2/assets/images/tennis.png';
import SoccerBg from '@/theme2/assets/images/soccer.png';
import BasketballBg from '@/theme2/assets/images/basket.png';
import LiveBadge from "./common/LiveBadge";
import './index.scss';
import LivePlay from "./common/LivePlay";
import TennisHard from "./common/tennisHard";
import SoBadge from "./common/SoBadge";

const MatchCard: React.FC<{ card: CarouselCard }> = ({ card }) => {

    const cardBg = () => {
        switch (card.cat) {
            case 'tennis':
                return TennisBg;
            case 'soccer':
                return SoccerBg;
            case 'basketball':
                return BasketballBg;
            default:
                return SoccerBg

        }
    }
    return (

        <div className="match-card">
            <img className="card-bg" src={cardBg()} width={'100%'} height={'100%'} alt="" />
            <div className="card-hero-wrapper" style={{ backgroundImage: `url(media${card.id}.png)` }}>

                <div className="card-hero-content">
                    <div className="card-hero-content-top">
                        {
                            card.isLive ? <>
                                <LiveBadge />
                                <LivePlay />
                                <TennisHard />
                            </> : <>
                                <SoBadge />
                                <LivePlay />

                            </>
                        }
                    </div>
                    <div className="text-white">
                        <div className="w-full ">
                            <div className="game-time flex ">
                                <div className="game-time-text">{card.time}</div>
                            </div>
                            <div className="flex w-full text-nowrap mt-auto  flex-row items-center ">
                                <div className="w-[calc(100%-20px)] flex flex-col gap-1">
                                    <div className="game-team">
                                        {card.team1}
                                    </div>
                                    <div className="game-team">
                                        {card.team2}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-full mt-3 gap-[2px] flex flex-row">
                                {card.isLive ?
                                    <>
                                        <div className="bet-item">
                                            <div>1</div>
                                            <div className="bet-item-odd">{card.odd1}</div>
                                        </div>
                                        <div className="bet-item">
                                            <div>x</div>
                                            <div className="bet-item-odd">6.2</div>

                                        </div>
                                        <div className="bet-item">
                                            <div>2</div>
                                            <div className="bet-item-odd">{card.odd2}</div>
                                        </div>
                                    </> : <>
                                        <div className="bet-item !bg-white ">
                                            <div className="!text-[#202735]">1</div>
                                            <div className="bet-item-odd !text-[#6df6ff] !text-[13px] !font-700">{card.odd1}</div>
                                        </div>
                                        <div className="bet-item !bg-white ">
                                            <div className="!text-[#202735]">2</div>
                                            <div className="bet-item-odd !text-[#6df6ff] !text-[13px] !font-700">{card.odd2}</div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default MatchCard;