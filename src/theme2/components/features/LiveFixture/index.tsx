import React from "react";
import { MatchSection } from "../../common";

export const LiveFixture: React.FC = () => {
    return (

        <MatchSection
            title="Live fixtures"
            buttonText="Full Live Schedule"
            route="/live-schedule"
        />
    );
};
