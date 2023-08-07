/** @format */

import { useState } from 'react'
import { View, TextInput, Text, StyleSheet, Platform } from 'react-native'

import { THEME } from '../config/theme'
import { RegisterForm } from '../types/search'
import { STYLE } from '../config/style'
import Collapsable from './Collapsable'
import Container from './Container'
import { isMobile } from '../helpers/screen'

interface Props {
  formHandler: (payload: RegisterForm) => void
}

export default function Hero({ formHandler }: Props) {
  const [collapse, setCollapse] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const renderContent = () => (
    <View style={styles.container}>
      <Container>
        <View style={styles.columns}>
          <View style={styles.column}>
            <Text style={styles.introText}>
              Welcome to Rainbows, an assessment tool by Unicorn that helps you better understand yourself and your business. Let's start by
              grabbing your email so that we can save and send your results once you complete the journey! It only takes five minutes to
              complete this portion and start building your 360 degree view of your business.
            </Text>
          </View>

          <View style={[styles.column, styles.form]}>
            <TextInput style={STYLE.input} value={name} onChangeText={setName} maxLength={30} placeholder="Name" />
            <TextInput style={STYLE.input} value={email} onChangeText={setEmail} maxLength={80} placeholder="Email" />

            <TextInput
              style={[STYLE.input, styles.textarea]}
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={4}
              maxLength={400}
              placeholder="What brought you here today?"
            />

            <Text
              style={STYLE.button}
              onPress={() => {
                setCollapse(!collapse)
                formHandler({ name, email, description })
              }}
            >
              Let's Go!
            </Text>
          </View>
        </View>
      </Container>
    </View>
  )

  return <Collapsable collapse={collapse}>{renderContent()}</Collapsable>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: THEME.colors.neutral[0],
    justifyContent: 'center',
    paddingBottom: THEME.space[6],
  },
  columns: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  column: {
    flex: 1,
    minWidth: 300,
    paddingBottom: THEME.space[5],
    paddingTop: isMobile() ? 0 : THEME.space[5],
  },
  form: {
    paddingLeft: isMobile() ? 0 : THEME.space[8],
  },
  introText: {
    color: THEME.colors.purple[900],
    fontFamily: THEME.font.body,
    fontSize: isMobile() ? THEME.size[3] : THEME.size[3],
    fontWeight: '600',
    lineHeight: isMobile() ? THEME.size[5] : THEME.size[8],
    textShadowColor: THEME.colors.neutral[100],
    textShadowOffset: {
      height: 1,
      width: 1,
    },
    textShadowRadius: 0,
  },
  textarea: {
    height: 100,
    paddingTop: THEME.space[3],
  },
})
