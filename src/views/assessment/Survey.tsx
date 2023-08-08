/** @format */

import { Text, TouchableOpacity, View } from 'react-native'
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
      <TouchableOpacity
        style={STYLE.button}
        onPress={() => {
          completeHandler('survey1')
        }}
      >
        <Text style={STYLE.buttonText}>{t('intro.cta')}</Text>
      </TouchableOpacity>
    </View>
  )
}
