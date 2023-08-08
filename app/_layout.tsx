/** @format */
import { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'

import { getAnalytics, isSupported } from 'firebase/analytics'

import '@config/firebase'
import '@config/i18n'
import { SchemaProvider } from '@context/SchemaProvider'
import { firebaseApp } from '@config/firebase'

export default function RootLayout() {
  const [loading, setLoading] = useState(true)
  const [fontsLoaded] = useFonts({
    display: require('./assets/fonts/barlow.ttf'),
    body: require('./assets/fonts/barlow.ttf'),
  })

  useEffect(() => {
    async function bootstrap() {
      await isSupported().then(() => getAnalytics(firebaseApp))
    }

    bootstrap()

    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (!fontsLoaded || loading) {
    return null
  }

  return (
    <SchemaProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="other"
          options={{
            title: "",
            headerShown: true,
            headerTransparent: Platform.OS === "ios",
            headerBlurEffect: "regular",
          }}
        /> */}
      </Stack>
    </SchemaProvider>
  )
}
