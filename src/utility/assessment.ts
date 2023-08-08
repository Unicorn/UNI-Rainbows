/** @format */

import { MainColor, ColorHex } from 'luscher-test'

type ColorKey = keyof typeof MainColor

export interface Color {
  key: ColorKey
  hex: ColorHex
  value: MainColor
  selected: boolean
}

export type Step = 'luscher1' | 'ipip' | 'luscher2' | 'results'

export const steps: Step[] = ['luscher1', 'ipip', 'luscher2', 'results']

export function colorChoices(): Color[] {
  let arr: Color[] = []

  for (const key in ColorHex) {
    if (Object.prototype.hasOwnProperty.call(ColorHex, key)) {
      const hex = ColorHex[key]
      const value = MainColor[key]

      arr.push({ key: key as ColorKey, hex, value, selected: false })
    }
  }

  return arr
}

export function choiceLabel(value: 1 | 2 | 3 | 4 | 5): string | null {
  switch (value) {
    case 1:
      return 'Strongly Disagree'
    case 5:
      return 'Strongly Agree'
    default:
      return null
  }
}
