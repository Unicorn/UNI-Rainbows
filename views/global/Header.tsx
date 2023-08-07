/** @format */

import { useEffect, useRef } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'

import { THEME } from '../../config/theme'
import { isMobile } from '../../helpers/screen'
import { Steps } from '../../helpers/assessment'
import { useTranslation } from 'react-i18next'
import Logo from './Logo'

interface Props {
  step: Steps
}

export default function Header({ step }: Props) {
  const { t } = useTranslation()

  return (
    <View style={styles.component}>
      <Logo />

      <Text>{t(`${step}.header`)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  component: {
    alignItems: 'center',
    backgroundColor: THEME.colors.neutral[0],
    justifyContent: 'center',
    marginBottom: THEME.space[5],
    paddingVertical: isMobile() ? THEME.space[5] : THEME.space[6],
  },
})
