import React, { useState } from "react";
import { Carousel, LiveMatch, LanguageSelector, Slider } from "../../components";
import { FilterProvider } from "../../contexts";
import "./index.scss";
import { SportPage } from "../SportPage";
import { SportsCompetition } from "../SportsCompetition";
import { carouselData } from "@/theme2/utils";

export const HomePage: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [selectedCompetition, setSelectedCompetition] = useState<{ sportName: string; competitionId: string } | null>(null);

  const handleSportClick = (sportName: string) => {
    if (selectedSport === sportName || sportName === 'live') {
      setSelectedSport(null);
      setSelectedCompetition(null);
    } else {
      setSelectedSport(sportName);
      setSelectedCompetition(null);
    }
  };

  const handleCompetitionClick = (competitionId: string) => {
    if (selectedSport) {
      setSelectedCompetition({
        sportName: selectedSport,
        competitionId: competitionId
      });
    }
  };

  const handleBackFromCompetition = () => {
    setSelectedCompetition(null);
  };



  return (
    <div className="w-full h-full flex overflow-hidden">
      {/* SIDEBAR */}
      <div className="h-full">
        <FilterProvider>
          <Slider onItemClick={handleSportClick} />
        </FilterProvider>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 h-full overflow-y-scroll relative">
        <div className="absolute top-4 right-4 z-50">
          <LanguageSelector variant="minimal" />
        </div>

        <Carousel cards={carouselData} />

        <FilterProvider>
          {selectedCompetition ? (
            <SportsCompetition
              sportName={selectedCompetition.sportName}
              competitionId={selectedCompetition.competitionId}
              onBack={handleBackFromCompetition}
            />
          ) : selectedSport ? (
            <SportPage
              sportName={selectedSport}
              sportType={handleSportClick}
              onCompetitionClick={handleCompetitionClick}
            />
          ) : (
            <LiveMatch />
          )}
        </FilterProvider>

      </div>
    </div>
  );

};
