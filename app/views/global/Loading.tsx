/** @format */

import LottieView from 'lottie-react-native'

import logo from '@assets/lottie/logo.json'

export default function Loading() {
  return (
    <LottieView
      autoPlay={true}
      loop={true}
      style={{
        alignSelf: 'center',
        height: 150,
        width: 150,
      }}
      source={logo}
    />
  )
}
