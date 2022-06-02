import styles from './header.module.scss'
import { useNavigate } from 'react-router-dom'
import { authState } from 'store/auth'
import { useSetRecoilState } from 'recoil'

const Header = () => {
  const navigate = useNavigate()
  const id = process.env.REACT_APP_ADMIN_ID
  const setAuth = useSetRecoilState(authState)
  const handleLogout = () => {
    delete sessionStorage.user
    setAuth(false)
    navigate('/')
  }

  return (
    <header className={styles.container}>
      <div className={styles.loginInfo}>
        <span>
          <b>{id}</b> 님
        </span>
        <button type='button' onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </header>
  )
}

export default Header
