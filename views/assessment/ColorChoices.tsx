/** @format */

import { useEffect, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { cloneDeep } from 'lodash'
import { MainColor } from 'luscher-test'

import { colorChoices, Color, Steps } from '../../helpers/assessment'
import { THEME } from '../../config/theme'
import { isMobile } from '../../helpers/screen'
import { useSchema } from '../../config/state'
import { storage, STORAGE_KEYS } from '../../config/storage'
import ColorBlock from './ColorBlock'

interface Props {
  completeHandler: (step: Steps) => void
}

export default function ColorChoices({ completeHandler }: Props) {
  const { schema, setSchema } = useSchema()
  const [colors, setColors] = useState<Color[]>(colorChoices())

  useEffect(() => {
    storage
      .load({ key: STORAGE_KEYS.CHOICES })
      .then(data => setSchema(data))
      .catch(error => console.error('Error loading storage', error))
  }, [])

  function pressHandler(value: MainColor) {
    const nextSchema = cloneDeep(schema)
    const nextColors = cloneDeep(colors)
    const step: Steps = schema.colorChoices1.length < 8 ? 'color1' : 'color2'

    step === 'color1' ? nextSchema.colorChoices1.push(value) : nextSchema.colorChoices2.push(value)

    // Find the color by value and set its selected state
    nextColors.filter(c => c.value === value)[0].selected = true

    setSchema(nextSchema)
    setColors(nextColors)

    // If we filled up the first array, lets reset color selection
    nextSchema.colorChoices1.length === 8 && completeHandler(step)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Colors</Text>
      <Text style={styles.paragraph}>Pick the color that makes you feel the best and repeat until all are gone.</Text>
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
    paddingVertical: THEME.size[10],
    width: '100%',
  },
  header: {
    color: THEME.colors.neutral[900],
    fontFamily: THEME.font.display,
    fontSize: isMobile() ? THEME.size[5] : THEME.size[8],
    textAlign: 'center',
    paddingTop: THEME.size[5],
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
    height: '50vh',
    justifyContent: 'space-around',
    width: '100%',
  },
})
