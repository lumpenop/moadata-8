import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

import { IUserData, IUserHeartRateInfo } from 'types/heartRate.d'

interface Props {
  lookup: string
  startDate: string | Date
  endDate: string | Date
  state: { date: string; login_id: string; seq: string }
}

let hap = 0
let length = 0

const useHeartRate = (
  heartRateData: IUserHeartRateInfo[],
  lookup: string,
  startDate: string | Date,
  endDate: string | Date,
  state: { date: string; login_id: string; seq: string }
) => {
  const [data, setData] = useState<IUserData[]>([])

  const [date1, setDate1] = useState('2022-04-19')
  const [date2, setDate2] = useState('')

  const [heartBeatAvg, setHeartBeatAvg] = useState(0)

  useEffect(() => {
    if (lookup === 'today') {
      const HOURLY_DATA = Array.from({ length: 144 }, (_, i) => ({ x: i, y: 0 }))

      heartRateData
        .filter((data2) => dayjs(data2.crt_ymdt).format('DD') === dayjs(state.date).format('DD'))
        .forEach((info, i) => {
          hap += info.avg_beat
          length = i
          const hourIndex = Math.floor((dayjs(info.crt_ymdt).hour() * 60 + dayjs(info.crt_ymdt).minute()) / 10)
          const currenStep = info.avg_beat
          HOURLY_DATA[hourIndex].y = currenStep
        })
      setData(HOURLY_DATA)
      setDate1(dayjs(state.date).format('YY-MM-DD'))
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
            dayjs(data2.crt_ymdt).isSameOrBefore(dayjs(state.date).add(7, 'day')) &&
            dayjs(data2.crt_ymdt).isSameOrAfter(dayjs(state.date))
        )
        .forEach((data3, i) => {
          hap += data3.avg_beat
          length = i
          const dailyIndex = Number(dayjs(data3.crt_ymdt).date()) - Number(dayjs(state.date).date())

          weekData[dailyIndex].y = (weekData[dailyIndex].y + data3.avg_beat) / 2
        })

      setData(weekData)
      setDate1(dayjs(state.date).format('YY-MM-DD'))
      setDate2(dayjs(state.date).add(7, 'day').format('YY-MM-DD'))
      setHeartBeatAvg(Math.round(hap / length))
      hap = 0
      return
    }
    if (lookup === 'entire') {
      const entireData = heartRateData
        .sort((a, b) => Number(dayjs(a.crt_ymdt)) - Number(dayjs(b.crt_ymdt)))
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
      setDate1(dayjs(state.date).format('YY-MM-DD'))
      setDate2(dayjs().format('YY-MM-DD'))
      setHeartBeatAvg(Math.round(hap / length))
      hap = 0
      return
    }

    if (startDate && endDate) {
      // if (lookup === 'custom') {
      if (startDate === endDate) {
        const HOURLY_DATA = Array.from({ length: 144 }, (_, i) => ({ x: i, y: 0 }))

        heartRateData
          .filter((data2) => dayjs(data2.crt_ymdt).format('DD') === dayjs(startDate).format('DD'))
          .forEach((info, i) => {
            hap += info.avg_beat
            length = i
            const hourIndex = Math.floor((dayjs(info.crt_ymdt).hour() * 60 + dayjs(info.crt_ymdt).minute()) / 10)
            const currenStep = info.avg_beat
            HOURLY_DATA[hourIndex].y = currenStep
          })
        setData(HOURLY_DATA)
        setDate1(dayjs(startDate).format('YY-MM-DD'))
        setDate2('')
        setHeartBeatAvg(Math.round(hap / length))
        hap = 0
        return
      }

      const entireData = heartRateData
        .filter(
          (data2) =>
            dayjs(data2.crt_ymdt).isSameOrAfter(dayjs(startDate)) &&
            dayjs(data2.crt_ymdt).isSameOrBefore(dayjs(endDate).add(1, 'day'))
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
      setDate1(dayjs(startDate).format('YY-MM-DD'))
      setDate2(dayjs(endDate).format('YY-MM-DD'))

      setHeartBeatAvg(Math.round(hap / length))
      hap = 0
    }
  }, [startDate, endDate, lookup, heartRateData, state.date])
  return { data, heartRateData, date1, date2, heartBeatAvg }
}

export default useHeartRate
