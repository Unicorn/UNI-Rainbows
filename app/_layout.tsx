/** @format */
import { Slot, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

// import '@config/firebase'
// import '@config/i18n'
import { SchemaProvider } from '@context/SchemaProvider'
import InfoButton from '@views/global/InfoButton'
import Logo from '@views/global/Logo'
import { StyleSheet } from '@bacons/react-views'

export default function RootLayout() {
  return (
    <SchemaProvider>
      <StatusBar style="auto" />

      <Stack
        screenOptions={{
          // headerShown: false,
          headerRight: InfoButton,
          headerTitle: Logo,
          headerTitleStyle: styles.header,
        }}
      >
        <Slot />
      </Stack>
    </SchemaProvider>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
  },
})
