/** @format */

import ColorChoices from '@views/assessment/ColorChoices'
import Header from '@views/global/Header'
import Screen from '@views/global/Screen'

export default function App() {
  return (
    <Screen>
      <Header step="luscher1" />
      <ColorChoices step="luscher1" />
    </Screen>
  )
}
