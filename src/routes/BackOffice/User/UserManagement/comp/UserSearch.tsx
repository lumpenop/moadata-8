import { useEffect, KeyboardEvent } from 'react'
import dayjs from 'dayjs'
import store from 'store'

import {
  endDateState,
  isDateReadOnlyState,
  isLoginReadOnlyState,
  isNumReadOnlyState,
  loginValueState,
  numValueState,
  startDateState,
  userListState,
} from 'store/userManagement'

import { useRecoil } from 'hooks/state'
import ButtonBasic from 'routes/_shared/ButtonBasic'
import UserSearchContainer from './UserSearchContainer'
import { IUser } from 'types/userManagement'
import DatePickerUtil from 'utils/user/DatePickerUtil'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './userSearch.module.scss'

interface Props {
  setIsListHidden: Function
}

const UserSearch = ({ setIsListHidden }: Props) => {
  const [loginValue, setLoginValue] = useRecoil<string>(loginValueState)
  const [numValue, setNumValue] = useRecoil<string>(numValueState)
  const [startDate, setStartDate] = useRecoil<Date | null>(startDateState)
  const [endDate, setEndDate] = useRecoil<Date | null>(endDateState)
  const [isLoginValueReadOnly, setIsLoginValueReadOnly] = useRecoil(isLoginReadOnlyState)
  const [isNumValueReadOnly, setIsNumValueReadOnly] = useRecoil(isNumReadOnlyState)
  const [isDateValueReadOnly, setIsDateValueReadOnly] = useRecoil(isDateReadOnlyState)
  const [userList, setUserList] = useRecoil<IUser[]>(userListState)

  useEffect(() => {
    handleReadonly()
    setIsListHidden(false)
  }, [startDate, loginValue, numValue, endDate])

  const handleReadonly = () => {
    if (loginValue !== '') {
      setIsNumValueReadOnly(true)
      setIsDateValueReadOnly(true)
      return
    }
    if (numValue !== '') {
      setIsLoginValueReadOnly(true)
      setIsDateValueReadOnly(true)
      return
    }
    if (startDate || endDate) {
      setIsLoginValueReadOnly(true)
      setIsNumValueReadOnly(true)
      return
    }
    resetReadOnly()
  }

  const resetReadOnly = () => {
    setIsDateValueReadOnly(false)
    setIsLoginValueReadOnly(false)
    setIsNumValueReadOnly(false)
  }

  const searchUserButtonClick = () => {
    if (isLoginValueReadOnly === false) searchUserByLoginId(userList)
    if (isNumValueReadOnly === false) searchUserByMemberSeq(userList)
    if (isDateValueReadOnly === false) searchUserByDate(userList)
  }

  const resetData = () => {
    setStartDate(null)
    setEndDate(null)
    setLoginValue('')
    setNumValue('')
    setUserList(store.get('userManagement'))
  }

  const searchUserByDate = (items: IUser[]) => {
    const start = dayjs(startDate).format('YYYY-MM-DD')
    const end = dayjs(endDate).format('YYYY-MM-DD')
    const result = items.filter((item: IUser) => {
      const userDate = dayjs(item.date).format('YYYY-MM-DD')
      return userDate >= start && userDate <= end
    })
    if (result.length === 0) {
      setIsListHidden(true)
      return
    }
    setUserList(() => result)
  }

  const searchUserByLoginId = (items: IUser[]) => {
    const result = items.filter((item: IUser) => {
      return item.login_id === loginValue
    })
    if (result.length === 0) {
      setIsListHidden(true)
      return
    }
    setUserList(() => result)
  }

  const searchUserByMemberSeq = (items: IUser[]) => {
    const result = items.filter((item: IUser) => {
      return numValue === item.seq
    })
    if (result.length === 0) {
      setIsListHidden(true)
      return
    }
    setUserList(result)
  }

  const resetSearchButtonClick = () => {
    resetReadOnly()
    setIsListHidden(false)
    resetData()
  }

  return (
    <div className={styles.searchFormBox}>
      <form className={styles.searchForm}>
        <UserSearchContainer searchUserButtonClick={searchUserButtonClick} />

        <DatePickerUtil />
        <div className={styles.userSearchButtonContainer}>
          <div className={styles.userSearchButtonBox}>
            <ButtonBasic onClick={resetSearchButtonClick} buttonName='필터 초기화' buttonSize='large' />
            <ButtonBasic onClick={searchUserButtonClick} buttonName='검색' buttonSize='large' />
          </div>
        </div>
      </form>
    </div>
  )
}

export default UserSearch
