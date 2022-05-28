import HeartRateChart from './HeartRateChart'
import StepChart from './StepChart'
import styles from './userDetail.module.scss'

interface Props {}

const UserDetail = (props: Props) => {
  return (
    <div className={styles.userDetailWrap}>
      <h2>회원 상제 정보</h2>
      <div className={styles.detailInner}>
        <ul className={styles.userProfile}>
          <li className={styles.userProfileList}>
            <p className={styles.profileTitle}>로그인ID</p>
            <p className={styles.profileInfo}>ghdrlfehd12</p>
          </li>
          <li className={styles.userProfileList}>
            <p className={styles.profileTitle}>회원번호</p>
            <p className={styles.profileInfo}>380</p>
          </li>
          <li className={styles.userProfileList}>
            <p className={styles.profileTitle}>가입일시</p>
            <p className={styles.profileInfo}>2022-04-20 12:23:56</p>
          </li>
        </ul>
        <div className={styles.charWrap}>
          <HeartRateChart />
          <StepChart />
        </div>
      </div>
    </div>
  )
}

export default UserDetail
