/** @format */

import { Link } from 'expo-router'
import { StyleSheet } from 'react-native'
import { Pressable, Text, View } from '@bacons/react-views'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function Footer() {
  const { left, bottom } = useSafeAreaInsets()

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 48 + bottom,
        paddingBottom: bottom,
        paddingLeft: Math.max(8, left),
        padding: 8,
        alignItems: 'flex-start',
        paddingHorizontal: 8,
        backgroundColor: 'white',
        borderTopColor: '#ccc',
        borderTopWidth: StyleSheet.hairlineWidth,
      }}
    >
      <Link href="/compose" asChild>
        <Pressable>
          {({ hovered, pressed }) => (
            <View
              style={[
                {
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                },
                hovered && { backgroundColor: 'rgba(0,0,0,0.1)' },
                pressed && { backgroundColor: 'rgba(0,0,0,0.2)' },
              ]}
            >
              <FontAwesome style={{ marginRight: 8 }} name="plus-circle" size={32} color="black" />
              <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Create Note</Text>
            </View>
          )}
        </Pressable>
      </Link>
    </View>
  )
}
