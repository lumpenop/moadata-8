import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import minMax from 'dayjs/plugin/minMax'
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory'

import styles from './userDetail.module.scss'
import { IStep, IUserInfo } from 'types/step'

import SelectDate from './SelectDate'

dayjs.extend(isBetween)
dayjs.extend(minMax)

interface ITickFormatter {
  [key: string]: ((t: number) => string) | ((t: string) => string)
}

interface IChartData {
  x: number | string
  y: number
}

interface Props {
  stepData: IUserInfo[]
  firstDate: string
}

const StepChart = ({ stepData, firstDate }: Props) => {
  const [chartData, setChartData] = useState<IChartData[]>([])
  const [startDate, setStartDate] = useState(firstDate)
  const [endDate, setEndDate] = useState(firstDate)
  const [lookup, setLookup] = useState('today')
  const [totalSteps, setTotalSteps] = useState(0)
  const [totalDistance, setTotalDistance] = useState(0)

  const tickFormatter: ITickFormatter = {
    today: (t: number) => ((t / 6) % 4 === 0 ? `${Math.floor(t / 6)}시` : ''),
    week: (t: number) => `${t + 1}일`,
    entire: (t: string) => t,
    custom: (t: number) => (t % 5 === 0 ? dayjs(startDate).add(t, 'day').format('M월 D일') : ''),
  }

  useEffect(() => {
    const filterdStep = stepData
      .filter((data) => dayjs(data.crt_ymdt).isBetween(dayjs(startDate).startOf('d'), dayjs(endDate).endOf('d')))
      .sort((a, b) => Number(dayjs(a.crt_ymdt)) - Number(dayjs(b.crt_ymdt)))

    let allSteps = 0
    let allDistance = 0
    if (lookup === 'today' || startDate === endDate) {
      const hourlyData = Array.from({ length: 144 }, (_, i) => ({ x: i, y: 0 }))
      filterdStep.forEach((info, i) => {
        const hourIndex = Math.floor((dayjs(info.crt_ymdt).hour() * 60 + dayjs(info.crt_ymdt).minute()) / 10)
        const currenStep = info.steps - (filterdStep[i - 1]?.steps || 0)
        hourlyData[hourIndex].y += currenStep

        allSteps = Math.max(allSteps, info.steps)
        allDistance = Math.max(allDistance, info.distance)
      })
      setChartData(hourlyData)
      setTotalSteps(allSteps)
      setTotalDistance(allDistance)
      setLookup('today')
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
      setStartDate(dayjs(firstDate).format('YYYY-MM-DD'))
      setEndDate(dayjs(lastDate).format('YYYY-MM-DD'))
      setTotalSteps(eData.reduce((acc, cur) => acc + cur.y, 0))
    }

    if (lookup === 'custom' && startDate < endDate) {
      const entireData = stepData
        .filter((data) => dayjs(data.crt_ymdt).isBetween(dayjs(startDate).startOf('d'), dayjs(endDate).endOf('d')))
        .sort((a, b) => Number(dayjs(a.crt_ymdt)) - Number(dayjs(b.crt_ymdt)))
        .reduce((acc: { [key: string]: IStep }, cur) => {
          acc[dayjs(cur.crt_ymdt).format('YYYY-MM-DD')] = {
            steps: cur.steps,
          }
          return acc
        }, {})

      const customPeriodData = Array.from({ length: dayjs(endDate).add(1, 'day').diff(startDate, 'day') }, (_, i) => ({
        x: i,
        y: 0,
      }))
      Object.keys(entireData).forEach((date) => {
        customPeriodData[dayjs(date).diff(startDate, 'day')].y = entireData[date].steps
      })
      setChartData(customPeriodData)
      setTotalSteps(customPeriodData.reduce((acc, cur) => acc + cur.y, 0))
    }
  }, [startDate, endDate, lookup, stepData, firstDate])

  return (
    <div className={styles.chartWrap}>
      <h1 className={styles.chartTitle}>STEP PROGRESS</h1>
      <div className={styles.chartContent}>
        <VictoryChart domainPadding={lookup === 'today' ? 0 : 25}>
          <VictoryAxis
            style={{ axis: { display: 'none' } }}
            tickValues={chartData.map((el) => el.x)}
            tickFormat={tickFormatter[lookup]}
          />
          <VictoryAxis dependentAxis crossAxis offsetX={38} domain={{ x: [0, 10], y: [0, 10] }} />
          <VictoryBar
            style={{
              data: { fill: '#8c8aff', strokeWidth: '4px', strokeLinecap: 'round' },
            }}
            data={chartData}
          />
        </VictoryChart>
      </div>
      <div className={styles.infoContainer}>
        <table>
          <thead className={styles.info}>
            <tr className={styles.infoDescription}>
              <th className={styles.infoTitle}>STEPS</th>
              <td className={styles.infoValue}>{totalSteps.toLocaleString('ko-kr')}</td>
            </tr>
            <tr className={styles.infoDescription}>
              <th className={styles.infoTitle}>DISTANCE</th>
              <td className={styles.infoValue}>{totalDistance.toFixed(1)}km</td>
            </tr>
          </thead>
        </table>
        <SelectDate
          setStartDate={setStartDate}
          firstDate={firstDate}
          setEndDate={setEndDate}
          startDate={startDate}
          setLookup={setLookup}
          endDate={endDate}
        />
      </div>
    </div>
  )
}

export default StepChart
