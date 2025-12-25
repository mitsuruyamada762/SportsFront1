import React, { useState, useRef, useEffect } from 'react';
import './index.scss';

export interface CategoryTab {
  label: string;
  count: number | null;
}

export interface CategoryTabsProps {
  tabs: CategoryTab[];
  activeTab: string;
  onTabChange: (label: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  const [hasOverflow, setHasOverflow] = useState<boolean>(false);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);
  const navTabsRef = useRef<HTMLDivElement>(null);

  const checkOverflow = () => {
    if (navTabsRef.current) {
      const element = navTabsRef.current;
      const hasOverflowContent = element.scrollWidth > element.clientWidth;
      setHasOverflow(hasOverflowContent);

      const scrollLeft = element.scrollLeft;
      const scrollWidth = element.scrollWidth;
      const clientWidth = element.clientWidth;

      const canScrollLeftValue = scrollLeft > 0;
      const canScrollRightValue = scrollLeft < scrollWidth - clientWidth - 1; // -1 for rounding issues

      setCanScrollLeft(canScrollLeftValue);
      setCanScrollRight(canScrollRightValue);
    }
  };

  useEffect(() => {
    // Check overflow after a short delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      checkOverflow();
    }, 0);

    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });
    if (navTabsRef.current) {
      resizeObserver.observe(navTabsRef.current);
    }
    window.addEventListener('resize', checkOverflow);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkOverflow);
      resizeObserver.disconnect();
    };
  }, [tabs]); // Add tabs as dependency to recheck when tabs change

  const handleScrollRight = () => {
    if (navTabsRef.current) {
      const scrollAmount = navTabsRef.current.clientWidth * 0.8;
      navTabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScrollLeft = () => {
    if (navTabsRef.current) {
      const scrollAmount = navTabsRef.current.clientWidth * 0.8;
      navTabsRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    checkOverflow();
  };

  return (
    <div className="navigation-bar">
      <div className="nav-left">
        <div>
          <i className="bc-i-search"></i>
        </div>
        <div>
          <i className="bc-i-favorite"></i>
        </div>
        {hasOverflow && canScrollLeft && (
          <i
            className="bc-i-small-arrow-right nav-scroll-icon nav-scroll-left"
            onClick={handleScrollLeft}
            style={{ cursor: 'pointer' }}
          ></i>
        )}
      </div>

      <div
        className="nav-tabs"
        ref={navTabsRef}
        onScroll={handleScroll}
      >
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className={`nav-tab ${activeTab === tab.label ? 'active' : ''}`}
            onClick={() => onTabChange(tab.label)}
          >
            {tab.label}
            {tab.count !== null && <sup className="tab-count">{tab.count}</sup>}
          </div>
        ))}
      </div>

      {hasOverflow && (
        <div className="nav-right">
          {canScrollRight && (
            <i
              className="bc-i-small-arrow-right nav-scroll-icon"
              onClick={handleScrollRight}
              style={{ cursor: 'pointer' }}
            ></i>
          )}
        </div>
      )}
    </div>
  );
};
