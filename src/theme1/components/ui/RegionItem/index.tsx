import React, { useMemo } from 'react';
import { Region } from '@/theme1/types/sportGames';
import { FLAGS } from '@/theme1/utils/const';
import './index.scss';

interface RegionItemProps {
  region: Region;
  isExpanded: boolean;
  count: number;
  onClick: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

// Convert region alias to FLAGS object key format (PascalCase)
const getFlagKey = (alias?: string): string => {
  if (!alias) return '';
  
  // Convert alias to PascalCase (e.g., "united_states" -> "UnitedStates", "united-states" -> "UnitedStates")
  return alias
    .split(/[_\s-]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};

// Get flag image from FLAGS object based on region alias
const getFlagImage = (alias?: string): string => {
  // Default flag to use when no match is found
  const defaultFlag = FLAGS.Default as string;
  
  if (!alias) return defaultFlag;
  
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

export const RegionItem: React.FC<RegionItemProps> = ({
  region,
  isExpanded,
  count,
  onClick,
  children,
}) => {
  const flagImage = useMemo(() => getFlagImage(region.alias), [region.alias]);

  return (
    <div className="region-item-wrapper">
      <div
        className={`list-item region ${isExpanded ? 'expanded' : ''}`}
        onClick={onClick}
      >
        <div className="item-content">
          <img 
            src={flagImage} 
            alt={region.name || region.alias || 'Region flag'} 
            className="region-icon"
          />
          <span className="item-name">{region.name}</span>
          <span className="item-count">{count}</span>
          <i className={`bc-i-small-arrow-down ${isExpanded ? 'open' : ''} `} aria-hidden="true" />
        </div>
      </div>
      {isExpanded && children && (
        <div className="competition-list">
          {children}
        </div>
      )}
    </div>
  );
};
