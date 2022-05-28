import store from 'store'
import { IUser, IHeartrate } from 'types/userManagement'
import dayjs from 'dayjs'

export const searchUserByLoginId = (loginValue: string) => {
  const dataArr = store.get('userManagement')
  const result = dataArr.filter((item: IUser) => {
    console.log(item.login_id, ' ===', loginValue)
    return item.login_id === loginValue
  })
  console.log(result[0])
  return result[0]
}

// if (result.length === 0) {
//   setIsListHidden(true)
//   return []
// }

export const searchUserByUserNum = (numValue: string) => {
  const dataArr = store.get('userManagement')
  const result = dataArr.filter((item: IUser) => {
    return Number(numValue) === Number(item.seq)
  })
  return result[0]
}

export const searchUserByDate = (user: IUser) => {
  if (!user) return []
  const userHeartData = store.get('heartrate')
  const userHeartArr = userHeartData.filter((item: IHeartrate) => {
    return item.member_seq === user.seq
  })
  console.log(userHeartArr)
  return userHeartArr
}
