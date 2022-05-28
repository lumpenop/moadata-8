import Button from 'components/_comon/Button'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import styles from './userDetail.module.scss'

// import userSteps from './step_136_0226.json'
import dayjs from 'dayjs'
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory'

import store from 'store'

// {
//   "seq": 265563,                     // 고유 key
//   "member_seq": 136,                 // 회원아이디
//   "steps": 14303,                    // 누적 걸음수
//   "minutes": 191,                    // 누적 걸음 시간
//   "distance": 10.185364,             // 누적 거리
//   "calorie": 504.14557,              // 소모 칼로리
//   "crt_ymdt": "2022-02-26 20:21:30"  // 기록 시간?
// },
// jsonData => jsonData.sort(crt_ymdt) (오름차순 정렬)

interface IUserInfo {
  seq: number
  member_seq: number
  steps: number
  minutes: number
  distance: number
  crt_ymdt: string
}

// const USER_STEP_DATAS = userSteps.sort(
//   (info1: IUserInfo, info2: IUserInfo) => Number(dayjs(info1.crt_ymdt)) - Number(dayjs(info2.crt_ymdt))
// )

// // 아래꺼 지우셈
// const dummyData = USER_STEP_DATAS.map((info, i, arr) => ({
//   x: dayjs(info.crt_ymdt).format('HHmmss'),
//   y: info.steps - (arr[i - 1]?.steps || 0),
// }))

// console.log(USER_STEP_DATAS)

// console.log('dayjs', dayjs(USER_STEP_DATAS[0].crt_ymdt).format('HHmm'))
// console.log('dayjs', dayjs(USER_STEP_DATAS.at(-1)!.crt_ymdt).format('HHmm'))

/**
 * [0:0 , . . . . .1:00]
 * [0 , 1, 2, ... , 7]
 *  * "2022-02-26 20:21:30" => Number(2021) / 10 = 202
 * (dayjs(시간).hour() * 60 + dayjs(시간).minute()) / 10 = 인덱스
 * 1:11 => 60 + 11 = 71 / 10 => 7
 * HOURLY_DATA: 10분 가격 걸음수
 * HOURLY_DATA[0]: 00시 00분 ~ 00시 10분 HHmm / 10 => 0
 * HOURLY_DATA[1]: 00시 00분 ~ 00시 10분 HHmm / 10 => 1
 * ...
 * HOURLY_DATA[142]: 23시 41분 ~ 23시 50분
 * HOURLY_DATA[143]: 23시 51분 ~ 24시 00분 HHmm / 10 => 235
 */

// const HOURLY_DATA = Array.from({ length: 144 }, (_, i) => ({ x: i, y: 0 }))

// USER_STEP_DATAS.forEach((info, i) => {
//   const hourIndex = Math.floor((dayjs(info.crt_ymdt).hour() * 60 + dayjs(info.crt_ymdt).minute()) / 10)
//   const currenStep = info.steps - (USER_STEP_DATAS[i - 1]?.steps || 0)
//   HOURLY_DATA[hourIndex].y += currenStep
// })

// console.log(HOURLY_DATA)
// data={[
//   { x: 0시 0분, y: 0시간당 걸음수 },
//   { x: 0시 10분, y: 0시간당 걸음수 },
//   { x: 0시 20분, y: 0시간당 걸음수 },
//   { x: 0시 30분, y: 0시간당 걸음수 },
//   { x: 0시 40분, y: 0시간당 걸음수 },
//   { x: 0시 50분, y: 0시간당 걸음수 },
//   { x: 1시 0분, y: 0시간당 걸음수 },
//   { x: 1시, y: 3 },
//   { x: 2시, y: 5 },
//   ...
//   { x:, y: 4 }
//   { x: 2 21, y: 4 }
//   { x: 223, y: 4 }
// ]}

interface Props {}

const StepChart = (props: Props) => {
  const [stepData, setStepData] = useState<IUserInfo[]>([])
  const [lookup, setLookup] = useState('')
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  useEffect(() => {
    setStepData(store.get('step'))
  }, [])

  const handleLooupClick = (e: MouseEvent<HTMLButtonElement>) => {
    setLookup(e.currentTarget.value)
    console.log(e.currentTarget.value)
  }

  const handleChangeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('start:', e.currentTarget.value)
  }

  const handleChangeEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)
  }
  return (
    <div className={styles.chartWrap}>
      <div className={styles.chartTitle}>
        <p>걸음수</p>
      </div>
      <div className={styles.chartWrap}>
        {/* <VictoryChart width={1000}>
          <VictoryAxis
            tickValues={HOURLY_DATA.map((el) => el.x).concat(144)}
            tickFormat={(t) => ((t / 6) % 4 === 0 ? `${Math.floor(t / 6)}시` : '')}
          />
          <VictoryAxis dependentAxis crossAxis />
          <VictoryBar data={HOURLY_DATA} />
        </VictoryChart> */}
      </div>
      <div className={styles.info}>
        <p className={styles.infoText}>2022-04-20 ~ 2022-04-20 </p>
        <p className={styles.infoText}>총 13,203걸음</p>
      </div>
      <div className={styles.chartTitle}>
        <p>조회 기간</p>
      </div>
      <input onChange={handleChangeStartDate} className={styles.datePicker} type='date' />~
      <input onChange={handleChangeEndDate} className={styles.datePicker} type='date' />
      <div className={styles.buttonWrap}>
        <Button title='오늘' value='today' onClick={handleLooupClick} />
        <Button title='1주일' value='week' onClick={handleLooupClick} />
        <Button title='전체' value='entire' onClick={handleLooupClick} />
      </div>
    </div>
  )
}

export default StepChart
