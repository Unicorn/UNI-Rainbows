/** @format */

import { Suspense, useCallback, useState } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { useTranslation } from 'react-i18next'

import './config/i18n'
import { THEME } from './config/theme'
import { SchemaContext, defaultSchema } from './config/state'
import { Schema } from './config/storage'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import HomeScreen from './views/HomeScreen'

const firebaseConfig = {
  apiKey: 'AIzaSyCNB_3BqwnB4Varzcv1q3g5AjDSPQYXqBc',
  authDomain: 'unicorn-rainbows.firebaseapp.com',
  projectId: 'unicorn-rainbows',
  storageBucket: 'unicorn-rainbows.appspot.com',
  messagingSenderId: '754120759383',
  appId: '1:754120759383:web:7cd0a694a7f8d0e1fb2b12',
  measurementId: 'G-SLXVG5XXH6',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

isSupported() && getAnalytics(app)

const Tab = createMaterialBottomTabNavigator()

SplashScreen.preventAutoHideAsync()

export default function App() {
  const { t } = useTranslation()
  const [schema, setSchema] = useState<Schema>(defaultSchema)

  const [fontsLoaded] = useFonts({
    display: require('./assets/fonts/barlow.ttf'),
    body: require('./assets/fonts/barlow.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <Suspense fallback="Loading...">
      <SchemaContext.Provider value={{ schema, setSchema }}>
        <SafeAreaProvider>
          <NavigationContainer onReady={onLayoutRootView}>
            <Tab.Navigator>
              <Tab.Screen name={t('nav.home')} component={HomeScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </SchemaContext.Provider>
    </Suspense>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: THEME.size[2],
  },
  tabs: {
    backgroundColor: THEME.colors.neutral[900],
    paddingTop: Platform.OS === 'ios' ? THEME.space[7] : 0,
  },
  selected: {
    backgroundColor: THEME.colors.purple[300],
    height: 50,
  },
})
