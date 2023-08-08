/** @format */

import { StyleSheet, Text } from 'react-native'
import { useTranslation } from 'react-i18next'

import { THEME } from '@config/theme'
import { Step } from '@utility/assessment'
import { isMobile } from '@utility/screen'

interface Props {
  step?: Step | string
}

export default function Header({ step }: Props) {
  const { t } = useTranslation()

  return <Text style={styles.header}>{t(`${step}.header`)}</Text>
}

const styles = StyleSheet.create({
  header: {
    color: THEME.colors.neutral[900],
    fontSize: isMobile() ? THEME.size[2] : THEME.size[6],
    fontWeight: '300',
    letterSpacing: isMobile() ? 2 : 4,
    textTransform: 'uppercase',
    paddingTop: THEME.size[5],
  },
})
