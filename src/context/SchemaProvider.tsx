/** @format */

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { useSegments, useRouter } from 'expo-router'

import { steps, Steps } from '@utility/assessment'
import { storage, storageErrHandler } from '@config/storage'

export interface Schema {
  hydrated: boolean
  authenticated: boolean
  name: string
  email: string
  reason: string
  step: Steps
  color1: number[]
  color2: number[]
  survey1: any
  complete: boolean
}

export interface SchemaProvider {
  schema: Schema
  setSchema: Dispatch<SetStateAction<Schema>>
}

export const defaultSchema: Schema = {
  hydrated: false,
  authenticated: false,
  name: '',
  email: '',
  reason: '',
  step: steps[0],
  color1: [],
  color2: [],
  survey1: null,
  complete: false,
}

export const SchemaContext = createContext<SchemaProvider | undefined>(undefined)

export function useSchema() {
  const context = useContext(SchemaContext)
  if (!context) throw new Error('useSchema must be used within a SchemaProvider')
  return context
}

function useProtectedRoute(authenticated: boolean) {
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)'

    // If the user is not signed in and the initial segment is not anything in the auth group.
    if (!authenticated && !inAuthGroup) router.replace('/auth')
    else if (authenticated && inAuthGroup) router.replace('/home')
  }, [authenticated, segments])
}

export function SchemaProvider({ children }: { children: ReactNode }): ReactNode {
  const [schema, setSchema] = useState<Schema>(defaultSchema)

  // Rehydrate from local storage
  useEffect(() => {
    storage
      .load({ key: 'root' })
      .then(s => {
        console.log('schema loaded', s)
        setSchema({ ...schema, ...s, hydrated: true })
      })
      .catch(storageErrHandler)
  }, [])

  useEffect(() => {
    if (!schema.hydrated) return

    storage.save({ key: 'root', data: schema }).catch(storageErrHandler)
  }, [schema])

  useProtectedRoute(schema.authenticated)

  const schemaContext: SchemaProvider = {
    schema,
    setSchema,
  }

  return <SchemaContext.Provider value={schemaContext}>{children}</SchemaContext.Provider>
}
