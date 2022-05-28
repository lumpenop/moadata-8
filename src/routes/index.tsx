import { Routes, Route } from 'react-router-dom'

import Login from './BackOffice/Login'
import User from './BackOffice/User'
import UserDetail from './BackOffice/User/UserDetail'
import UserManagement from './BackOffice/User/UserManagement'
// import LNB from './_shared/LNB'
import PageTemplate from './_shared/templates'

import styles from './Routes.module.scss'

const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<PageTemplate />}>
          <Route path='user' element={<User />} />
          <Route path='management' element={<UserManagement />} />
          <Route path='management/detail/:id' element={<UserDetail />} />
          <Route path='*' element={<div>404</div>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
