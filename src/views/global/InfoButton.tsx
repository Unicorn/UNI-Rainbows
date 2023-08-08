/** @format */

import { Link } from 'expo-router'
import { Pressable, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function InfoButton() {
  return (
    <Link
      href="/about"
      onPress={ev => {
        ev.preventDefault()
      }}
      asChild
    >
      <Pressable style={styles.button}>
        <Ionicons name="information-circle-outline" size={24} color="black" />
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    paddingHorizontal: 8,
  },
})
