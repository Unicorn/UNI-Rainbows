/** @format */

import { Platform } from 'react-native'
import { steps, Step } from './assessment'

export function isMobile(): boolean {
  if (Platform.OS === 'ios' || Platform.OS === 'android') return true

  if (window && window.innerWidth < 768) return true

  return false
}

export function nextStep(step: Step): Step {
  const currentIndex = steps.indexOf(step)
  const nextIndex = currentIndex + 1
  return steps[nextIndex]
}
