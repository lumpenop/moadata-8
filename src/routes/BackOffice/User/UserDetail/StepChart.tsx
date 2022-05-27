import Button from 'components/_comon/Button'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'

import styles from './userDetail.module.scss'
import { VictoryAxis, VictoryChart, VictoryLine, VictoryLabel } from 'victory'
import USER_DATA from 'assets/json/test.json'

// import { useIndexedDBStore } from 'use-indexeddb'
import { isNumber } from 'lodash'

interface IUserData {
  x: string
  y: number
}

interface Props {}
// 결론 : _comon은 왜 comon인지 모른다.
// 누군가의 솜씨, 부검이 필요합니다

const StepChart = (props: Props) => {
  const [data, setData] = useState<IUserData[]>([])

  const [lookup, setLookup] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [date1, setDate1] = useState('2022-04-19')
  const [date2, setDate2] = useState('')

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
    if (lookup === 'today') {
      setData(
        USER_DATA.filter((data2) => dayjs(data2.crt_ymdt).format('DD') === dayjs('2022-04-19').format('DD'))
          .map((data1) => ({
            x: dayjs(data1.crt_ymdt).format('HH:mm:ss'),
            y: data1.avg_beat,
          }))
          .reverse()
      )
      setDate1('2022-04-19')
      setDate2('')
      return
    }

    if (lookup === 'week') {
      setData(
        USER_DATA.filter(
          (data2) =>
            dayjs(data2.crt_ymdt) <= dayjs('2022-04-20') &&
            dayjs(data2.crt_ymdt) >= dayjs('2022-04-19').subtract(7, 'day')
        )
          .map((userData) => ({
            x: dayjs(userData.crt_ymdt).format('HH:mm:ss'),
            // x: dayjs(userData.crt_ymdt).format('MM:DD'),
            y: userData.avg_beat,
          }))
          .reverse()
      )
      setDate1('2022-04-19')
      setDate2('2022-04-26')
      return
    }

    if (lookup === 'entire') {
      setData(
        USER_DATA.map((userData) => ({
          x: dayjs(userData.crt_ymdt).format('HH:mm:ss'),
          // x: dayjs(userData.crt_ymdt).format('MM:DD'),
          y: userData.avg_beat,
        })).reverse()
      )
      setDate1('2022-04-19')
      setDate2('2022-04-26')
      return
    }

    if (startDate && endDate) {
      setData(
        USER_DATA.filter(
          (data2) => dayjs(data2.crt_ymdt) >= dayjs(startDate) && dayjs(data2.crt_ymdt) <= dayjs(endDate)
        )
          .map((userData) => ({
            x: dayjs(userData.crt_ymdt).format('HH:mm:ss'),
            y: userData.avg_beat,
          }))
          .reverse()
      )
      setDate1(startDate)
      setDate2(endDate)
      return
    }

    setData(
      USER_DATA.filter((data2) => dayjs(data2.crt_ymdt).format('DD') === dayjs('2022-04-19').format('DD'))
        .map((data1) => ({
          x: dayjs(data1.crt_ymdt).format('HH:mm:ss'),
          y: data1.avg_beat,
        }))
        .reverse()
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
      {/* tickFormat={(t) => ((t / 6) % 4 === 0 ? `${Math.floor(t / 6)}시` : '')} */}
      <div className={styles.chartTitle}>
        <p>걸음수</p>
      </div>
      <div className={styles.chartWrap}>
        <VictoryChart domain={{ y: [50, 160] }}>
          <VictoryLabel dy={10} text='bpm' x={15} y={30} />
          <VictoryAxis
            style={{
              tickLabels: { fontSize: 3 },
            }}
            tickFormat={(t) => {
              if (isNumber(t)) return null
              if (lookup === 'week') return t
              return t.slice(0, 5)
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
        <p className={styles.infoText}>총 13,203걸음</p>
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

export default StepChart
