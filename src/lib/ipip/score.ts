/** @format */

import { IPIPScores, IPIPScoreOptions, IPIPResults } from './types'
import results from './data/en.results.json'

function _calcHandler(score: number, count: number): string {
  const average = score / count
  let result = 'neutral'
  if (average > 3) {
    result = 'high'
  } else if (average < 3) {
    result = 'low'
  }
  return result
}

export function getScore({ answers, calcHandler }: IPIPScoreOptions): IPIPScores {
  const calculateResult = calcHandler || _calcHandler

  const reduceFactors = (a: any, b: any) => {
    if (!a[b.domain]) {
      a[b.domain] = { score: 0, count: 0, result: 'neutral', facet: {} }
    }

    a[b.domain].score += b.score
    a[b.domain].count += 1
    a[b.domain].result = calculateResult(a[b.domain].score, a[b.domain].count)

    if (b.facet) {
      if (!a[b.domain].facet[b.facet]) {
        a[b.domain].facet[b.facet] = { score: 0, count: 0, result: 'neutral' }
      }
      a[b.domain].facet[b.facet].score += b.score
      a[b.domain].facet[b.facet].count += 1
      a[b.domain].facet[b.facet].result = calculateResult(a[b.domain].facet[b.facet].score, a[b.domain].facet[b.facet].count)
    }

    return a
  }

  return answers.reduce(reduceFactors, {})
}

export function getResults(): IPIPResults {
  return results as unknown as IPIPResults
}
