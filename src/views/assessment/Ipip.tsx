/** @format */

import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { IPIPAnswer, getQuestions } from '@lib/ipip'

import { useSchema } from '@context/SchemaProvider'
import QuestionBlock from './QuestionBlock'
import { THEME } from '@config/theme'

export default function Ipip() {
  const { t } = useTranslation()
  const { schema, setSchema } = useSchema()

  const questions = getQuestions()

  function answerHandler(answer: IPIPAnswer) {
    const nextState = { ...schema }
    nextState.ipip.index++
    nextState.ipip.answers.push(answer)
    setSchema(nextState)
  }

  return (
    <View style={styles.container}>
      <QuestionBlock question={questions[schema.ipip.index]} index={schema.ipip.index} answerHandler={answerHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: THEME.size[8],
    width: '100%',
  },
})
