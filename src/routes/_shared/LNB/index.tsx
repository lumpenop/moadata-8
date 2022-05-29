import styles from './lnb.module.scss'
import { NavLink } from 'react-router-dom'

const LNB = () => {
  return (
    <div className={styles.lnbSection}>
      <aside className={styles.container}>
        <nav className={styles.navList}>
          <ul>
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
      </aside>
    </div>
  )
}

export default LNB
