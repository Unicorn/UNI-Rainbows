/** @format */

import { useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { MainColor } from 'luscher-test'

import { useSchema } from '@context/SchemaProvider'
import { THEME } from '@config/theme'
import { colorChoices, Color, Steps } from '@utility/assessment'
import { isMobile } from '@utility/screen'
import ColorBlock from '@views/assessment/ColorBlock'

interface Props {
  step: Steps
  completeHandler: (step: Steps) => void
}

export default function ColorChoices({ step, completeHandler }: Props) {
  const { schema, setSchema } = useSchema()
  const [colors, setColors] = useState<Color[]>(step === 'color1' ? colorChoices() : colorChoices().reverse())

  function pressHandler(value: MainColor) {
    const nextSchema = { ...schema }
    const nextColors = [...colors]

    nextSchema[step].push(value)

    // Find the color by value and set its selected state
    nextColors.filter(c => c.value === value)[0].selected = true

    setSchema(nextSchema)
    setColors(nextColors)

    // If we filled up the first array, lets reset color selection
    if (nextSchema[step].length === 8) {
      completeHandler(step)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Click the colors in an order based on what makes you feel the best.</Text>
      <View style={styles.layout}>
        {colors.map(color => (
          <ColorBlock key={color.key} color={color} selected={color.selected} pressHandler={pressHandler} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: THEME.size[5],
    width: '100%',
  },
  paragraph: {
    color: THEME.colors.neutral[800],
    fontFamily: THEME.font.body,
    fontSize: isMobile() ? THEME.size[3] : THEME.size[5],
    textAlign: 'center',
    paddingBottom: THEME.size[2],
  },
  layout: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
})
