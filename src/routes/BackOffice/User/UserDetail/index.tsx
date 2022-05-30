import { useEffect, useState } from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
import store from 'store'
import { IUserInfo } from 'types/step.d'
import { IUserHeartRateInfo } from 'types/heartRate.d'
import HeartRateChart from './HeartRateChart'
import StepChart from './StepChart'
import dayjs from 'dayjs'
import styles from './userDetail.module.scss'

// prams로 유저 아이디를 가져올것
const UserDetail = () => {
  const [stepData, setStepData] = useState<IUserInfo[]>([])
  const [heartRateData, setHeartRateData] = useState<IUserHeartRateInfo[]>([])

  const location = useLocation()
  const state = location.state as { date: string; loginId: string; seq: string }

  useEffect(() => {
    const userData = store.get('step')
    const filteredStepData = userData.filter((el: IUserInfo) => el.member_seq === Number(state.seq))
    setStepData(filteredStepData)

    const userData2 = store.get('heartRate')
    const filteredHeartRateData = userData2.filter((el: IUserHeartRateInfo) => el.member_seq === Number(state.seq))
    setHeartRateData(
      filteredHeartRateData.sort((a: any, b: any) => Number(dayjs(a.crt_ymdt)) - Number(dayjs(b.crt_ymdt)))
    )
  }, [state.seq])

  return (
    <div className={styles.userDetailWrap}>
      <div className={styles.pathInfo}>
        <Link to='/user'>
          <span>홈</span>
        </Link>
        <span>{'>'}</span>
        <Link to='/management'>
          <span>회원관리</span>
        </Link>
        <span>{'>'}</span>
        <Link to=''>
          <span>회원상세정보</span>
        </Link>
      </div>
      <h2>회원 상제 정보</h2>
      <div className={styles.detailInner}>
        <ul className={styles.userProfile}>
          <li className={styles.userProfileList}>
            <p className={styles.profileTitle}>로그인ID</p>
            <p className={styles.profileInfo}>{state.loginId}</p>
          </li>
          <li className={styles.userProfileList}>
            <p className={styles.profileTitle}>회원번호</p>
            <p className={styles.profileInfo}>{state.seq}</p>
          </li>
          <li className={styles.userProfileList}>
            <p className={styles.profileTitle}>가입일시</p>
            <p className={styles.profileInfo}>{state.date}</p>
          </li>
        </ul>
        <div className={styles.charWrap}>
          <HeartRateChart heartRateData={heartRateData} />
        </div>
        <StepChart firstDate={state.date} stepData={stepData} />
      </div>
    </div>
  )
}

export default UserDetail
