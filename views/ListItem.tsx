/** @format */

import { useContext } from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { THEME } from '../config/theme'
import { parseCurrency } from '../helpers/string'
import { SearchItem } from '../types/search'
import { AvailabilityContext, FavoritesContext, SCREENS } from '../config/state'
import { STORAGE_KEYS, storage } from '../config/storage'
import Heart from './icons/Heart'
import { isMobile } from '../helpers/screen'

interface Props {
  selected: boolean
  item: SearchItem
}

export default function ListItem({ selected, item }: Props) {
  const navigation = useNavigation()
  const [favorites, setFavorites] = useContext(FavoritesContext)
  const [availability, setAvailability] = useContext(AvailabilityContext)

  const handleSave = (item: SearchItem) => {
    // Item is already saved, remove it
    if (favorites.some(i => i.domain === item.domain)) {
      setFavorites(favorites.filter(i => i.domain !== item.domain))
      storage.save({ key: STORAGE_KEYS.FAVORITES, data: favorites.filter(i => i.domain !== item.domain) })
    } else {
      setFavorites([...favorites, item])
      storage.save({ key: STORAGE_KEYS.FAVORITES, data: [...favorites, item] })
    }
  }

  const handleAvailability = (item: SearchItem) => {
    setAvailability(item)
    navigation.navigate(SCREENS.AVAILABILITY as never, { item } as never)
  }

  return (
    <TouchableOpacity style={selected ? [styles.row, styles.selected] : styles.row} onPress={() => handleAvailability(item)}>
      <View style={styles.side}>
        <TouchableOpacity style={styles.icon} onPress={() => handleSave(item)}>
          <Heart active={selected} />
        </TouchableOpacity>
        <Text style={[styles.text, styles.domain]}>{item.domain}</Text>
      </View>
      <View style={styles.side}>
        <Text style={[styles.text, styles.price]}>{parseCurrency(item.price)}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    minWidth: 200,
    marginTop: isMobile() ? THEME.space[3] : THEME.space[4],
    shadowColor: THEME.colors.green[100],
    shadowRadius: 0,
    shadowOffset: {
      height: 6,
      width: 6,
    },
    width: '100%',
  },
  selected: {
    backgroundColor: '#fcffdb',
    shadowColor: THEME.colors.red[100],
    shadowRadius: 0,
    shadowOffset: {
      height: 6,
      width: 6,
    },
  },
  side: {
    alignItems: 'center',
    flexDirection: 'row',
    flewWrap: 'nowrap',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: 70,
  },
  text: {
    fontFamily: THEME.font.body,
    fontSize: isMobile() ? THEME.size[3] : THEME.size[4],
    textTransform: 'lowercase',
  },
  domain: {
    marginLeft: THEME.space[1],
  },
  price: {
    marginRight: THEME.space[3],
  },
})
