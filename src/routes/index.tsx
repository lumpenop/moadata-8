import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

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
import { useIndexedDBStore } from 'use-indexeddb'

const App = () => {
  const { add: addHeartRate } = useIndexedDBStore('HeartRate')
  const { add: addStep } = useIndexedDBStore('Step')

  // useEffect(() => {
  //   heartRate.forEach((data) => {
  //     addHeartRate(data)
  //   })
  //   step.forEach((data) => {
  //     addStep(data)
  //   })
  // }, [addHeartRate, addStep])

  return (
    <div className={styles.appWrapper}>
      <HeartRateChart />
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
