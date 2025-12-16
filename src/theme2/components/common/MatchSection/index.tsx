import React, { useEffect, useState, useMemo } from "react";
import MatchTable from "../MatchTable";
import InfoSVG from "@/theme2/assets/images/info_circle_empty.svg";
import './index.scss';
import { ImgList } from "@/theme2/utils/const";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useWebSocket } from "@/theme2/contexts/WebSocketContext";
import { Sport } from "@/theme2/types";

interface MatchSectionProps {
  title: string;
  buttonText: string;
  variant?: 'default' | 'white';
  route?: string;
  comp?: string;
}

export const MatchSection: React.FC<MatchSectionProps> = ({
  title,
  buttonText,
  variant = 'default',
  route = '/',
  comp = 'livefixture',
}) => {
  const { liveGamesList } = useWebSocket();
  const tmpArr: Sport[] = useMemo(() => {
    const arr = Object.values(liveGamesList) as Sport[];
    arr.sort((a, b) => {
      return (a.order ?? 0) - (b.order ?? 0);
    });
    return arr;
  }, [liveGamesList]);
  const [activeCat, setActiveCat] = useState<string>("");
  useEffect(() => {
    const value: any = tmpArr?.[0]?.alias
    if (value && activeCat === "") {
      setActiveCat(value)
    }
  }, [tmpArr.length, activeCat])
  const navigate = useNavigate();
  return (
    <div className={`flex flex-col gap-4 match-section-container mx-5 mt-2 items-center ${variant === 'white' ? 'white-variant' : ''}`}>
      <div className="left pl-3 flex items-center gap-6 w-full">
        <div className="flex items-center gap-2">
          <div className="home-caption">{title}</div>
          <div className="flex items-center">
            <button type="button">
              <img
                src={InfoSVG}
                width={20}
                height={20}
                className="opacity-60 flex items-center justify-center "
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-[2px]">
          {
            tmpArr.map((cat: any) => (
              <div key={cat.id} className={`flex items-center justify-center gap-2 match-cat ${activeCat === cat.alias ? 'active' : ''}`} onClick={() => setActiveCat(cat.alias)}>
                <img src={ImgList[cat.alias] ? ImgList[cat.alias] : ImgList["Default"]} alt={cat.name} />

              </div>
            ))
          }

        </div>
        <div className="right ml-auto">
          <button type="button" className="all-fixtures-button" onClick={() => navigate(route ? "/" : "/")}>
            <div className="flex items-center leading-4">
              {buttonText} <ChevronRightIcon className="w-[15px] h-[15px] ml-2" />
            </div>
          </button>
        </div>
      </div>
      <div className={`w-full ${variant === 'white' ? 'bg-white rounded-2xl' : ''}`}>
        <MatchTable variant={variant} comp={comp} sportFilter={activeCat} />
      </div>
    </div>
  );
};
