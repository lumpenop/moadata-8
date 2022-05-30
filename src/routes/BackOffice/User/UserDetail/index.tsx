import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
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
    <div className={styles.container}>
      <div className={styles.userDetailWrap}>
        <h2>회원 상세 정보</h2>
        <div className={styles.detailInner}>
          <dl className={styles.trItem}>
            <div className={styles.seq}>
              <dt>회원 번호 </dt>
              <dd>No. {state.seq}</dd>
            </div>
            <div className={styles.loginId}>
              <dt>로그인 ID</dt>
              <dd>{state.loginId}</dd>
            </div>
            <div className={styles.date}>
              <dt>가입일</dt>
              <dd>{state.date}</dd>
            </div>
          </dl>

          <div className={styles.chartWrapper}>
            <HeartRateChart heartRateData={heartRateData} />
            <StepChart firstDate={state.date} stepData={stepData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetail
