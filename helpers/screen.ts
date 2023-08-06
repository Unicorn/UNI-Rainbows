/** @format */

import { Platform } from 'react-native'

export function isMobile(): boolean {
  if (Platform.OS === 'ios' || Platform.OS === 'android') return true

  if (window && window.innerWidth < 768) return true

  return false
}
