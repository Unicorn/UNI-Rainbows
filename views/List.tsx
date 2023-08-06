/** @format */

import { useEffect, useContext } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'

import { SearchItem } from '../types/search'
import { storage, STORAGE_KEYS } from '../config/storage'
import { FavoritesContext } from '../config/state'
import ListItem from './ListItem'
import { THEME } from '../config/theme'

interface Props {
  data?: SearchItem[]
  type: 'views' | 'flatlist'
}

export default function List({ data, type }: Props) {
  const [favorites, setFavorites] = useContext(FavoritesContext)

  useEffect(() => {
    storage
      .load({ key: STORAGE_KEYS.FAVORITES })
      .then(data => setFavorites(data))
      .catch(error => console.error('Error loading storage', error))
  }, [])

  console.log('favorites', data)

  if (type === 'views')
    return (
      <View style={styles.list}>
        {data &&
          data.map(item => (
            <ListItem key={item.domain} selected={favorites.length > 0 && favorites.some(f => f.domain === item.domain)} item={item} />
          ))}
      </View>
    )
  else
    return (
      <FlatList
        style={styles.list}
        data={data || favorites || []}
        keyExtractor={({ domain }) => domain}
        renderItem={({ item }) => <ListItem selected={favorites.length > 0 && favorites.some(f => f.domain === item.domain)} item={item} />}
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
