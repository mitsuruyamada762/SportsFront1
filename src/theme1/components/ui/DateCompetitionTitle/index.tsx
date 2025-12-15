import React from 'react';
import './index.scss';

interface DateCompetitionTitleProps {
  date: string;
  isExpanded: boolean;
  onClick: () => void;
}

export const DateCompetitionTitle: React.FC<DateCompetitionTitleProps> = ({
  date,
  isExpanded,
  onClick,
}) => {
  return (
    <div className="date-competition-title" onClick={onClick}>
      <span className="date-text">{date}</span>
      <i className={`date-chevron ${isExpanded ? 'expanded' : ''} bc-i-small-arrow-down`}></i>
    </div>
  );
};
