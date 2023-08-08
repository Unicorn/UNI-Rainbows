/** @format */

import Ipip from '@views/assessment/Ipip'
import Header from '@views/global/Header'
import Screen from '@views/global/Screen'

export default () => {
  return (
    <Screen>
      <Header step="ipip" />
      <Ipip />
    </Screen>
  )
}
