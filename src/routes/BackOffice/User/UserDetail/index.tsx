import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import store from 'store'

import { IUserInfo } from 'types/step'
import HeartRateChart from './HeartRateChart'
import StepChart from './StepChart'

import styles from './userDetail.module.scss'

interface Props {}

// prams로 유저 아이디를 가져올것
const UserDetail = (props: Props) => {
  const [stepData, setStepData] = useState<IUserInfo[]>([])
  const { id = 328 } = useParams()

  const location = useLocation()
  const state = location.state as { date: string; login_id: string; seq: string }

  useEffect(() => {
    const userData = store.get('step')
    const filteredStepData = userData.filter((el: IUserInfo) => el.member_seq === Number(id))
    setStepData(filteredStepData)
  }, [id])

  return (
    <div className={styles.userDetailWrap}>
      <h2>회원 상제 정보</h2>
      <div className={styles.detailInner}>
        <ul className={styles.userProfile}>
          <li className={styles.userProfileList}>
            <p className={styles.profileTitle}>로그인ID</p>
            <p className={styles.profileInfo}>{state.login_id}</p>
          </li>
          <li className={styles.userProfileList}>
            <p className={styles.profileTitle}>회원번호</p>
            <p className={styles.profileInfo}>{id}</p>
          </li>
          <li className={styles.userProfileList}>
            <p className={styles.profileTitle}>가입일시</p>
            <p className={styles.profileInfo}>{state.date}</p>
          </li>
        </ul>
        <div className={styles.charWrap}>
          <HeartRateChart />
          <StepChart firstDate={state.date} stepData={stepData} />
        </div>
      </div>
    </div>
  )
}

export default UserDetail
