/** @format */

import { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'

import { THEME } from '@config/theme'

interface Props {
  children: ReactNode
}

export default function Main({ children }: Props) {
  return <View style={styles.screen}>{children}</View>
}

const styles = StyleSheet.create({
  screen: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.neutral[0],
    justifyContent: 'center',
    padding: THEME.size[5],
    width: '100%',
  },
})
