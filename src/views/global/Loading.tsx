/** @format */

import { View, Text } from '@bacons/react-views'
import { ActivityIndicator } from 'react-native'

export default function Loading() {
  return (
    <View>
      <Text>Loading...</Text>
      <ActivityIndicator />
    </View>
  )
}
