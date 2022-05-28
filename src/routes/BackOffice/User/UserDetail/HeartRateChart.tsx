import Button from 'components/_comon/Button'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import styles from './userDetail.module.scss'
import { VictoryAxis, VictoryChart, VictoryLine, VictoryLabel, VictoryArea } from 'victory'
import DatePicker from 'react-datepicker'

import store from 'store'
import { isNumber } from 'lodash'
import cx from 'classnames'

interface IUserData {
  x: number | string
  y: number
}
interface IUserInfo {
  seq: number
  member_seq: number
  avg_beat: number
  crt_ymdt: string
}

interface Props {}
let hap = 0
let length = 0

const HeartRateChart = (props: Props) => {
  const [data, setData] = useState<IUserData[]>([])
  const [heartRateData, setHeartRateData] = useState<IUserInfo[]>([])
  const [lookup, setLookup] = useState('today')
  const [startDate, setStartDate] = useState<string | Date>(new Date('2022-04-16'))
  const [endDate, setEndDate] = useState<string | Date>(new Date())

  const [date1, setDate1] = useState('2022-04-19')
  const [date2, setDate2] = useState('')

  const [heartBeatAvg, setHeartBeatAvg] = useState(0)

  const handleLookUpClick = (e: MouseEvent<HTMLButtonElement>) => {
    setLookup(e.currentTarget.value)
    console.log(e.currentTarget.value)
  }

  const handleChangeStartDate = (date: Date) => {
    // setStartDate(dayjs(date).format('YYYY-MM-DD'))
    setStartDate(dayjs(date).format('YYYY-MM-DD'))
    setDate1(dayjs(date).format('YYYY-MM-DD'))
    setLookup('')
  }

  const handleChangeEndDate = (date: Date) => {
    // setEndDate(dayjs(date).format('YYYY-MM-DD'))
    setEndDate(dayjs(date).format('YYYY-MM-DD'))
    setDate2(dayjs(date).format('YYYY-MM-DD'))
    setLookup('')

    // console.log('end:', e.currentTarget.value)
  }

  useEffect(() => {
    setHeartRateData(store.get('heartRate'))
  }, [])

  useEffect(() => {
    if (lookup === 'today') {
      const HOURLY_DATA = Array.from({ length: 144 }, (_, i) => ({ x: i, y: 0 }))

      heartRateData
        .filter(
          (data2) => dayjs(data2.crt_ymdt).format('DD') === dayjs('2022-04-19').format('DD') && data2.member_seq === 380
        )
        .forEach((info, i) => {
          hap += info.avg_beat
          length = i
          const hourIndex = Math.floor((dayjs(info.crt_ymdt).hour() * 60 + dayjs(info.crt_ymdt).minute()) / 10)
          const currenStep = info.avg_beat
          HOURLY_DATA[hourIndex].y = currenStep
        })
      console.log(HOURLY_DATA)
      setData(HOURLY_DATA)
      setDate1('2022-04-19')
      setDate2('')
      setHeartBeatAvg(Math.round(hap / length))
      hap = 0
      return
    }

    if (lookup === 'week') {
      const weekData = Array.from({ length: 7 }, (_, i) => ({ x: i, y: 0 }))

      heartRateData
        .filter(
          (data2) =>
            dayjs(data2.crt_ymdt) <= dayjs('2022-04-23') &&
            dayjs(data2.crt_ymdt) >= dayjs('2022-04-16') &&
            data2.member_seq === 380
        )
        .forEach((data3, i) => {
          hap += data3.avg_beat
          length = i
          const dailyIndex = Number(dayjs(data3.crt_ymdt).date()) - Number(dayjs(startDate).date())
          weekData[dailyIndex].y = (weekData[dailyIndex].y + data3.avg_beat) / 2
        })

      setData(weekData)
      setDate1('2022-04-19')
      setDate2('2022-04-26')
      setHeartBeatAvg(Math.round(hap / length))
      hap = 0
      return
    }
    if (lookup === 'entire') {
      const entireData = heartRateData
        .filter((data2) => data2.member_seq === 380)
        .sort((a, b) => Number(dayjs(a.crt_ymdt)) - Number(dayjs(b.crt_ymdt)))
        .reduce((acc: { [key: string]: any }, cur, i) => {
          hap += cur.avg_beat
          length = i
          acc[dayjs(cur.crt_ymdt).format('YYYY-MM-DD')] = {
            heartRate: cur.avg_beat,
          }
          return acc
        }, {})

      console.log('entireData = ', entireData)
      const eData = Object.keys(entireData).map((date) => ({
        x: dayjs(date).format('M월 D일'),
        y: entireData[date].heartRate,
      }))
      console.log(eData)
      setData(eData)
      setDate1('2022-04-19')
      setDate2('2022-04-26')
      setHeartBeatAvg(Math.round(hap / length))
      hap = 0
      return
    }

    console.log('startDate =', startDate, 'endDate = ', endDate)

    if (startDate && endDate) {
      const entireData = heartRateData
        .filter(
          (data2) =>
            dayjs(data2.crt_ymdt) >= dayjs(startDate) &&
            dayjs(data2.crt_ymdt) <= dayjs(endDate) &&
            // dayjs(data2.crt_ymdt).isSameOrAfter(dayjs(startDate)) &&
            // dayjs(data2.crt_ymdt).isBefore(dayjs(endDate)) &&
            data2.member_seq === 380
        )
        .reduce((acc: { [key: string]: any }, cur, i) => {
          hap += cur.avg_beat
          length = i
          acc[dayjs(cur.crt_ymdt).format('YYYY-MM-DD')] = {
            heartRate: cur.avg_beat,
          }
          return acc
        }, {})
      const eData = Object.keys(entireData).map((date) => ({
        x: dayjs(date).format('M월 D일'),
        y: entireData[date].heartRate,
      }))
      setData(eData)

      setHeartBeatAvg(Math.round(hap / length))
      hap = 0
    }
  }, [startDate, endDate, lookup, heartRateData])

  const tickFormatter = (t: number | string): string => {
    if (startDate && endDate && !lookup) return typeof t === 'string' ? t : ''
    switch (lookup) {
      case 'today': // 0  ~ 143
        if (t === 143) return '24시'
        return typeof t === 'number' && (t / 6) % 4 === 0 ? `${Math.floor(t / 6)}시` : ''
      case 'week':
        return `${typeof t === 'number' && t + 1}일`
      case 'entire':
        return typeof t === 'string' ? t : ''
      default:
        return ''
    }
  }

  return (
    <div className={styles.chartWrap}>
      <div className={styles.chartTitle}>
        <p>심박수</p>
      </div>
      <div className={styles.chartWrap}>
        {/* <VictoryChart domain={{ y: [50, 160] }}> */}
        <VictoryChart style={{ background: { fill: '#000' } }} domain={{ y: [50, 160] }}>
          <VictoryLabel style={{ fill: '#e85319' }} dy={10} text='bpm' x={15} y={20} />
          <VictoryAxis
            style={{
              tickLabels: { fontSize: 15, fill: '#a6a6a6' },
            }}
            tickValues={data.map((el) => el.x)}
            tickFormat={tickFormatter}
          />
          <VictoryAxis
            dependentAxis
            style={{
              tickLabels: { fontSize: 15, fill: '#a6a6a6' },
            }}
          />
          {data.map((item: any) => {
            return (
              <VictoryArea
                style={{ data: { stroke: '#f3490b' }, parent: { border: '5px solid #272324' } }}
                key={item.y + new Date()}
                data={data}
                // style={{ data: { strokeWidth: 1 } }}
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
      <DatePicker selected={new Date(startDate)} onChange={handleChangeStartDate} className={styles.datePicker} />
      <DatePicker
        selected={new Date(endDate)}
        minDate={new Date(startDate)}
        maxDate={new Date()}
        onChange={handleChangeEndDate}
        className={styles.datePicker}
      />

      <div className={styles.buttonWrap}>
        <Button title='오늘' value='today' onClick={handleLookUpClick} />
        <Button title='1주일' value='week' onClick={handleLookUpClick} />
        <Button title='전체' value='entire' onClick={handleLookUpClick} />
      </div>
    </div>
  )
}

export default HeartRateChart
