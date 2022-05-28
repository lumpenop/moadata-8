import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import Login from './BackOffice/Login'
import User from './BackOffice/User'
import UserDetail from './BackOffice/User/UserDetail'
import UserManagement from './BackOffice/User/UserManagement'
import LNB from './_shared/LNB'

import styles from './Routes.module.scss'

import userData from 'data/user_list.json'
import { setUserStoreData } from 'services/userStoreData'

const App = () => {
  useEffect(() => {
    setUserStoreData(userData)
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
