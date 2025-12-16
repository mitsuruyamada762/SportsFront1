import React, { createContext, useContext, useState, ReactNode } from 'react'



interface LiveScheduleContextType {
    selectedTimeFilter: string | number
    selectedGame: string
    handleTimeFilterChange: (filter: string | number) => void
    getTimeFilterLabel: () => string
    handleGameFilterChange: (filter: string) => void
    resetFilters: () => void
}

const LiveScheduleContext = createContext<LiveScheduleContextType | undefined>(undefined)

export const LiveScheduleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedTimeFilter, setSelectedTimeFilter] = useState<string | number>('all')
    const [selectedGame, setSelectedGame] = useState<string>('all')
    const handleTimeFilterChange = (filter: string | number) => {
        setSelectedTimeFilter(filter)
    }

    const handleGameFilterChange = (filter: string) => {
        setSelectedGame(filter)
    }

    const resetFilters = () => {
        setSelectedTimeFilter('all')
        setSelectedGame('all')
    }


    const getTimeFilterLabel = () => {
        if (selectedTimeFilter === 'all') return 'All'
        return `${selectedTimeFilter} hours`
    }


    return (
        <LiveScheduleContext.Provider
            value={{
                selectedTimeFilter,
                handleTimeFilterChange,
                resetFilters,
                getTimeFilterLabel,
                selectedGame,
                handleGameFilterChange,
            }}
        >
            {children}
        </LiveScheduleContext.Provider>
    )
}

export const useLiveSchedule = () => {
    const context = useContext(LiveScheduleContext)
    if (context === undefined) {
        throw new Error('useLiveSchedule must be used within a LiveScheduleProvider')
    }
    return context
}
