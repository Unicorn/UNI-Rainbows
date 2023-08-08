/** @format */

import Results from '@views/assessment/Results'
import Header from '@views/global/Header'
import Screen from '@views/global/Screen'

export default function App() {
  return (
    <Screen>
      <Header step="results" />
      <Results />
    </Screen>
  )
}
