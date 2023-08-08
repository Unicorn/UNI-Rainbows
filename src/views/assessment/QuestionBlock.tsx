/** @format */

import { Dimensions, StyleSheet } from 'react-native'
import { View, Text } from '@bacons/react-views'
import { Defs, LinearGradient, Svg, Stop, Rect } from 'react-native-svg'

import { THEME } from '@config/theme'
import { IPIPAnswer, IPIPKeyed, IPIPQuestion, getChoices } from '@lib/ipip'
import QuestionChoice from './QuestionChoice'
import { isMobile } from '@utility/screen'

interface Props {
  index: number
  question: IPIPQuestion
  answerHandler: (answer: IPIPAnswer) => void
}

export default function QuestionBlock({ index, question, answerHandler }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.page}>{index + 1} / 120</Text>
      <Text style={styles.question}>I {question.text.toLowerCase()}</Text>
      <View style={styles.choices}>
        {getChoices()[question.keyed as IPIPKeyed].map(choice => (
          <QuestionChoice key={`${question.id}-${choice.score}`} question={question} choice={choice} answerHandler={answerHandler} />
        ))}
      </View>
      <Svg height="2" viewBox="0 0 1600 4" style={styles.line}>
        <Defs>
          <LinearGradient x1="10%" y1="50%" x2="90%" y2="50%" id="LG2">
            <Stop stopColor="#A2241C" offset="0%" />
            <Stop stopColor="#B78742" offset="25%" />
            <Stop stopColor="#4C4C4C" offset="50%" />
            <Stop stopColor="#38649F" offset="75%" />
            <Stop stopColor="#1E8030" offset="100%" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="1600" height="2" fill="url(#LG2)" />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  page: {
    textAlign: 'center',
  },
  question: {
    fontFamily: THEME.font.display,
    fontSize: isMobile() ? THEME.size[5] : THEME.size[8],
    fontWeight: '900',
    letterSpacing: 1,
    paddingBottom: THEME.size[9],
    paddingTop: THEME.size[3],
    textAlign: 'center',
    width: '100%',
  },
  choices: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    maxWidth: 800,
    width: '100%',
  },
  line: {
    bottom: isMobile() ? 72 : 62,
    height: 2,
    position: 'absolute',
    width: '100%',
  },
})
