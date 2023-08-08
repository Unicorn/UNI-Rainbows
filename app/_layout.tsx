/** @format */
import { Slot, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from '@bacons/react-views'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import 'react-native-url-polyfill/auto'

import '@config/firebase'
import '@config/i18n'
import { SchemaProvider } from '@context/SchemaProvider'
import InfoButton from '@views/global/InfoButton'
import Logo from '@views/global/Logo'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SchemaProvider>
        <StatusBar style="auto" />

        <Stack
          screenOptions={{
            headerRight: InfoButton,
            headerTitle: Logo,
            headerTitleStyle: styles.header,
          }}
        >
          <Slot />
        </Stack>
      </SchemaProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
  },
})
