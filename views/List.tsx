/** @format */

import { useEffect, useContext } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'

import { SearchItem } from '../types/search'
import { storage, STORAGE_KEYS } from '../config/storage'
import { useSchema } from '../config/state'
import ListItem from './ListItem'
import { THEME } from '../config/theme'

interface Props {
  data?: SearchItem[]
  type: 'views' | 'flatlist'
}

export default function List({ data, type }: Props) {
  const { schema, setSchema } = useSchema()

  useEffect(() => {
    storage
      .load({ key: STORAGE_KEYS.CHOICES })
      .then(data => setAppData(data))
      .catch(error => console.error('Error loading storage', error))
  }, [])

  console.log('choices', data)

  if (type === 'views')
    return (
      <View style={styles.list}>
        {data &&
          data.map(item => (
            <ListItem key={item.domain} selected={appData.length > 0 && appData.some(f => f.domain === item.domain)} item={item} />
          ))}
      </View>
    )
  else
    return (
      <FlatList
        style={styles.list}
        data={data || appData || []}
        keyExtractor={({ domain }) => domain}
        renderItem={({ item }) => <ListItem selected={appData.length > 0 && appData.some(f => f.domain === item.domain)} item={item} />}
      />
    )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingBottom: THEME.space[4],
    width: '100%',
  },
})
