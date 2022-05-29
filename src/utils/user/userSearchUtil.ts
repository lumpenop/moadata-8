import store from 'store'
import { IUser } from 'types/userManagement'
import dayjs from 'dayjs'

export const searchUserByLoginId = (loginValue: string) => {
  const dataArr = store.get('userManagement')
  console.log(dataArr)
  console.log('loginValue', loginValue)
  const result = dataArr.filter((item: IUser) => {
    return item.login_id === loginValue
  })
  return result
}

export const searchUserByUserNum = (numValue: string) => {
  const dataArr = store.get('userManagement')
  console.log('numValue', numValue)
  const result = dataArr.filter((item: IUser) => {
    return Number(numValue) === item.seq
  })
  if (result.length === 0) {
    return undefined
  }

  return result
}

export const searchUserByDate = (startDate: Date, endDate: Date, items: IUser[] = store.get('userManagement')) => {
  console.log(items)
  const start = dayjs(startDate).format('YYYY-MM-DD')
  const end = dayjs(endDate).format('YYYY-MM-DD')
  const result = items.filter((item: IUser) => {
    const userDate = dayjs(item.date).format('YYYY-MM-DD')
    return userDate >= start && userDate <= end
  })
  return result
}
