import styles from './header.module.scss'
import { useNavigate } from 'react-router-dom'

interface Props {}

const Header = (props: Props) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <header className={styles.container}>
      <div className={styles.title}>백오피스</div>
      <div className={styles.loginInfo}>
        <span>{localStorage.getItem('id')}</span>
        <button type='button' onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </header>
  )
}

export default Header
