/** @format */

import { ReactNode } from 'react'
import { View, StyleSheet, StyleProp } from 'react-native'
import { THEME } from '../config/theme'

interface Props {
  children: ReactNode
  style?: StyleProp<any>
}

export default function Container({ children, style }: Props) {
  return <View style={[styles.container, style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flex: 1,
    paddingHorizontal: THEME.space[4],
    maxWidth: 1400,
    width: '100%',
  },
})
