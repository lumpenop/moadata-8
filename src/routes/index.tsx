import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import store from 'store'
import dayjs from 'dayjs'

import Login from './BackOffice/Login'
import User from './BackOffice/User'
import UserDetail from './BackOffice/User/UserDetail'
import UserManagement from './BackOffice/User/UserManagement'
import LNB from './_shared/LNB'

import styles from './Routes.module.scss'
import HeartRateChart from './BackOffice/User/UserDetail/HeartRateChart'
import StepChart from './BackOffice/User/UserDetail/StepChart'

import heartRate from 'assets/json/heartrate.json'
import step from 'assets/json/step.json'

heartRate.sort((info1, info2) => Number(dayjs(info1.crt_ymdt)) - Number(dayjs(info2.crt_ymdt)))

const App = () => {
  useEffect(() => {
    store.set('heartRate', heartRate)
    store.set('step', step)
  }, [])

  return (
    <div className={styles.appWrapper}>
      <LNB />
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='user' element={<User />} />
          <Route path='management' element={<UserManagement />} />
          <Route path='management/detail/:id' element={<UserDetail />} />
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
