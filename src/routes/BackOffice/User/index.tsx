import styles from './user.module.scss'
import { Link } from 'react-router-dom'

const User = () => {
  return (
    <div className={styles.container}>
      <Link to='/user'>
        <div className={styles.pathInfo}>홈</div>
      </Link>
      <h2>백오피스 홈 대시보드</h2>
    </div>
  )
}

export default User
