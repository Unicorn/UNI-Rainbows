/** @format */

import { useState } from 'react'
import { View, TextInput, Text, StyleSheet, Platform } from 'react-native'

import { THEME } from '../config/theme'
import { SearchRequest } from '../types/search'
import { STYLE } from '../config/style'
import Collapsable from './Collapsable'
import Container from './Container'
import { isMobile } from '../helpers/screen'
import Heart from './icons/Heart'

interface Props {
  fetchDomains: (payload: SearchRequest) => void
}

export default function Hero({ fetchDomains }: Props) {
  const [collapse, setCollapse] = useState<boolean>(false)
  const [brand, setBrand] = useState<string>('')
  const [keywords, setKeywords] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const renderContent = () => (
    <View style={styles.container}>
      <Container>
        <View style={styles.columns}>
          <View style={styles.column}>
            <Text style={styles.introText}>
              Welcome to Candy Domains, an A.I. tool for finding the sweetest name! Think of it as your personal candy dispenser of
              delicious domains. As you search for the perfect domain, you can save runner-ups to your favorites. When you find that PERFECT
              treat, you'll know it!
            </Text>
          </View>

          <View style={[styles.column, styles.form]}>
            <TextInput style={STYLE.input} value={brand} onChangeText={setBrand} maxLength={30} placeholder="Brand Name" />
            <TextInput style={STYLE.input} value={keywords} onChangeText={setKeywords} maxLength={80} placeholder="Keywords" />

            <TextInput
              style={[STYLE.input, styles.textarea]}
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={4}
              maxLength={400}
              placeholder="Description"
            />

            <Text
              style={STYLE.button}
              onPress={() => {
                setCollapse(!collapse)
                fetchDomains({ brand, keywords, description })
              }}
            >
              Find Candy!
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
    backgroundColor: THEME.color.secondary,
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
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: THEME.font.body,
    fontSize: isMobile() ? THEME.size[3] : THEME.size[5],
    fontWeight: '800',
    letterSpacing: 1,
    lineHeight: isMobile() ? THEME.size[5] : THEME.size[8],
    textShadowColor: THEME.colors.neutral[800],
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
