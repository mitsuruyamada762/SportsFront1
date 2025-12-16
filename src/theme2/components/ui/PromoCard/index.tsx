import React from "react";
import { CarouselCard } from "@/types";
import CrownImg from "../../../assets/images/crown.svg";
import "./index.scss";

const PromoCard: React.FC<{ card: CarouselCard }> = ({ card }) => {
  return (
    <div className="promo-card">
      <div
        className="card-bg"
        style={{ backgroundImage: `url(media${card.id}.png)` }}
      >
        <div className="card-content">
          <div className="items-start flex relative h-full pl-[12px] py-[12px] flex-col ">
            <div className="flex w-full">
              <img src={CrownImg} width={"26px"} height={"28px"} alt="crown" />
            </div>
            <div className="mt-auto">
              <div className="headline-description">
                {card.description
                  ? card.description
                  : `${card.team1}- ${card.team2}`}
              </div>
              <div className="headline-title">{card.offerText}</div>

              <button
                type="button"
                className="learn-btn mt-2 max-w-[160px] flex rounded w-[160px] items-center justify-center"
                
              >
                {card.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCard;
