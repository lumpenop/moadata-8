import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './userManagement.module.scss'
import UserList from './comp/UserList'
import UserSearch from './comp/UserSearch'

const UserManagement = () => {
  const [isListHidden, setIsListHidden] = useState(false)

  return (
    <div className={styles.userManagementWrapper}>
      <div className={styles.pathInfo}>
        <Link to='/user'>
          <span>홈</span>
        </Link>
        <span>{'>'}</span>
        <Link to='/management'>
          <span>회원관리</span>
        </Link>
      </div>
      <div className={styles.contents}>
        <p className={styles.title}>회원 관리</p>
        <UserSearch setIsListHidden={setIsListHidden} />
        <UserList isListHidden={isListHidden} />
      </div>
    </div>
  )
}

export default UserManagement
