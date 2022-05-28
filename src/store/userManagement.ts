import { atom } from 'hooks/state'
import { IUser } from 'types/userManagement'
import store from 'store'

const defaultUserArr = store.get('userManagement')

export const userListState = atom<IUser[]>({
  key: '#userListState', // unique ID (with respect to other atoms/selectors)
  default: defaultUserArr,
})

export const startDateState = atom<Date | null>({
  key: '#startDateState',
  default: null,
})

export const endDateState = atom<Date | null>({
  key: '#endDateState',
  default: null,
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
