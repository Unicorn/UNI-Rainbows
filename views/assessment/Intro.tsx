/** @format */

import { View, TextInput, Text, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'

import { STYLE } from '../../config/style'
import { THEME } from '../../config/theme'
import { useSchema } from '../../config/state'
import { Steps } from '../../helpers/assessment'
import { isMobile } from '../../helpers/screen'
import Header from '../global/Header'

interface Props {
  completeHandler: (step: Steps) => void
}

export default function Intro({ completeHandler }: Props) {
  const { t } = useTranslation()
  const { schema, setSchema } = useSchema()

  return (
    <View style={styles.container}>
      <Header step={schema.step} />

      <Text style={styles.introText}>{t('onboarding.intro')}</Text>

      <Text
        style={STYLE.button}
        onPress={() => {
          setSchema({ ...schema, acceptedTerms: true })
          completeHandler('intro')
        }}
      >
        {t('intro.cta')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 700,
  },
  introText: {
    color: THEME.colors.purple[900],
    fontFamily: THEME.font.body,
    fontSize: isMobile() ? THEME.size[3] : THEME.size[4],
    fontWeight: '400',
    lineHeight: isMobile() ? THEME.size[5] : THEME.size[8],
    paddingBottom: THEME.size[5],
    textAlign: 'center',
    textShadowColor: THEME.colors.neutral[100],
    textShadowOffset: {
      height: 1,
      width: 1,
    },
    textShadowRadius: 0,
  },
})
