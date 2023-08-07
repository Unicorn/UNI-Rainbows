/** @format */

import Screen from './Screen'
import List from './List'
import Header from './global/Header'
import Container from './Container'

export default function FavoritesScreen() {
  return (
    <Screen>
      <Header text="Favorites" />
      <Container>{/* <List type="flatlist" /> */}</Container>
    </Screen>
  )
}
