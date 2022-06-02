import { Routes, Route } from 'react-router-dom'

import { useRecoilValue } from 'recoil'
import User from './BackOffice/User'
import UserDetail from './BackOffice/User/UserDetail'
import UserManagement from './BackOffice/User/UserManagement'
import PageTemplate from './_shared/templates'

import { authState } from 'store/auth'

import Login from './BackOffice/Login'

import styles from './Routes.module.scss'

const App = () => {
  const auth = useRecoilValue(authState)
  const loginUser = sessionStorage.getItem('user')

  const isNotAuthenticated = !auth && !loginUser
  if (isNotAuthenticated) return <Login />

  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<PageTemplate />}>
          <Route path='user' element={<User />} />
          <Route path='management' element={<UserManagement />} />
          <Route path='management/detail/:id' element={<UserDetail />} />
          <Route path='*' element={<div>404 Page Not Found</div>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
