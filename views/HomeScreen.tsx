/** @format */

import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'

import { SearchResponse, RegisterForm } from '../types/search'
import { STORAGE_KEYS, storage, storageErrHandler } from '../config/storage'
import { useSchema } from '../config/state'
import { API_ROOT } from '../config/api'
import { Steps, steps } from '../helpers/assessment'
import Screen from './Screen'
import Hero from './Hero'
import Header from './Header'
import Container from './Container'
import ColorChoices from './assessment/ColorChoices'
import Survey from './assessment/Survey'
import Results from './assessment/Results'

export default function App() {
  const [loading, setLoading] = useState(false)
  const { schema, setSchema } = useSchema()
  const [data, setData] = useState<SearchResponse>()

  const _formHandler = async (payload: RegisterForm) => {
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

  function completeHandler(step: Steps) {
    const currentIndex = steps.indexOf(step)
    const nextIndex = currentIndex + 1

    setTimeout(() => setSchema({ ...schema, step: steps[nextIndex] }), 1000)
  }

  function renderStep() {
    switch (schema.step) {
      case 'color1' || 'color2':
        return <ColorChoices completeHandler={completeHandler} />
      case 'survey1':
        return <Survey />
      case 'complete':
        return <Results />
    }
  }

  return (
    <Screen>
      <StatusBar style="auto" />
      <Header animate={loading} text="Domain Search" />
      <Hero formHandler={_formHandler} />
      <Container>{renderStep()}</Container>
    </Screen>
  )
}
