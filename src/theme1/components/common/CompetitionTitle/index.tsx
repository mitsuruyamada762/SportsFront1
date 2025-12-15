import React from 'react';
import './index.scss';

interface CompetitionTitleProps {
  leagueName: string;
  isMultiColumn: boolean;
  onMultiColumnChange: (value: boolean) => void;
  onListViewClick?: () => void;
  onGridViewClick?: () => void;
  viewMode?: 'list' | 'grid' | 'default';
}

export const CompetitionTitle: React.FC<CompetitionTitleProps> = ({
  leagueName,
  isMultiColumn,
  onMultiColumnChange,
  onListViewClick,
  onGridViewClick,
  viewMode = 'default',
}) => {
  return (
    <div className="competition-title">
      <div className="header-top">
        <div className="league-info">
          {isMultiColumn && (
            <div className="favourite">
              <i className="comp-fav-icon-bc bc-i-favorite"></i>
            </div>
          )}
          <div className="league-badge">
            <svg className="star-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 0.5L7.5 4.5L11.5 4.5L8.5 7L10 11L6 8.5L2 11L3.5 7L0.5 4.5L4.5 4.5L6 0.5Z"
                fill="#FFD700"
              />
            </svg>
          </div>
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
