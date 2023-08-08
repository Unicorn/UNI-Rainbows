/** @format */

import { useState, useRef, useEffect } from 'react'
import { ScrollView, Text, StyleSheet, TextInput } from 'react-native'
import { useTranslation } from 'react-i18next'
import { getAuth, createUserWithEmailAndPassword, sendSignInLinkToEmail } from 'firebase/auth'

import { STYLE } from '@config/style'
import { firebaseApp } from '@config/firebase'
import { THEME } from '@config/theme'
import { useSchema } from '@context/SchemaProvider'
import { isMobile } from '@utility/screen'
import Header from '@views/global/Header'

export default function Auth() {
  const { t } = useTranslation()
  const { schema, setSchema } = useSchema()
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const animation = useRef(null)

  function inputHandler(key: 'name' | 'email' | 'reason', value: string) {
    const nextState = { ...schema }
    nextState[key] = value
    setSchema(nextState)
  }

  async function registerHandler() {
    setLoading(true)

    const auth = getAuth(firebaseApp)

    createUserWithEmailAndPassword(auth, schema.email, 'password')
      .then(userCredential => {
        const user = userCredential.user

        console.log('Signed in', user)

        setLoading(false)
        setSchema({ ...schema, authenticated: true })
      })
      .catch(error => {
        setLoading(false)
        setSchema({ ...schema, authenticated: true })

        // @TODO: add better auth logic. For now, we just create a user in FB and set authenticated to true
        if (error.code === 'auth/email-already-in-use') {
          console.log('FB Auth Error, ignoring for now', error)
          setSchema({ ...schema, authenticated: true })
        }
      })
  }

  useEffect(() => {
    loading ? animation.current?.play() : animation.current?.reset()
  }, [loading])

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Header step="auth" />
      <Text style={styles.introText}>{t('auth.intro')}</Text>

      <TextInput
        style={STYLE.input}
        value={schema.name}
        onChangeText={text => inputHandler('name', text)}
        maxLength={30}
        placeholder={t('auth.name')}
      />

      <TextInput
        style={STYLE.input}
        value={schema.email}
        onChangeText={text => inputHandler('email', text)}
        maxLength={80}
        placeholder={t('auth.email')}
      />

      <TextInput
        style={[STYLE.input, styles.reason]}
        value={schema.reason}
        onChangeText={text => inputHandler('reason', text)}
        multiline={true}
        numberOfLines={4}
        maxLength={400}
        placeholder={t('auth.textarea')}
      />

      <Text style={STYLE.button} onPress={registerHandler}>
        {t('auth.cta')}
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    alignSelf: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 750,
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
  form: {
    paddingLeft: isMobile() ? 0 : THEME.space[8],
  },
  reason: {
    height: 100,
    paddingTop: THEME.space[3],
  },
})
