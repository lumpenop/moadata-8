import { MouseEvent, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import minMax from 'dayjs/plugin/minMax'
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory'

import styles from './userDetail.module.scss'
import { IStep, IUserInfo } from 'types/step'

import Button from 'components/_comon/Button'

dayjs.extend(isSameOrAfter)
dayjs.extend(minMax)

const TODAY = '2022-04-16'
interface IChartData {
  x: number | string
  y: number
}

interface Props {
  stepData: IUserInfo[]
}

const StepChart = ({ stepData }: Props) => {
  const [chartData, setChartData] = useState<IChartData[]>([])
  const [startDate, setStartDate] = useState(TODAY)
  const [endDate, setEndDate] = useState(TODAY)
  const [lookup, setLookup] = useState('today')
  const [totalSteps, setTotalSteps] = useState(0)

  const handleLookupClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value === 'today') {
      setEndDate(startDate)
    }
    if (e.currentTarget.value === 'week') {
      setEndDate(dayjs(startDate).add(7, 'day').format('YYYY-MM-DD'))
    }
    setLookup(e.currentTarget.value)
  }

  const handleStartDateChange = (date: Date) => {
    setLookup('custom')
    setStartDate(dayjs(date).format('YYYY-MM-DD'))
  }

  const handleEndDateChange = (date: Date) => {
    setLookup('custom')
    setEndDate(dayjs(date).format('YYYY-MM-DD'))
  }

  useEffect(() => {
    const filterdStep = stepData
      .filter(
        (data) =>
          dayjs(data.crt_ymdt).isSameOrAfter(startDate) && dayjs(data.crt_ymdt).isBefore(dayjs(endDate).add(1, 'day'))
      )
      .sort((a, b) => Number(dayjs(a.crt_ymdt)) - Number(dayjs(b.crt_ymdt)))

    let allSteps = 0
    if (lookup === 'today') {
      const hourlyData = Array.from({ length: 144 }, (_, i) => ({ x: i, y: 0 }))
      filterdStep.forEach((info, i) => {
        const hourIndex = Math.floor((dayjs(info.crt_ymdt).hour() * 60 + dayjs(info.crt_ymdt).minute()) / 10)
        const currenStep = info.steps - (filterdStep[i - 1]?.steps || 0)
        hourlyData[hourIndex].y += currenStep

        allSteps = Math.max(allSteps, info.steps)
      })
      setChartData(hourlyData)
      setTotalSteps(allSteps)
    }

    if (lookup === 'week') {
      const weekData = Array.from({ length: 7 }, (_, i) => ({ x: i, y: 0 }))
      filterdStep.forEach((data) => {
        const dailyIndex = Number(dayjs(data.crt_ymdt).date()) - Number(dayjs(startDate).date())
        weekData[dailyIndex].y = Math.max(weekData[dailyIndex].y, data.steps)
      })
      setChartData(weekData)
      setTotalSteps(weekData.reduce((acc, cur) => acc + cur.y, 0))
    }

    if (lookup === 'entire') {
      const entireData = stepData
        .sort((a, b) => Number(dayjs(a.crt_ymdt)) - Number(dayjs(b.crt_ymdt)))
        .reduce((acc: { [key: string]: IStep }, cur) => {
          acc[dayjs(cur.crt_ymdt).format('YYYY-MM-DD')] = {
            steps: cur.steps,
          }
          return acc
        }, {})

      const eData = Object.keys(entireData).map((date) => ({
        x: dayjs(date).format('M월 D일'),
        y: entireData[date].steps,
      }))
      setChartData(eData)
      const lastDate = Object.keys(entireData).at(-1)
      setEndDate(dayjs(lastDate).format('YYYY-MM-DD'))
      setTotalSteps(eData.reduce((acc, cur) => acc + cur.y, 0))
    }

    if (lookup === 'custom') {
      const entireData = stepData
        .filter(
          (data) =>
            dayjs(data.crt_ymdt).isSameOrAfter(startDate) && dayjs(data.crt_ymdt).isBefore(dayjs(endDate).add(1, 'day'))
        )
        .sort((a, b) => Number(dayjs(a.crt_ymdt)) - Number(dayjs(b.crt_ymdt)))
        .reduce((acc: { [key: string]: IStep }, cur) => {
          acc[dayjs(cur.crt_ymdt).format('YYYY-MM-DD')] = {
            steps: cur.steps,
          }
          return acc
        }, {})

      const customPeriodData = Array.from({ length: dayjs(endDate).add(1, 'day').diff(startDate, 'day') }, (_, i) => ({
        x: dayjs(startDate).add(i, 'day').format('M월 D일'),
        y: 0,
      }))
      Object.keys(entireData).forEach((date) => {
        customPeriodData[dayjs(date).diff(startDate, 'day')].y = entireData[date].steps
      })
      setChartData(customPeriodData)
      setTotalSteps(customPeriodData.reduce((acc, cur) => acc + cur.y, 0))
    }
  }, [stepData, startDate, endDate, lookup])

  const tickFormatter = (t: number | string): string => {
    switch (lookup) {
      case 'today':
        return typeof t === 'number' && (t / 6) % 4 === 0 ? `${Math.floor(t / 6)}시` : ''
      case 'week':
        return `${typeof t === 'number' && t + 1}일`
      case 'entire':
        return typeof t === 'string' ? t : ''
      case 'custom':
        return typeof t === 'string' ? t : ''
      default:
        return ''
    }
  }

  return (
    <div className={styles.chartWrap}>
      <div className={styles.chartTitle}>
        <p>걸음수</p>
      </div>
      <div className={styles.chartWrap}>
        <VictoryChart>
          <VictoryAxis tickValues={chartData.map((el) => el.x)} tickFormat={tickFormatter} />
          <VictoryAxis dependentAxis crossAxis />
          <VictoryBar data={chartData} />
        </VictoryChart>
      </div>
      <div className={styles.info}>
        <p className={styles.infoText}>
          {startDate}
          {startDate !== endDate && ` ~ ${endDate}`}
        </p>
        <p className={styles.infoText}>총 {totalSteps.toLocaleString('ko-kr')} 걸음</p>
      </div>
      <div className={styles.chartTitle}>
        <p>조회 기간</p>
        <div className={styles.datePickerWrap}>
          <DatePicker selected={new Date(startDate)} onChange={handleStartDateChange} />
        </div>
        <span>~</span>
        <div className={styles.datePickerWrap}>
          <DatePicker selected={new Date(endDate)} minDate={new Date(startDate)} onChange={handleEndDateChange} />
        </div>
      </div>
      <div className={styles.buttonWrap}>
        <Button title='오늘' value='today' onClick={handleLookupClick} />
        <Button title='1주일' value='week' onClick={handleLookupClick} />
        <Button title='전체' value='entire' onClick={handleLookupClick} />
      </div>
    </div>
  )
}

export default StepChart
