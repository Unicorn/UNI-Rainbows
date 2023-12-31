/** @format */

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { useSegments, useRouter, useRootNavigationState } from 'expo-router'

import { steps, Step } from '@utility/assessment'
import { storage, storageErrHandler } from '@config/storage'
import { IPIPAnswer } from '@lib/ipip'
import { isMobile } from '@utility/screen'

export interface Schema {
  authenticated: boolean
  name: string
  email: string
  reason: string
  step: Step
  luscher1: number[]
  luscher2: number[]
  luscherResults?: string
  ipip: {
    index: number
    language: string
    answers: IPIPAnswer[]
  }
}

export interface SchemaProvider {
  schema: Schema
  setSchema: Dispatch<SetStateAction<Schema>>
}

export const defaultSchema: Schema = {
  authenticated: false,
  name: '',
  email: '',
  reason: '',
  step: steps[0],
  luscher1: [],
  luscher2: [],
  ipip: {
    index: 0,
    language: 'en',
    answers: [],
  },
}

export const SchemaContext = createContext<SchemaProvider | undefined>(undefined)

export function useSchema() {
  const context = useContext(SchemaContext)
  if (!context) throw new Error('useSchema must be used within a SchemaProvider')
  return context
}

function useProtectedRoute(schema: Schema) {
  const { authenticated, step } = schema
  const segments = useSegments()
  const router = useRouter()
  const navigationState = useRootNavigationState()

  useEffect(() => {
    if (isMobile() && !navigationState?.key) return

    if (!schema.authenticated) return router.replace('/auth')
    else if (schema.luscher1.length < 8) return router.replace(`/luscher1`)
    else if (schema.ipip.answers.length < 120) return router.replace(`/ipip`)
    else if (schema.luscher2.length < 8) return router.replace(`/luscher2`)
    else return router.replace(`/acute`)
  }, [authenticated, step, segments])
}

export function SchemaProvider({ children }: { children: ReactNode }): ReactNode {
  const [schema, setSchema] = useState(defaultSchema)
  const [hydrated, setHydrated] = useState(false)

  // storage.clearMap()

  // Rehydrate from local storage
  useEffect(() => {
    storage
      .load({ key: 'root' })
      .then(setSchema)
      .catch(err => {
        if (err.name === 'NotFoundError') storage.save({ key: 'root', data: defaultSchema }).catch(storageErrHandler)
      })

    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) storage.save({ key: 'root', data: { ...schema, hydration: 'synchronized' } }).catch(storageErrHandler)
  }, [schema])

  useProtectedRoute(schema)

  const schemaContext: SchemaProvider = {
    schema,
    setSchema,
  }

  return <SchemaContext.Provider value={schemaContext}>{children}</SchemaContext.Provider>
}
