/** @format */

import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'

import { STORAGE_KEYS, storage, storageErrHandler } from '../config/storage'
import { useSchema } from '../config/state'
import { Steps, steps } from '../helpers/assessment'
import Screen from './Screen'
import Header from './global/Header'
import Container from './Container'
import ColorChoices from './assessment/ColorChoices'
import Survey from './assessment/Survey'
import Results from './assessment/Results'
import Intro from './assessment/Intro'
import Register from './assessment/Register'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
  const { schema, setSchema } = useSchema()

  useEffect(() => {
    storage.load({ key: STORAGE_KEYS.RESULTS }).then(setSchema).catch(storageErrHandler)
  }, [])

  function completeHandler(step: Steps) {
    const currentIndex = steps.indexOf(step)
    const nextIndex = currentIndex + 1

    setTimeout(() => setSchema({ ...schema, step: steps[nextIndex] }), 1000)
  }

  function renderStep() {
    switch (schema.step) {
      case 'intro':
        return <Intro completeHandler={completeHandler} />
      case 'register':
        return <Register completeHandler={completeHandler} />
      case 'color1' || 'color2':
        return <ColorChoices completeHandler={completeHandler} />
      case 'survey1':
        return <Survey />
      case 'complete':
        return <Results />
    }
  }

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <Screen>
        <Container>{renderStep()}</Container>
      </Screen>
    </SafeAreaView>
  )
}
