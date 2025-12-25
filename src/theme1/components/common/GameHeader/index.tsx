import React, { useMemo } from 'react';
import { FLAGS } from '@/theme1/utils/const';
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
  regionAlias?: string;
}

// Convert alias to FLAGS object key format (PascalCase)
const getFlagKey = (alias?: string): string => {
  if (!alias) return '';

  // Convert alias to PascalCase (e.g., "united_states" -> "UnitedStates", "united-states" -> "UnitedStates")
  return alias
    .split(/[_\s-]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};

// Get flag image from FLAGS object based on alias
const getFlagImage = (alias?: string): string | null => {
  // Return null if no alias (don't show default during loading)
  if (!alias) return null;

  const normalizedAlias = alias.toLowerCase().trim();

  // Try direct match with PascalCase conversion first
  const flagKey = getFlagKey(alias);
  if (flagKey && FLAGS[flagKey as keyof typeof FLAGS]) {
    return FLAGS[flagKey as keyof typeof FLAGS] as string;
  }

  // Try case-insensitive search in FLAGS keys
  const flagsKeys = Object.keys(FLAGS);
  const matchedKey = flagsKeys.find(key =>
    key.toLowerCase() === normalizedAlias ||
    key.toLowerCase() === flagKey.toLowerCase() ||
    key.toLowerCase().replace(/[_\s-]/g, '') === normalizedAlias.replace(/[_\s-]/g, '')
  );

  if (matchedKey) {
    return FLAGS[matchedKey as keyof typeof FLAGS] as string;
  }

  // Return default flag if no match found
  return FLAGS.Default as string;
};

export const GameHeader: React.FC<GameHeaderProps> = ({
  backgroundImage,
  leagueIcon,
  leagueName,
  matchDate,
  teams,
  regionAlias,
}) => {
  const flagImage = useMemo(() => getFlagImage(regionAlias), [regionAlias]);

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
            {flagImage && (
              <div className="league-region">
                <img
                  src={flagImage}
                  alt={regionAlias || 'Region flag'}
                  className="league-region-icon"
                />
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
