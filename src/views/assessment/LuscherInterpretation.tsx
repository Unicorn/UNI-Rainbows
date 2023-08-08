/** @format */

import { View, Text, StyleSheet } from 'react-native'
import { InterpretationSection } from 'luscher-test'
import { isObject } from 'lodash'

import { THEME } from '@config/theme'
import { isMobile } from '@utility/screen'

interface Props {
  section: InterpretationSection[]
}

export default function LuscherInterpretation({ section }: Props) {
  return (
    <View style={styles.container}>
      {section.map(s => (
        <View key={Math.random()} style={styles.section}>
          <Text style={styles.title}>{s.title.toString()}</Text>
          {s.interpretation.map(r => {
            if (isObject(r)) {
              return Object.entries(r).map(i => (
                <Text key={Math.random()}>
                  {i[0]}: {i[1]}
                </Text>
              ))
            }

            return <Text>{(r as string).toString()}</Text>
          })}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.black[0],
    shadowColor: '#B9A062',
    shadowRadius: 0,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    padding: isMobile() ? THEME.size[3] : THEME.size[3],
  },
  section: {
    paddingBottom: THEME.size[3],
  },
  title: {
    fontFamily: THEME.font.display,
    fontSize: isMobile() ? THEME.size[3] : THEME.size[4],
    fontWeight: '500',
    paddingBottom: THEME.size[3],
  },
})
