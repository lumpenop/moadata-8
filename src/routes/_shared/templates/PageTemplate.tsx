import { Outlet } from 'react-router-dom'

import Header from '../Header'
import LNB from '../LNB'

import styles from './pageTemplate.module.scss'

const PageTemplate = () => {
  return (
    <>
      <Header />
      <section className={styles.main}>
        <LNB />
        <Outlet />
      </section>
    </>
  )
}

export default PageTemplate
