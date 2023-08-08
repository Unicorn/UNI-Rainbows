/** @format */

import Storage from 'react-native-storage'
import { Platform } from 'react-native'

let storageBackend: globalThis.Storage

if (Platform.OS === 'web') {
  storageBackend = window.localStorage
} else {
  const AsyncStorage = require('@react-native-async-storage/async-storage').default
  storageBackend = AsyncStorage
}

export const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 10000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend,

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
})

export function storageErrHandler(err: Error) {
  if (err.name !== 'NotFoundError') {
    console.error(err)
  }
}
