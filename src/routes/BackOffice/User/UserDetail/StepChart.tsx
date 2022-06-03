import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import minMax from 'dayjs/plugin/minMax'
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory'

import styles from './userDetail.module.scss'
import { IUserInfo } from 'types/step'

import SelectDate from './SelectDate'
import { useStepsdata } from 'hooks/useStepsData'

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
  const stepsData = useStepsdata(stepData)
  const [chartData, setChartData] = useState<IChartData[]>([])
  const [startDate, setStartDate] = useState(dayjs(firstDate).format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(dayjs(firstDate).format('YYYY-MM-DD'))
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
    if (lookup === 'today' || (lookup === 'custom' && startDate === endDate)) {
      setLookup('today')
      const targetDateData = Array.from({ length: 144 }, (_, i) => ({ x: i, y: 0 }))

      stepsData[dayjs(startDate).format('YYYY-MM-DD')]?.records.forEach((record, i) => {
        const hourIndex = Math.floor((dayjs(record.crt_ymdt).hour() * 60 + dayjs(record.crt_ymdt).minute()) / 10)
        const currenStep = record.steps - (stepsData[dayjs(startDate).format('YYYY-MM-DD')]?.records[i - 1]?.steps || 0)

        targetDateData[hourIndex].y = currenStep
      })

      setChartData(targetDateData)
      setTotalDistance(stepsData[startDate]?.totalDistances ?? 0)
      setTotalSteps(stepsData[startDate]?.totalSteps ?? 0)
    }

    if (lookup === 'week') {
      const weekData = Array.from({ length: 7 }, (_, i) => ({ x: i, y: 0 }))

      let weekDistance = 0
      let weekSteps = 0
      weekData.forEach((d, i) => {
        d.y = stepsData[dayjs(firstDate).add(i, 'd').format('YYYY-MM-DD')]?.totalSteps ?? 0
        weekDistance += stepsData[dayjs(firstDate).add(i, 'd').format('YYYY-MM-DD')]?.totalDistances ?? 0
        weekSteps += stepsData[dayjs(firstDate).add(i, 'd').format('YYYY-MM-DD')]?.totalSteps ?? 0
      })

      setChartData(weekData)
      setTotalDistance(weekDistance)
      setTotalSteps(weekSteps)
    }

    if (lookup === 'entire') {
      const entireData = Object.keys(stepsData).map((date) => ({
        x: dayjs(date).format('M월 D일'),
        y: stepsData[date].totalSteps,
      }))

      setChartData(entireData)
      setTotalDistance(Object.keys(stepsData).reduce((sum, date) => sum + stepsData[date].totalDistances, 0))
      setTotalSteps(Object.keys(stepsData).reduce((sum, date) => sum + stepsData[date].totalSteps, 0))
    }

    if (lookup === 'custom') {
      const filteredData = Array.from({ length: dayjs(endDate).diff(startDate, 'd') }, (_, i) => ({ x: i, y: 0 }))

      let filteredDistance = 0
      let filteredSteps = 0
      filteredData.forEach((d, i) => {
        d.y = stepsData[dayjs(firstDate).add(i, 'd').format('YYYY-MM-DD')]?.totalSteps ?? 0
        filteredDistance += stepsData[dayjs(firstDate).add(i, 'd').format('YYYY-MM-DD')]?.totalDistances ?? 0
        filteredSteps += stepsData[dayjs(firstDate).add(i, 'd').format('YYYY-MM-DD')]?.totalSteps ?? 0
      })

      setChartData(filteredData)
      setTotalDistance(filteredDistance)
      setTotalSteps(filteredSteps)
    }
  }, [startDate, endDate, lookup, stepsData, firstDate])

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
