import dayjs from 'dayjs'
import minMax from 'dayjs/plugin/minMax'
import { useEffect, useState } from 'react'
import { IDailyStepsData, IUserInfo } from 'types/step'

dayjs.extend(minMax)

export const useStepsdata = (data: IUserInfo[]): IDailyStepsData => {
  const [stepsData, setStepsData] = useState<IDailyStepsData>({})

  useEffect(() => {
    const sortedData = data.sort((a, b) => dayjs(a.crt_ymdt).diff(b.crt_ymdt, 's'))

    const stepsRecords = sortedData.reduce((acc: IDailyStepsData, cur: IUserInfo) => {
      acc[dayjs(cur.crt_ymdt).format('YYYY-MM-DD')] = {
        totalDistances: Math.max(cur.distance, acc[dayjs(cur.crt_ymdt).format('YYYY-MM-DD')]?.totalDistances ?? 0),
        totalSteps: Math.max(cur.steps, acc[dayjs(cur.crt_ymdt).format('YYYY-MM-DD')]?.totalSteps ?? 0),
        records: [...(acc[dayjs(cur.crt_ymdt).format('YYYY-MM-DD')]?.records ?? []), cur],
      }

      return acc
    }, {})

    setStepsData(stepsRecords)
  }, [data])

  return stepsData
}
