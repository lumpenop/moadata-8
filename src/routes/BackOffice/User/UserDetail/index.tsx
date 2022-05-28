import { useEffect, useState } from 'react'
import store from 'store'
import { useParams } from 'react-router-dom'

import HeartRateChart from './HeartRateChart'
import StepChart from './StepChart'
import styles from './userDetail.module.scss'

import { IUserInfo } from 'types/step'

interface Props {}

// prams로 유저 아이디를 가져올것
const UserDetail = (props: Props) => {
  const [stepData, setStepData] = useState<IUserInfo[]>([])
  const { id = 328 } = useParams()

  useEffect(() => {
    const userData = store.get('step')
    const filteredStepData = userData.filter((el: IUserInfo) => el.member_seq === Number(id))
    setStepData(filteredStepData)
  }, [])

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
            <p className={styles.profileInfo}>{id}</p>
          </li>
          <li className={styles.userProfileList}>
            <p className={styles.profileTitle}>가입일시</p>
            <p className={styles.profileInfo}>2022-04-20 12:23:56</p>
          </li>
        </ul>
        <div className={styles.charWrap}>
          <HeartRateChart />
          <StepChart stepData={stepData} />
        </div>
      </div>
    </div>
  )
}

export default UserDetail
