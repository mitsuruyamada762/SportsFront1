  import React, { createContext, useContext, useState, ReactNode } from 'react'

interface FilterState {
  column1: string | null
  column2: string | null
  column3: string | null
}

interface FilterContextType {
  selectedFilters: FilterState
  setSelectedFilters: React.Dispatch<React.SetStateAction<FilterState>>
  handleFilterToggle: (value: string, column: 'column1' | 'column2' | 'column3') => void
  resetToDefault: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    column1: 'full_time_result',  // First item from filterItems1
    column2: 'goals_over_under',  // First item from filterItems2
    column3: 'both_teams_to_score'  // First item from filterItems3
  })

  const handleFilterToggle = (value: string, column: 'column1' | 'column2' | 'column3') => {
    setSelectedFilters(prev => {
      const newState = { ...prev }
      // If clicking the same filter, deselect it
      if (prev[column] === value) {
        newState[column] = null
      } else {
        // Otherwise, select this filter and deselect any other in the same column
        newState[column] = value
      }
      return newState
    })
  }

  const resetToDefault = () => {
    setSelectedFilters({
      column1: 'full_time_result',  // First item from filterItems1
      column2: 'goals_over_under',  // First item from filterItems2
      column3: 'both_teams_to_score'  // First item from filterItems3
    })
  }

  return (
    <FilterContext.Provider value={{ selectedFilters, setSelectedFilters, handleFilterToggle, resetToDefault }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider')
  }
  return context
}
