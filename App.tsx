/** @format */

import { useCallback, useState } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

import HomeScreen from './views/HomeScreen'
import FavoritesScreen from './views/FavoritesScreen'
import AvailabilityScreen from './views/AvailabilityScreen'
import { THEME } from './config/theme'
import { SearchItem } from './types/search'
import { SchemaContext, SCREENS, defaultSchema } from './config/state'
import { Schema } from './config/storage'

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
const analytics = getAnalytics(app)

const Tab = createMaterialTopTabNavigator()

SplashScreen.preventAutoHideAsync()

export default function App() {
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
    <SchemaContext.Provider value={{ schema, setSchema }}>
      <NavigationContainer onReady={onLayoutRootView}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: THEME.colors.neutral[900],
            tabBarInactiveTintColor: '#fff',
            tabBarIndicatorStyle: styles.selected,
            tabBarLabelStyle: styles.label,
            tabBarStyle: styles.tabs,
          }}
        >
          <Tab.Screen name={SCREENS.SEARCH} component={HomeScreen} />
          <Tab.Screen name={SCREENS.FAVORITES} component={FavoritesScreen} />
          <Tab.Screen name={SCREENS.AVAILABILITY} component={AvailabilityScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SchemaContext.Provider>
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
