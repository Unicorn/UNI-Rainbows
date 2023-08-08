/** @format */

import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { useSchema } from '@context/SchemaProvider'
import { Steps, steps } from '@utility/assessment'
import Screen from '@views/global/Screen'
import ColorChoices from '@views/assessment/ColorChoices'
import Survey from '@views/assessment/Survey'
import Results from '@views/assessment/Results'
import Header from '@views/global/Header'

export default function App() {
  const { schema, setSchema } = useSchema()

  function completeHandler(step: Steps) {
    const currentIndex = steps.indexOf(step)
    const nextIndex = currentIndex + 1
    setTimeout(() => setSchema({ ...schema, step: steps[nextIndex] }), 500)
  }

  function renderStep() {
    switch (schema.step) {
      case 'color1':
        return <ColorChoices step={schema.step} completeHandler={completeHandler} />
      case 'color2':
        return <ColorChoices step={schema.step} completeHandler={completeHandler} />
      case 'survey1':
        return <Survey completeHandler={completeHandler} />
      case 'complete':
        return <Results />
    }
  }

  return (
    <View>
      <StatusBar style="auto" />
      <Header step={schema.step} />
      <Screen>{renderStep()}</Screen>
    </View>
  )
}
