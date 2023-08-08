/** @format */

import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { IPIPAnswer, getQuestions } from '@lib/ipip'

import { useSchema } from '@context/SchemaProvider'
import QuestionBlock from './QuestionBlock'
import { THEME } from '@config/theme'
import { router } from 'expo-router'

export default function Ipip() {
  const { t } = useTranslation()
  const { schema, setSchema } = useSchema()

  const questions = getQuestions()

  function answerHandler(answer: IPIPAnswer) {
    const nextSchema = { ...schema }
    nextSchema.ipip.index++
    nextSchema.ipip.answers.push(answer)

    if (nextSchema.ipip.index === 120) nextSchema.step = 'acute'

    setSchema(nextSchema)

    // We've reached the end, on to the next step
    if (nextSchema.ipip.index === 120) router.replace('/acute')
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
