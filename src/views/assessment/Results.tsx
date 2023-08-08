/** @format */

import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import {
  ColorMap,
  EmotionalState,
  FunctionKeys,
  InterpretationLanguage,
  InterpretationSection,
  MainColor,
  Sign,
  SignMap,
  Translations,
  TwoStageTest,
} from 'luscher-test'

import { useSchema } from '@context/SchemaProvider'
import LuscherInterpretation from '@views/assessment/LuscherInterpretation'
import { THEME } from '@config/theme'

export default function Results() {
  const { schema, setSchema } = useSchema()
  const [r0, setR0] = useState<InterpretationSection[]>([])
  const [r1, setR1] = useState<InterpretationSection[]>([])

  // color codes in order of their selection
  const firstSelection = schema.luscher1
  const secondSelection = schema.luscher2

  const test = new TwoStageTest(firstSelection, secondSelection)

  useEffect(() => {
    async function getResults() {
      await test.getInterpretation(InterpretationLanguage.ENGLISH).then(r => {
        setR0(r[0])
        setR1(r[1])
      })

      // // Obtained color selections
      // const selections: [MainColor[], MainColor[]] = test.selections
      // console.log('selections', selections)

      // // Color pairs that occur in both selections
      // const pairs: [MainColor, MainColor][] = test.pairs
      // console.log('pairs', pairs)

      // // Luscher groups in each selection
      // const groups: [MainColor, MainColor?][][] = test.groups
      // console.log('groups', groups)

      // // State of disturbance and compensation by color for each selection
      // const emotionalStates: [ColorMap<EmotionalState>, ColorMap<EmotionalState>] = test.emotionalStates
      // console.log('emotionalStates', emotionalStates)

      // // State of anxiety level by color for each selection
      // const anxietyLevels: [ColorMap<1 | 2 | 3>, ColorMap<1 | 2 | 3>] = test.anxietyLevels
      // console.log('anxietyLevels', anxietyLevels)

      // // Total anxiety level for each selection
      // const totalAnxietyLevel: [number, number] = test.totalAnxietyLevel
      // console.log('totalAnxietyLevel', totalAnxietyLevel)

      // // Interpretation for total anxiety level of second selection
      // const anxietyLevelInterpretation: Translations<string> = test.anxietyLevelInterpretation
      // console.log('anxietyLevelInterpretation', anxietyLevelInterpretation)

      // // Signs for each color
      // const signs: [ColorMap<[Sign, Sign?]>, ColorMap<[Sign, Sign?]>] = test.signs
      // console.log('signs', signs)

      // // Colors for each sign
      // const signMaps: [SignMap<MainColor[]>, SignMap<MainColor[]>] = test.signMaps
      // console.log('signMaps', signMaps)

      // // Final color pairs used to get interpretation by sign for each selection
      // const interpretationPairs: [SignMap<FunctionKeys[]>, SignMap<FunctionKeys[]>] = test.interpretationPairs
      // console.log('interpretationPairs', interpretationPairs)
    }

    getResults()
  }, [])
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <LuscherInterpretation section={r0} />
      <LuscherInterpretation section={r1} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {},
  container: {
    maxWidth: 900,
    marginBottom: THEME.size[10],
    paddingBottom: THEME.size[10],
  },
})
