import React from 'react';
import './index.scss';

export interface TeamInfo {
  name: string;
  status: string;
  points: string;
  indicators: string[]; // Array of indicator types like 'M', 'B', etc.
}

export interface GameHeaderProps {
  backgroundImage?: string;
  leagueIcon?: string;
  leagueName: string;
  matchDate: string;
  teams: TeamInfo[];
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  backgroundImage,
  leagueIcon,
  leagueName,
  matchDate,
  teams,
}) => {
  return (
    <div className="game-header">
      <div className="header-background">
        {backgroundImage && (
          <img src={backgroundImage} alt="Game background" className="background-image" />
        )}
        <div className="header-overlay"></div>
      </div>

      <div className="header-content">
        {/* League Info */}
        <div>
          <div className="league-info">
            {leagueIcon && (
              <div className="league-icon-wrapper">
                <i className={leagueIcon}></i>
              </div>
            )}
            <span className="league-name">{leagueName}</span>
          </div>

          {/* Date and Time */}
          <div className="match-date">{matchDate}</div>
        </div>
        <div>
          {/* Teams Info */}
          <div className="teams-section">
            {teams.map((team, index) => (
              <div key={index} className="team-info">
                <div className="team-name">{team.name}</div>
                <div className="team-status">
                  <span>Status: {team.status} | Points: {team.points}</span>
                  <div className="status-indicators">
                    {team.indicators.map((indicator, idx) => (
                      <span key={idx} className={`indicator ${indicator.toLowerCase()}`}>
                        {indicator}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
