/** @format */

import { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import { getAnalytics, isSupported } from 'firebase/analytics'

import { firebaseApp } from '@config/firebase'
import { isMobile } from './screen'

export default function useCacheAssets() {
  const [cacheComplete, setCacheComplete] = useState(false)

  const [fonts] = useFonts({
    display: require('@assets/fonts/barlow.ttf'),
    body: require('@assets/fonts/barlow.ttf'),
  })

  // Set Cache Complete
  useEffect(() => {
    async function bootstrap() {
      if (!isMobile()) await isSupported().then(() => getAnalytics(firebaseApp))
    }

    bootstrap()

    if (fonts && !cacheComplete) setCacheComplete(true)
  }, [fonts])

  return cacheComplete
}
