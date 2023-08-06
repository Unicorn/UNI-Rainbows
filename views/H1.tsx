/** @format */

import { ReactNode } from 'react'
import { Text, StyleSheet, Platform } from 'react-native'

import { THEME } from '../config/theme'
import { isMobile } from '../helpers/screen'

interface Props {
  children: ReactNode
}
export default function H1({ children }: Props) {
  return <Text style={styles.h1}>{children}</Text>
}

const styles = StyleSheet.create({
  h1: {
    color: '#fff',
    fontFamily: THEME.font.display,
    fontSize: isMobile() ? THEME.size[5] : THEME.size[8],
  },
})
