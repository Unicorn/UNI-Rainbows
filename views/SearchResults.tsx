/** @format */

import { Text, View, StyleSheet } from 'react-native'

import { THEME } from '../config/theme'
import { SearchResponse } from '../types/search'
import List from './List'
import Loading from './Loading'
import { isMobile } from '../helpers/screen'

interface Props {
  isLoading: boolean
  data: SearchResponse
}

export default function SearchResults({ isLoading, data }: Props) {
  const renderContent = () => {
    if (isLoading) return <Loading />
    return data ? <List data={data.results} type="views" /> : null
  }

  return (
    <View style={styles.container}>
      {!isMobile() && <Text style={styles.header}>Recent Suggestions</Text>}
      <Text style={styles.paragraph}>Click to view other TLD options.</Text>
      {renderContent()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: isMobile() ? THEME.space[4] : THEME.space[8],
    width: '100%',
  },
  header: {
    alignSelf: 'center',
    color: THEME.colors.green[900],
    fontFamily: THEME.font.display,
    fontSize: THEME.size[6],
  },
  paragraph: {
    alignSelf: 'center',
    fontFamily: THEME.font.body,
    fontSize: THEME.size[2],
    color: THEME.colors.neutral[700],
    marginBottom: THEME.space[4],
    marginTop: THEME.space[2],
  },
})
