/** @format */

import { ScrollView, StyleSheet, Dimensions } from 'react-native'

import { THEME } from '../config/theme'

interface Props {
  children: React.ReactNode
}

export default function Screen({ children }: Props) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scroll}>
      {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: THEME.colors.neutral[0],
  },
  scroll: {
    alignSelf: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    width: '100%',
  },
})
