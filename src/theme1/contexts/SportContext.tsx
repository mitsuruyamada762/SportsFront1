import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react'

export interface LeagueData {
  id: string
  countryName: string
  countryFlag: string
  leagueName: string
}

export type CouponOrderType = 'time' | 'popular'

interface SportState {
  selectedSport: string | null
  selectedCategory: string | null
  isCategorySelectOpen: boolean
  isLoading: boolean
  error: string | null
  isSearchFocused: boolean
  couponLeagues: LeagueData[]
  couponOrder: CouponOrderType
}

interface SportContextType {
  sportState: SportState
  setSportState: React.Dispatch<React.SetStateAction<SportState>>
  setSelectedSport: (sport: string | null) => void
  setSelectedCategory: (category: string | null) => void
  setIsCategorySelectOpen: (isOpen: boolean) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSearchFocus: (focused: boolean) => void
  toggleLeagueInCoupon: (league: LeagueData) => void
  isLeagueInCoupon: (leagueId: string) => boolean
  clearCouponLeagues: () => void
  setCouponOrder: (order: CouponOrderType) => void
  resetSportState: () => void
}

const SportContext = createContext<SportContextType | undefined>(undefined)

const initialSportState: SportState = {
  selectedSport: null,
  selectedCategory: null,
  isCategorySelectOpen: false,
  isLoading: false,
  error: null,
  isSearchFocused: false,
  couponLeagues: [],
  couponOrder: 'time'
}

export const SportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sportState, setSportState] = useState<SportState>(initialSportState)

  const setSelectedSport = useCallback((sport: string | null) => {
    setSportState(prev => ({
      ...prev,
      selectedSport: sport,
      selectedCategory: null // Reset category when sport changes
    }))
  }, [])

  const setSelectedCategory = useCallback((category: string | null) => {
    setSportState(prev => ({
      ...prev,
      selectedCategory: category
    }))
  }, [])

  const setIsCategorySelectOpen = useCallback((isOpen: boolean) => {
    setSportState(prev => ({
      ...prev,
      isCategorySelectOpen: isOpen
    }))
  }, [])

  const setLoading = useCallback((loading: boolean) => {
    setSportState(prev => ({
      ...prev,
      isLoading: loading
    }))
  }, [])

  const setError = useCallback((error: string | null) => {
    setSportState(prev => ({
      ...prev,
      error: error
    }))
  }, [])

  const setSearchFocus = useCallback((focused: boolean) => {
    setSportState(prev => ({
      ...prev,
      isSearchFocused: focused
    }))
  }, [])

  const toggleLeagueInCoupon = useCallback((league: LeagueData) => {
    setSportState(prev => {
      const isAlreadyInCoupon = prev.couponLeagues.some(l => l.id === league.id)
      if (isAlreadyInCoupon) {
        // Remove from coupon
        return {
          ...prev,
          couponLeagues: prev.couponLeagues.filter(l => l.id !== league.id)
        }
      } else {
        // Add to coupon
        return {
          ...prev,
          couponLeagues: [...prev.couponLeagues, league]
        }
      }
    })
  }, [])

  const isLeagueInCoupon = useCallback((leagueId: string) => {
    return sportState.couponLeagues.some(l => l.id === leagueId)
  }, [sportState.couponLeagues])

  const clearCouponLeagues = useCallback(() => {
    setSportState(prev => ({
      ...prev,
      couponLeagues: []
    }))
  }, [])

  const setCouponOrder = useCallback((order: CouponOrderType) => {
    setSportState(prev => ({
      ...prev,
      couponOrder: order
    }))
  }, [])

  const resetSportState = useCallback(() => {
    setSportState(initialSportState)
  }, [])

  const contextValue = useMemo(() => ({
    sportState,
    setSportState,
    setSelectedSport,
    setSelectedCategory,
    setIsCategorySelectOpen,
    setLoading,
    setError,
    setSearchFocus,
    toggleLeagueInCoupon,
    isLeagueInCoupon,
    clearCouponLeagues,
    setCouponOrder,
    resetSportState
  }), [sportState, setSelectedSport, setSelectedCategory, setIsCategorySelectOpen, setLoading, setError, setSearchFocus, toggleLeagueInCoupon, isLeagueInCoupon, clearCouponLeagues, setCouponOrder, resetSportState])

  return (
    <SportContext.Provider value={contextValue}>
      {children}
    </SportContext.Provider>
  )
}

export const useSport = () => {
  const context = useContext(SportContext)
  if (context === undefined) {
    throw new Error('useSport must be used within a SportProvider')
  }
  return context
}
