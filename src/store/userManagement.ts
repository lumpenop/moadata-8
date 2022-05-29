import { atom } from 'hooks/state'
import { IUser } from 'types/userManagement'
import store from 'store'
import dayjs from 'dayjs'

import heartRate from 'assets/json/heartrate.json'
import step from 'assets/json/step.json'
import userInfo from 'data/user_list.json'
// import defaultUserArr from 'data/user_list.json'

heartRate.sort((info1, info2) => Number(dayjs(info1.crt_ymdt)) - Number(dayjs(info2.crt_ymdt)))

store.set('heartRate', heartRate)
store.set('step', step)
store.set('userManagement', userInfo)

const defaultUserArr = store.get('userManagement')

const setDate = () => {
  const dates = defaultUserArr.map((item: IUser) => {
    return dayjs(item.date)
  })
  const oldest = dayjs.min(dates)
  const lately = dayjs.max(dates)

  return [new Date(oldest.format()), new Date(lately.format())]
}

const [oldest, lately] = setDate()

export const userListState = atom<IUser[]>({
  key: '#userListState', // unique ID (with respect to other atoms/selectors)
  default: defaultUserArr,
})

export const startDateState = atom<Date>({
  key: '#startDateState',
  default: oldest,
})

export const endDateState = atom<Date>({
  key: '#endDateState',
  default: lately,
})

export const numValueState = atom<string>({
  key: '#numVValueState',
  default: '',
})

export const loginValueState = atom<string>({
  key: '#loginValueState',
  default: '',
})

export const isDateReadOnlyState = atom<boolean>({
  key: '#isDateReadOnlyState',
  default: false,
})

export const isLoginReadOnlyState = atom<boolean>({
  key: '#isLoginReadOnlyState',
  default: false,
})

export const isNumReadOnlyState = atom<boolean>({
  key: '#isNumReadOnlyState',
  default: false,
})
