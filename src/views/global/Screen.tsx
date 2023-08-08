/** @format */

import { ReactNode } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'

import { THEME } from '@config/theme'
import Loading from './Loading'
import useCacheAssets from '@utility/assets'

interface Props {
  loading?: boolean
  children: ReactNode
}

export default function Screen({ children, loading }: Props) {
  const areAssetsCached = useCacheAssets()

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.scroll}>
      <View style={styles.content}>{areAssetsCached && !loading ? children : <Loading />}</View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  scroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 'auto',
    maxWidth: 1200,
    padding: THEME.size[5],
    width: '100%',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
})
