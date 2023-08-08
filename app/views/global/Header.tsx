/** @format */

import { View, StyleSheet, Image, Text } from 'react-native'
import { useTranslation } from 'react-i18next'

import { THEME } from '@config/theme'
import { Steps } from '@utility/assessment'
import { isMobile } from '@utility/screen'
import Logo from './Logo'

interface Props {
  step?: Steps | string
}

export default function Header({ step }: Props) {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.header}>{t(`${step}.header`)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: isMobile() ? THEME.colors.neutral[0] : THEME.colors.neutral[100],
    justifyContent: 'center',
    marginBottom: THEME.space[5],
    paddingTop: isMobile() ? THEME.space[10] : THEME.space[6],
    width: '100%',
  },
  header: {
    color: THEME.colors.neutral[900],
    fontSize: isMobile() ? THEME.size[2] : THEME.size[3],
    fontWeight: '300',
    letterSpacing: 4,
    textTransform: 'uppercase',
    paddingTop: THEME.size[3],
  },
})
