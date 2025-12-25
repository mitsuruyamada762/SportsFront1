import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Dropdown } from '@/theme1/components/ui/Dropdown';
import { useWebSocket } from '@/theme1/contexts';
import './index.scss';

interface GameEvent {
  ball_position?: {
    ball_position?: {
      ball_position_x: number;
      ball_position_y: number;
      valid: boolean;
    };
  };
  team: number;
  type: string;
  ts: number;
  info?: any;
}

interface Timer {
  value: number;
  state: string;
  direction: string;
  update_time_ms: number;
}

interface StatLogEvent {
  game_part: string;
  info: any;
  scope: string;
  score: Record<string, string>;
  time_s: number;
  ts: number;
  type: string;
}

interface StatLog {
  log: StatLogEvent[];
  log_id: {
    id: string;
    link_id: string;
    link_type: string;
    parent_id: string;
  };
  next: number;
  prev: number;
}

interface LiveScreenData {
  timer?: Timer;
  game_event?: GameEvent;
  stat_log?: StatLog;
  team1_color?: string;
  team2_color?: string;
}

const bettingOptions = [
  { label: 'Always ask', value: 'always' },
  { label: 'Auto accept', value: 'auto' },
  { label: 'Auto reject', value: 'reject' },
];

const LiveScreen: React.FC<{ data?: LiveScreenData }> = ({ data }) => {
  const [ballPosition, setBallPosition] = useState<{ x: number; y: number } | null>(null);
  const [timer, setTimer] = useState<Timer | null>(null);
  const [recentEvents, setRecentEvents] = useState<GameEvent[]>([]);
  const [statLogEvents, setStatLogEvents] = useState<StatLogEvent[]>([]);
  const fieldRef = useRef<SVGSVGElement>(null);
  const ballPositionRef = useRef<{ x: number; y: number } | null>(null);
  const team1Color = data?.team1_color || '#0A0A0A';
  const team2Color = data?.team2_color || '#FDBD0F';

  useEffect(() => {
    if (data?.game_event?.ball_position?.ball_position?.valid) {
      const pos = data.game_event.ball_position.ball_position;
      const newPos = { x: pos.ball_position_x, y: pos.ball_position_y };
      
      // Smooth transition for ball position
      if (ballPositionRef.current) {
        // Animate from previous position
        setBallPosition(newPos);
      } else {
        setBallPosition(newPos);
      }
      ballPositionRef.current = newPos;
      
      // Add to recent events
      setRecentEvents((prev) => {
        const newEvents = [data.game_event!, ...prev].slice(0, 10);
        return newEvents;
      });
    }
  }, [data?.game_event]);

  useEffect(() => {
    if (data?.timer) {
      setTimer(data.timer);
    }
  }, [data?.timer]);

  useEffect(() => {
    if (data?.stat_log?.log) {
      // Update stat log events, keeping only recent ones
      const recentLogEvents = data.stat_log.log
        .filter(event => event.scope && event.type)
        .slice(-20); // Keep last 20 stat log events
      setStatLogEvents(recentLogEvents);
    }
  }, [data?.stat_log]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getEventColor = (event: GameEvent): string => {
    if (event.team === 1) return team1Color;
    if (event.team === 2) return team2Color;
    return '#fff';
  };

  const getEventTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      SAFE_POSSESSION: 'Possession',
      ATTACK: 'Attack',
      DANGEROUS_ATTACK: 'Dangerous',
      THROW_ZONE: 'Throw',
      SHOT_OFF_TARGET: 'Shot',
      GOAL_KICK: 'Goal Kick',
      OFFSIDE: 'Offside',
      CORNER: 'Corner',
      FREE_KICK: 'Free Kick',
      YELLOW_CARD: 'Yellow Card',
      RED_CARD: 'Red Card',
      GOAL: 'Goal',
    };
    return labels[type] || type;
  };

  const getStatLogEventColor = (event: StatLogEvent): string => {
    // Map event types to colors
    if (event.scope === 'OFFSIDE') return '#FFD700';
    if (event.type === 'GOAL') return '#00FF00';
    if (event.scope === 'CORNER') return '#FF6B6B';
    return '#4ECDC4';
  };

  const fieldWidth = 280;
  const fieldHeight = 180;
  const ballRadius = 4;

  // Convert normalized coordinates (0-1) to SVG coordinates
  const getBallPosition = () => {
    if (!ballPosition) return null;
    return {
      x: ballPosition.x * fieldWidth,
      y: ballPosition.y * fieldHeight,
    };
  };

  const ballPos = getBallPosition();

  return (
    <div className="livescreen">
      <div className="livescreen-header">
        <div className="livescreen-timer">
          {timer && (
            <>
              <span className="timer-label">Time</span>
              <span className="timer-value">{formatTime(timer.value)}</span>
              {timer.state === 'TICKING' && <span className="timer-indicator">●</span>}
            </>
          )}
        </div>
      </div>
      
      <div className="livescreen-field-container">
        <svg
          ref={fieldRef}
          width={fieldWidth}
          height={fieldHeight}
          viewBox={`0 0 ${fieldWidth} ${fieldHeight}`}
          className="football-field"
        >
          {/* Field background */}
          <rect width={fieldWidth} height={fieldHeight} fill="#2d5016" />
          
          {/* Center line */}
          <line x1={0} y1={fieldHeight / 2} x2={fieldWidth} y2={fieldHeight / 2} stroke="#fff" strokeWidth="1" opacity="0.3" />
          
          {/* Center circle */}
          <circle cx={fieldWidth / 2} cy={fieldHeight / 2} r={30} fill="none" stroke="#fff" strokeWidth="1" opacity="0.3" />
          <circle cx={fieldWidth / 2} cy={fieldHeight / 2} r={2} fill="#fff" opacity="0.3" />
          
          {/* Penalty areas */}
          <rect x={0} y={fieldHeight / 2 - 25} width={40} height={50} fill="none" stroke="#fff" strokeWidth="1" opacity="0.3" />
          <rect x={fieldWidth - 40} y={fieldHeight / 2 - 25} width={40} height={50} fill="none" stroke="#fff" strokeWidth="1" opacity="0.3" />
          
          {/* Goal areas */}
          <rect x={0} y={fieldHeight / 2 - 15} width={15} height={30} fill="none" stroke="#fff" strokeWidth="1" opacity="0.3" />
          <rect x={fieldWidth - 15} y={fieldHeight / 2 - 15} width={15} height={30} fill="none" stroke="#fff" strokeWidth="1" opacity="0.3" />
          
          {/* Goals */}
          <rect x={-2} y={fieldHeight / 2 - 8} width={4} height={16} fill="#fff" opacity="0.5" />
          <rect x={fieldWidth - 2} y={fieldHeight / 2 - 8} width={4} height={16} fill="#fff" opacity="0.5" />
          
          {/* Stat log event markers (OFFSIDE, etc.) */}
          {statLogEvents.map((event, idx) => {
            // For stat log events, we'll show them at approximate positions
            // Since they don't have ball_position, we'll distribute them across the field
            const timeBasedX = (event.time_s % 90) / 90 * fieldWidth;
            const teamBasedY = event.scope === 'OFFSIDE' 
              ? (idx % 2 === 0 ? fieldHeight * 0.3 : fieldHeight * 0.7)
              : fieldHeight / 2;
            const color = getStatLogEventColor(event);
            
            return (
              <g key={`stat-log-${event.ts}-${idx}`} opacity={0.6}>
                <circle
                  cx={timeBasedX}
                  cy={teamBasedY}
                  r={5}
                  fill={color}
                  stroke="#fff"
                  strokeWidth="1"
                />
                {event.scope === 'OFFSIDE' && (
                  <text
                    x={timeBasedX}
                    y={teamBasedY - 8}
                    fontSize="8"
                    fill={color}
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    OF
                  </text>
                )}
              </g>
            );
          })}
          
          {/* Recent event markers (with ball position) */}
          {recentEvents.slice(0, 5).map((event, idx) => {
            if (!event.ball_position?.ball_position?.valid) return null;
            const pos = event.ball_position.ball_position;
            const x = pos.ball_position_x * fieldWidth;
            const y = pos.ball_position_y * fieldHeight;
            const color = getEventColor(event);
            return (
              <g key={`event-${event.ts}-${idx}`} opacity={0.4 - idx * 0.08}>
                <circle
                  cx={x}
                  cy={y}
                  r={5 + idx * 0.5}
                  fill="none"
                  stroke={color}
                  strokeWidth="1"
                />
              </g>
            );
          })}
          
          {/* Ball with smooth animation */}
          {ballPos && (
            <g 
              className="ball"
              transform={`translate(${ballPos.x}, ${ballPos.y})`}
            >
              <circle
                cx={0}
                cy={0}
                r={ballRadius}
                fill="#fff"
                stroke="#000"
                strokeWidth="1"
              />
              <circle
                cx={0}
                cy={0}
                r={ballRadius - 1}
                fill="none"
                stroke="#000"
                strokeWidth="0.5"
                opacity="0.5"
              />
              {/* Ball shadow */}
              <ellipse
                cx={0}
                cy={ballRadius + 2}
                rx={ballRadius}
                ry={ballRadius * 0.3}
                fill="#000"
                opacity="0.3"
              />
            </g>
          )}
        </svg>
      </div>
      
      {/* Recent events list */}
      {(recentEvents.length > 0 || statLogEvents.length > 0) && (
        <div className="livescreen-events">
          {/* Show stat log events first */}
          {statLogEvents.slice(-3).reverse().map((event, idx) => (
            <div key={`stat-log-item-${event.ts}-${idx}`} className="event-item">
              <div
                className="event-team-indicator"
                style={{ backgroundColor: getStatLogEventColor(event) }}
              />
              <span className="event-type">
                {getEventTypeLabel(event.scope || event.type)} ({event.time_s}s)
              </span>
            </div>
          ))}
          {/* Show game events */}
          {recentEvents.slice(0, 3).map((event, idx) => (
            <div key={`event-item-${event.ts}-${idx}`} className="event-item">
              <div
                className="event-team-indicator"
                style={{ backgroundColor: getEventColor(event) }}
              />
              <span className="event-type">{getEventTypeLabel(event.type)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface SportBettingSidebarProps {
  matchId?: string; // Optional match ID to subscribe to live data
}

export const SportBettingSidebar: React.FC<SportBettingSidebarProps> = ({ matchId }) => {
  const [selectedOption, setSelectedOption] = useState<string | number>('always');
  const { liveScreenData, subscribeToLiveMatch, isConnected, gamesData } = useWebSocket();

  const quickAmounts = [250, 500, 2500];

  // Get matchId from gamesData if not provided as prop
  // const currentMatchId = useMemo(() => {
  //   if (matchId) return matchId;
  //   const game = Object.values(gamesData).find((game: any) => game.id);
  //   return game?.id?.toString();
  // }, [matchId, gamesData]);

  // // Subscribe to live match data when matchId is available and WebSocket is connected
  // useEffect(() => {
  //   if (currentMatchId && isConnected) {
  //     subscribeToLiveMatch(currentMatchId);
  //   }
  // }, [currentMatchId, isConnected, subscribeToLiveMatch]);

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
            <path d="M8 1L10.09 5.26L15 6.14L11.5 9.14L12.18 14.02L8 11.77L3.82 14.02L4.5 9.14L1 6.14L5.91 5.26L8 1Z" fill="#FFD700" stroke="#FFD700" strokeWidth="0.5" />
          </svg>
          <span>Add To Favorites</span>
        </button>
      </div>

      <div className="section-separator"></div>

      {/* BETTING SLIP Section */}
      <div className="betting-slip-section">

        <LiveScreen data={liveScreenData || undefined} />

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
            width="100%"
            color="#222325"
          />
        </div>

        {/* Empty Slip Message */}
        <div className="empty-slip-message">
          Your betting slip is blank.
        </div>

        {/* Warning Message */}
        <div className="warning-message">
          <svg className="warning-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L2 18H18L10 2Z" fill="#FFD700" stroke="#FFD700" strokeWidth="1" />
            <path d="M10 7V11" stroke="#232629" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M10 13H10.01" stroke="#232629" strokeWidth="1.5" strokeLinecap="round" />
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
              >
                {amount}
              </button>
            ))}
          </div>
          <button className="edit-amount-btn" title="Edit amount">
            <svg className="pencil-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M11.3333 2.00004C11.5084 1.82498 11.7163 1.68607 11.9447 1.59129C12.1731 1.49652 12.4173 1.44775 12.6639 1.44775C12.9105 1.44775 13.1547 1.49652 13.3831 1.59129C13.6115 1.68607 13.8194 1.82498 13.9944 2.00004C14.1695 2.1751 14.3084 2.38299 14.4032 2.6114C14.498 2.83981 14.5467 3.08399 14.5467 3.3306C14.5467 3.57721 14.498 3.82139 14.4032 4.0498C14.3084 4.27821 14.1695 4.4861 13.9944 4.66116L5.16667 13.4888L1.33333 14.6667L2.51122 10.8334L11.3333 2.00004Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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

