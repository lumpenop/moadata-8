import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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
import Redirect from './BackOffice/Login/Redirect'

heartRate.sort((info1, info2) => Number(dayjs(info1.crt_ymdt)) - Number(dayjs(info2.crt_ymdt)))

const App = () => {
  const [loginPass, setLoginPass] = useState('')
  useEffect(() => {
    store.set('heartRate', heartRate)
    store.set('step', step)
    setLoginPass(store.get('loginPass'))
  }, [])
  console.log(loginPass)
  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<Login />} />
        {loginPass === 'true' ? (
          <Route element={<PageTemplate />}>
            <Route path='user' element={<User />} />
            <Route path='management' element={<UserManagement />} />
            <Route path='management/detail/:id' element={<UserDetail />} />
            <Route path='*' element={<div>404</div>} />
          </Route>
        ) : (
          <Route path='loginFail' element={<Redirect />} />
        )}
      </Routes>
    </div>
  )
}

export default App
