/** @format */

import { View, Text } from '@bacons/react-views'
import { StyleSheet } from 'react-native'

import { IPIPDomain, IPIPFacet, IPIPResultFacets, IPIPScores } from '@lib/ipip'
import { THEME } from '@config/theme'
import { isMobile } from '@utility/screen'

interface Props {
  domain: IPIPDomain
  scores: IPIPScores
  results: IPIPResultFacets
}

export default function ScoreFacets({ domain, scores, results }: Props) {
  return (
    <View style={styles.container}>
      {Object.keys(scores[domain].facet).map(key => {
        const k = key as IPIPFacet

        return (
          <View style={styles.card}>
            <Text style={styles.title}>
              {results[k].title}: {scores[domain].facet[k].score} ({scores[domain].facet[k].result})
            </Text>
            <Text style={styles.paragraph}>{results[k].text}</Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  card: {
    backgroundColor: THEME.colors.neutral[100],
    marginVertical: THEME.size[1],
    paddingHorizontal: THEME.size[2],
  },
  title: {
    fontSize: THEME.size[2],
    fontWeight: '600',
    paddingVertical: THEME.size[1],
  },
  paragraph: {
    fontSize: THEME.size[1],
    lineHeight: THEME.size[3],
    paddingBottom: THEME.size[1],
  },
})
