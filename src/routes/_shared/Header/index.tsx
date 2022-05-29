import styles from './header.module.scss'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const id = process.env.REACT_APP_ADMIN_ID
  const handleLogout = () => {
    navigate('/')
  }

  return (
    <header className={styles.container}>
      <div className={styles.title}>백오피스</div>
      <div className={styles.loginInfo}>
        <span>{id}</span>
        <button type='button' onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </header>
  )
}

export default Header
