/** @format */

import { createContext, Dispatch, SetStateAction, useContext } from 'react'
import { Schema } from './storage'
import { steps } from '../helpers/assessment'

export const SCREENS = {
  SEARCH: 'Search',
  FAVORITES: 'Favorites',
  AVAILABILITY: 'Availability',
}

export const defaultSchema: Schema = {
  step: steps[0],
  colorChoices1: [],
  colorChoices2: [],
}

export const SchemaContext = createContext<{ schema: Schema; setSchema: Dispatch<SetStateAction<Schema>> } | undefined>(undefined)

export function useSchema() {
  const context = useContext(SchemaContext)
  if (!context) {
    throw new Error('useSchema must be used within a SchemaProvider')
  }
  return context
}
