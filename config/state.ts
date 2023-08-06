/** @format */

import { createContext } from 'react'

export const SCREENS = {
  SEARCH: 'Search',
  FAVORITES: 'Favorites',
  AVAILABILITY: 'Availability',
}

export const FavoritesContext = createContext(null)
export const AvailabilityContext = createContext(null)
