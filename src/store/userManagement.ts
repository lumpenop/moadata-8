import { atom } from 'hooks/state'
import { IUser } from 'types/userManagement'
import dayjs from 'dayjs'

import defaultUserArr from 'data/user_list.json'

// const defaultUserArr = store.get('userManagement')

const setDateAll = () => {
  let oldest = defaultUserArr[0].date
  let lately = '0'
  defaultUserArr.forEach((item: IUser) => {
    const date = dayjs(item.date).format('YYYY-MM-DD')
    if (oldest > date) oldest = date
    if (lately < date) lately = date
  })

  return [new Date(oldest), new Date(lately)]
}

const [oldest, lately] = setDateAll()

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
