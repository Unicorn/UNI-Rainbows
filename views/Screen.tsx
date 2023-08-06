/** @format */

import { ScrollView, StyleSheet } from 'react-native'

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
    backgroundColor: '#E0FFED',
    flex: 1,
  },
  scroll: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
})
