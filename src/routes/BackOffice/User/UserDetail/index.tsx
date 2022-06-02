import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
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
    const filteredHeartRateData: IUserHeartRateInfo[] = userData2.filter(
      (el: IUserHeartRateInfo) => el.member_seq === Number(state.seq)
    )
    setHeartRateData(filteredHeartRateData.sort((a, b) => Number(dayjs(a.crt_ymdt)) - Number(dayjs(b.crt_ymdt))))
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

        <span className={styles.pageName}>회원상세정보</span>
      </div>
      <h2>회원 상세 정보</h2>

      <div className={styles.detailInner}>
        <dl className={styles.userProfile}>
          <div className={styles.userSeq}>
            <dt>회원번호</dt>
            <dd>No. {state.seq}</dd>
          </div>
          <div className={styles.userLoginId}>
            <dt>로그인ID</dt>
            <dd>{state.loginId}</dd>
          </div>
          <div className={styles.userDate}>
            <dt>가입일시</dt>
            <dd>{state.date}</dd>
          </div>
        </dl>
        <div className={styles.charWrap}>
          <HeartRateChart heartRateData={heartRateData} />
        </div>
        <StepChart firstDate={state.date} stepData={stepData} />
      </div>
    </div>
  )
}

export default UserDetail
