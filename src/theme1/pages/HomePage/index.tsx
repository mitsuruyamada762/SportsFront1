import React from 'react';
import { SportListSidebar, SportMainContent, SportBettingSidebar } from '@/theme1/components/';
import './index.scss';
import '@/theme1/utils/icon.scss';

export const HomePage: React.FC = () => {
  return (
    <div className="theme-one-page">
      <div className="theme-one-container ">
        <div className="sport-list-sidebar-wrapper">
          <SportListSidebar />
        </div>
        <div className="sport-main-content-wrapper">
          <SportMainContent />
        </div>
        <div className="sport-betting-sidebar-wrapper">
          <SportBettingSidebar />
        </div>
      </div>
    </div>
  );
};

