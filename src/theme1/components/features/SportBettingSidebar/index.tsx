import React, { useState } from 'react';
import { Dropdown } from '@/theme1/components/ui/Dropdown';
import './index.scss';

const bettingOptions = [
  { label: 'Always ask', value: 'always' },
  { label: 'Auto accept', value: 'auto' },
  { label: 'Auto reject', value: 'reject' },
];

export const SportBettingSidebar: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | number>('always');
  const [customAmount, setCustomAmount] = useState<string>('');

  const quickAmounts = [5000, 500, 2500];

  const handleLogin = () => {
    // Handle login navigation
    console.log('Navigate to login');
  };

  const handleRegister = () => {
    // Handle register navigation
    console.log('Navigate to register');
  };

  const handlePlaceBet = () => {
    // Handle place bet action
    console.log('Place a bet');
  };

  const handleAddToFavorites = () => {
    // Handle add to favorites
    console.log('Add to favorites');
  };

  return (
    <div className="sport-betting-sidebar">
      {/* MY TEAMS Section */}
      <div className="my-teams-section">
        <h2 className="section-header">MY TEAMS</h2>
        <button className="add-favorites-btn" onClick={handleAddToFavorites}>
          <svg className="star-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L10.09 5.26L15 6.14L11.5 9.14L12.18 14.02L8 11.77L3.82 14.02L4.5 9.14L1 6.14L5.91 5.26L8 1Z" fill="#FFD700" stroke="#FFD700" strokeWidth="0.5"/>
          </svg>
          <span>Add To Favorites</span>
        </button>
      </div>

      <div className="section-separator"></div>

      {/* BETTING SLIP Section */}
      <div className="betting-slip-section">
        <div className="betting-slip-header">
          <h2 className="section-header">BETTING SLIP</h2>
          <div className="header-underline"></div>
        </div>

        {/* Settings Dropdown */}
        <div className="settings-dropdown-wrapper">
          <Dropdown
            items={bettingOptions}
            selectedValue={selectedOption}
            onSelect={setSelectedOption}
            titleWidth="100%"
            containerWidth="100%"
            icon={
              <svg className="gear-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M12.5 5.5L11.8 4.8C11.5 4.5 11.1 4.5 10.8 4.8L9.5 6.1C9.2 6.4 8.8 6.4 8.5 6.1L7.2 4.8C6.9 4.5 6.5 4.5 6.2 4.8L5.5 5.5C5.2 5.8 5.2 6.2 5.5 6.5L6.8 7.8C7.1 8.1 7.1 8.5 6.8 8.8L5.5 10.1C5.2 10.4 5.2 10.8 5.5 11.1L6.2 11.8C6.5 12.1 6.9 12.1 7.2 11.8L8.5 10.5C8.8 10.2 9.2 10.2 9.5 10.5L10.8 11.8C11.1 12.1 11.5 12.1 11.8 11.8L12.5 11.1C12.8 10.8 12.8 10.4 12.5 10.1L11.2 8.8C10.9 8.5 10.9 8.1 11.2 7.8L12.5 6.5C12.8 6.2 12.8 5.8 12.5 5.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 2.5V4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M8 11.5V13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M2.5 8H4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M11.5 8H13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            }
          />
        </div>

        {/* Empty Slip Message */}
        <div className="empty-slip-message">
          Your betting slip is blank.
        </div>

        {/* Warning Message */}
        <div className="warning-message">
          <svg className="warning-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L2 18H18L10 2Z" fill="#FFD700" stroke="#FFD700" strokeWidth="1"/>
            <path d="M10 7V11" stroke="#232629" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M10 13H10.01" stroke="#232629" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>
            To place a bet, please{' '}
            <button className="link-button" onClick={handleLogin}>LOG IN</button>
            {' '}or{' '}
            <button className="link-button" onClick={handleRegister}>REGISTER</button>.
          </span>
        </div>

        {/* Quick Bet Amounts */}
        <div className="quick-amounts-section">
          <div className="quick-amounts-buttons">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                className="quick-amount-btn"
                onClick={() => setCustomAmount(amount.toString())}
              >
                {amount}
              </button>
            ))}
          </div>
          <button className="edit-amount-btn" title="Edit amount">
            <svg className="pencil-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M11.3333 2.00004C11.5084 1.82498 11.7163 1.68607 11.9447 1.59129C12.1731 1.49652 12.4173 1.44775 12.6639 1.44775C12.9105 1.44775 13.1547 1.49652 13.3831 1.59129C13.6115 1.68607 13.8194 1.82498 13.9944 2.00004C14.1695 2.1751 14.3084 2.38299 14.4032 2.6114C14.498 2.83981 14.5467 3.08399 14.5467 3.3306C14.5467 3.57721 14.498 3.82139 14.4032 4.0498C14.3084 4.27821 14.1695 4.4861 13.9944 4.66116L5.16667 13.4888L1.33333 14.6667L2.51122 10.8334L11.3333 2.00004Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Place A Bet Button */}
        <button className="place-bet-btn" onClick={handlePlaceBet}>
          PLACE A BET
        </button>
      </div>
    </div>
  );
};

