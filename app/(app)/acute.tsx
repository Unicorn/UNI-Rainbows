/** @format */

import LuscherResults from '@views/assessment/LuscherResults'
import Header from '@views/global/Header'
import Screen from '@views/global/Screen'

export default () => {
  return (
    <Screen>
      <Header step="luscherResults" />
      <LuscherResults />
    </Screen>
  )
}
