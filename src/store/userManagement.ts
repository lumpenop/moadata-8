import { atom } from 'hooks/state'
import { IUser } from 'types/userManagement'
import dayjs from 'dayjs'
import store from 'store'

import heartRate from 'assets/json/heartrate.json'
import step from 'assets/json/step.json'
import userData from 'data/user_list.json'

store.set('heartRate', heartRate)
store.set('step', step)
store.set('userManagement', userData)

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
  key: '#userListState',
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
