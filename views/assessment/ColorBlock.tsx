/** @format */

import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { MainColor } from 'luscher-test'

import { Color } from '../../helpers/assessment'

interface Props {
  color: Color
  selected: boolean
  pressHandler: (value: MainColor) => void
}

export default function ColorBlock({ color, selected, pressHandler }: Props) {
  const style = { backgroundColor: color.hex, opacity: selected ? 0 : 1 }

  return (
    <TouchableOpacity key={color.hex} style={[styles.block, style]} onPress={() => pressHandler(color.value)}>
      <Text style={styles.text}>
        {color.value} {selected ? 'true' : 'false'}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    backgroundColor: '#000', // Color is set dynamically
    display: 'flex',
    height: '48%', // 2 rows => each block takes up 48% of the height
    justifyContent: 'center',
    margin: '1%', // Margin to create space between blocks
    width: '23%', // 4 blocks => each 24% to leave some space between blocks
  },
  text: {
    fontSize: 18,
    opacity: 0,
  },
})
