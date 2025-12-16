import React from "react";
import { MatchSection } from "../../common";

export const LiveMatch: React.FC = () => {
  return (
    <MatchSection
      title="Live matches"
      buttonText="All live fixtures"
      variant="default"
      route="/live-betting"
    />
  );
};
