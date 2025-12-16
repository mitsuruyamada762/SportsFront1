import React from "react";
import { MatchSection } from "../../common";

export const TopBets: React.FC = () => {
    return (

        <MatchSection
            title="Top bets"
            buttonText="All matches"
            variant="white"
            comp='topbets'
            route="/sports/soccer"
        />
    );
};
