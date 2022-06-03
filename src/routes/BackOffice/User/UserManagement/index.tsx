import { useState } from 'react'
import { Link } from 'react-router-dom'

import UserTable from './comp/UserTable'
import UserSearch from './comp/UserSearch'

import styles from './userManagement.module.scss'

const UserManagement = () => {
  const [isListHidden, setIsListHidden] = useState(false)

  return (
    <div className={styles.userManagementWrapper}>
      <div className={styles.pathInfo}>
        <Link to='/user' className={styles.goHome}>
          홈
        </Link>
        <span className={styles.hasNext} />
        <Link to='/management' className={styles.currentPath}>
          회원관리
        </Link>
      </div>
      <div className={styles.contents}>
        <UserSearch setIsListHidden={setIsListHidden} />
        <UserTable isListHidden={isListHidden} />
      </div>
    </div>
  )
}

export default UserManagement
