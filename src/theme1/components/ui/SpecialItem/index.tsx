import React from 'react';
import './index.scss';

interface SpecialItemProps {
  id: string;
  name: string;
  icon: string;
  hasChildren?: boolean;
  isExpanded: boolean;
  onClick: () => void;
}

export const SpecialItem: React.FC<SpecialItemProps> = ({
  id,
  name,
  icon,
  hasChildren,
  isExpanded,
  onClick,
}) => {
  return (
    <li
      className={`special-item list-item ${isExpanded ? 'expanded' : ''}`}
      onClick={onClick}
    >
      <div className="item-content">
        <i className={`item-icon bc-i-${icon}`}></i>
        <span className="item-name">{name}</span>
        {hasChildren ? (
          <i className={`bc-i-small-arrow-down ${isExpanded ? 'open' : ''} `} aria-hidden="true" />
        ) : (
          <i className={`bc-i-small-arrow-right`} aria-hidden="true" />
        )}
      </div>
    </li>
  );
};
