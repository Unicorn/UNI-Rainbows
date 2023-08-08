/** @format */

import { ReactNode } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import { THEME } from '@config/theme'
import Loading from './Loading'
import useCacheAssets from '@utility/assets'

interface Props {
  children: ReactNode
}

export default function Screen({ children }: Props) {
  const areAssetsCached = useCacheAssets()

  return (
    <>
      <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.scroll}>
        {areAssetsCached ? children : <Loading />}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {},
  scroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 'auto',
    maxWidth: 1200,
    padding: THEME.size[5],
  },
})
