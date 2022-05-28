import { Outlet } from 'react-router-dom'

import Header from '../Header'
import LNB from '../LNB'

const PageTemplate = () => {
  return (
    <>
      <Header />
      <LNB />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default PageTemplate
