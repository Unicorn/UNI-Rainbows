/** @format */

import { useEffect, useRef } from 'react'
import { View, StyleSheet, Image } from 'react-native'

import H1 from './H1'
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
      {isMobile() ? null : <Image source={require('../assets/images/logo-full.png')} style={{ height: 80, width: 80 }} />}
      <H1>{text}</H1>
    </View>
  )
}

const styles = StyleSheet.create({
  component: {
    alignItems: 'center',
    backgroundColor: THEME.color.secondary,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    paddingVertical: isMobile() ? THEME.space[5] : THEME.space[4],
    width: '100%',
  },
})
