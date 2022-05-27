import Button from 'components/_comon/Button'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'

import styles from './userDetail.module.scss'
import { VictoryAxis, VictoryChart, VictoryLine, VictoryLabel } from 'victory'

// import { useIndexedDBStore } from 'use-indexeddb'
import { isNumber } from 'lodash'

import USER_DATA from 'assets/json/test.json'

interface IUserData {
  x: string
  y: number
}

// const { getManyByIndex } = useIndexedDBStore("fruits");

// const onClick = () => {
//   getManyByIndex("quantity", 2)
//     .then(console.log)
//     .catch(console.error);
// };
interface IUserInfo {
  seq: number
  member_seq: number
  avg_beat: number
  crt_ymdt: string
}

const USER_HEART_DATAS = USER_DATA.sort(
  (info1: IUserInfo, info2: IUserInfo) => Number(dayjs(info1.crt_ymdt)) - Number(dayjs(info2.crt_ymdt))
)

const HOURLY_DATA = Array.from({ length: 144 }, (_, i) => ({ x: i, y: 0 }))

USER_HEART_DATAS.forEach((info, i) => {
  const hourIndex = Math.floor((dayjs(info.crt_ymdt).hour() * 60 + dayjs(info.crt_ymdt).minute()) / 10)
  const currenStep = info.avg_beat - (USER_HEART_DATAS[i - 1]?.avg_beat || 0)
  HOURLY_DATA[hourIndex].y += currenStep
})
interface Props {}
// 결론 : _comon은 왜 comon인지 모른다.
// 누군가의 솜씨, 부검이 필요합니다
let hap = 0
let length = 0
const HeartRateChart = (props: Props) => {
  const [data, setData] = useState<IUserData[]>([])

  const [lookup, setLookup] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [date1, setDate1] = useState('2022-04-19')
  const [date2, setDate2] = useState('')

  const [heartBeatAvg, setHeartBeatAvg] = useState(0)

  // indexedDB를 쓰는 경우에 데이터 가져오기
  // const { add, getManyByIndex } = useIndexedDBStore('HeartRate')
  // const showClick = () => {
  //   getManyByIndex('member_seq', 328)
  //     .then((e) => console.log(e))
  //     .catch(console.error)
  // }

  const handleLookUpClick = (e: MouseEvent<HTMLButtonElement>) => {
    setLookup(e.currentTarget.value)
    console.log(e.currentTarget.value)
  }

  const handleChangeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.currentTarget.value)
    console.log('start:', e.currentTarget.value)
  }

  const handleChangeEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.currentTarget.value)
    console.log('end:', e.currentTarget.value)
  }

  useEffect(() => {
    // USER_HEART_DATAS.forEach((info, i) => {
    //   const hourIndex = Math.floor((dayjs(info.crt_ymdt).hour() * 60 + dayjs(info.crt_ymdt).minute()) / 10)
    //   const currenStep = info.avg_beat - (USER_HEART_DATAS[i - 1]?.avg_beat || 0)
    //   HOURLY_DATA[hourIndex].y += currenStep
    // })

    if (lookup === 'today') {
      setData(
        USER_DATA.filter((data2) => dayjs(data2.crt_ymdt).format('DD') === dayjs('2022-04-19').format('DD')).map(
          (data1, index) => {
            hap += data1.avg_beat
            length = index
            return {
              x: dayjs(data1.crt_ymdt).format('hh:mm'),
              y: data1.avg_beat,
            }
          }
        )
      )
      setDate1('2022-04-19')
      setDate2('')
      setHeartBeatAvg(Math.round(hap / length))
      hap = 0
      return
    }

    if (lookup === 'week') {
      setData(
        USER_DATA.filter(
          (data2) =>
            dayjs(data2.crt_ymdt) <= dayjs('2022-04-27') &&
            dayjs(data2.crt_ymdt) >= dayjs('2022-04-19').subtract(7, 'day')
        ).map((userData, index) => {
          hap += userData.avg_beat
          length = index
          return {
            x: dayjs(userData.crt_ymdt).format('MM월DD일'),
            // x: dayjs(userData.crt_ymdt).format('MM:DD'),
            y: userData.avg_beat,
          }
        })
      )
      setDate1('2022-04-19')
      setDate2('2022-04-26')
      setHeartBeatAvg(Math.round(hap / length))
      hap = 0
      return
    }

    if (lookup === 'entire') {
      setData(
        USER_DATA.map((userData, index) => {
          hap += userData.avg_beat
          length = index
          return {
            x: dayjs(userData.crt_ymdt).format('MM월'),
            // x: dayjs(userData.crt_ymdt).format('MM:DD'),
            y: userData.avg_beat,
          }
        })
      )
      setDate1('2022-04-19')
      setDate2('2022-04-26')
      setHeartBeatAvg(Math.round(hap / length))
      hap = 0
      return
    }

    if (startDate && endDate) {
      setData(
        USER_DATA.filter(
          (data2) => dayjs(data2.crt_ymdt) >= dayjs(startDate) && dayjs(data2.crt_ymdt) <= dayjs(endDate)
        ).map((userData, index) => {
          hap += userData.avg_beat
          length = index
          return {
            x: dayjs(userData.crt_ymdt).format('HH:mm:ss'),
            y: userData.avg_beat,
          }
        })
      )
      setDate1(startDate)
      setDate2(endDate)
      setHeartBeatAvg(Math.round(hap / length))
      hap = 0
      return
    }

    setData(
      USER_DATA.filter((data2) => dayjs(data2.crt_ymdt).format('DD') === dayjs('2022-04-19').format('DD')).map(
        (data1) => ({
          x: dayjs(data1.crt_ymdt).format('HH시'),
          y: data1.avg_beat,
        })
      )
    )
  }, [startDate, endDate, lookup])

  return (
    <div className={styles.chartWrap}>
      {/* <button type='button' onClick={click}>
        디비입력
      </button>
      <button type='button' onClick={showClick}>
        디비출력
      </button> */}
      {/* // [{x:"14:21:52", y: 90}] */}
      {/* tickFormat={(t) => ((t / 6) % 4 === 0 ? `${Math.floor(t / 6)}시` : '')} */}
      <div className={styles.chartTitle}>
        <p>심박수</p>
      </div>
      <div className={styles.chartWrap}>
        {/* <VictoryChart domain={{ y: [50, 160] }}> */}
        <VictoryChart domain={{ y: [50, 160] }}>
          <VictoryLabel dy={10} text='bpm' x={15} y={30} />
          <VictoryAxis
            style={{
              tickLabels: { fontSize: 3 },
            }}
            // [{x:"14:21:52", y: 90}]

            tickFormat={(t) => {
              console.log('---------')
              console.log(t)
              if (isNumber(t)) return null
              if (lookup === 'week') return t
              return t // .slice(0, 2)
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              tickLabels: { fontSize: 5 },
            }}
          />
          {data &&
            data.map((item: any) => {
              return (
                <VictoryLine
                  key={item.seq + new Date()}
                  data={data}
                  style={{ data: { strokeWidth: 1 } }}
                  y={(datum) => datum.y}
                />
              )
            })}
        </VictoryChart>
      </div>
      <div className={styles.info}>
        <p className={styles.infoText}>
          <time dateTime={date1}>{date1}</time>
          {date1 && date2 && <time dateTime={date2}>~ {date2}</time>}
        </p>
        <p className={styles.infoText}>평균 {heartBeatAvg} bpm</p>
      </div>
      <div className={styles.chartTitle}>
        <p>조회 기간</p>
      </div>
      <input onChange={handleChangeStartDate} className={styles.datePicker} type='date' />~
      <input onChange={handleChangeEndDate} className={styles.datePicker} type='date' />
      <div className={styles.buttonWrap}>
        <Button title='오늘' value='today' onClick={handleLookUpClick} />
        <Button title='1주일' value='week' onClick={handleLookUpClick} />
        <Button title='전체' value='entire' onClick={handleLookUpClick} />
      </div>
    </div>
  )
}

export default HeartRateChart
