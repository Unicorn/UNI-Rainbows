/** @format */

import { useEffect, useState } from 'react'

import { StatusBar } from 'expo-status-bar'

import { STORAGE_KEYS, storage, storageErrHandler } from '../config/storage'
import { SearchResponse, SearchRequest } from '../types/search'
import SearchResults from '../views/SearchResults'
import Screen from './Screen'
import Hero from './Hero'
import Header from './Header'
import { API_ROOT } from '../config/api'
import Container from './Container'

import { MainColor, ColorHex } from 'luscher-test'
import { View } from 'react-native'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<SearchResponse>()

  const fetchDomains = async (payload: SearchRequest) => {
    try {
      setLoading(true)

      const response = await fetch(`${API_ROOT}search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const results = await response.json()
        storage.save({ key: STORAGE_KEYS.RESULTS, data: results })
        setData(results)
      } else {
        console.error('Error fetching:', response.statusText)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    storage.load({ key: STORAGE_KEYS.RESULTS }).then(setData).catch(storageErrHandler)
  }, [])

  const _renderColors = () => {
    for (let color in MainColor) {
      console.log('Color', color)

      return null
    }
  }

  return (
    <Screen>
      <StatusBar style="auto" />
      <Header animate={loading} text="Domain Search" />

      <View>{_renderColors()}</View>

      <Hero fetchDomains={fetchDomains} />
      <Container>
        <SearchResults isLoading={loading} data={data} />
      </Container>
    </Screen>
  )
}
