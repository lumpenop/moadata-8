import { MouseEvent, useState } from 'react'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryArea, VictoryLine } from 'victory'
import DatePicker from 'react-datepicker'
import store from 'store'

import Button from 'components/_comon/Button'
import { IUserHeartRateInfo } from 'types/heartRate.d'

import styles from './userDetail.module.scss'
import useHeartRate from 'hooks/useHeartRate'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

interface Props {
  heartRateData: IUserHeartRateInfo[]
}

const HeartRateChart = ({ heartRateData }: Props) => {
  const location = useLocation()
  const state = location.state as { date: string; login_id: string; seq: string }

  // const [heartRateData, setHeartRateData] = useState<IUserInfo[]>([])
  const [lookup, setLookup] = useState('today')
  const [startDate, setStartDate] = useState<string>(dayjs(state.date).format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState<string>(dayjs(state.date).format('YYYY-MM-DD'))

  const { data, date1, date2, heartBeatAvg } = useHeartRate(heartRateData, lookup, startDate, endDate, state)

  const handleLookUpClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value === 'today') {
      setStartDate(dayjs(state.date).format('YYYY-MM-DD'))
      setEndDate(dayjs(state.date).format('YYYY-MM-DD'))
    }
    if (e.currentTarget.value === 'week') {
      setEndDate(dayjs(startDate).add(7, 'day').format('YYYY-MM-DD'))
    }
    if (e.currentTarget.value === 'entire') {
      setEndDate(dayjs().format('YYYY-MM-DD'))
    }

    setLookup(e.currentTarget.value)
  }

  const handleChangeStartDate = (date: Date) => {
    setStartDate(dayjs(date).format('YYYY-MM-DD'))
    setLookup('')
  }

  const handleChangeEndDate = (date: Date) => {
    setEndDate(dayjs(date).format('YYYY-MM-DD'))
    setLookup('')
  }

  const tickFormatter = (t: number | string): string => {
    switch (lookup) {
      case 'today':
        if (t === 143) return '24시'
        return typeof t === 'number' && (t / 6) % 4 === 0 ? `${Math.floor(t / 6)}시` : ''
      case 'week':
        return `${typeof t === 'number' && t + 1}일`
      case 'entire':
        return typeof t === 'string' ? t : ''
    }

    if (startDate === endDate) {
      if (t === 143) return '24시'
      return typeof t === 'number' && (t / 6) % 4 === 0 ? `${Math.floor(t / 6)}시` : ''
    }
    if (startDate && endDate && !lookup) {
      return typeof t === 'string' ? t : ''
    }
    return ''
  }

  return (
    <div className={styles.chartWrap}>
      <h1 className={styles.chartTitle}>HEARTRATE PROGRESS</h1>
      <div className={styles.chartContent}>
        <VictoryChart domain={{ y: [50, 160] }}>
          <VictoryLabel style={{ fill: '#8C8AFF' }} dy={10} text='bpm' x={15} y={20} />
          <VictoryAxis
            style={{
              tickLabels: { fontSize: 15 },
            }}
            tickValues={data.map((el) => el.x)}
            tickFormat={tickFormatter}
          />
          <VictoryAxis
            dependentAxis
            style={{
              tickLabels: { fontSize: 15 },
            }}
          />
          {data.map((item: any) => {
            return (
              <VictoryLine
                style={{ data: { stroke: '#8C8AFF' } }}
                key={item.y + new Date()}
                data={data}
                y={(datum) => datum.y}
              />
            )
          })}
        </VictoryChart>
      </div>
      <div className={styles.infoContainer}>
        <table>
          <thead>
            <tr className={styles.info}>
              <div className={styles.infoDescription}>
                <th className={styles.infoTitle}>HEART RATE</th>
                <td className={styles.infoValue}>{heartBeatAvg} bpm</td>
              </div>
              {/* <div className={styles.infoDescription}>
                <th className={styles.infoTitle}>DISTANCE</th>
                <td className={styles.infoValue}>{totalDistance.toFixed(1)}km</td>
              </div> */}
            </tr>
          </thead>
        </table>
        <div className={styles.date}>
          <div className={styles.dateTop}>
            <h1 className={styles.title}>조회 기간</h1>
            <div className={styles.buttonWrap}>
              <Button title='오늘' value='today' onClick={handleLookUpClick} />
              <Button title='1주일' value='week' onClick={handleLookUpClick} />
              <Button title='전체' value='entire' onClick={handleLookUpClick} />
            </div>
          </div>
          <div className={styles.datePickerInputWrap}>
            <DatePicker
              dateFormat='yy-MM-dd'
              minDate={new Date(startDate)}
              selected={new Date(startDate)}
              onChange={handleChangeStartDate}
            />
          </div>
          {/* <span>~</span> */}
          <div className={styles.datePickerInputWrap}>
            <DatePicker
              dateFormat='yy-MM-dd'
              minDate={new Date(endDate)}
              selected={new Date(endDate)}
              onChange={handleChangeEndDate}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeartRateChart
