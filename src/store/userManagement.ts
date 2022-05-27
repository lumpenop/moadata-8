import { atom } from 'hooks/state'
import { IUser } from 'types/userManagement'

export const userListState = atom<IUser[]>({
  key: '#userListState', // unique ID (with respect to other atoms/selectors)
  default: [
    {
      seq: '136',
      date: '2022-01-02 09:12:12',
      login_id: 'ghdrlfehd12',
    },
    {
      seq: '328',
      date: '2022-01-12 11:30:08',
      login_id: 'rladudgml12',
    },
    {
      seq: '380',
      date: '2022-02-10 18:52:30',
      login_id: 'rlacjftn23',
    },
  ],
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
  key: '#numValueState',
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
