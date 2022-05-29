import { Outlet } from 'react-router-dom'

import Header from '../Header'
import LNB from '../LNB'

import styles from './pageTemplate.module.scss'

const PageTemplate = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <LNB />
        <Outlet />
      </main>
    </>
  )
}

export default PageTemplate
