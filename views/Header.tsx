/** @format */

import { useEffect, useRef } from 'react'
import { View, StyleSheet, Image } from 'react-native'

import { THEME } from '../config/theme'
import { isMobile } from '../helpers/screen'

interface Props {
  text: string
  animate?: boolean
}

export default function Header({ animate, text }: Props) {
  const animation = useRef(null)

  useEffect(() => {
    animate ? animation.current?.play() : animation.current?.reset()
  }, [animate])

  return (
    <View style={styles.component}>
      {isMobile() ? null : <Image source={require('../assets/images/logo-full.png')} style={{ height: 40, width: 250 }} />}
    </View>
  )
}

const styles = StyleSheet.create({
  component: {
    alignItems: 'center',
    backgroundColor: THEME.colors.neutral[0],
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    paddingVertical: isMobile() ? THEME.space[5] : THEME.space[6],
    width: '100%',
  },
})
