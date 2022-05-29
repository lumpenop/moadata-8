import styles from './lnb.module.scss'
import { NavLink } from 'react-router-dom'

const LNB = () => {
  return (
    <nav className={styles.container}>
      <ul className={styles.navList}>
        <li>
          <NavLink to='/user' className={({ isActive }) => (isActive ? styles.active : '')}>
            백오피스 홈
          </NavLink>
        </li>
        <li>
          <NavLink to='/management' className={({ isActive }) => (isActive ? styles.active : '')}>
            회원 관리
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default LNB
