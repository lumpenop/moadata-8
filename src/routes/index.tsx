import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import store from 'store'
import dayjs from 'dayjs'

import User from './BackOffice/User'
import UserDetail from './BackOffice/User/UserDetail'
import UserManagement from './BackOffice/User/UserManagement'
// import LNB from './_shared/LNB'
import PageTemplate from './_shared/templates'

import styles from './Routes.module.scss'
import HeartRateChart from './BackOffice/User/UserDetail/HeartRateChart'
import StepChart from './BackOffice/User/UserDetail/StepChart'

import heartRate from 'assets/json/heartrate.json'
import step from 'assets/json/step.json'
import userData from 'data/user_list.json'

import { setUserStoreData } from 'services/userStoreData'
import Login from './BackOffice/Login'

heartRate.sort((info1, info2) => Number(dayjs(info1.crt_ymdt)) - Number(dayjs(info2.crt_ymdt)))
const LOGIN_PASS = store.get('login')
const App = () => {
  useEffect(() => {
    store.set('heartRate', heartRate)
    store.set('step', step)
  }, [])

  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<Login />} />
        {LOGIN_PASS === true ? (
          <Route element={<PageTemplate />}>
            <Route path='user' element={<User />} />
            <Route path='management' element={<UserManagement />} />
            <Route path='management/detail/:id' element={<UserDetail />} />
            <Route path='*' element={<div>404</div>} />
          </Route>
        ) : (
          <Route path='*' element={<div>404</div>} />
        )}
      </Routes>
    </div>
  )
}

export default App
