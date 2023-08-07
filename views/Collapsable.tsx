/** @format */

import { ReactNode, useEffect, useRef, useState } from 'react'
import { View, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager, Animated } from 'react-native'
import { EvilIcons } from '@expo/vector-icons'

import { THEME } from '../config/theme'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

interface CollapsableProps {
  children: ReactNode
  collapse?: boolean
}

export default function Collapsable({ children, collapse }: CollapsableProps) {
  const animateContainer = useRef(new Animated.Value(1)).current
  const [expanded, setExpanded] = useState(true)
  const [visible, setVisible] = useState(true)

  const toggleHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

    if (visible) {
      Animated.timing(animateContainer, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setVisible(false))
    } else {
      setVisible(true)
      Animated.timing(animateContainer, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start()
    }

    setExpanded(!expanded)
  }

  useEffect(() => {
    if (collapse) toggleHandler()
  }, [collapse])

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.container, opacity: animateContainer }}>{visible ? children : null}</Animated.View>

      <TouchableOpacity style={styles.button} onPress={toggleHandler}>
        <EvilIcons name={visible ? 'chevron-up' : 'chevron-down'} size={THEME.size[10]} color="#000" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: THEME.colors.neutral[0],
    borderRadius: 50,
    borderWidth: 6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: 60,
    marginTop: -30,
    width: 60,
  },
})
