import React, { useEffect } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import StarImg from '@/theme2/assets/images/star.svg'
import './index.scss'

interface MatchResultItemProps {
    id: string
    items: [{}]
    activeTab: string
    isCollapsed?: boolean
    isFavorite?: boolean
    flag?: boolean
    onToggleFavorite?: (id: string) => void
    variant?: 'default' | 'white',
    favoriteVisible?: boolean
}

const OddItem = ({ label, value, variant = 'default', base, style }: { label: string, base?: number, value: any, variant?: 'default' | 'white', style: string }) => {
    return (
        <div className={`odds-item ${variant} ${style || ""}`}>
            <span className="odds-label first">{label ? label : "-"}</span>
            <span className={`odds-value ${base ? "middle" : ""}`}>{value}</span>
            {
                base ? (
                    <span className="odds-base">{base}</span>
                ) : ("")
            }
        </div>
    )
}


export const MatchResultItem: React.FC<MatchResultItemProps> = ({
    id,
    items,         // item is an array
    isCollapsed = false,
    isFavorite = false,
    flag,
    onToggleFavorite,
    variant = 'default',
    favoriteVisible = true,
    activeTab,
}) => {
    if (!flag) {
        return (
            <div className={`match-result-item ${variant} text-center p-4 text-sm text-[var(--text-secondary)]`}>
                Market is not available
            </div>
        );
    }
    return (
        <>
            {Object.entries(items).filter(([title]) => {
                const [, groupName] = title.split("@");

                return !activeTab || activeTab === "All" || groupName === activeTab;

            }).map(([title, values]) => (
                <div
                    key={title}
                    className={`match-result-item ${variant}`}
                    style={{
                        background:
                            variant === 'white'
                                ? 'linear-gradient(0deg,#008f930d 0% 100%),#0d385914'
                                : 'bg-card'
                    }}
                >
                    <Disclosure defaultOpen={!isCollapsed}>
                        {({ open, close }) => {

                            useEffect(() => {
                                if (isCollapsed && open) close();
                            }, [isCollapsed]);

                            const [marketName,] = title.split("@"); // define here for JSX
                            const val = Array.isArray(values) ? values : [];

                            return (
                                <>
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg text-sm font-medium">
                                        <span className={`text-[13px] pl-1 ${variant === 'white' ? 'text-black' : ''}`}>
                                            {marketName}
                                        </span>

                                        <div className='flex items-center gap-1'>
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onToggleFavorite?.(id);
                                                }}
                                                className='star-btn'
                                            >
                                                {favoriteVisible && (
                                                    <img
                                                        src={StarImg}
                                                        alt="star"
                                                        className={`w-4 h-4 ${isFavorite ? 'favorite' : ''}`}
                                                        style={{
                                                            filter: isFavorite
                                                                ? 'brightness(0) saturate(100%) invert(79%) sepia(98%) saturate(1456%) hue-rotate(358deg) brightness(102%) contrast(101%)'
                                                                : 'brightness(0) invert(1)'
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            <ChevronUpIcon
                                                className={`${!open ? 'rotate-180 transform' : ''} h-5 w-5 ${variant === 'white' ? 'text-black' : 'text-white'}`}
                                            />
                                        </div>
                                    </Disclosure.Button>

                                    {val.map((v: any, i: number) => (
                                        <Disclosure.Panel
                                            key={i}
                                            className={`mb-2 mt-3 text-sm grid grid-cols-${Object.values(v).length === 3 ? 3 : 2} gap-0.5`}
                                        >
                                            {
                                                Object.values(v).map((s: any, j: number, arr: any[]) => {
                                                    const style =
                                                        arr.length <= 3
                                                            ? ""
                                                            : j % 2 === 1
                                                                ? "last-child"
                                                                : j === arr.length - 1
                                                                    ? "both"
                                                                    : "first-child";

                                                    return (
                                                        <OddItem
                                                            key={`${i}-${j}`}
                                                            variant={variant}
                                                            value={s?.price}
                                                            label={s?.name}
                                                            base={s?.base}
                                                            style={style}
                                                        />
                                                    );
                                                })
                                            }

                                        </Disclosure.Panel>
                                    ))}


                                </>
                            );
                        }}
                    </Disclosure>
                </div>
            ))}
        </>
    );
};
