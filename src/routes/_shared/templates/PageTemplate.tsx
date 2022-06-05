import { Outlet } from 'react-router-dom'

import Header from '../Header'
import LNB from '../LNB'

import styles from './pageTemplate.module.scss'

const PageTemplate = () => {
  return (
    <>
      <Header />
      <LNB />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}

export default PageTemplate
