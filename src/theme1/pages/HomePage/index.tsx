import React, { useState } from 'react';
import { SportListSidebar, SportMainContent, SportBettingSidebar } from '@/theme1/components/';
import './index.scss';
import '@/theme1/utils/icon.scss';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'prematch'>('prematch');

  return (
    <div className="theme-one-page">
      <div className="theme-one-container ">
        <div className="sport-list-sidebar-wrapper">
          <SportListSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
        <div className="sport-main-content-wrapper">
          <SportMainContent activeTab={activeTab} />
        </div>
        <div className="sport-betting-sidebar-wrapper">
          <SportBettingSidebar />
        </div>
      </div>
    </div>
  );
};

