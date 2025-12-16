import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ScreenSizeContextType {
  isMobile: boolean;
  screenWidth: number;
}

const ScreenSizeContext = createContext<ScreenSizeContextType | undefined>(undefined);

interface ScreenSizeProviderProps {
  children: ReactNode;
  breakpoint?: number;
}

export const ScreenSizeProvider: React.FC<ScreenSizeProviderProps> = ({ 
  children, 
  breakpoint = 768 
}) => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setIsMobile(width < breakpoint);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  const value: ScreenSizeContextType = {
    isMobile,
    screenWidth,
  };

  return (
    <ScreenSizeContext.Provider value={value}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSize = (): ScreenSizeContextType => {
  const context = useContext(ScreenSizeContext);
  if (context === undefined) {
    throw new Error('useScreenSize must be used within a ScreenSizeProvider');
  }
  return context;
};
