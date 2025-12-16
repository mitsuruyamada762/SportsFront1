import React, { useEffect, useState } from "react";
import './index.scss';
import { useWebSocket } from "@/theme2/contexts/WebSocketContext";
import { ImgList } from "@/theme2/utils";


interface SliderSectionProps {
  title: string | "Sports Betting";
  buttonText: string;
  variant?: 'default' | 'white';
  route?: string;
  comp?: string;
  onItemClick?: (name: string) => void;   // <-- NEW

}

interface Sport {
  id: number;
  name?: string;
  alias?: string;
  order?: number;
  region?: any;
  subTotal?: number;
}


export const SliderSection: React.FC<SliderSectionProps> = ({
  title,
  onItemClick

}) => {
  const { sportsData } = useWebSocket();
  const [expanded, setExpanded] = useState(true);
  const [dataSp, setDataSp] = useState<Sport[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    const arr: Sport[] = Object.values(sportsData)
      .filter((s): s is Sport => !!s && typeof s === "object" && "id" in s)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    setDataSp(arr);
  }, [sportsData]); // runs every time calSportsData changes

  const handleItemClick = (item: Sport) => {
    setSelectedItemId(item.id);
    onItemClick?.(item.name || '');
  };

  return (
    <div
      className={`min-h-screen text-white transition-all duration-300
      ${expanded ? "w-60" : "w-18"}`}
    >
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full text-white shadow-md transition-all duration-300 
        ${expanded ? "w-60" : "w-20"} flex flex-col items-center z-40`}
      >
        {/* Top row: hamburger + title */}
        <div className="mt-4 mb-4 flex items-center w-full px-3 gap-2">
          <button
            className="p-2 text-white rounded-full focus:outline-none h-10"
            onClick={() => setExpanded((v) => !v)}
            aria-label="Toggle Sidebar"
          >
            <span className="block w-6 h-0.5 bg-gray-300 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-300 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-300"></span>
          </button>

          {/* Title: hidden when collapsed */}
          <div
            className={`ml-2 text-xl font-extrabold italic tracking-tight text-slate-50 transition-all duration-300 ease-in-out flex items-center justify-center
                      ${expanded ? "opacity-100 translate-x-0 w-auto h-10" : "opacity-0 -translate-x-2 w-0 overflow-hidden h-0"} whitespace-nowrap`}
          >
            {title}
          </div>

        </div>
        <nav className="scrollbar-hover flex-1 w-full pr-3">
          <ul className="">
            {dataSp.map((item: any) => {
              const isSelected = selectedItemId === item.id;
              return (
                <li
                  key={item.id}
                  className={`flex items-center gap-3 py-3 px-4 rounded transition cursor-pointer ${isSelected ? "bg-gray-700"
                    : expanded ? "hover:bg-gray-800 hover:opacity-70"
                      : "hover:bg-gray-800"}`}
                  onClick={() => handleItemClick(item)}
                >
                  <img src={ImgList[item.alias] ? ImgList[item.alias] : ImgList["Default"]} alt={item.alias} className="w-4 h-4"></img>
                  {expanded && (
                    <span className="font-medium whitespace-nowrap text-sm">
                      {item.name}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`${expanded ? "ml-56" : "ml-16"} flex-1 p-8`}>
        {/* App content goes here */}
      </main>
    </div >
  );

};
