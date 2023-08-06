/** @format */

import { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'
import { AntDesign } from '@expo/vector-icons'

import lottie from '../../assets/lottie/heart.json'
import { THEME } from '../../config/theme'

interface Props {
  active: boolean
}

export default function Heart({ active }: Props) {
  const lottieRef = useRef(null)

  useEffect(() => {
    lottieRef.current?.play()
  }, [])

  if (!active) return <AntDesign name="hearto" size={THEME.size[5]} color="#EF2A57" />

  return <LottieView ref={lottieRef} loop={false} autoPlay={true} style={{ height: 70, width: 70 }} source={lottie} />
}
