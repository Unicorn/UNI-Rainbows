/** @format */

import { MainColor, ColorHex } from 'luscher-test'

type ColorKey = keyof typeof MainColor

export interface Color {
  key: ColorKey
  hex: ColorHex
  value: MainColor
  selected: boolean
}

export type Steps = 'color1' | 'survey1' | 'color2' | 'complete'

export const steps: Steps[] = ['color1', 'survey1', 'color2', 'complete']

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
