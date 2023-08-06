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
import { AvailabilityContext, FavoritesContext, SCREENS } from './config/state'

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
  const [favorites, setFavorites] = useState<SearchItem[]>([])
  const [availability, setAvailability] = useState<SearchItem>()

  const [fontsLoaded] = useFonts({
    alice: require('./assets/fonts/alice.ttf'),
    lietome: require('./assets/fonts/lietome.ttf'),
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
    <FavoritesContext.Provider value={[favorites, setFavorites]}>
      <AvailabilityContext.Provider value={[availability, setAvailability]}>
        <NavigationContainer onReady={onLayoutRootView}>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: THEME.colors.green[900],
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
      </AvailabilityContext.Provider>
    </FavoritesContext.Provider>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: THEME.size[2],
    fontWeight: 'bold',
  },
  tabs: {
    backgroundColor: THEME.color.secondary,
    paddingTop: Platform.OS === 'ios' ? THEME.space[7] : 0,
  },
  selected: {
    backgroundColor: THEME.color.primary,
    height: 50,
  },
})
