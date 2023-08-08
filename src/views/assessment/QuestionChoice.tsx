/** @format */

import { Text, StyleSheet, View } from '@bacons/react-views'
import { TouchableOpacity } from 'react-native'
import { IPIPAnswer, IPIPChoice, IPIPQuestion } from '@lib/ipip'
import { FontAwesome } from '@expo/vector-icons'

import { choiceLabel } from '@utility/assessment'
import { THEME } from '@config/theme'
import { isMobile } from '@utility/screen'

interface Props {
  question: IPIPQuestion
  choice: IPIPChoice
  answerHandler: (answer: IPIPAnswer) => void
}

export default function QuestionChoice({ question, choice, answerHandler }: Props) {
  const answer = { id: question.id, domain: question.domain, facet: question.facet, score: choice.score }
  const colors = {
    1: '#A2241C',
    2: '#B78742',
    3: '#4C4C4C',
    4: '#38649F',
    5: '#1E8030',
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => answerHandler(answer)}>
        <FontAwesome name="circle" size={30} color={colors[choice.color]} />
      </TouchableOpacity>

      <Text style={styles.label}>{choiceLabel(choice.color)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '20%',
  },
  button: {
    alignItems: 'center',
    height: 50,
    paddingVertical: 10,
    width: '100%',
  },
  label: {
    fontSize: isMobile() ? THEME.size[1] : THEME.size[2],
    paddingTop: THEME.size[3],
    textAlign: 'center',
  },
})
