import React from "react";
import { SliderSection } from "../../common";

interface SliderProps {
  onItemClick?: (name: string) => void;
}


export const Slider: React.FC<SliderProps> = ({ onItemClick }) => {
  return (
    <SliderSection
      title="Sports Betting"
      buttonText="All live fixtures"
      variant="default"
      route="/live-betting"
      onItemClick={onItemClick} />
  );
};
