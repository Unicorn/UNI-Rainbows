/** @format */

import { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
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
import { prettyLuscher } from '@lib/openai'

import { useSchema } from '@context/SchemaProvider'
import { THEME } from '@config/theme'
import { key } from '@utility/string'
import { isObject } from 'lodash'
import { IPIPDomain, IPIPFacet, getResults, getScore } from '@lib/ipip'
import ScoreFacets from './ScoreFacets'

export default function LuscherResults() {
  const [loading, setLoading] = useState(false)
  const { schema, setSchema } = useSchema()
  const [raw, setRaw] = useState<[InterpretationSection[], InterpretationSection[]]>()

  // color codes in order of their selection
  const firstSelection = schema.luscher1
  const secondSelection = schema.luscher2
  const lang = InterpretationLanguage.ENGLISH
  const test = new TwoStageTest(firstSelection, secondSelection)

  useEffect(() => {
    setLoading(true)

    async function getResults() {
      const luscherRaw = await test.getInterpretation(lang)
      setRaw(luscherRaw)

      // ChatGPT Adds up! Lets fetch only if we don't already have it saved.
      // if (!schema.luscherResults) {
      //   const luscherResults = await prettyLuscher(JSON.stringify(luscherRaw))
      //   if (luscherResults) setSchema({ ...schema, luscherResults })
      // }

      setLoading(false)

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
      const anxietyLevels: [ColorMap<1 | 2 | 3>, ColorMap<1 | 2 | 3>] = test.anxietyLevels
      console.log('anxietyLevels', anxietyLevels)

      // // Total anxiety level for each selection
      const totalAnxietyLevel: [number, number] = test.totalAnxietyLevel
      console.log('totalAnxietyLevel', totalAnxietyLevel)

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

  function renderFormatted() {
    return (
      <View style={styles.section}>
        {schema.luscherResults &&
          schema.luscherResults.split('\n').map(t => (
            <Text key={key()} style={styles.paragraph}>
              {t}
            </Text>
          ))}
      </View>
    )
  }

  function renderRaw() {
    return (
      raw &&
      raw[0].map(s => (
        <View key={key()} style={styles.section}>
          <Text style={styles.title}>{s.title.toString()}</Text>

          {s.interpretation.map(result => {
            if (isObject(result)) {
              return Object.entries(result).map(obj => (
                <Text key={key()} style={styles.paragraph}>
                  {obj[0]}: {obj[1]}
                </Text>
              ))
            }

            return (
              <Text key={key()} style={styles.paragraph}>
                {(result as string).toString()}
              </Text>
            )
          })}
        </View>
      ))
    )
  }

  function renderIpip() {
    const scores = getScore({ answers: schema.ipip.answers })
    const results = getResults()

    console.log(scores)
    console.log(results.A.results[scores.A.result].text)
    console.log('Facet', scores.A.facet)

    return Object.keys(results).map(domain => {
      const d = domain as IPIPDomain
      return (
        <View>
          <Text style={styles.title}>
            {results[d].title}: {scores[d].score} ({scores[d].result})
          </Text>

          <ScoreFacets domain={d} scores={scores} results={results[d].facets} />
        </View>
      )
    })
  }

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator style={styles.loading} />}

      {schema.luscherResults && renderFormatted()}

      {!schema.luscherResults && renderRaw()}

      {renderIpip()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 900,
  },
  loading: {
    paddingTop: THEME.size[5],
  },
  section: {
    paddingVertical: THEME.size[3],
  },
  title: {
    fontFamily: THEME.font.display,
    fontSize: THEME.size[3],
    fontWeight: '800',
    paddingBottom: THEME.size[2],
    paddingTop: THEME.size[3],
  },
  h2: {
    fontSize: THEME.size[2],
    fontWeight: '600',
    paddingVertical: THEME.size[1],
  },
  paragraph: {
    fontSize: THEME.size[2],
    lineHeight: THEME.size[4],
    paddingBottom: THEME.size[1],
  },
})
