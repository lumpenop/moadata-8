import { Routes, Route, Navigate } from 'react-router-dom'

import { useRecoilValue } from 'recoil'
import User from './BackOffice/User'
import UserDetail from './BackOffice/User/UserDetail'
import UserManagement from './BackOffice/User/UserManagement'
import PageTemplate from './_shared/templates'

// import heartRate from 'assets/json/heartrate.json'
// import step from 'assets/json/step.json'
// import userData from 'data/user_list.json'
import { authState } from 'store/auth'

import Login from './BackOffice/Login'

import styles from './Routes.module.scss'

const App = () => {
  // useEffect(() => {
  //   store.clearAll()
  //   store.set('heartRate', heartRate)
  //   store.set('step', step)
  //   store.set('userManagement', userData)
  // }, [])

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
