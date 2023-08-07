/** @format */

import { useContext, useEffect, useState } from 'react'
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { SearchItem } from '../types/search'
import { TLD } from '../config/tld'
import { API_ROOT } from '../config/api'
import Screen from './Screen'
import Header from './Header'
import List from './List'
import { STYLE } from '../config/style'
import { THEME } from '../config/theme'
import Container from './Container'
import Loading from './Loading'
import { SchemaContext } from '../config/state'

export default function AvailabilityScreen({ item }) {
  const [availability, setAvailability] = useState(SchemaContext)
  const [data, setData] = useState<SearchItem[]>()
  const [search, setSearch] = useState(availability?.domain || '')
  const [loading, setLoading] = useState(false)
  const [empty, setEmpty] = useState(false)

  const fetchDomains = async () => {
    if (!search && !availability && !availability.domain) return

    try {
      const name = (search || availability.domain).replace(/\.[^.]+$/, '')

      setLoading(true)
      setSearch(name)

      const results = await Promise.all(
        Object.keys(TLD).map(async k => {
          return await fetch(`${API_ROOT}search/${name}.${k}`).then(res => res.json())
        })
      )

      const filtered = results.filter(result => result.available === true)
      setEmpty(filtered.length === 0)
      setData(filtered)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleKeyPress = function (e) {
    if (e.nativeEvent.key == 'Enter') {
      fetchDomains()
    }
  }

  useEffect(() => {
    if (availability && availability.domain) {
      const name = availability.domain.replace(/\.[^.]+$/, '')
      setSearch(name)
      fetchDomains()
    }
  }, [availability])

  return (
    <Screen>
      <Header text="All Endings" />
      <Container>
        <View style={[STYLE.input, styles.form]}>
          <TextInput
            style={[styles.input]}
            onChangeText={setSearch}
            value={search}
            enablesReturnKeyAutomatically={true}
            clearButtonMode="always"
            onKeyPress={handleKeyPress}
          />
          <TouchableOpacity style={[styles.button]} onPress={fetchDomains}>
            <AntDesign name="search1" size={24} color={THEME.colors.purple[700]} />
          </TouchableOpacity>
        </View>
        {loading ? <Loading /> : empty ? <Text style={styles.empty}>No Results</Text> : <List data={data} type="views" />}
      </Container>
    </Screen>
  )
}

const styles = StyleSheet.create({
  form: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    marginVertical: THEME.space[4],
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: THEME.size[3],
    marginRight: THEME.space[2],
    padding: THEME.space[1],
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
  },
  empty: {
    alignSelf: 'center',
    fontFamily: THEME.font.body,
    fontSize: THEME.size[3],
    paddingTop: THEME.space[4],
  },
})
