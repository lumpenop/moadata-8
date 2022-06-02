import { Link } from 'react-router-dom'

import styles from './user.module.scss'
import board1 from 'assets/images/board1.png'
import board2 from 'assets/images/board2.png'
import board3 from 'assets/images/board3.png'
import board4 from 'assets/images/board4.png'
import board5 from 'assets/images/board5.png'
import board6 from 'assets/images/board6.png'

const User = () => {
  return (
    <div className={styles.userWrapper}>
      <div className={styles.container}>
        <Link to='/user'>
          <span className={styles.pathInfoSpan}>홈</span>
        </Link>
        <h2>백오피스 홈 대시보드</h2>
      </div>
      <div className={styles.contents}>
        <div className={styles.imageWrapper}>
          <img src={board1} alt='board1' />
          <img src={board2} alt='board2' />
          <img src={board3} alt='board3' />
          <img src={board4} alt='board4' className={styles.chartImage} />
          <img src={board5} alt='board5' />
          <img src={board6} alt='board6' />
        </div>
      </div>
    </div>
  )
}

export default User
