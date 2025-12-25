import React, { useMemo } from 'react';
import { FLAGS } from '@/theme1/utils/const';
import './index.scss';

interface CompetitionTitleProps {
  leagueName?: string;
  leagueAlias?: string;
  isMultiColumn: boolean;
  onMultiColumnChange: (value: boolean) => void;
  onListViewClick?: () => void;
  onGridViewClick?: () => void;
  viewMode?: 'list' | 'grid' | 'default';
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
const getFlagImage = (alias?: string): string | undefined => {
  // If no alias yet (e.g., still loading), do not show anything
  if (!alias) return undefined;
  // Default flag to use when no match is found
  const defaultFlag = FLAGS.Default as string;
  
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
  return defaultFlag;
};

export const CompetitionTitle: React.FC<CompetitionTitleProps> = ({
  leagueName,
  leagueAlias,
  isMultiColumn,
  onMultiColumnChange,
  onListViewClick,
  onGridViewClick,
  viewMode = 'default',
}) => {
  const flagImage = useMemo(() => getFlagImage(leagueAlias), [leagueAlias]);
  const showBadge = Boolean(flagImage);

  return (
    <div className="competition-title">
      <div className="header-top">
        <div className="league-info">
          {isMultiColumn && (
            <div className="favourite">
              <i className="comp-fav-icon-bc bc-i-favorite"></i>
            </div>
          )}
          {showBadge && (
            <div className="league-badge">
              <img 
                src={flagImage} 
                alt={leagueName || 'League flag'} 
                className="league-badge-icon"
              />
            </div>
          )}
          <span className="league-name">{leagueName}</span>
        </div>

        <div className="layout-controls">
          <span className="layout-label">Multi-column</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={isMultiColumn}
              onChange={(e) => onMultiColumnChange(e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
          {!isMultiColumn ? (
            <div className="favourite">
              <i className="comp-fav-icon-bc bc-i-favorite"></i>
            </div>
          ) : viewMode === 'default' ? (
            <div className="view-toggle">
              <div className="view-icon-btn" onClick={onListViewClick} title="List view">
                <i className="multiIconLeft bc-i-block-to-right" id="id-99994353a70"></i>
              </div>
              <div className="view-icon-btn" onClick={onGridViewClick} title="Grid view">
                <i className="multiIconLeft bc-i-block-to-right" id="id-99994353a70"></i>
              </div>
            </div>
          ) : viewMode === 'list' ? (
            <div className="view-icon-btn" onClick={onGridViewClick} title="Grid view - Reset to default">
              <i className="multiIconLeft bc-i-block-to-right" id="id-99994353a70"></i>
            </div>
          ) : (
            <div className="view-icon-btn grid-reset-btn" onClick={onListViewClick} title="List view - Reset to default">
              <i className="multiIconLeft bc-i-block-to-right" id="id-99994353a70"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
