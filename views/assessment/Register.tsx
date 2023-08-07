/** @format */

import { useState, useRef, useEffect } from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { cloneDeep } from 'lodash'

import { API_ROOT } from '../../config/api'
import { THEME } from '../../config/theme'
import { useSchema } from '../../config/state'
import { STYLE } from '../../config/style'
import { isMobile } from '../../helpers/screen'
import { Steps } from '../../helpers/assessment'
import Header from '../global/Header'

interface Props {
  completeHandler: (step: Steps) => void
}

export default function Register({ completeHandler }: Props) {
  const { t } = useTranslation()
  const { schema, setSchema } = useSchema()
  const [loading, setLoading] = useState(false)
  const animation = useRef(null)

  useEffect(() => {
    loading ? animation.current?.play() : animation.current?.reset()
  }, [loading])

  function inputHandler(key: 'name' | 'email' | 'reason', value: string) {
    const nextState = cloneDeep(schema)
    nextState[key] = value
    setSchema(nextState)
  }

  async function registerHandler() {
    completeHandler('register')

    try {
      setLoading(true)

      const response = await fetch(`${API_ROOT}search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: schema.name, email: schema.email }),
      })

      if (response.ok) {
        const results = await response.json()
        console.log('Results in register', results)
      } else {
        console.error('Error fetching:', response.statusText)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Header step={schema.step} />

      <TextInput
        style={STYLE.input}
        value={schema.name}
        onChangeText={text => inputHandler('name', text)}
        maxLength={30}
        placeholder={t('onboarding.name')}
      />

      <TextInput
        style={STYLE.input}
        value={schema.email}
        onChangeText={text => inputHandler('email', text)}
        maxLength={80}
        placeholder={t('onboarding.email')}
      />

      <TextInput
        style={[STYLE.input, styles.reason]}
        value={schema.reason}
        onChangeText={text => inputHandler('reason', text)}
        multiline={true}
        numberOfLines={4}
        maxLength={400}
        placeholder={t('onboarding.textarea')}
      />

      <Text style={STYLE.button} onPress={registerHandler}>
        {t('onboarding.cta')}
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
  form: {
    paddingLeft: isMobile() ? 0 : THEME.space[8],
  },
  reason: {
    height: 100,
    paddingTop: THEME.space[3],
  },
})
