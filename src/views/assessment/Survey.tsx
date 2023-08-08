/** @format */

import { Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { useSchema } from '@context/SchemaProvider'
import { STYLE } from '@config/style'
import { Steps } from '@utility/assessment'

interface Props {
  completeHandler: (step: Steps) => void
}

export default function Survey({ completeHandler }: Props) {
  const { t } = useTranslation()
  const { schema, setSchema } = useSchema()

  return (
    <View>
      <Text>Survey</Text>
      <Text
        style={STYLE.button}
        onPress={() => {
          setSchema({ ...schema, acceptedTerms: true })
          completeHandler('survey1')
        }}
      >
        {t('intro.cta')}
      </Text>
    </View>
  )
}
